import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL //|| 'http://localhost:3000';
export let isConnected = false;

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export const connectSocket = (): void => {
    if (!socket.connected) {
        socket.connect();
        isConnected = true;
    }
};

export const disconnectSocket = (): void => {
    if (socket.connected) {
        socket.disconnect();
        isConnected = false;
    }
};
