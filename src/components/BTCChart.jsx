import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BTCChart() {
  const [prices, setPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7');
  const [highLow, setHighLow] = useState({ high: 0, low: 0 });

  useEffect(() => {
    const fetchBTC = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeRange}`
        );
        const data = await res.json();
        let processedData = [];
        if (timeRange === '1') {
          processedData = data.prices.filter((_, index) => index % 4 === 0).map(([timestamp, price]) => {
            const date = new Date(timestamp);
            const time = date.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: false 
            });
            return [time, price];
          });
        } else {
          const addedDays = new Set();
          data.prices.forEach(([timestamp, price]) => {
            const dateObj = new Date(timestamp);
            const date = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
              dateObj.getMonth() + 1
            ).padStart(2, "0")}`;
            if (!addedDays.has(date)) {
              processedData.push([date, price]);
              addedDays.add(date);
            }
          });
        }
        setPrices(processedData);
        if (processedData.length > 1) {
          const latestPrice = processedData[processedData.length - 1][1];
          const previousPrice = processedData[0][1];
          const allPrices = processedData.map(p => p[1]);
          setCurrentPrice(latestPrice);
          setPriceChange(((latestPrice - previousPrice) / previousPrice) * 100);
          setHighLow({
            high: Math.max(...allPrices),
            low: Math.min(...allPrices)
          });
        }
      } catch (err) {
        console.error("Failed to fetch BTC data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBTC();
  }, [timeRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const chartData = {
    labels: prices.map((p) => p[0]),
    datasets: [
      {
        label: "BTC Price (USD)",
        data: prices.map((p) => p[1]),
        borderColor: priceChange >= 0 ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          const color = priceChange >= 0 ? "34, 197, 94" : "239, 68, 68";
          gradient.addColorStop(0, `rgba(${color}, 0.3)`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: { 
      duration: 1000, 
      easing: "easeInOutQuart",
      delay: (context) => context.dataIndex * 50
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: priceChange >= 0 ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)",
        borderWidth: 1,
        displayColors: false,
        cornerRadius: 8,
        titleFont: { size: 12 },
        bodyFont: { size: 14 },
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `${formatPrice(context.raw)}`,
        },
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { 
          color: "rgba(255,255,255,0.7)",
          font: { size: 10 }
        },
        border: { display: false }
      },
      y: { 
        grid: { 
          color: "rgba(255,255,255,0.1)",
          drawBorder: false
        },
        ticks: { 
          color: "rgba(255,255,255,0.7)",
          font: { size: 10 },
          callback: function(value) {
            return formatPrice(value);
          }
        },
        border: { display: false }
      },
    },
  };

  return (
    <div className="p-4 bg-gray-800/80 rounded-lg h-full flex flex-col border border-gray-700/50 backdrop-blur-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-white">Bitcoin</h2>
          <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">BTC</span>
        </div>
        <div className="flex bg-gray-700/50 rounded-lg p-1">
          {['1', '7', '30'].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-2 sm:px-3 py-1 rounded text-xs font-medium transition-all ${
                timeRange === days
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              {days === '1' ? '1D' : days === '7' ? '7D' : '30D'}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400 text-sm sm:text-base">Loading chart...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm sm:text-base">
            <div className="text-left">
              {currentPrice && (
                <>
                  <p className="text-white text-xl sm:text-2xl font-bold">
                    {formatPrice(currentPrice)}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-semibold flex items-center gap-1 ${
                      priceChange >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <span>{priceChange >= 0 ? "↗" : "↘"}</span>
                    {priceChange >= 0 ? "+" : ""}
                    {priceChange.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
            <div className="text-right space-y-1">
              <div className="text-xs text-gray-400">
                <span>H: </span>
                <span className="text-green-400 font-medium">{formatPrice(highLow.high)}</span>
              </div>
              <div className="text-xs text-gray-400">
                <span>L: </span>
                <span className="text-red-400 font-medium">{formatPrice(highLow.low)}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[200px] sm:min-h-0">
            <Line data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
}

export default BTCChart;
