import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import config from '../config/app.config.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from "node:url";
import getDocumentFiles from '../utils/get-documents.js';
import handleFileController from '../controllers/handle-file.controller.js';
import chatController from '../controllers/chat.controller.js';
import { Chunk } from '../models/chunk.model.js';

let IO: Server | null = null;
const connections = new Map<string, Socket>();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface FileUploadData {
    name: string;
    type: string;
    size: number;
    buffer: Buffer | ArrayBuffer;
}

export const initializeSocket = (httpServer: HttpServer): Server => {
    if (IO) return IO;

    IO = new Server(httpServer, {
        cors: {
            origin: config.CORS_ORIGIN || 'http://localhost:5000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 20000,
        pingInterval: 25000,
        maxHttpBufferSize: 1e8,
    });

    // Socket Connection Handlers
    IO.on('connection', async (socket: Socket) => {
        connections.set(socket.id, socket);
        console.log(`[+] Socket connected: ${socket.id}`);
        IO?.to(socket.id).emit('connection_ack', { socketId: socket.id });
        const files = await getDocumentFiles("../../../uploads/");
        IO?.to(socket.id).emit('total-files', { socketId: socket.id, files });

        // Upload File Event
        socket.on('upload_file', async (data: FileUploadData, callback?: (res: { success: boolean; message: string; filePath?: string }) => void) => {
            try {
                const { name, buffer } = data;
                if (!name || !buffer) {
                    if (callback) callback({ success: false, message: 'Invalid file payload.' });
                    return;
                }
                const uploadsDir = path.join(process.cwd(), '../uploads');
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }
                // Create a unique filename to prevent overwrites
                const safeFileName = `${Date.now()}-${name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                const savePath = path.join(uploadsDir, safeFileName);
                // Convert ArrayBuffer/Buffer and write to disk
                const fileBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
                await fs.promises.writeFile(savePath, fileBuffer);
                await handleFileController(savePath); // Process the file after saving
                if (callback) {
                    const files = await getDocumentFiles("../../../uploads/");
                    IO?.to(socket.id).emit('total-files', { socketId: socket.id, files });
                    callback({
                        success: true,
                        message: 'File uploaded successfully!',
                        filePath: `/uploads/${safeFileName}`,
                    });
                }
            } catch (error) {
                console.error(`[-] File upload error (${socket.id}):`, error);
                if (callback) {
                    callback({ success: false, message: 'Server failed to save file.' });
                }
            }
        });
        // Delete File Event
        socket.on('delete_file', async (filePath: string, callback?: (res: { success: boolean; message: string }) => void) => {
            try {
                const uploadsDir = path.join(__dirname, '../../../uploads/');
                const fullPath = path.join(uploadsDir, path.basename(filePath));
                console.log(fullPath)
                if (fs.existsSync(fullPath)) {
                    await fs.promises.unlink(fullPath);
                    const fileData = await Chunk.findOneAndDelete({ docName: fullPath })
                    console.log(`[+] File deleted successfully: ${fullPath}`);
                    if (callback) {
                        const files = await getDocumentFiles("../../../uploads/");
                        IO?.to(socket.id).emit('total-files', { socketId: socket.id, files });
                        callback({ success: true, message: 'File deleted successfully!' });
                        console.log(files)
                        console.log(fullPath)
                    }
                } else {
                    if (callback) callback({ success: false, message: 'File not found.' });
                }
            } catch (error) {
                console.error(`[-] File deletion error (${socket.id}):`, error);
                if (callback) {
                    callback({ success: false, message: 'Server failed to delete file.' });
                }
            }
        });
        // Ask Questions 
        socket.on("ask-ai", async ({ targetFile, question }) => {
            let answer = await chatController(question, targetFile)
            // console.log("User Question : ", { targetFile, question })
            IO?.to(socket.id).emit('ai-answer', answer);
        })

        // Join room event
        socket.on('join_room', (room: string) => {
            if (typeof room === 'string' && room.trim()) {
                socket.join(room);
                socket.to(room).emit('user_joined', { socketId: socket.id });
            }
        });

        // Leave room event
        socket.on('leave_room', (room: string) => {
            if (typeof room === 'string' && room.trim()) {
                socket.leave(room);
                socket.to(room).emit('user_left', { socketId: socket.id });
            }
        });

        // Broadcast message to room
        socket.on('send_message', (data: { room: string; message: unknown }) => {
            if (data?.room && data?.message) {
                IO?.to(data.room).emit('receive_message', {
                    sender: socket.id,
                    message: data.message,
                    timestamp: new Date().toISOString(),
                });
            }
        });

        // Error handling
        socket.on('error', (err) => {
            console.error(`Socket error (${socket.id}):`, err);
        });

        // Disconnect event
        socket.on('disconnect', (reason) => {
            console.log(`[-] Socket disconnected: ${socket.id} | Reason: ${reason}`);
        });
    });
    return IO;
};


export const getIO = (): Server => {
    if (!IO) {
        throw new Error('Socket.IO has not been initialized. Call initializeSocket(httpServer) first.');
    }
    return IO;
};


export const closeSocket = (): Promise<void> => {
    return new Promise((resolve) => {
        if (!IO) {
            resolve();
            return;
        }
        IO.disconnectSockets(true);
        IO.close(() => {
            IO = null;
            console.log('Socket.IO server closed.');
            resolve();
        });
    });
};

export default initializeSocket;