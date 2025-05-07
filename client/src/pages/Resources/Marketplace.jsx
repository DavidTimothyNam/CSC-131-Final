// Marketplace.jsx — unique layout per category with scroll highlight
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import ArticleCard from "../../components/ArticleCard";
import useMarketplaceArticles from "../../hooks/useMarketplaceArticles";
import "./Marketplace.css";

const categories = ["Flipbooks", "Videos", "Newsletter"];

const Marketplace = () => {
  const location = useLocation();
  const { articles, loading } = useMarketplaceArticles();

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          const y = section.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });

          section.classList.add("highlighted");
          setTimeout(() => section.classList.add("fade-out"), 1500);
          setTimeout(() => section.classList.remove("highlighted", "fade-out"), 5000);
        }
      }, 100); // delay to ensure layout is ready
    }
  }, [location]);

  const groupedArticles = categories.map((category) => ({
    category,
    items: articles.filter(
      (article) =>
        article.category?.toLowerCase().trim() === category.toLowerCase().trim()
    ),
  }));

  return (
    <Layout>
      <div className="container card-grid-holder" style={{ marginTop: "75px" }}>
        <h1 className="my-4 bold text-center">Marketplace</h1>

        {groupedArticles.map(({ category, items }) => {
          const isFlipbooks = category === "Flipbooks";
          const isVideos = category === "Videos";
          const isNewsletter = category === "Newsletter";

          return (
            <section
              key={category}
              id={category.toLowerCase()}
              className={`mb-5 ${category.toLowerCase()}-section`}
            >
              <h2 className="mb-3 text-center">{category}</h2>

              <div className="row">
                {items.length > 0 ? (
                  items.map((article) => (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      slug={article.slug}
                      title={article.title}
                      description={article.description}
                      variant={category}
                    />
                  ))
                ) : (
                  <p className="text-muted text-center">No items in this category.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
};

export default Marketplace;