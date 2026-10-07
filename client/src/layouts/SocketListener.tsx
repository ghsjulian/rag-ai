import { useEffect } from "react";
import { connectSocket, socket } from "../services/socket";
import { appStore, type Message } from "../store/appStore";

export const SocketListener = () => {
  const { setFiles, setActive, setMessages } = appStore();

  useEffect(() => {
    connectSocket();

    // Single Listener Handler Setup
    const handleConnectionAck = (data: { socketId: string }) => {
      console.log("Connected:", data.socketId);
    };

    const handleTotalFiles = (data: { socketId: string; files: string[] }) => {
      if (data?.files?.length > 0) {
        setFiles(data.files);
        setActive(data.files[0]);
      } else {
        setFiles([]);
        setActive("");
      }
    };

    const handleAiAnswer = (answer: string) => {
      const tempMessage: Message = {
        type: "AI",
        message: answer,
        id: Date.now() + Math.random(), // Duplicate ID check guarantee
      };
      setMessages(tempMessage); // Push AI answer[cite: 2]
    };

    // Attach event listeners
    socket.on("connection_ack", handleConnectionAck);
    socket.on("total-files", handleTotalFiles);
    socket.on("ai-answer", handleAiAnswer);

    // Clean up listeners on unmount
    return () => {
      socket.off("connection_ack", handleConnectionAck);
      socket.off("total-files", handleTotalFiles);
      socket.off("ai-answer", handleAiAnswer);
    };
  }, []); // Empty dependency array ensures listener registers EXACTLY ONCE

  return null; // Logic-only component
};
