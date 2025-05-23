import React, { useState } from "react";
import Layout from "../components/Layout";

const Contact = () => {
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

    const [submitStatus, setSubmitStatus] = useState(""); // "", "success", "error"

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

        if (key === "comment") setCharCount(value.length);

        setFormData((prev) => ({ ...prev, [key]: value }));

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

    const handleSubmit = (e) => {
        e.preventDefault();
        checkBoxes();
        const isValid = Object.values(inputValidation).every(
            (status) => status === "is-valid"
        );
        if (!isValid) {
            alert("Please fill out all fields correctly.");
        } else {
            sendToBackend();
        }
    };

    const sendToBackend = async () => {
        const data = {
            name: formData.name,
            email: formData.email,
            topic: formData.topic,
            comment: formData.comment,
        };

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE}/api/contact`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            const result = await res.json();

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", topic: "", comment: "" });
                setInputValidation({
                    name: "",
                    email: "",
                    topic: "",
                    comment: "",
                });
                setCharCount(0);
            } else {
                setSubmitStatus("error");
                console.error(result.message);
            }
        } catch (error) {
            setSubmitStatus("error");
            console.error(error);
        }
    };

    return (
        <Layout>
            <div
                className="container mt-5"
                style={{ width: "60%", marginBottom: "50px" }}
            >
                <h1 style={{ marginTop: "75px" }}>Contact Us</h1>
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
                        <label htmlFor="floatingInputName">
                            First and Last Name
                        </label>
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
                        <label htmlFor="floatingInputEmail">
                            Email Address
                        </label>
                    </div>

                    <div className="form-floating mb-3">
                        <select
                            id="floatingSelectTopic"
                            className={`form-select ${inputValidation.topic}`}
                            value={formData.topic}
                            onChange={handleChange}
                        >
                            <option value="Select An Option">
                                Select An Option
                            </option>
                            <option value="401k">401k</option>
                            <option value="College Plan">College Plan</option>
                            <option value="Comprehensive Planning">
                                Comprehensive Planning
                            </option>
                            <option value="Disability Insurance">
                                Disability Insurance
                            </option>
                            <option value="Health Insurance">
                                Health Insurance
                            </option>
                            <option value="Life Insurance Review">
                                Life Insurance Review
                            </option>
                            <option value="Long Term Care">
                                Long Term Care
                            </option>
                            <option value="Retirement Planning">
                                Retirement Planning
                            </option>
                            <option value="Roth IRA">Roth IRA</option>
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

                    <div className="submitButton mb-3">
                        <input
                            type="button"
                            value="Send Now"
                            className="btn btn-success"
                            onClick={handleSubmit}
                        />
                    </div>

                    {submitStatus === "success" && (
                        <div className="alert alert-success" role="alert">
                            Message sent successfully!
                        </div>
                    )}
                    {submitStatus === "error" && (
                        <div className="alert alert-danger" role="alert">
                            Something went wrong. Please try again later.
                        </div>
                    )}
                </form>
            </div>
        </Layout>
    );
};

export default Contact;
