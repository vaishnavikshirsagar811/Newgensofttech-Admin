





 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "./AuthContext";
 import axios from "axios";
 import { toast, ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import shreeimage from "../../src/assets/logo/image.png";
 import Shreelogo from "../../src/assets/logo/NEWGEN-Softech-Logo.png"
const API_URL = import.meta.env.VITE_API_BASE_URL; 

  const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      login(res.data.token);
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        onClose: () => navigate("/admin/contact"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      <ToastContainer />
     <div
  className="container-fluid vh-100 d-flex align-items-center justify-content-center"
  // style={{ backgroundColor: "#f8f9fa" }}
>
  <div
    className="row w-100 shadow-lg rounded"
    style={{
      maxWidth: "780px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
      // backgroundColor: "#fbdde7",
    }}
  >
    {/* Left Section */}
    <div className="col-md-6 p-4 d-flex flex-column justify-content-start">
      <img
        src={shreeimage}
        alt="Shree Services"
        className="img-fluid rounded"
        style={{
          height: "320px",
          objectFit: "cover",
          marginBottom: "15px",
        }}
      />
      <div
        className="p-3 rounded"
        // style={{ backgroundColor: "#600030", color: "#fff", minHeight: "100px" }}
      >
        <h6 className="fw-bold " style={{ fontSize: "18px" }}>
          Welcome to <span className="fw-bold">NewgenSoftTech</span>
        </h6>
        {/* <small
          style={{
            lineHeight: "1.4",
            fontSize: "12px",
            fontWeight: 400,
            display: "block",
          }}
        >
          A cloud-based, streamlined Employee management system with a
          centralized, user-friendly interface.
        </small> */}
      </div>
    </div>

    {/* Right Section */}
    <div
      className="col-md-6 p-4 d-flex flex-column justify-content-center"
      // style={{ backgroundColor: "#fbdde7" }}
    >
      <div className="text-start mb-3">
        <div>
          <img
            src={Shreelogo}
            alt="Shree Logo"
            style={{ width: "280px", height: "auto" }}
          />
           <h4 className="mt-3 fw-bold">Login</h4>
  <p className="text-muted mb-0">Enter your credential to login to your account</p>

        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control border-danger"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              style={{ width: "320px" }}
            />
          </div>

          <div className="mb-1">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group" style={{ width: "320px" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control border-danger"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <span
                className="input-group-text bg-white border-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </span>
            </div>
          </div>

          <div
            className="d-flex justify-content-end mb-3"
            style={{ width: "320px" }}
          >
            <a
              href="#"
              className="text-decoration-none small"
              onClick={() => navigate("/forgot-password")}
            >
              Forget Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-85 text-white fw-semibold"
            style={{ backgroundColor: "#210517ff", width: "320px" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>

    {/* Footer INSIDE box */}
    {/* <div className="col-12 text-center py-3 border-top">
      <small
        className="text-muted fw-bold"
        style={{ fontSize: "13px" }}
      >
        Designed and Developed by{" "}
        <a
          href="https://deinertech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-primary"
        >
          Deinertech Software
        </a>{" "}
        | © Shree Quality Services. All rights reserved.
      </small>
    </div> */}
  </div>
</div>


    </>
  );
};

export default Login;
