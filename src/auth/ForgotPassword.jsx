import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1); // 1: get token, 2: reset password
  const [newPass, setNewPass] = useState({ newPassword: "", confirmPassword: "" });
  const navigate = useNavigate();

  const requestToken = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setToken(res.data.resetToken); // in production, this is emailed
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to request token");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        ...newPass,
      });
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    // <div className="container mt-5">
    //   <h3>Forgot Password</h3>
    //   {step === 1 ? (
    //     <>
    //       <input
    //         className="form-control mb-3"
    //         placeholder="Enter your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <button className="btn btn-warning" onClick={requestToken}>Request Reset Token</button>
    //     </>
    //   ) : (
    //     <>
    //       <div className="mb-2">
    //         <input
    //           className="form-control mb-2"
    //           placeholder="New password"
    //           type="password"
    //           value={newPass.newPassword}
    //           onChange={(e) => setNewPass({ ...newPass, newPassword: e.target.value })}
    //         />
    //         <input
    //           className="form-control"
    //           placeholder="Confirm password"
    //           type="password"
    //           value={newPass.confirmPassword}
    //           onChange={(e) => setNewPass({ ...newPass, confirmPassword: e.target.value })}
    //         />
    //       </div>
    //       <button className="btn btn-success" onClick={resetPassword}>Reset Password</button>
    //     </>
    //   )}
    // </div>

    <div className="container mt-5 d-flex justify-content-center">
  <div className="p-4 border rounded shadow-lg" style={{ maxWidth: '350px', width: '100%' }}>
    <h4 className="text-center mb-4">Reset Password</h4>
    {step === 1 ? (
      <>
        <input
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-warning w-100" onClick={requestToken}>Request Reset Token</button>
      </>
    ) : (
      <>
        <div className="mb-3">
           <label className="form-label fw-semibold">New Password</label>
          <input
            className="form-control mb-2"
            // placeholder="New password"
            type="password"
            value={newPass.newPassword}
            onChange={(e) => setNewPass({ ...newPass, newPassword: e.target.value })}
          />
           <label className="form-label fw-semibold">Confirm Password</label>
          <input
            className="form-control"
            // placeholder="Confirm password"
            type="password"
            value={newPass.confirmPassword}
            onChange={(e) => setNewPass({ ...newPass, confirmPassword: e.target.value })}
          />
        </div>
        <button className="btn btn-success w-100" onClick={resetPassword}>submit</button>
      </>
    )}
  </div>
</div>

  );
};

export default ForgotPassword;
