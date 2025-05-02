import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:9000";

export default function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Add full image URL to each post
        const updatedData = data.map((post) => ({
          ...post,
          image: `${API_BASE}${post.image}`, // e.g., http://localhost:9000/images/01.jpg
        }));
        setPosts(updatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog posts:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return { posts, loading };
}
