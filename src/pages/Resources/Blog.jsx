import React from "react";
import PageNavbar from "../../components/Navbar";
import ContactForm from "../Contact";
import { Container } from "react-bootstrap";
import BlogHeroCard from "../../components/PageBlog/BlogHeroCard";
import BlogSection from "../../components/BlogSection";

const Blog = () => {
  return (
    <>
      <PageNavbar />
      <Container>
        <h1>Blog</h1>
        <BlogHeroCard
          image="/images/04.jpg"
          title="Blog Hero Card"
          excerpt="Lorem ipsum dolor sit amet"
          link="/"
        />
        <BlogSection />
      </Container>
    </>
  );
};

export default Blog;
