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

  if (!posts || posts.length === 0) {
    return <p>No blog posts available.</p>;
  }

  // Sort posts by date descending
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const heroPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);
  const visiblePosts = showAll ? remainingPosts : remainingPosts.slice(0, 3);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Layout>
      {heroPost && heroPost.image && heroPost.title && heroPost.excerpt && heroPost.link ? (
        <BlogHeroCard
          image={heroPost.image}
          title={heroPost.title}
          excerpt={heroPost.excerpt}
          link={`/blog/${heroPost.link}`}
        />
      ) : (
        <p>Hero post is missing required data.</p>
      )}

      <BlogSection
        posts={visiblePosts}
        showAll={showAll}
        onToggle={toggleShowAll}
      />
    </Layout>
  );
};

export default Blog;
