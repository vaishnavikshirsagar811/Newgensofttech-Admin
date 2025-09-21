

// src/pages/Blogs.jsx
import React, { useState } from "react";
import BlogForm from "../components/blogs/BlogForm";
import BlogList from "../components/blogs/BlogList";


const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  const handleSuccess = () => {
    setSelectedBlog(null);
    setRefresh(!refresh);
  };

  return (
    <div Container fluid className="mt-4">
      <BlogForm selectedBlog={selectedBlog} onSuccess={handleSuccess} />
      <BlogList onEdit={handleEdit} key={refresh} />
    </div>
  );
};

export default Blogs;
