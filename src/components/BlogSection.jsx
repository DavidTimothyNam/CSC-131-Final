import React from "react";
import BlogCard from "./BlogCard"; // Import BlogCard component
import blogData from "../data/blogData.json"; // Import blog JSON data
import { Container, Row, Col, Button } from "react-bootstrap"; // Bootstrap grid

import { Link } from "react-router-dom";

const BlogSection = ({ limit = 3 }) => {
  const displayedBlogs = blogData.slice(0, limit);

  return (
    <Container className="mt-4">
      <Row className="g-4 align-items-stretch">
        {displayedBlogs.map((blog) => (
          <Col key={blog.id} md={6} lg={4}>
            <BlogCard
              image={blog.image}
              badges={blog.badges}
              date={blog.date}
              title={blog.title}
              excerpt={blog.excerpt}
              link={`/blog/${blog.link}`}
            />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Link to="/blog">
          <Button variant="primary" size="md">
            View All Posts
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default BlogSection;
