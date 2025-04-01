import React from "react";
import BlogCard from "./BlogCard"; // Import BlogCard component
import blogData from "../data/blogData.json"; // Import blog JSON data
import { Container, Row, Col } from "react-bootstrap"; // Bootstrap grid

const BlogList = () => {
  return (
    <Container className="mt-4">
      <Row className="gy-4">
        {blogData.map((blog) => (
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
    </Container>
  );
};

export default BlogList;
