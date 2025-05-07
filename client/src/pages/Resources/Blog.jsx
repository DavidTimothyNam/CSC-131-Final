// === Blog.jsx ===
import React, { useState } from "react";
import Layout from "../../components/Layout";
import BlogHeroCard from "../../components/PageBlog/BlogHeroCard";
import BlogSection from "../../components/BlogSection";
import useBlogPosts from "../../hooks/useBlogPosts";

const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const { posts, loading } = useBlogPosts();

  if (loading) return <p>Loading...</p>;
  if (!posts || posts.length === 0) return <p>No blog posts available.</p>;

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const heroPost = sorted[0];
  const rest = sorted.slice(1);
  const visible = showAll ? rest : rest.slice(0, 3);

  return (
    <Layout>
      {heroPost && heroPost.image && (
        <BlogHeroCard
          image={heroPost.image}
          title={heroPost.title}
          excerpt={heroPost.excerpt}
          link={`/blog/${heroPost.link}`}
        />
      )}
      <BlogSection posts={visible} showAll={showAll} onToggle={() => setShowAll((p) => !p)} />
    </Layout>
  );
};

export default Blog;