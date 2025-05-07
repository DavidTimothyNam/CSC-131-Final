import React from "react";
import BlogCard from "./BlogCard";
import { Container, Row, Col, Button } from "react-bootstrap";

const BlogSection = ({ posts = [], showAll, onToggle }) => {
  return (
    <Container className="gy-4">
      <Row className="g-4 align-items-stretch">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((blog) => (
            <Col key={blog.id} md={6} lg={4}>
              <BlogCard
                image={blog.image}
                badges={blog.badges || []}
                date={blog.date}
                title={blog.title}
                excerpt={blog.excerpt}
                link={`/blog/${blog.link}`}
              />
            </Col>
          ))
        ) : (
          <p className="text-center">No blog posts to show.</p>
        )}
      </Row>

      <div className="text-center mt-4">
        <Button size="md" onClick={onToggle} style={{ marginBottom: "50px" }}>
          {showAll ? "Show Less" : "View All Posts"}
        </Button>
      </div>
    </Container>
  );
};

export default BlogSection;
