import React from "react";
import Layout from "../../components/Layout";
import ArticleCard from "../../components/ArticleCard";
import articles from "../../data/marketplaceArticles.json";

const Marketplace = () => {
  return (
    <Layout>
      <div className="container card-grid-holder">
        <h1>Marketplace</h1>
        <div className="row">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              slug={article.slug}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
