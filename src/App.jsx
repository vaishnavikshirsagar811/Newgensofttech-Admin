import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Sidebar from "./components/blogs/sideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Resgister from "./components/Resgister/Resgister";
import AdminEventForm from "./components/Event/Event";
import EventList from "./components/Event/EventList";
import EditEvent from "./components/Event/Updatedevent";
import AdminEventUsers from "./components/Event/AdminEventUsers";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
             <Route path="/admin/AddEvent" element={<AdminEventForm/>} />
              <Route path="/admin/Eventlist" element={<EventList/>} />
             <Route path="/admin/Resgister" element={<Resgister/>} />
             <Route path="/admin/events/edit/:id" element={<EditEvent />} />
          <Route path="/admin/eventuser" element={<AdminEventUsers />} />



          
       
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Login />} />
        </Routes>

        {/* 🔔 Toastify Global Container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
