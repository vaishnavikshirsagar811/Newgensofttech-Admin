
import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import api from "../../api/api";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import '../../components/blogs/Blogform.css'

const BlogForm = ({ selectedBlog, onSuccess }) => {
  const editor = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    author: "",
    category: "",
    mainimage: null,
    mainimageOriginalName: selectedBlog?.mainimageOriginalName || "",
    additionalImages: [],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [errors, setErrors] = useState({});
  const CATEGORIES = ["Residential", "Commercial", "Industrial", "General"];

  useEffect(() => {
    if (selectedBlog) {
      setForm({
        title: selectedBlog.title || "",
        description: selectedBlog.description || "",
        shortDescription: selectedBlog.shortDescription || "",
        author: selectedBlog.author || "",
        category: selectedBlog.category || "",
        mainimage: null,
        additionalImages: [],
        seoTitle: selectedBlog.seo?.title || "",
        seoDescription: selectedBlog.seo?.description || "",
        seoKeywords: selectedBlog.seo?.keywords?.join(", ") || "",
        mainimageOriginalName: selectedBlog.mainimageOriginalName || "", // ✅ this line was missing
      });
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files && files.length > 0) {
    const file = files[0];

    if (file.size > 10485760) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Image must be less than 10MB",
      }));
      setForm((prev) => ({ ...prev, [name]: null }));
      return;
    }

    // Clear error and set image
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((prev) => ({ ...prev, [name]: file }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
         
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";

    // Validate that description contains actual text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = form.description;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    if (!plainText.trim()) newErrors.description = "Description is required";

    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("❌ Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("shortDescription", form.shortDescription || "");
    data.append("author", form.author);
    data.append("category", form.category);
    data.append("seoTitle", form.seoTitle);
    data.append("seoDescription", form.seoDescription);
    data.append("seoKeywords", form.seoKeywords);

    if (form.mainimage) data.append("mainimage", form.mainimage);
    if (form.additionalImages.length > 0) {
      form.additionalImages.forEach((file) => {
        data.append("additionalImages", file);
      });
    }

    try {
      if (selectedBlog) {
        // await api.put(`/blogs/${selectedBlog._id}`, data);
        await axios.put(`${API_URL}/api/blogs/${selectedBlog._id}`, data);
        toast.success("✅ Blog updated successfully!");
      } else {
        // await api.post("/blogs", data);
        await axios.post(`${API_URL}/api/blogs`, data);  
        toast.success("✅ Blog created successfully!");
      }
      onSuccess();
    } catch (err) {
      console.error("Blog save error →", err?.response?.data || err);
      toast.error("❌ Failed to save blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm mb-4">
      <h5 className="mb-3">{selectedBlog ? "" : ""}</h5>

      <div className="mb-2">
        <label>
          Title <span className="text-danger">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}
      </div>
      
      <div className="mb-2">
        <label>Short Description</label>
        <textarea
          name="shortDescription"
          rows={2}
          value={form.shortDescription}
          onChange={handleChange}
          className="form-control"
        ></textarea>
      </div>

      <div className="mb-2">
        <label>
          Description <span className="text-danger">*</span>
        </label>
        <JoditEditor
          ref={editor}
          value={form.description}
          onChange={(newContent) =>
            setForm((prev) => ({ ...prev, description: newContent }))
          }
        />
        {errors.description && <small className="text-danger">{errors.description}</small>}
      </div>


      <div className="mb-2">
        <label>
          Author <span className="text-danger">*</span>
        </label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="form-control"
        />
        {errors.author && <small className="text-danger">{errors.author}</small>}
      </div>

      <div className="mb-2 position-relative">
  <label>
    Category <span className="text-danger">*</span>
  </label>
  <div className="position-relative">
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="form-control pe-5" // More padding on right for icon space
    >
      <option value="">-- Select category --</option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Centered dropdown icon */}
    <i
      className="bi bi-caret-down-fill position-absolute"
      style={{
        right: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        fontSize: "14px",
        color: "#666",
      }}
    ></i>
  </div>
  {errors.category && <small className="text-danger">{errors.category}</small>}
</div>

      {/* <div className="mb-2">
        <label>Main Image</label>
        <input
          type="file"
          name="mainimage"
          accept="image/*"
          onChange={handleChange}
          className="form-control"
        />
      </div> */}


{/* <div className="mb-2">
  <label>Main Image</label>
  <div className="custom-file-input-wrapper">
    <input
      id="blog-file-input"
      type="file"
      name="mainimage"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleChange}
    />
    <label htmlFor="blog-file-input" className="custom-file-input-label">
      {form.mainimage?.name || form.mainimageOriginalName || "Choose file"}
    </label>
  </div>
</div> */}


<div className="mb-2">
  <label>
    Image <span className="text-danger"></span>
  </label>

  <div className="position-relative">
    <input
      type="text"
      className="form-control"
      value={
        form.mainimage?.name || form.mainimageOriginalName || "Choose File"
      }
      readOnly
      onClick={() =>
        document.getElementById("mainimage-file-input").click()
      }
      style={{ cursor: "pointer", backgroundColor: "#fff" }}
    />

    <input
      id="mainimage-file-input"
      type="file"
      name="mainimage"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleChange}
    />
  </div>

  {/* Error message for image size */}
  {errors.mainimage && (
    <div className="text-danger mt-1" style={{ fontSize: "0.9em" }}>
      {errors.mainimage}
    </div>
  )}
</div>


      {/* <div className="mb-2">
        <label>Additional Images</label> 
        <input
          type="file"
          name="additionalImages"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="form-control"
        />
      </div> */}

      {/* <div className="mb-2">
        <label>SEO Title</label>
        <input
          name="seoTitle"
          value={form.seoTitle}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>SEO Description</label>
        <textarea
          name="seoDescription"
          value={form.seoDescription}
          onChange={handleChange}
          rows={2}
          className="form-control"
        ></textarea>
      </div>

      <div className="mb-3">
        <label>SEO Keywords (comma separated)</label>
        <input
          name="seoKeywords"
          value={form.seoKeywords}
          onChange={handleChange}
          className="form-control"
        />
      </div> */}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success"style={{height:"39px", backgroundColor: "#1A1640" }}>
          {selectedBlog ? "update" : "Submit"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onSuccess}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
