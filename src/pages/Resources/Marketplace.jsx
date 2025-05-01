import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import ArticleCard from "../../components/ArticleCard";
import articles from "../../data/marketplaceArticles.json";

const categories = ["Flipbooks", "Videos", "Newsletter"];

const Marketplace = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        const yOffset = -100; // 👈 Adjust this offset if needed (e.g. height of navbar)
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });

        section.classList.add("highlighted");
        setTimeout(() => section.classList.remove("highlighted"), 2000);
      }
    }
  }, [location]);

  const groupedArticles = categories.map((category) => ({
    category,
    items: articles.filter((article) => article.category === category),
  }));

  return (
    <Layout>
      <div className="container card-grid-holder" style={{marginTop: '75px'}}>
        <h1 className="my-4 bold text-center">Marketplace</h1>

        {groupedArticles.map(({ category, items }) => (
          <section
            key={category}
            id={category.toLowerCase()}
            className="mb-5"
          >
            <h2 className="mb-3 text-center">{category}</h2>
            <div className="row">
              {items.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default Marketplace;
