import React from "react";
import { Carousel, Button } from "react-bootstrap";
import BlogCard from "./BlogCard";
import blogData from "../data/blogData.json";

const BlogCarousel = () => {
  // Group blogData into chunks of 3
  const chunkedBlogs = [];
  for (let i = 0; i < blogData.length; i += 3) {
    chunkedBlogs.push(blogData.slice(i, i + 3));
  }

  return (
    <Carousel>
      {chunkedBlogs.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center gap-4">
            {group.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BlogCarousel;
