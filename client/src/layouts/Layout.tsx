import { useEffect, useState } from "react";
import "../styles/app.layout.css";
import Footer from "./Footer";
import Header from "./Header";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebr";
import Splash from "./Splash";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="chat-area">
        <Header />
        <MessageContainer />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
