import React from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  currencyOptions = [],
  onCurrencyChange,
  selectCurrency = "usd",
  amountDisable = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white text-sm">{label}</label>
      <div className="flex items-center gap-2 min-w-0">
        <input
          type="number"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
          disabled={amountDisable}
        />
        <select
          className="px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 flex-shrink-0"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
