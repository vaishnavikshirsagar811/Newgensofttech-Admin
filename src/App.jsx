import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Sidebar from "./components/blogs/sideBar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import BlogList from "./components/blogs/BlogList";
import Contacts from "./pages/Contacts";
import BannerList from "./components/banners/BannerList";
import TestimonialList from "./components/Testimonial/TestimonialList";
import TestimonialForm from "./components/Testimonial/TestimonialForm";
import ContactList from "./components/contacts/ContactList";
import SectorList from "./components/Installation/SectorList";
import SectorForm from "./components/Installation/SectorForm";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import PortfolioList from "./components/PortFolio/PortfolioList";
import PortfolioForm from "./components/PortFolio/PortfolioForm";
import ServiceList from "./components/services/ServiceList";
import ServiceForm from "./components/services/ServiceForm";

import LeavesList from "./components/employees/LeavesList";
import EmployeesList from "./components/employees/EmployeesList";

import CreateCourseForm from "./components/Courses/AddCouses";
import GetCourses from "./components/Courses/GetCourses";
import EditCourseForm from "./components/Courses/EditCourseForm";
import AddBatchForm from "./components/Batchess/AddBatchForm";
import BatchManagement from "./components/Batchess/BatchManagementlist";

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
            <Route path="blogs" element={<Blogs />} />
            <Route path="/admin/bloglist" element={<BlogList />} />
            <Route path="contact" element={<Contacts />} />
            <Route path="/admin/banner" element={<BannerList />} />
            <Route path="testimonials" element={<TestimonialList />} />
            <Route path="contact-list" element={<ContactList />} />
            <Route path="portfolio" element={<PortfolioList />} />
            <Route path="portfolio/create" element={<PortfolioForm />} />
            <Route path="sectors" element={<SectorList />} />
            <Route path="sectors/create" element={<SectorForm />} />
            <Route path="/admin/services" element={<ServiceList />} />
            <Route path="/admin/services/create" element={<ServiceForm />} />
            <Route path="/admin/services/edit/:id" element={<ServiceForm />} />
            <Route path="/admin/employees/leaves" element={<LeavesList />} />
            <Route path="/admin/employees/list" element={<EmployeesList />} />
            <Route path="/admin/courses/create" element={<CreateCourseForm />} />
            <Route path="/admin/courses/list" element={<GetCourses />} />
            <Route path="/admin/courses/edit/:courseId" element={<EditCourseForm />} />
            <Route path="/admin/batches/create" element={<AddBatchForm />} />
            <Route path="/admin/batches/list" element={<BatchManagement />} />
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
