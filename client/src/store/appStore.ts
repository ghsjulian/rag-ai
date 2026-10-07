import { create } from 'zustand';

// Message Type
export type Message = {
    id: number,
    type: string,
    message: string
}
// Define the state interface
interface AppState {
    files: string[];
    isConnected: boolean;
    isUploading: boolean;
    activeFile: string;
    messages: Message[];
    isMenu: boolean;
    openMenu: () => void
    setMessages: (newMessage: Message) => void;
    setActive: (file: string) => void;
    setFiles: (newFiles: string[]) => void;
    setConnect: (conn: boolean) => void;
    setUploading: (uploading: boolean) => void;
}

// Create the typed store
export const appStore = create<AppState>((set, get) => ({
    files: [],
    isConnected: false,
    isUploading: false,
    activeFile: "",
    messages: [],
    isMenu: false,
    openMenu: () => set({ isMenu: !get().isMenu }),
    setMessages: (newMessage: { type: string, id: number, message: string }) => set((state) => ({ messages: [...state.messages, newMessage] })),
    setActive: (file) => set({ activeFile: file }),
    setFiles: (newFiles) => set({ files: newFiles }),
    setConnect: (conn) => set({ isConnected: conn }),
    setUploading: (uploading) => set({ isUploading: uploading }),
}));