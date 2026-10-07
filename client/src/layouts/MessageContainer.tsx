import { useEffect, useRef } from "react";
import { appStore } from "../store/appStore";

const MessageContainer = () => {
  const messages = appStore((state) => state.messages);

  // Explicitly HTMLDivElement type define korun:
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      {messages?.length > 0 ? (
        messages.map((message, idx) => {
          const isUser = message?.type === "USER";
          return (
            <div
              key={message?.id || idx}
              className={`message-group ${isUser ? "user" : "assistant"}`}
            >
              <div className={`avatar ${isUser ? "user" : "assistant"}`}>
                {isUser ? "YOU" : "AI"}
              </div>
              <div className="message-content">
                <div className="message-bubble">{message?.message}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
            padding: "1rem",
          }}
        >
          <img
            width="150"
            height="150"
            src="/icons/favicon-2.png"
            alt="No chats"
          />
          <h3
            style={{
              color: "#fff",
              marginTop: "1rem",
            }}
          >
            No messages found yet!
          </h3>
        </div>
      )}

      {/* Target Ref element */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageContainer;
