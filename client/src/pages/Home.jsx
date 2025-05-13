import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AboutHero from "../components/AboutHero";
import ResourceSection from "../components/ResourceSection/ResourceSection";
import ServiceSection from "../components/ServicesSection/ServicesSection";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import useBlogPosts from "../hooks/useBlogPosts";

function Home() {
  const { posts, loading } = useBlogPosts();

  const previewPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <Layout style={{padding:"0px"}}>
      <Container>
        <AboutHero />
      </Container>

      {/* 💼 Services */}
      <Container fluid className="mt-4 py-4 p-0" id="backgroundPrimary">
        <h2 className="text-center mb-4">What We Offer</h2>
        <ServiceSection />
      </Container>

      {/* 📰 Blog Preview Section */}
      <Container className="mt-4">
        <h2 className="text-center section-title mb-4">Read Our Blog</h2>
        {loading ? (
          <p className="text-center">Loading blog posts...</p>
        ) : (
          <>
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
                <Button className="btn" size="md">
                  View All Posts
                </Button>
              </Link>
            </div>
          </>
        )}
      </Container>

      {/* 📚 Resources */}
      <Container fluid className="mt-4 py-4" id="backgroundPrimary">
        <h2 className="text-center mb-4">Financial Resources</h2>
        <ResourceSection />
      </Container>
    </Layout>
  );
}

export default Home;
