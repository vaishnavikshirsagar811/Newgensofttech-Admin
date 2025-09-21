
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoginImage from '../assets/Login.png';
// import Logo from '../assets/Logo.png'; // ✅ Import at the top

// const API_URL = import.meta.env.VITE_API_BASE_URL;

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}/api/auth/login`, form);
//       login(res.data.token);
//       toast.success("Login successfully!", {
//         position: "top-right",
//         autoClose: 1000,
//         onClose: () => navigate("/admin"),
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div
//         className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
//         style={{ backgroundColor: "white" }}
//       >
//         <div
//           className="row shadow-lg rounded-4 overflow-hidden"
//           style={{ maxWidth: "900px", width: "100%" }}
//         >
//           {/* Left Section */}
//           <div className="col-md-6 p-0">
//             <img
//   src={LoginImage}
//   alt="Solar worker"
//   className="img-fluid w-100"
//   style={{ height: '50%', objectFit: 'cover',margin:'30px',borderRadius:'10px' }}
// />
//             <div className="bg-warning text-dark p-3 text-center">
//               <h5>
//                 Welcome to <strong>Sunvolt Solar</strong> System
//               </h5>
//               <p style={{ fontSize: "14px" }}>
//                 A cloud-based, streamlined solar project management system with
//                 a centralized, user-friendly interface.
//               </p>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="col-md-6 bg-white p-4 d-flex flex-column justify-content-center">
//             <div className="text-center mb-4">
//              <img
//                  src={Logo}
//                  alt="Sunvolt Logo"
//                  style={{ width: "200px",height:'60px' }}
// />
//               <h4 className="mt-2 fw-bold">Login</h4>
//               <p className="text-muted mb-0">
//                 Enter your credential to login to your account
//               </p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control border-warning"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control border-warning"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>

//               <div className="d-flex justify-content-end mb-3">
//                 <a href="#" className="text-decoration-none small">
//                   Forget Password ?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="btn w-100 text-white"
//                 style={{ backgroundColor: "#f5a100" }}
//               >
//                 Sign in
//               </button>
//             </form>

//             <div className="text-center mt-4 text-muted small">
//               Designed and Developed by Deinertech Software | © Sunvolt Solar. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import loginimage from "../assets/loginimage.png";
// import Shreelogo from "../assets/Shreelogo.png";
// const API_URL = import.meta.env.VITE_API_BASE_URL;

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}/api/auth/login`, form);
//       login(res.data.token);
//       toast.success("Login successfully!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         onClose: () => navigate("/admin"),
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div
//   className="container-fluid vh-100 d-flex align-items-center justify-content-center"
//   style={{ backgroundColor: "#f8f9fa" }}
// >
//   <div className="row w-100 shadow-lg rounded" style={{ maxWidth: "780px" ,boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",backgroundColor:"#fbdde7"}}>
    
//     {/* Left Section */}
//     <div className="col-md-6 p-4 d-flex flex-column justify-content-start">
//       <img
//         src={loginimage}
//         alt="Solar worker"
//         className="img-fluid rounded"
//         style={{ height: "320px", objectFit: "cover", marginBottom: "15px" }}
//       />
//      <div className="p-3 rounded" style={{ backgroundColor: "#600030", color: "#fff", minHeight: "100px" }}>
//   <h6 className="fw-bold mb-3" style={{ fontSize: "18px", color: "#fff" }}>
//     Welcome to <span className="fw-bold">Shree Quality Services</span>
//   </h6>
//   <small
//     style={{
//       lineHeight: "1.4",
//       fontSize: "12px",
//       fontWeight: 400,
//       display: "block",
//       color: "#fff",
//     }}
//   >
//     A cloud-based, streamlined Employee management system with a centralized, user-friendly interface.
//   </small>
// </div>

//     </div>

//     {/* Right Section */}
//     <div className="col-md-6 p-4 d-flex flex-column justify-content-center" style={{ backgroundColor: "#fbdde7" }}>
//       <div className="text-start mb-3">
//  <div style={{ textAlign: "" }}>
//   <img 
//     src={Shreelogo} 
//     alt="Shree Logo" 
//     style={{ width: "280px", height: "auto" }} 
//   />
// </div>

//   <h4 className="mt-3 fw-bold">Login</h4>
//   <p className="text-muted mb-0">Enter your credential to login to your account</p>
// </div>


//    <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//   <label className="form-label fw-semibold">Email</label>
//   <input
//     type="email"
//     name="email"
//     className="form-control border-danger"
//     value={form.email}
//     onChange={handleChange}
//     placeholder="Enter email"
//     required
//     style={{ width: "320px" }}
//   />
// </div>

// <div className="mb-1">
//   <label className="form-label fw-semibold">Password</label>
//   <div className="input-group" style={{ width: "320px" }}>
//     <input
//       type={showPassword ? "text" : "password"}
//       name="password"
//       className="form-control border-danger"
//       value={form.password}
//       onChange={handleChange}
//       placeholder="Enter password"
//       required
//     />
//     <span
//       className="input-group-text bg-white border-danger"
//       style={{ cursor: "pointer" }}
//       onClick={() => setShowPassword(!showPassword)}
//     >
//       <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
//     </span>
//   </div>
// </div>

//         <div className="d-flex justify-content-end mb-3" style={{ width: "320px" }}>
//            <a
//                href="#"
//                className="text-decoration-none small"
//                onClick={() => navigate("/forgot-password")}
//            >
//            Forget Password?
//          </a>

//         </div>

//         <button
//           type="submit"
//           className="btn w-85 text-white fw-semibold"
//           style={{  backgroundColor: "#600030",width:"320px" }}
//         >
//           {/* Left Section */}
//           <div className="col-md-6 p-4 d-flex flex-column justify-content-start">
//             <img
//               src={loginimage}
//               alt="Shree Services"
//               className="img-fluid rounded"
//               style={{ height: "320px", objectFit: "cover", marginBottom: "15px" }}
//             />
//             <div
//               className="p-3 rounded"
//               style={{ backgroundColor: "#7b1f5a", color: "#fff", minHeight: "100px" }}
//             >
//               <h6 className="fw-bold mb-3" style={{ fontSize: "18px", color: "#fff" }}>
//                 Welcome to <span className="fw-bold">Shree Quality Services</span>
//               </h6>
//               <small
//                 style={{
//                   lineHeight: "1.4",
//                   fontSize: "12px",
//                   fontWeight: 400,
//                   display: "block",
//                   color: "#fff",
//                 }}
//               >
//                 Delivering trusted inspection, quality management, and technical support
//                 solutions with a focus on operational excellence.
//               </small>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="col-md-6 bg-white p-4 d-flex flex-column justify-content-center">
//             <div className="text-start mb-3">
//               <div style={{ textAlign: "center" }}>
//                 <img
//                   src={ShreeLogo}
//                   alt="Shree Quality Services Logo"
//                   style={{ width: "250px", height: "auto" }}
//                 />
//               </div>

//     {/* Footer inside the card */}
//     <div className="col-12 text-center py-3">
//   <small className="text-muted fw-bold">
//     Designed and Developed by{" "}
//     <a
//       href="https://deinertech.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-decoration-none text-primary"
//     >
//       Deinertech Software
//     </a>{" "}
//     | © Shree Quality Services. All rights reserved.
//   </small>
// </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control border-danger"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   required
//                   style={{ width: "320px" }}
//                 />
//               </div>

//               <div className="mb-1">
//                 <label className="form-label fw-semibold">Password</label>
//                 <div className="input-group" style={{ width: "320px" }}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     className="form-control border-danger"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter password"
//                     required
//                   />
//                   <span
//                     className="input-group-text bg-white border-danger"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
//                   </span>
//                 </div>
//               </div>

//               <div
//                 className="d-flex justify-content-end mb-3"
//                 style={{ width: "320px" }}
//               >
//                 <a
//                   href="#"
//                   className="text-decoration-none small"
//                   onClick={() => navigate("/forgot-password")}
//                 >
//                   Forget Password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="btn w-85 text-white fw-semibold"
//                 style={{ backgroundColor: "#7b1f5a", width: "320px" }}
//               >
//                 Sign in
//               </button>
//             </form>
//           </div>

//           {/* Footer inside the card */}
//           <div className="col-12 text-center py-3">
//             <small className="text-muted fw-bold">
//               Designed and Developed by{" "}
//               <a
//                 href="https://deinertech.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-decoration-none text-primary"
//               >
//                 Deinertech Software
//               </a>{" "}
//               | © Shree Quality Services. All rights reserved.
//             </small>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// export default Login;






 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "./AuthContext";
 import axios from "axios";
 import { toast, ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import shreeimage from "../assets/shreeimage.png";
 import Shreelogo from "../assets/Shreelogo.png"
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
  style={{ backgroundColor: "#f8f9fa" }}
>
  <div
    className="row w-100 shadow-lg rounded"
    style={{
      maxWidth: "780px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fbdde7",
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
        style={{ backgroundColor: "#600030", color: "#fff", minHeight: "100px" }}
      >
        <h6 className="fw-bold mb-3" style={{ fontSize: "18px" }}>
          Welcome to <span className="fw-bold">Shree Quality Services</span>
        </h6>
        <small
          style={{
            lineHeight: "1.4",
            fontSize: "12px",
            fontWeight: 400,
            display: "block",
          }}
        >
          A cloud-based, streamlined Employee management system with a
          centralized, user-friendly interface.
        </small>
      </div>
    </div>

    {/* Right Section */}
    <div
      className="col-md-6 p-4 d-flex flex-column justify-content-center"
      style={{ backgroundColor: "#fbdde7" }}
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
            style={{ backgroundColor: "#7b1f5a", width: "320px" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>

    {/* Footer INSIDE box */}
    <div className="col-12 text-center py-3 border-top">
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
    </div>
  </div>
</div>


    </>
  );
};

export default Login;
