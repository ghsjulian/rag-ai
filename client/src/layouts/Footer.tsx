import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Footer = () => {
  const [question, setQuestion] = useState<string>("");
  const { askQuestion } = useSocket();

  return (
    <div className="input-wrapper">
      <div className="input-box">
        <input
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!question) return;
              askQuestion(question);
              setQuestion("");
            }
          }}
          value={question}
          type="text"
          className="chat-input"
          placeholder="Ask questions based on your indexed context..."
        />
        <button
          onClick={() => {
            (askQuestion(question), setQuestion(""));
          }}
          className="send-button"
        >
          <span>Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-send-horizontal preview-icon"
          >
            <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
            <path d="M6 12h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Footer;
