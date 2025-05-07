// BlogEditor.jsx — FULLY UPDATED with safeguards for undefined badges/content + working image preview
import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const BlogEditor = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isExcerptManuallyEdited, setIsExcerptManuallyEdited] = useState(false);

  const allAuthors = Array.from(new Set(posts.map((p) => p.author).filter(Boolean)));
  const allBadges = Array.from(new Set(posts.flatMap((p) => p.badges || [])));

  useEffect(() => {
    fetch("http://localhost:9000/api/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  const handleEditClick = (post) => {
    setIsSlugManuallyEdited(false);
    setIsExcerptManuallyEdited(false);
    fetch(`http://localhost:9000/api/posts/${post.link}`)
      .then((res) => res.json())
      .then((fullPost) => {
        setIsSlugManuallyEdited(false);
        setIsExcerptManuallyEdited(false);
        setSelectedPost({
          ...fullPost,
          content: Array.isArray(fullPost.content) ? fullPost.content.join("\n\n") : "",
          badges: Array.isArray(fullPost.badges) ? fullPost.badges : [],
        });
      })
      .catch((err) => console.error("Failed to load full post:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const newSlug = generateSlug(value);
      setSelectedPost((prev) => ({
        ...prev,
        title: value,
        link: isSlugManuallyEdited ? prev.link : newSlug,
      }));
    } else if (name === "link") {
      setIsSlugManuallyEdited(true);
      setSelectedPost({ ...selectedPost, link: value });
    } else if (name === "excerpt") {
      setIsExcerptManuallyEdited(true);
      setSelectedPost({ ...selectedPost, excerpt: value });
    } else if (name === "content") {
      const updatedPost = { ...selectedPost, content: value };
      if (!isExcerptManuallyEdited) {
        updatedPost.excerpt = generateExcerpt(value);
      }
      setSelectedPost(updatedPost);
    } else {
      setSelectedPost({ ...selectedPost, [name]: value });
    }
  };

  const handleSave = () => {
    const postToSave = {
      ...selectedPost,
      content: selectedPost.content
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
    };

    const isNew = !posts.find((p) => p.id === postToSave.id);
    const method = isNew ? "POST" : "PUT";
    const url = isNew
      ? "http://localhost:9000/api/posts"
      : `http://localhost:9000/api/posts/${postToSave.id}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prev) => {
          if (isNew) return [...prev, data.post];
          return prev.map((p) => (p.id === data.post.id ? data.post : p));
        });
        setSelectedPost(null);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      })
      .catch((err) => console.error("Save failed:", err));
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

  const handleCreate = () => {
    setIsSlugManuallyEdited(false);
    setIsExcerptManuallyEdited(false);

    const newPost = {
      id: Date.now(),
      title: "Untitled Post",
      excerpt: "",
      author: "",
      date: new Date().toLocaleDateString("en-US"),
      image: "",
      link: "",
      badges: [],
      content: "",
    };

    setSelectedPost(newPost);
  };

  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  };

  const generateExcerpt = (text) => {
    return text.split(/\r?\n/).find((p) => p.trim())?.trim().slice(0, 160) || "";
  };

  const formatDateForInput = (mmddyyyy) => {
    if (!mmddyyyy || !mmddyyyy.includes("/")) return "";
    const [mm, dd, yyyy] = mmddyyyy.split("/");
    if (!mm || !dd || !yyyy) return "";
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  };

  const formatDateForDisplay = (yyyymmdd) => {
    const [yyyy, mm, dd] = yyyymmdd.split("-");
    return `${mm}/${dd}/${yyyy}`;
  };

  const formatReadableDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Blog Posts</h2>

      {!selectedPost && (
        <button className="btn btn-success mb-3" onClick={handleCreate}>+ New Post</button>
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
            <CreatableSelect
              isClearable
              name="author"
              value={selectedPost.author ? { value: selectedPost.author, label: selectedPost.author } : null}
              options={allAuthors.map((a) => ({ value: a, label: a }))}
              onChange={(newValue) =>
                setSelectedPost({
                  ...selectedPost,
                  author: newValue ? newValue.value : "",
                })
              }
            />
          </div>

          <div className="mb-3">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formatDateForInput(selectedPost.date)}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, date: formatDateForDisplay(e.target.value) })
              }
            />
          </div>

          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("image", file);

                try {
                  const res = await fetch("http://localhost:9000/api/upload-image", {
                    method: "POST",
                    body: formData,
                  });
                  const data = await res.json();
                  if (data.path) {
                    setSelectedPost({ ...selectedPost, image: data.path });
                  } else {
                    alert("Upload failed.");
                  }
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("Upload failed.");
                }
              }}
            />
            {selectedPost.image && (
              <div className="mt-2">
                <small>Current Image:</small>
                <img
                  src={`http://localhost:9000${selectedPost.image}`}
                  alt="preview"
                  style={{ maxHeight: "150px", display: "block" }}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label>Link Slug</label>
            <input name="link" className="form-control" value={selectedPost.link} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Badges</label>
            <CreatableSelect
              isMulti
              name="badges"
              value={(selectedPost.badges || []).map((b) => ({ value: b, label: b }))}
              options={allBadges.map((b) => ({ value: b, label: b }))}
              onChange={(newValue) =>
                setSelectedPost({
                  ...selectedPost,
                  badges: newValue.map((item) => item.value),
                })
              }
            />
          </div>

          <div className="mb-3">
            <label>Content (multi-paragraphs allowed)</label>
            <textarea
              name="content"
              className="form-control"
              rows={8}
              value={selectedPost.content}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setSelectedPost(null)}>Cancel</button>
            <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {[...posts]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((post) => (
              <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{post.title}</strong>
                  <br />
                  <small className="text-muted">{formatReadableDate(post.date)}</small>
                </span>
                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(post)}>Edit</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default BlogEditor;