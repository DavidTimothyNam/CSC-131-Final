import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import calculatorData from "../data/calculatorData.json";

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  const fetchResults = async (searchTerm) => {
    const controller = new AbortController();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/search?search=${encodeURIComponent(searchTerm)}`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        console.log("Response not OK", res.status);
        throw new Error(`Error ${res.status}`);
      }

      const apiResults = await res.json();

      // Filter local calculator data based on searchTerm (case-insensitive)
      const localResults = searchTerm.trim() === ""
        ? []  // If the searchTerm is empty, return an empty array
        : calculatorData.filter((item) => {
          const lower = searchTerm.toLowerCase();
          return (
            item.title.toLowerCase().includes(lower) ||
            item.description.toLowerCase().includes(lower) ||
            (item.badges || []).some((badge) => badge.toLowerCase().includes(lower)) ||
            "calculator".includes(lower) // Check if the term matches "Calculator"
          );
        }).map((item) => ({
          ...item,
          type: "calculator",
          badges: [...(item.badges || []), "Calculator"], // Add the "Calculator" badge
        }));


      // Combine API + local results
      setResults([...apiResults, ...localResults]);
    } catch (err) {
      console.error("Search error:", err.stack);
      if (err.name !== "AbortError") {
        console.log("Fetch error:", err);
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', query);  // Debugging line
    fetchResults(query);
    navigate(`?query=${query}`);
  };

  const handleBadgeClick = (badge) => {
    setQuery(badge);
    fetchResults(badge);
    navigate(`?query=${badge}`); // Update the URL with the badge query
  };

  useEffect(() => {
    // This effect will run when the URL's query string (location.search) changes.
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get('query') || ''; // Get the query from the URL

    // Fetch search results or update state based on the query
    fetchResults(queryParam);
    setQuery(queryParam);
  }, [location.search]);

  return (
    <Layout>
      <div
        className="container d-flex flex-column"
        style={{
          minHeight: "90vh",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {/* Search bar at the top */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* Content area */}
        <div className="row gy-4"> {/* Add the row container for the grid */}
          {results.map((article) => (
            <div key={`${article.id}-${article.type || "api"}`} className="col-md-6 mb-1">
              <div className="card shadow-sm" style={{ maxHeight: "150px" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {article.type === "blog" ? (
                      <Link to={`/blog/${article.link}`} className="text-decoration-none">
                        {article.title}
                      </Link>
                    ) : article.type === "marketplace" ? (
                      // EDIT HERE TO FIX MARKETPLACE REDIRECTS
                      <Link to={`/marketplace/${article.slug}`} className="text-decoration-none">
                        {article.title}
                      </Link>
                    ) : article.type === "calculator" ? (
                      <span
                        role="button"
                        className="text-decoration-none text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/calculators", { state: { initialSelection: article.id } })}
                      >
                        {article.title}
                      </span>
                    ) : (
                      <span>{article.title}</span>
                    )}
                  </h5>

                  {/* Badges */}
                  <div className="mb-2">
                    {(article.badges || []).map((badge, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary me-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBadgeClick(badge)}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  {article.description && (
                    <p className="card-text">{article.description}</p>
                  )}
                  {article.excerpt && article.type !== "calculator" && (
                    <p className="card-text">{article.excerpt}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
