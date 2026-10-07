import Layout from "./layouts/Layout";
import { SocketListener } from "./layouts/SocketListener";

const App = () => {
  return (
    <>
      <SocketListener />
      <Layout />
    </>
  );
};

export default App;
