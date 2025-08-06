import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoNews from "./components/CryptoNews";
import BTCChart from "./components/BTCChart";
import "./App.css";
import Converter from "./components/Converter";
import CryptoHubHeader from "./components/CryptoHubHeader";

function App() {

  return (
    <div>
  <CryptoHubHeader />
  <div
    className="w-full h-screen overflow-x-hidden overflow-y-hidden flex justify-center items-start bg-cover bg-no-repeat bg-fixed"
    style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
    }}
  >
    <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto p-4 sm:p-6 flex-1 sm:mb-4">
      <div className="w-full">
        <CryptoNews />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1">
        <div className="w-full lg:w-1/2 flex">
          <Converter />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <BTCChart />
        </div>
      </div>
    </div>

    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar
      closeOnClick
      pauseOnHover={false}
      draggable={false}
    />
  </div>
</div>


  
  );
}

export default App;
