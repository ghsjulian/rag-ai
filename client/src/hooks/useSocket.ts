import { socket } from '../services/socket';
import { appStore } from '../store/appStore';

interface UploadResponse {
    success: boolean;
    message: string;
    filePath?: string;
}

export const useSocket = () => {
    const { setFiles, setActive, activeFile, setMessages } = appStore();

    // Upload file event
    const uploadFileViaSocket = async (file: File): Promise<UploadResponse> => {
        return new Promise((resolve, reject) => {
            if (!socket.connected) return reject(new Error('Socket is not connected.'));
            const payload = {
                name: file.name,
                type: file.type,
                size: file.size,
                buffer: file,
            };
            socket.emit('upload_file', payload, (response: UploadResponse) => {
                if (response.success) {
                    resolve(response);
                    socket.on("total-files", (data: { socketId: string; files: string[] }) => {
                        if (data?.files?.length > 0) {
                            setFiles(data.files);
                            setActive(data.files[0]);
                        } else {
                            setFiles([]);
                            setActive("");
                        }
                    });
                }
                else { reject(new Error(response.message)) }
            });
        });
    };

    // Delete file event
    const deleteFile = async (filePath: string): Promise<UploadResponse> => {
        return new Promise((resolve, reject) => {
            if (!socket.connected) return reject(new Error('Socket is not connected.'));
            socket.emit('delete_file', filePath, (response: UploadResponse) => {
                if (response.success) resolve(response);
                else reject(new Error(response.message));
            });
        });
    };

    // Ask question 
    const askQuestion = async (question: string) => {
        const tempMessage = {
            type: 'USER',
            message: question,
            id: Date.now()
        };
        setMessages(tempMessage); // User message push[cite: 2]
        socket.emit("ask-ai", { targetFile: activeFile, question });
    };

    return {
        uploadFileViaSocket,
        deleteFile,
        askQuestion,
    };
};