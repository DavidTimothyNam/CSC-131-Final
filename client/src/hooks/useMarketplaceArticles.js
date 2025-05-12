import { useState, useEffect } from "react";

const useMarketplaceArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/marketplace-articles`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  return { articles, loading };
};

export default useMarketplaceArticles;
