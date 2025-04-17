// src/pages/Resources/BlogPost.jsx
import { useParams } from "react-router-dom";
import blogPosts from "./data/blogData.json";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.link === slug);

  if (!post) {
    return <h2 className="text-center text-xl mt-10">Post not found</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <img src={post.image} alt={post.title} className="w-full rounded mb-6" />
      <p className="text-lg">{post.excerpt}</p>
      {/* Add post.content later if you include full blog content */}
    </div>
  );
};

export default BlogPost;
