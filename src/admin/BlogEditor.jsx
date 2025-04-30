import React, { useState, useEffect } from "react";

const BlogEditor = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error loading posts:", err);
        setPosts([]);
      });
  }, []);

  const handleEditClick = (post) => {
    setSelectedPost(post);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["badges", "tags"].includes(name)) {
      setSelectedPost({ ...selectedPost, [name]: value.split(",").map((t) => t.trim()) });
    } else if (name === "content") {
      setSelectedPost({ ...selectedPost, content: value.split("\n").map((l) => l.trim()) });
    } else {
      setSelectedPost({ ...selectedPost, [name]: value });
    }
  };

  const handleSave = () => {
    fetch(`http://localhost:9000/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prev) => prev.map((p) => (p.id === data.post.id ? data.post : p)));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      })
      .catch((err) => console.error("Save failed:", err));
  };

  const handleCreate = (e) => {
    e.preventDefault(); // ✅ prevent default button submit behavior
    const newPost = {
      title: "Untitled Post",
      excerpt: "",
      author: "",
      date: new Date().toLocaleDateString(),
      image: "",
      link: "",
      badges: [],
      tags: [],
      content: [""],
    };

    fetch("http://localhost:9000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prev) => [...prev, data.post]);
        // Do NOT open the post after creation — stay on list view
      })
      .catch((err) => console.error("Creation failed:", err));
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    fetch(`http://localhost:9000/api/posts/${selectedPost.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
        setSelectedPost(null);
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Blog Posts</h2>

      {!selectedPost && (
        <button className="btn btn-success mb-3" onClick={handleCreate} type="button">
          + New Post
        </button>
      )}

      {selectedPost ? (
        <div>
          {saveSuccess && <p className="text-success">✅ Changes saved!</p>}
          <div className="mb-3">
            <label>Title</label>
            <input name="title" className="form-control" value={selectedPost.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Excerpt</label>
            <input name="excerpt" className="form-control" value={selectedPost.excerpt} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Author</label>
            <input name="author" className="form-control" value={selectedPost.author} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Date</label>
            <input name="date" className="form-control" value={selectedPost.date} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Image Path</label>
            <input name="image" className="form-control" value={selectedPost.image} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Link Slug</label>
            <input name="link" className="form-control" value={selectedPost.link} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Badges (comma-separated)</label>
            <input
              name="badges"
              className="form-control"
              value={selectedPost.badges.join(", ")}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Tags (comma-separated)</label>
            <input
              name="tags"
              className="form-control"
              value={selectedPost.tags.join(", ")}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Content (one paragraph per line)</label>
            <textarea
              name="content"
              className="form-control"
              rows={6}
              value={selectedPost.content.join("\n")}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setSelectedPost(null)}>Back</button>
            <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{post.title}</span>
              <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(post)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogEditor;
