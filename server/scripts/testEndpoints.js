// This script tests your API endpoints after PostgreSQL setup
const axios = require("axios");

const BASE = "http://localhost:9000";

async function testEndpoints() {
  try {
    console.log("📝 Creating a blog post...");
    const post = await axios.post(`${BASE}/api/posts`, {
      image: "/images/test.jpg",
      date: "2025-06-01",
      title: "API Test Post",
      excerpt: "This is a test excerpt.",
      link: "api-test-post",
      author: "Test User",
    });
    const postId = post.data.post.id;
    console.log("✅ Blog post created:", postId);

    console.log("🔎 Searching for blog post...");
    const search = await axios.get(`${BASE}/api/search?search=api`);
    console.log("✅ Search returned:", search.data.length, "result(s)");

    console.log("📬 Fetching all blog posts...");
    const allPosts = await axios.get(`${BASE}/api/posts`);
    console.log("✅ Total posts:", allPosts.data.length);

    console.log("🛒 Fetching marketplace articles...");
    const articles = await axios.get(`${BASE}/api/marketplace-articles`);
    console.log("✅ Articles loaded:", articles.data.length);

    console.log("📅 Saving events...");
    await axios.post(`${BASE}/api/events`, [
      {
        title: "Test Event",
        start: "2025-07-01T10:00:00",
        end: "2025-07-01T11:00:00",
        location: "Zoom",
        description: "API test event",
      },
    ]);
    console.log("✅ Calendar event saved.");

    console.log("📅 Fetching events...");
    const events = await axios.get(`${BASE}/api/events`);
    console.log("✅ Events loaded:", events.data.length);

    console.log("🗑 Deleting test blog post...");
    await axios.delete(`${BASE}/api/posts/${postId}`);
    console.log("✅ Post deleted.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    if (err.response?.data) console.error(err.response.data);
  }
}

testEndpoints();
