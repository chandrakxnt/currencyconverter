import { useEffect, useState } from "react";

function CryptoNews() {
  const [news, setNews] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);

  const fallbackNews = [
    "Bitcoin reaches new all-time high amid institutional adoption",
    "Ethereum 2.0 staking rewards show promising returns",
    "Major banks announce crypto custody services",
    "DeFi protocols see record TVL growth",
    "Regulatory clarity boosts crypto market confidence"
  ];

  useEffect(() => {
    const fetchNews = async () => {
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;

      if (lastFetch && (now - lastFetch) < tenMinutes) return;

      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=crypto&apiKey=c2801562c3af409985945d892b6efa15&pageSize=8&sortBy=publishedAt`
        );
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          const titles = data.articles.map(article => article.title);
          setNews(titles);
          setLastFetch(now);
          sessionStorage.setItem('cryptoNews', JSON.stringify(titles));
          sessionStorage.setItem('cryptoNewsTime', now.toString());
        }
      } catch (err) {
        const cached = sessionStorage.getItem('cryptoNews');
        if (cached) setNews(JSON.parse(cached));
      }
    };

    const cached = sessionStorage.getItem('cryptoNews');
    const cachedTime = sessionStorage.getItem('cryptoNewsTime');

    if (cached && cachedTime) {
      const age = Date.now() - parseInt(cachedTime);
      const tenMinutes = 10 * 60 * 1000;

      if (age < tenMinutes) {
        setNews(JSON.parse(cached));
        setLastFetch(parseInt(cachedTime));
        return;
      }
    }

    fetchNews();
  }, [lastFetch]);

  const displayNews = news.length > 0 ? news : fallbackNews;
  const scrollingText = displayNews.join(" 🚀 ");

  return (
    <div className="p-4 sm:p-5 bg-gray-800/90 rounded-lg w-full mt-4 sm:mt-6 mx-auto overflow-hidden">
      <h2 className="text-base sm:text-lg font-bold mb-3 text-white flex items-center">
        Latest Crypto News
        {news.length > 0 && (
          <span className="text-xs text-green-400 ml-2">● LIVE</span>
        )}
      </h2>
      <div className="relative overflow-hidden whitespace-nowrap text-sm sm:text-base">
        <div className="inline-block text-blue-300 animate-scroll-infinite">
          <span className="inline-block pr-8">{scrollingText}</span>
          <span className="inline-block pr-8">{scrollingText}</span>
          <span className="inline-block pr-8">{scrollingText}</span>
        </div>
      </div>
    </div>
  );
}

export default CryptoNews;
