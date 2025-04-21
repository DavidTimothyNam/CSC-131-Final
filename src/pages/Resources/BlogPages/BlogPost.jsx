import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../../../data/blogData.json";
import Layout from "../../../components/Layout";
import { Row, Col, Badge } from "react-bootstrap";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.link === slug);

  if (!post) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-5">Post not found</h2>
      </Layout>
    );
  }

  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  };

  return (
    <Layout>
      <Row>
        {/* Main Blog Content */}
        <Col lg={8}>
          <h1 className="mb-3">{post.title}</h1>

          <p className="text-muted mb-3">
            By {post.author} on {post.date}
          </p>

          <img src={post.image} alt={post.title} style={imageStyle} />

          {/* Badges */}
          <div className="mb-4">
            {post.badges.map((badge, i) => (
              <Badge key={i} bg="secondary" className="me-2">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Blog Content */}
          <div className="lead">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4">
            <strong>Tags:</strong>{" "}
            {post.tags.map((tag, i) => (
              <Badge key={i} bg="light" text="dark" className="me-2">
                #{tag}
              </Badge>
            ))}
          </div>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          <div className="bg-light p-3 rounded mb-4">
            <h5>About This Blog</h5>
            <p className="mb-0">
              This blog offers expert insights into the world of finance.
            </p>
          </div>

          <div className="bg-light p-3 rounded">
            <h5 className="mb-3">Recent Posts</h5>
            {groupRecentPosts(blogPosts, slug)}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

// 🧠 Helper: Group recent posts by month and year
function groupRecentPosts(posts, currentSlug) {
  const grouped = {};

  posts.forEach((post) => {
    if (post.link === currentSlug) return; // Skip current post

    const [month, day, year] = post.date.split(" ");
    const key = `${month} ${year}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  });

  return Object.entries(grouped).map(([monthYear, groupedPosts]) => (
    <div key={monthYear} className="mb-3">
      <h6>{monthYear}</h6>
      <ul className="ps-3 mb-0">
        {groupedPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.link}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export default BlogPost;
