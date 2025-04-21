import React, { useState } from "react";
import Layout from "../../components/Layout";
import BlogHeroCard from "../../components/PageBlog/BlogHeroCard";
import BlogSection from "../../components/BlogSection";
import blogData from "../../data/blogData.json";

const Blog = () => {
  const [showAll, setShowAll] = useState(false);

  const heroPost = blogData[0];
  const remainingPosts = blogData.slice(1); // everything after hero

  const visiblePosts = showAll ? remainingPosts : remainingPosts.slice(0, 3); // 3 cards by default

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
