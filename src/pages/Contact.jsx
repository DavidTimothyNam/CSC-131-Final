import React, { useState, useEffect } from "react";
import PageNavbar from "../components/Navbar";
import Layout from "../components/Layout";
// import './contact.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    comment: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [inputValidation, setInputValidation] = useState({
    name: "",
    email: "",
    topic: "",
    comment: "",
  });

  const getCharStyle = (count) => {
    if (count < 100) return { color: "black", fontWeight: 400 };
    if (count < 200) return { color: "#6d5555", fontWeight: 450 };
    if (count < 300) return { color: "#793535", fontWeight: 500 };
    if (count < 400) return { color: "#841c1c", fontWeight: 550 };
    if (count < 500) return { color: "#6e0003", fontWeight: 600 };
    return { color: "#5a0103", fontWeight: 650 };
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleValidation = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() !== "";
      case "email":
        return isValidEmail(value);
      case "topic":
        return value !== "" && value !== "Select An Option";
      case "comment":
        return value.trim() !== "";
      default:
        return false;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id
      .replace("floatingInput", "")
      .replace("floatingSelect", "")
      .toLowerCase();

    if (key === "comment") {
      setCharCount(value.length);
    }

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    const valid = handleValidation(key, value);
    setInputValidation((prev) => ({
      ...prev,
      [key]: valid ? "is-valid" : "is-invalid",
    }));
  };

  const checkBoxes = () => {
    const updatedValidation = {};
    for (const key in formData) {
      const valid = handleValidation(key, formData[key]);
      updatedValidation[key] = valid ? "is-valid" : "is-invalid";
    }
    setInputValidation(updatedValidation);
  };

  const handleSubmit = () => {
    checkBoxes();
    const isValid = Object.values(inputValidation).every(
      (status) => status === "is-valid"
    );
    if (!isValid) {
      alert("Please fill out all fields correctly.");
    } else {
      alert("Form submitted successfully!");
      // submit logic here
    }
  };

  return (
    <>
      <Layout>
        <div className="container mt-5" style={{ width: "60%" }}>
          <h1>Contact Us</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="floatingInputName"
                className={`form-control ${inputValidation.name}`}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="floatingInputName">First and Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                id="floatingInputEmail"
                className={`form-control ${inputValidation.email}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingInputEmail">Email Address</label>
            </div>

            <div className="form-floating mb-3">
              <select
                id="floatingSelectTopic"
                className={`form-select ${inputValidation.topic}`}
                value={formData.topic}
                onChange={handleChange}
              >
                <option value="Select An Option">Select An Option</option>
                <option value="401k">401k</option>
                <option value="College Plan">College Plan</option>
                <option value="Comprehensive Planning">
                  Comprehensive Planning
                </option>
                <option value="Disability Insurance">
                  Disability Insurance
                </option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Life Insurance Review">
                  Life Insurance Review
                </option>
                <option value="Long Term Care">Long Term Care</option>
                <option value="Retirement Planning">Retirement Planning</option>
                <option value="Roth IRA">Roth IRA</option>
                <option value="Traditional Website">Traditional Website</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="floatingSelectTopic">Topic</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                id="floatingInputComment"
                className={`form-control ${inputValidation.comment}`}
                placeholder="Leave a comment"
                maxLength="500"
                value={formData.comment}
                onChange={handleChange}
                style={{ height: "100px" }}
              />
              <label htmlFor="floatingInputComment">Comments</label>
            </div>

            <div id="the-count" className="mb-3">
              <span id="current" style={getCharStyle(charCount)}>
                {charCount}
              </span>
              <span id="maximum"> / 500</span>
            </div>

            <div className="submitButton mb-5">
              <input
                type="button"
                value="Send Now"
                className="btn btn-success"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ContactForm;
