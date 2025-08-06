import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputBox from "./InputBox";
import useCurrencyInfo from "../hooks/useCurrencyInfo";

function Converter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  useEffect(() => {
    if (!amount || !currencyInfo[to]) {
      setConvertedAmount(0);
      return;
    }
    setConvertedAmount(parseFloat(amount) * currencyInfo[to]);
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedAmount.toFixed(2));
    toast.success(`Swapped ${from.toUpperCase()} with ${to.toUpperCase()}`, {
      position: "top-center",
    });
  };

  const handleReset = () => {
    setAmount("");
    setConvertedAmount(0);
  };

  return (
    <div className="w-full sm:max-w-md max-w-full border border-gray-600 rounded-lg p-4 sm:p-5 backdrop-blur-sm bg-gray-800/80 flex flex-col h-full min-w-0">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-between flex-1"
      >
        <div className="flex flex-col gap-4">
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out border border-blue-500 hover:border-blue-400"
              onClick={swap}
              aria-label="Swap currencies"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount ? convertedAmount.toFixed(2) : 0}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            amountDisable
            selectCurrency={to}
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm sm:text-base hover:scale-105 hover:bg-blue-500 transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
          <button
            type="button"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm sm:text-base hover:scale-105 hover:bg-blue-500 transition"
            onClick={handleReset}
          >
            Reset All
          </button>
        </div>
      </form>
    </div>
  );
}

export default Converter;
