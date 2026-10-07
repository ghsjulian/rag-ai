import { appStore } from "../store/appStore";

const Header = () => {
  const { files, openMenu, isMenu } = appStore();
  return (
    <header className="chat-header">
      <div>
        <div className="header-title">Vector Search Session</div>
        <div className="header-subtitle">
          Retrieval Augmented Generation with Embeddings
        </div>
      </div>
      <div className="active-pill">{files?.length || 0} Sources Active</div>
      <button onClick={openMenu} id="menu">
        {isMenu ? (
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
            className="lucide lucide-x preview-icon"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
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
            className="lucide lucide-menu preview-icon"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;
