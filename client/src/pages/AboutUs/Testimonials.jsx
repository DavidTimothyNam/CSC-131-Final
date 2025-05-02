import React from "react";
import PageNavbar from "../../components/Navbar";
// import TestimonialCard from "../../components/Testimonials/TestimonialCard";
import TestimonialsSection from "../../components/Testimonials/TestimonialsSection";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import Layout from "../../components/Layout";

const Testimonials = () => {
  return (
    <>
      <Layout>
        <h1 className="text-center mb-4 bold" style={{marginTop: '75px'}}>Testimonials</h1>
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Testimonials;
