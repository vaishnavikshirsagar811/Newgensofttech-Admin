import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../banners/BannerList.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const BannerForm = ({ selectedBanner, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    heroTitle: "",
    banners: [], // new files
    existingBanners: [], // existing banner objects { imageUrl, publicId }
  });

  const [errors, setErrors] = useState({});

  // Load selected banner for editing
  useEffect(() => {
    if (selectedBanner) {
      setForm({
        heroTitle: selectedBanner.heroTitle || "",
        banners: [],
        existingBanners: selectedBanner.banners || [],
      });
    }
  }, [selectedBanner]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const validFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5242880) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Each image must be less than 5MB",
          }));
          continue;
        }
        validFiles.push(file);
      }
      setForm((prev) => ({ ...prev, [name]: validFiles }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Remove existing banner
  const removeExistingBanner = (index) => {
    setForm((prev) => {
      const updated = [...prev.existingBanners];
      updated.splice(index, 1);
      return { ...prev, existingBanners: updated };
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.heroTitle.trim()) {
      setErrors({ heroTitle: "Title is required" });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("heroTitle", form.heroTitle);

    // Add new banners
    if (form.banners.length > 0) {
      form.banners.forEach((file) => data.append("banners", file));
    }

    // Keep existing banners
    if (form.existingBanners.length > 0) {
      data.append("existingBanners", JSON.stringify(form.existingBanners));
    }

    try {
      if (selectedBanner) {
        await axios.put(`${API_URL}/api/v1/banners/${selectedBanner._id}`, data);
        toast.success("✅ Banner updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/v1/banners`, data);
        toast.success("✅ Banner created successfully!");
      }

      onSuccess?.();
      setForm({ heroTitle: "", banners: [], existingBanners: [] });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save banner");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ heroTitle: "", banners: [], existingBanners: [] });
    setErrors({});
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-3 rounded bg-white shadow"
      style={{ width: "950px", maxWidth: "100%", marginLeft: "80px" }}
    >
      <div className="mb-2">
        <label>
          Hero Title <span className="text-danger">*</span>
        </label>
        <input
          name="heroTitle"
          className="form-control"
          value={form.heroTitle}
          onChange={handleChange}
        />
        {errors.heroTitle && <small className="text-danger">{errors.heroTitle}</small>}
      </div>

      <div className="mb-2">
        <label>Upload Banners</label>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            id="banner-file-input"
            type="file"
            name="banners"
            accept="image/*"
            multiple
            onChange={handleChange}
            style={{
              position: "relative",
              zIndex: 2,
              opacity: 0,
              width: "100%",
              height: "38px",
              cursor: "pointer",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "38px",
              lineHeight: "38px",
              padding: "0 12px",
              width: "100%",
              border: "1px solid #ced4da",
              borderRadius: "0.375rem",
              background: "#fff",
              pointerEvents: "none",
              color: "#495057",
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {form.banners.length > 0
              ? form.banners.map((f) => f.name).join(" , ")
              : form.existingBanners.length > 0
              ? form.existingBanners.map((b) => b.imageUrl.split("/").pop()).join(" , ")
              : "Choose Files"}
          </span>
        </div>

        {/* Show existing images with remove option */}
        {form.existingBanners.length > 0 && (
          <div className="mt-2 d-flex flex-wrap gap-2">
            {form.existingBanners.map((b, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={b.imageUrl}
                  alt="Banner"
                  style={{ width: 60, height: 50, objectFit: "cover", border: "1px solid #ccc", borderRadius: 4 }}
                />
                <button
                  type="button"
                  onClick={() => removeExistingBanner(idx)}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    borderRadius: "50%",
                    border: "none",
                    background: "red",
                    color: "#fff",
                    width: 20,
                    height: 20,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn d-flex align-items-center justify-content-center"
          style={{
            height: "39px",
            width: "100px",
            background: "linear-gradient(90deg, #28235c, #a31d28)",
            color: "#fff",
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submit
            </>
          ) : selectedBanner ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>

        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
