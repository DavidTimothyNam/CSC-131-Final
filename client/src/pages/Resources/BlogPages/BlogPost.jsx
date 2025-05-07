// === BlogPost.jsx ===
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { Row, Col, Badge } from "react-bootstrap";
import useBlogPosts from "../../../hooks/useBlogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { posts } = useBlogPosts();

  useEffect(() => {
    fetch(`http://localhost:9000/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Layout><p className="text-center mt-5">Loading...</p></Layout>;
  if (!post) return <Layout><h2 className="text-center mt-5">Post not found</h2></Layout>;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Layout>
      <Row style={{ margin: "100px", marginTop: "50px", marginBottom: "20px" }}>
        <Col lg={8}>
          <h1 className="mb-3">{post.title}</h1>
          <p className="text-muted mb-3">By {post.author} on {formattedDate}</p>
          <img src={`http://localhost:9000${post.image}`} alt={post.title} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1.5rem" }} />
          {Array.isArray(post.badges) && post.badges.length > 0 && (
            <div className="mb-4">
              {post.badges.map((badge, i) => (
                <Badge key={i} bg="secondary" className="me-2">{badge}</Badge>
              ))}
            </div>
          )}
          <div className="lead">
            {post.content?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </Col>
        <Col lg={4}>
          <div className="p-3 mb-4" id="backgroundDark">
            <h5>About This Blog</h5>
            <p>This blog offers expert insights into the world of finance.</p>
          </div>
          <div className="p-3 rounded" id="backgroundPrimary">
            <h5 className="mb-3 text-center">Recent Posts</h5>
            <div>{groupRecentPosts(posts, slug)}</div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

function groupRecentPosts(posts, currentSlug) {
  const grouped = {};

  posts.forEach((post) => {
    if (post.link === currentSlug) return;
    const date = new Date(post.date);
    if (isNaN(date.getTime())) return;
    const key = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  });

  return Object.entries(grouped).map(([monthYear, groupedPosts]) => (
    <div key={monthYear} className="mb-3">
      <h6>{monthYear}</h6>
      <ul className="ps-3 mb-0">
        {groupedPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.link}`} className="blogSidebar">{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export default BlogPost;