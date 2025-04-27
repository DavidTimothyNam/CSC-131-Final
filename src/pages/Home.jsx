import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AboutHero from "../components/AboutHero";
import ResourceSection from "../components/ResourceSection/ResourceSection";
import ServiceSection from "../components/ServicesSection/ServicesSection";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard"; // ⬅️ Make sure the path is correct
import blogData from "../data/blogData.json";

class Home extends React.Component {
  render() {
    const previewPosts = blogData.slice(0, 3); // Only the first 3 posts

    return (
      <>
        <Layout>
          <Container>
            <AboutHero />
          </Container>
          {/* 💼 Services */}
          <Container className="mt-4" id="backgroundPrimary">
            <h2 className="text-center mb-4">What We Offer</h2>
            <ServiceSection />
          </Container>
          
          {/* 📰 Blog Preview Section */}
          <Container className="mt-4">
            <h2 className="text-center section-title">Read Our Blog</h2>
            <Row className="g-4 align-items-stretch">
              {previewPosts.map((post) => (
                <Col key={post.id} md={6} lg={4}>
                  <BlogCard
                    image={post.image}
                    badges={post.badges}
                    date={post.date}
                    title={post.title}
                    excerpt={post.excerpt}
                    link={`/blog/${post.link}`}
                  />
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Link to="/blog">
                <Button className="button1 btn" size="md">
                  View All Posts
                </Button>
              </Link>
            </div>
          </Container>

          {/* 📚 Resources */}
          <Container className="mt-4" id="backgroundPrimary">
            <h2 className="text-center mb-4">Financial Resources</h2>
            <ResourceSection />
          </Container>
        </Layout>
      </>
    );
  }
}

export default Home;
