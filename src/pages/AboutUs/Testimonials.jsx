import React from "react";
import PageNavbar from "../../components/Navbar";
// import TestimonialCard from "../../components/Testimonials/TestimonialCard";
import TestimonialsSection from "../../components/Testimonials/TestimonialsSection";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

const Testimonials = () => {
  return (
    <>
      <PageNavbar />
      <Container className="my-5">
        <h1 className="text-center mb-4">Testimonials</h1>
        {/* <h1>Testimonials</h1> */}
        {/* <TestimonialCard
        image="/images/clientPlaceholders/client1.jpg"
        testimony="Working with Ron Smithey's Financial Services has been a game-changer for my business. Their expert advice helped me reduce expenses and increase my revenue by 20% in just six months!"
        name="Sarah W."
      />
      <TestimonialCard
        image="/images/clientPlaceholders/client2.jpg"
        testimony="Ron Smithey’s team is incredibly knowledgeable and patient. They took the time to explain all my options and created a strategy tailored to my goals."
        name="Alex B."
      />
      <TestimonialCard
        image="/images/clientPlaceholders/client3.jpg"
        testimony="I was overwhelmed with managing my retirement funds, but Ron Smithey and his team provided a clear plan that gave me confidence and peace of mind. Now, I know my future is secure."
        name="Jessica M."
      /> */}
        <TestimonialsSection />
      </Container>
      <Footer />
    </>
  );
};

export default Testimonials;
