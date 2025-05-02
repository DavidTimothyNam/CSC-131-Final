import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout.jsx";
import useMarketplaceArticles from "../../../hooks/useMarketplaceArticles";

const ArticlePage = () => {
  const { slug } = useParams();
  const { articles, loading } = useMarketplaceArticles();

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-5">Loading article...</p>
      </Layout>
    );
  }

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
