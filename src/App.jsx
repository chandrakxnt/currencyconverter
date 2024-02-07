import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  const handleReset=()=>{
    setAmount("");

  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox 
              label="From" 
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount)=>setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-500"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox 
               label="To"
               amount={convertedAmount}
               currencyOptions={options}
               onCurrencyChange={(currency)=>setTo(currency)}
               amountDisable
               selectCurrency={to}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg
              hover:scale-105 hover:bg-blue-500 ease-in-out duration-200"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4 hover:scale-105 hover:bg-blue-500 ease-in-out duration-200"
              onClick={handleReset}
            >
              Reset All
            </button>
          </form>
        </div>
      </div>
    </div>
    
  
  );
}

export default App;
