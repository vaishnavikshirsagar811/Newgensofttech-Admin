import React, { useEffect, useState } from "react";
import api from "../../api/api";
import TestimonialForm from "./TestimonialForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TestimonialList.css"; 
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;


const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTestimonials = async () => {
    try {
      // const res = await api.get("/testimonials");
      const res = await axios.get(`${API_URL}/api/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        // await api.delete(`/testimonials/${id}`);
        await axios.delete(`${API_URL}/api/testimonials/${id}`);
        toast.success("✅ Testimonial deleted successfully!");
        fetchTestimonials();
      } catch (err) {
        toast.error("❌ Failed to delete testimonial");
      }
    }
  };

  // const handleTogglePublished = async (id, currentValue) => {
  //   try {
  //     await api.put(`/testimonials/${id}`, { published: !currentValue });
  //     toast.success(`✅ Testimonial ${!currentValue ? "published" : "unpublished"}`);
  //     fetchTestimonials();
  //   } catch (err) {
  //     toast.error("❌ Failed to update publish status");
  //   }
  // };

const handleTogglePublished = async (id, currentValue) => {
  try {
    await axios.put(`${API_URL}/api/testimonials/${id}`, {
      published: !currentValue,
    });
    toast.success(
      `✅ Testimonial ${!currentValue ? "published" : "unpublished"}`
    );
    fetchTestimonials();
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    toast.error("❌ Failed to update publish status");
  }
};


  const handleSuccess = () => {
    setShowForm(false);
    setSelectedTestimonial(null);
    fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />


<div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
<h4
  className="fw-bold mb-0"
  style={{
    marginLeft: showForm ? "75px" : "0px", // apply margin only for Add/Edit
  }}
>
  {showForm
    ? selectedTestimonial
      ? "Edit Testimonial"
      : "Add New Testimonial"
    : "All Testimonials"}
</h4>


  {/* Show Add button only when not in form view */}
  {!showForm && (
    <button
      className="btn btn-success "
      style={{ background: "linear-gradient(90deg, #28235c, #a31d28)" }}
      onClick={() => {
        setSelectedTestimonial(null);
        setShowForm(true);
      }}
    >
      Add Testimonial
    </button>
  )}
</div>


      {showForm ? (
        <TestimonialForm selected={selectedTestimonial} onSuccess={handleSuccess} />
      ) : (
        <>
          {/* Desktop Table */}
        <div className="table-responsive d-none d-md-block">
  <table className="table table-bordered text-center align-middle testimonial-table">
    {/* 👇 Add this block to control column widths */}
    <colgroup>
      <col style={{ width: "15%" }} /> 
      <col style={{ width: "15%" }} /> 
      <col style={{ width: "35%" }} /> 
      <col style={{ width: "10%" }} /> 
      <col style={{ width: "10%" }} /> 
      <col style={{ width: "15%" }} /> 
    </colgroup>

    <thead className="table-light">
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>Message</th>
        <th>Rating</th>
        <th>Published</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial) => (
          <tr key={testimonial._id}>
            <td className="text-break">{testimonial.name}</td>
            <td className="text-break">{testimonial.location}</td>
            <td className="message-cell text-break">{testimonial.message}</td>
            <td>{testimonial.starRating || "N/A"}</td>
            <td>
              <input
                type="checkbox"
                checked={testimonial.published}
                onChange={() =>
                  handleTogglePublished(testimonial._id, testimonial.published)
                }
              />
            </td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  setSelectedTestimonial(testimonial);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(testimonial._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-muted py-3">
            No testimonials found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

          {/* Mobile Vertical Cards */}
          <div className="d-block d-md-none">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="border rounded p-3 mb-3 bg-white shadow-sm"
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{testimonial.name}</strong>
                    <input
                      type="checkbox"
                      checked={testimonial.published}
                      onChange={() =>
                        handleTogglePublished(testimonial._id, testimonial.published)
                      }
                    />
                  </div>
                  <div className="mb-2">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt="testimonial"
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </div>
                  <div className="mb-2 text-muted">{testimonial.location}</div>
                  <div className="mb-2">
                    <strong>Rating:</strong> {testimonial.starRating || "N/A"}
                  </div>
               <div className="d-flex flex-column align-items-start">
  <button
    className="btn btn-warning btn-sm rounded-0 rounded-top"
    style={{ width: "60px" }} // ⬅️ narrower Edit button
    onClick={() => {
      setSelectedTestimonial(testimonial);
      setShowForm(true);
    }}
  >
    Edit
  </button>
  <button
    className="btn btn-danger btn-sm rounded-0 rounded-bottom"
    style={{ width: "80px" }} // ⬅️ wider Delete button
    onClick={() => handleDelete(testimonial._id)}
  >
    Delete
  </button>
</div>



                </div>
              ))
            ) : (
              <p className="text-muted text-center py-3">No testimonials found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialList;
