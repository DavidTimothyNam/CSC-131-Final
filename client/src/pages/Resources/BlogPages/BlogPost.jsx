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

  // Convert content to array if it's a string
  const contentArray = Array.isArray(post.content)
    ? post.content
    : post.content
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

  return (
    <Layout>
      <Row style={{margin:"100px", marginTop:"50px", marginBottom:"20px"}}>
        {/* Main Blog Content */}
        <Col lg={8}>
          <h1 className="mb-3">{post.title}</h1>

          <p className="text-muted mb-3">
            By {post.author} on {formatReadableDate(post.date)}
          </p>

          <img src={post.image} alt={post.title} style={imageStyle} />

          {/* Badges */}
          {Array.isArray(post.badges) && (
            <div className="mb-4">
              {post.badges.map((badge, i) => (
                <Badge key={i} bg="secondary" className="me-2">
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div className="lead">
            {contentArray.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          <div className="p-3 mb-4" id="backgroundDark">
            <h5 className="bold">About This Blog</h5>
            <p className="mb-0">
              This blog offers expert insights into the world of finance.
            </p>
          </div>

          <div className="p-3 rounded" id="backgroundPrimary">
            <h5 className="mb-3 text-center">Recent Posts</h5>
            <div className="">
            {groupRecentPosts(blogPosts, slug)}
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

// ✅ Format MM/DD/YYYY as Month Day, Year
function formatReadableDate(mmddyyyy) {
  if (!mmddyyyy) return "";
  const [month, day, year] = mmddyyyy.split("/").map((v) => parseInt(v, 10));
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ✅ Group recent posts by Month + Year (based on MM/DD/YYYY)
function groupRecentPosts(posts, currentSlug) {
  const grouped = {};

  posts.forEach((post) => {
    if (post.link === currentSlug) return; // Skip current post

    const [month, day, year] = post.date.split("/");
    const key = new Date(year, parseInt(month) - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

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
