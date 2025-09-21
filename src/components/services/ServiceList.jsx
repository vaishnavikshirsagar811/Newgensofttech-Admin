import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ServiceList.css"; // Import CSS file
const API_URL = import.meta.env.VITE_API_BASE_URL;


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);
  

  const fetchServices = async () => {
    try {
      // const res = await axios.get("http://localhost:5012/api/service");
      
      const res = await axios.get(`${API_URL}/api/service`);
      setServices(res.data.services || []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("❌ Failed to load services");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      // await axios.delete(`http://localhost:5012/api/service/${id}`);

      await axios.delete(`${API_URL}/api/service/${id}`);
      toast.success("✅ Service deleted successfully!");
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
      toast.error("❌ Failed to delete service");
    }
  };

  return (
    <div className="service-container">
      {/* Header */}
      <div className="service-header">
        <h2>All Services</h2>
        <button
          onClick={() => navigate("/admin/services/create")}
          className="add-btn"
          style={{ backgroundColor: "#1A1640" }}
        >
          Add Service
        </button>
      </div>

      {/* Table */}
      <table className="service-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service._id}>
                <td>
                  {service.serviceImages && service.serviceImages.length > 0 ? (
                    <img
                      src={service.serviceImages[0]}
                      alt="service"
                      className="service-img"
                    />
                  ) : (
                    <span className="no-img">No Image</span>
                  )}
                </td>
                <td>{service.serviceTitle}</td>
                <td>{service.shortDescription}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/services/edit/${service._id}`)
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ServiceList;
