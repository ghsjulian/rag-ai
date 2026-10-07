import { useSocket } from "../hooks/useSocket";
import { appStore } from "../store/appStore";

const Sidebar = () => {
  const { uploadFileViaSocket, deleteFile } = useSocket();
  const { files, setUploading, isUploading, setActive, activeFile, isMenu } =
    appStore();
  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (isUploading) {
      alert("A file is already being uploaded. Please wait.");
      return;
    }
    if (!file) return;
    // Handle the file upload logic here
    setUploading(true);
    await uploadFileViaSocket(file);
    setUploading(false);
  };

  return (
    <aside className={`sidebar ${isMenu ? "active" : ""}`}>
      <div className="brand-logo">
        <img
          src="/icons/favicon-2.png"
          alt="RAG.AI Logo"
          className="logo-image"
        />
        <div>
          <div className="brand-title">RAG.AI</div>
          <div className="brand-badge">Vector DB Active</div>
        </div>
      </div>

      <div className="section-label">Knowledge Base</div>
      <label htmlFor="file" className="upload-area">
        <svg className="upload-icon" viewBox="0 0 24 24">
          <path
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="upload-text">
          {isUploading ? "File Uploading..." : "+ Click To Upload File"}
        </span>
        <span className="upload-subtext">
          PDF, TXT, DOCX,PPt,XLXX supported
        </span>
      </label>
      <input
        onChange={handleFile}
        type="file"
        id="file"
        hidden
        style={{ display: "none" }}
        accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.dat,.log,.md,.db,.ppt,.pptx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      />

      <div className="section-label">Indexed Documents ({files?.length})</div>
      <div className="source-list">
        {files?.length > 0 ? (
          files?.map((file, idx) => {
            const fileName = file.split("/").pop() || "Unknown File";
            return (
              <div
                onClick={() => setActive(file)}
                key={idx}
                data-path={file}
                className={`source-card ${activeFile === file ? "active" : ""}`}
              >
                <div className="source-info">
                  <div>
                    <div className="doc-name">{fileName}</div>
                    <div className="doc-meta">Chunks • Vectorized</div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteFile(file)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash preview-icon"
                    >
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              textAlign: "left",
              padding: "5px 7px",
              border: "1px solid #fff",
              borderRadius: "5px",
            }}
            className="no-docs"
          >
            No documents uploaded yet.
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <span>Embedding Model:</span>
        <span className="status-active">
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--cyan)",
            }}
          ></span>
          Ada-002
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
