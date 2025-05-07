// ArticlePage.jsx — with recommended articles and padding
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../../components/Layout";
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

  if (!article) {
    return (
      <Layout>
        <h2 className="text-center mt-5">Article not found.</h2>
      </Layout>
    );
  }

  const recommendations = articles.filter(
    (item) => item.slug !== slug && item.category === article.category
  ).slice(0, 5);

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="mb-3 bold">{article.title}</h1>
            <div style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
              {article.content
                .split(/\r?\n/)
                .filter((p) => p.trim())
                .map((p, i) => (
                  <p key={i}>{p.trim()}</p>
                ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="p-3 rounded shadow-sm bg-light">
              <h5 className="mb-3">Recommended {article.category}</h5>
              <ul className="list-unstyled">
                {recommendations.map((rec) => (
                  <li key={rec.slug} className="mb-2">
                    <Link to={`/marketplace/${rec.slug}`} className="text-decoration-none">
                      {rec.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
