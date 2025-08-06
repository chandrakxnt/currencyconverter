import React, { useState, useEffect } from 'react';

const CryptoHubHeader = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();

        const formattedData = [
          {
            symbol: 'BTC',
            price: `$${data.bitcoin.usd.toLocaleString()}`,
            change: `${data.bitcoin.usd_24h_change > 0 ? '+' : ''}${data.bitcoin.usd_24h_change.toFixed(2)}%`,
            isUp: data.bitcoin.usd_24h_change > 0,
          },
          {
            symbol: 'ETH',
            price: `$${data.ethereum.usd.toLocaleString()}`,
            change: `${data.ethereum.usd_24h_change > 0 ? '+' : ''}${data.ethereum.usd_24h_change.toFixed(2)}%`,
            isUp: data.ethereum.usd_24h_change > 0,
          },
          {
            symbol: 'BNB',
            price: `$${data.binancecoin.usd.toLocaleString()}`,
            change: `${data.binancecoin.usd_24h_change > 0 ? '+' : ''}${data.binancecoin.usd_24h_change.toFixed(2)}%`,
            isUp: data.binancecoin.usd_24h_change > 0,
          },
          {
            symbol: 'SOL',
            price: `$${data.solana.usd.toLocaleString()}`,
            change: `${data.solana.usd_24h_change > 0 ? '+' : ''}${data.solana.usd_24h_change.toFixed(2)}%`,
            isUp: data.solana.usd_24h_change > 0,
          },
        ];

        setMarketData(formattedData);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-black/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-2 sm:py-0 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CryptoHub
                </h1>
                <p className="text-xs text-gray-300 -mt-1">Currency converter, Charts and News!</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-300">LIVE</span>
              </div>
              <div className="relative group">
                <a
                  href="https://github.com/chandrakxnt/currencyconverter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition hover:scale-105"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 .5C5.648.5.5 5.648.5 12c0 5.092 3.292 9.397 7.865 10.924.575.106.785-.25.785-.556 0-.275-.01-1.004-.015-1.972-3.2.696-3.877-1.543-3.877-1.543-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.08-.7.08-.7 1.154.082 1.762 1.185 1.762 1.185 1.027 1.76 2.693 1.251 3.35.957.103-.744.402-1.251.73-1.539-2.554-.29-5.238-1.277-5.238-5.684 0-1.256.448-2.283 1.183-3.087-.119-.29-.513-1.46.112-3.046 0 0 .965-.309 3.162 1.179.917-.255 1.9-.383 2.878-.388.977.005 1.961.133 2.88.388 2.195-1.488 3.16-1.179 3.16-1.179.626 1.586.232 2.756.114 3.046.737.804 1.182 1.831 1.182 3.087 0 4.418-2.689 5.39-5.252 5.674.414.358.783 1.064.783 2.146 0 1.55-.014 2.8-.014 3.18 0 .31.208.667.79.554C20.71 21.393 24 17.09 24 12c0-6.352-5.148-11.5-12-11.5z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-bold">Chandrakxnt</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-700/30 overflow-hidden">
        <div className="flex animate-scroll">
          {[...marketData, ...marketData].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm">
              <span className="text-gray-300 font-medium">{item.symbol}</span>
              <span className="text-white">{item.price}</span>
              <span className={`flex items-center space-x-1 ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {item.isUp ? (
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
                <span>{item.change}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default CryptoHubHeader;
