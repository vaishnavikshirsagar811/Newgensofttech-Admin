

import React, { useState, useEffect } from "react";
import { Input, Button, Select, Card } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import './portfolioForm.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const { Option } = Select;

const PortfolioForm = ({ selectedPortfolio, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]); // kept for internal use if needed later
  const [fileNames, setFileNames] = useState([]); // display only names
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    location: "",   // ✅ added location
    description: "",
    category: "",
    published: true,
    images: [], // multiple files
    originalImageName: "",
  });
  // helper to infer a name from a URL if originalName is missing
const extractNameFromUrl = (url) => {
  try {
    const parts = url.split("/");
    const last = parts[parts.length - 1].split("?")[0];
    return decodeURIComponent(last);
  } catch {
    return "";
  }
};

useEffect(() => {
  if (selectedPortfolio) {
    setFormData({
      title: selectedPortfolio.title || "",
       location: selectedPortfolio.location || "",   // ✅ added
      description: selectedPortfolio.description || "",
      category: selectedPortfolio.category || "",
      published: selectedPortfolio.published ?? true,
      images: [], // new selection resets previous files
      originalImageName: selectedPortfolio.originalImageName || "",
    });

    const existingPreviews = [];
    const existingNames = [];

    if (selectedPortfolio.images && selectedPortfolio.images.length > 0) {
      selectedPortfolio.images.forEach((img) => {
        if (img.url) existingPreviews.push(img.url);
        existingNames.push(img.originalName || extractNameFromUrl(img.url));
      });
    } else if (selectedPortfolio.image) {
      existingPreviews.push(selectedPortfolio.image);
      if (selectedPortfolio.originalImageName) {
        existingNames.push(selectedPortfolio.originalImageName);
      } else {
        existingNames.push(extractNameFromUrl(selectedPortfolio.image));
      }
    }

    setPreviews(existingPreviews);
    setFileNames(existingNames);
  }
}, [selectedPortfolio]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const selectedFiles = Array.from(files);
      // size validation: each under 5MB
      const tooBig = selectedFiles.find((f) => f.size > 5 * 1024 * 1024);
      if (tooBig) {
        setFormErrors((prev) => ({ ...prev, image: "image must be less than 5MB" }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, image: null }));
      }

      setFormData((prev) => ({ ...prev, images: selectedFiles }));
      setFileNames(selectedFiles.map((f) => f.name));

      const previewUrls = selectedFiles.map((f) => URL.createObjectURL(f));
      setPreviews(previewUrls);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      (formData.images.length === 0 && !selectedPortfolio)
    ) {
      toast.error("Please fill all required fields and upload at least one image.");
      return;
    }

    try {
      setLoading(true);
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("location", formData.location);   // ✅ added
      sendData.append("description", formData.description);
      sendData.append("category", formData.category);
      sendData.append("published", formData.published);

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          sendData.append("images", file); // matches parser.array("images")
        });
        sendData.append("originalImageName", formData.images[0].name);
      } else if (selectedPortfolio) {
        sendData.append("originalImageName", selectedPortfolio.originalImageName || "");
      }

      if (selectedPortfolio) {
        await axios.put(`${API_URL}/api/portfolio/${selectedPortfolio._id}`, sendData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Portfolio updated successfully");
      } else {
        await axios.post(`${API_URL}/api/portfolio`, sendData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Portfolio created successfully");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("❌ Failed to save portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sector-form-wrapper" style={{boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"}}>
      <Card className="sector-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              title<span className="required-star">*</span>
            </label>
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
          </div>

         <div className="form-group">
            <label>
              Location<span className="required-star">*</span>
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>



          <div className="form-group">
            <label>
              Category <span className="required-star">*</span>
            </label>
            <Select
              placeholder="Select category"
              value={formData.category}
              onChange={handleCategoryChange}
              style={{ width: "100%" }}
              suffixIcon={null}
            >
              <Option value="Show All">Show All</Option>
            </Select>
            <i
              className="bi bi-caret-down-fill position-absolute"
              style={{
                right: "10px",
                top: "80%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#666",
                fontSize: "14px",
                zIndex: 1,
              }}
            ></i>
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label>Published</label>
            <Select
              value={formData.published ? "Yes" : "No"}
              onChange={(value) => setFormData((prev) => ({ ...prev, published: value === "Yes" }))}
              style={{ width: "100%" }}
              suffixIcon={null}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
            <i
              className="bi bi-caret-down-fill"
              style={{
                position: "absolute",
                right: "11px",
                top: "73%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#666",
                fontSize: "14px",
                zIndex: 1,
              }}
            ></i>
          </div>
            
          {/* File input with wider box showing names only */}
          <div className="form-group">
            <label>
             Upload Image <span className="required-star">*</span>
            </label>
            <div style={{ position: "relative", maxWidth: "940px" }}>
              {/* Visual box showing the names */}
              <div
                onClick={() => document.getElementById("portfolio-multi-image").click()}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  paddingLeft:'5px',
                  cursor: "pointer",
                  minHeight: 35,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  flexWrap: "wrap",
                }}
              >
                {fileNames && fileNames.length > 0 ? (
                  fileNames.map((name, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#f0f0f0",
                        padding: "2px 3px",
                        borderRadius: 4,
                        fontSize: "14px",
                        marginRight: 4,
                        marginBottom: 4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 220,
                      }}
                    >
                      {name} ,
                    </div>
                  ))
                ) : (
                  <div style={{ color: "#666" }}>Choose images</div>
                )}
              </div>
              <input
                id="portfolio-multi-image"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                style={{
                  position: "absolute",
                  opacity: 0,
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
            {formErrors.image && <small style={{ color: "red" }}>{formErrors.image}</small>}
          </div>

          {/* Note: thumbnails are intentionally not displayed per requirement */}

          <div className="form-buttons" style={{ display: "flex", gap: "10px" }}>
            <Button
              htmlType="submit"
              className="submit-btn"
              style={{  background: "linear-gradient(90deg, #28235c, #a31d28)" , color: "#fff", border: "none", height: "35px" }}
              disabled={loading}
            >
              {selectedPortfolio ? "Update" : "Submit"}
            </Button>
            <Button
              onClick={onCancel}
              style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", height: "35px" }}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PortfolioForm;
