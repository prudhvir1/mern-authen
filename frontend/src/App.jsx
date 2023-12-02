import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <ToastContainer />
      <div className="w-full h-calc flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
