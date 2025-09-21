import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const TestimonialForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    message: "",
    starRating: 5,
    designation: "",
    location: "",
    published: true,
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name || "",
        message: selected.message || "",
        starRating: selected.starRating || 5,
        designation: selected.designation || "",
        location: selected.location || "",
        published: selected.published ?? true,
        image: null,
      });
    }
  }, [selected]);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: name === "published" ? value === "true" : value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.message) newErrors.message = "Message is required";
    if (!form.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("❌ Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("message", form.message);
    data.append("starRating", form.starRating);
    data.append("designation", form.designation);
    data.append("location", form.location);
    data.append("published", form.published);
    if (form.image) {
      data.append("image", form.image);
    }

    try {
      if (selected) {
        // await api.put(`/testimonials/${selected._id}`, data);
        await axios.put(`${API_URL}/api/testimonials/${selected._id}`, data);
        toast.success("✅ Testimonial updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/testimonials`, data);
        toast.success("✅ Testimonial created successfully!");
      }
      onSuccess();
      setForm({
        name: "",
        message: "",
        starRating: 5,
        designation: "",
        location: "",
        published: true,
        image: null,
      });
      setErrors({});
    } catch (err) {
      console.error("❌ Error saving testimonial", err);
      toast.error("❌ Failed to save testimonial.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-white" style={{width:'950px',marginLeft:'70px',boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"}}>
      <h5>{selected ? "" :""}</h5>

      <div className="mb-2">
        <label>
          Name <span className="text-danger">*</span>
        </label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>

      <div className="mb-2">
        <label>
          Message <span className="text-danger">*</span>
        </label>
        <textarea
          name="message"
          className="form-control"
          rows="3"
          value={form.message}
          onChange={handleChange}
        />
        {errors.message && (
          <small className="text-danger">{errors.message}</small>
        )}
      </div>

      <div className="mb-2">
        <label>
          Location <span className="text-danger">*</span>
        </label>
        <input
          name="location"
          className="form-control"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && (
          <small className="text-danger">{errors.location}</small>
        )}
      </div>

      {/* <div className="mb-2">
        <label>Designation</label>
        <input
          name="designation"
          className="form-control"
          value={form.designation}
          onChange={handleChange}
        />
      </div> */}

      <div className="mb-2 position-relative">
  <label>Star Rating</label>
  <div className="position-relative">
    <select
      name="starRating"
      className="form-control pe-4"
      value={form.starRating}
      onChange={handleChange}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num} {num > 1 ? "" : ""}
        </option>
      ))}
    </select>
    <i
      className="bi bi-caret-down-fill position-absolute"
      style={{
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#666",
      }}
    ></i>
  </div>
</div>

<div className="mb-2 position-relative">
  <label htmlFor="published">Published</label>
  <select
    id="published"
    name="published"
    className="form-control pe-4"
    value={form.published}
    onChange={handleChange}
  >
    <option value={true}>Yes</option>
    <option value={false}>No</option>
  </select>
  <i
    className="bi bi-caret-down-fill position-absolute"
    style={{
      right: "10px",
      top: "65%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#666",
    }}
  ></i>
</div>

      {/* <div className="mb-3">
        <label>Image</label>
        <input
          type="file"
          name="image"
          className="form-control"
          onChange={handleChange}
          accept="image/*"
        />
      </div> */}


      <div className="d-flex gap-2 mt-3">
  <button type="submit" className="btn"style={{height:"39px",background: "linear-gradient(90deg, #28235c, #a31d28)",color:'#fff' }}>
    {selected ? "Update" : "Submit"}
  </button>
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => {
      setForm({
        name: "",
        message: "",
        starRating: 5,
        designation: "",
        location: "",
        published: true,
        image: null,
      });
      setErrors({});
      if (onSuccess) onSuccess();
    }}
  >
    Cancel
  </button>
</div>



    </form>
  );
};

export default TestimonialForm;
