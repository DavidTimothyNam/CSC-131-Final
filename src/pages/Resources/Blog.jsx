import React from "react";
import PageNavbar from "../../components/Navbar";
import ContactForm from "../Contact";
import { Container } from "react-bootstrap";
import BlogHeroCard from "../../components/PageBlog/BlogHeroCard";
import BlogSection from "../../components/BlogSection";
import Layout from "../../components/Layout";

const Blog = () => {
  return (
    <>
      <Layout>
        <h1>Blog</h1>
        <BlogHeroCard
          image="/images/04.jpg"
          title="Blog Hero Card"
          excerpt="Lorem ipsum dolor sit amet"
          link="/"
        />
        <BlogSection />
      </Layout>
    </>
  );
};

export default Blog;
