import React, { useState } from "react";
import Layout from "../../components/Layout";
import BlogHeroCard from "../../components/PageBlog/BlogHeroCard";
import BlogSection from "../../components/BlogSection";
import useBlogPosts from "../../hooks/useBlogPosts";

const Blog = () => {
  const [showAll, setShowAll] = useState(false);

  const { posts, loading } = useBlogPosts();

  if (loading) {
    return <p>Loading...</p>;
  }

  // Sort by date (most recent first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const heroPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  const visiblePosts = showAll ? remainingPosts : remainingPosts.slice(0, 3);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Layout>
      <BlogHeroCard
        image={heroPost.image}
        title={heroPost.title}
        excerpt={heroPost.excerpt}
        link={`/blog/${heroPost.link}`}
      />
      <BlogSection
        posts={visiblePosts}
        showAll={showAll}
        onToggle={toggleShowAll}
      />
    </Layout>
  );
};

export default Blog;
