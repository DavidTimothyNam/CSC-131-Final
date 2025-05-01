import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout.jsx";
import articles from "../../../data/marketplaceArticles.json";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  return (
    <Layout>
      <div className="container">
        {article ? (
          <>
            <h1 className="bold">{article.title}</h1>
            <p>{article.content}</p>
          </>
        ) : (
          <h2>Article not found.</h2>
        )}
      </div>
    </Layout>
  );
};

export default ArticlePage;
