import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";

function SearchPage() {
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController(); // for cleanup
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_API_BASE}/api/search?search=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          console.error("Response not OK", res.status);
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchData, 300); // debounce input

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort(); // cancel previous request
    };
  }, [query]);

  return (
    <Layout>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "90vh" }}
      >
        {/* Search bar at the top */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Content area */}
        <div className="row gy-1">
          {results.map((article) => (
            <div
              key={article.id}
              className="col-md-6 mb-1"
              style={{ maxHeight: "150px" }}
            >
              <div className="card shadow-sm" style={{ maxHeight: "150px" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link
                      to={`/blog/${article.link}`}
                      className="text-decoration-none"
                    >
                      {article.title}
                    </Link>
                  </h5>
                  <div className="mb-2">
                    {article.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary me-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => setQuery(badge)}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p
                    className="card-text"
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {results.length === 0 && query && (
            <div className="col-12 text-muted">No results found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
