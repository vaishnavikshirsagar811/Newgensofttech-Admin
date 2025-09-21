import React, { useEffect, useState } from "react";
import BannerForm from "./BannerForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/banners`);
      setBanners(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("❌ Failed to fetch banners");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`${API_URL}/api/v1/banners/${id}`);
        toast.success("✅ Banner deleted successfully!");
        fetchBanners();
      } catch (err) {
        toast.error("❌ Failed to delete banner");
        console.error(err);
      }
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedBanner(null);
    fetchBanners();
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4
          className="fw-bold mb-0"
          style={{ marginLeft: showForm ? "80px" : "0px" }}
        >
          {showForm ? (selectedBanner ? "Edit Banner" : "Add New Banner") : "All Banners"}
        </h4>

        {!showForm && (
          <button
            className="btn"
            style={{ background: "linear-gradient(90deg, #28235c, #a31d28)", color: "#fff" }}
            onClick={() => {
              setShowForm(true);
              setSelectedBanner(null);
            }}
          >
            Add Banner
          </button>
        )}
      </div>

      {showForm ? (
        <BannerForm
          selectedBanner={selectedBanner}
          onSuccess={handleSuccess}
        />
      ) : (
        <div className="table-responsive">
          <table className="table banner-table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "30%" }}>Title</th>
                <th style={{ width: "30%" }}>Image</th>
                <th style={{ width: "30%" }}>Actions</th>
              </tr>
            </thead>
           <tbody>
  {banners.length > 0 ? (
    banners.map((banner) => (
      <tr key={banner._id}>
        <td className="text-break">{banner.heroTitle}</td>
        <td>
          {banner.banners && banner.banners.length > 0 ? (
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
              {banner.banners.map((b, index) => (
                <img
                  key={index}
                  src={b.imageUrl}
                  alt={`Banner ${index + 1}`}
                  style={{ width: 60, height: 50, objectFit: "cover" }}
                />
              ))}
            </div>
          ) : (
            "No Image"
          )}
        </td>
        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => {
              setSelectedBanner(banner);
              setShowForm(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(banner._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-muted text-center py-4">
        No banners found
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default BannerList;
