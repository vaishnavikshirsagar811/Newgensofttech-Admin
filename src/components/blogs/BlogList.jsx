
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import BlogForm from "./BlogForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BlogList.css"; 
const API_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      // const res = await api.get("/blogs");
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data.reverse());
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        // await api.delete(`/blogs/${id}`);
        await axios.delete(`${API_URL}/api/blogs/${id}`);
        toast.success("✅ Blog deleted successfully!");
        fetchBlogs();
      } catch (err) {
        toast.error("❌ Failed to delete blog");
      }
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setSelectedBlog(null);
    setShowForm(false);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h4 className="mb-2">
          {showForm ? (selectedBlog ? "Edit Blog" : "Add New Blog") : "All Blogs"}
        </h4>
        {!showForm && (
          <button
            className="btn btn-success"
            style={{ backgroundColor: "#1A1640" }}
            onClick={() => {
              setSelectedBlog(null);
              setShowForm(true);
            }}
          >
            Add Blog
          </button>
        )}
      </div>

      {showForm ? (
        <BlogForm selectedBlog={selectedBlog} onSuccess={handleSuccess} />
      ) : (
        <div className="table-responsive">
          <table className="table blog-table table-bordered text-center align-middle bg-white">
            <thead className="bg-light">
              <tr>
                <th className="col-title">Title</th>
                <th className="col-author">Author</th>
                <th className="col-category">Category</th>
                <th className="col-image">Image</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="blog-title-cell">{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{blog.category}</td>
                  <td>
                    {blog.mainimage ? (
                      <img
                        src={blog.mainimage}
                        alt="Main"
                        style={{ width: 70, height: 50, objectFit: "cover" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No blogs found
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

export default BlogList;
