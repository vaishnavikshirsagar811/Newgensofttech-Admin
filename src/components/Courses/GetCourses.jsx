import React, { useEffect, useState } from "react";
import { Tabs, Table, Spin, message, Button, Popconfirm, Tag } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = [
  "Web Development",
  "Data Science",
  "Mobile Apps",
  "AI/ML",
  "Other",
];

// Gradient colors from your image
const buttonGradient = "linear-gradient(90deg, #f8c300, #e5701b)";
const editGradient = "linear-gradient(90deg, #45385e, #b8b2d5)";

const GetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5016/api/v1/courses");
      if (res.data.success) setCourses(res.data.data);
      else message.error("❌ Failed to load courses");
    } catch (err) {
      console.error(err);
      message.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5016/api/v1/courses/${id}`);
      message.success("✅ Course deleted!");
      fetchCourses();
    } catch (err) {
      message.error("❌ Failed to delete");
    }
  };

  const getColumns = () => [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Fee", dataIndex: "fee", key: "fee", render: (val) => `₹${val}` },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Contact", dataIndex: "contactNumber", key: "contactNumber" },
    {
      title: "Trending",
      dataIndex: "isTrending",
      key: "isTrending",
      render: (val) => (val ? <Tag color="red">🔥 Trending</Tag> : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
         <Link to={`/admin/courses/edit/${record._id}`}>
  <Button
    style={{
      background: editGradient,
      color: "#fff",
      border: "none",
      fontWeight: 500,
    }}
  >
    ✏️ Edit
  </Button>
</Link>

          <Popconfirm
            title="Delete this course?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              style={{
                background: buttonGradient,
                color: "#fff",
                border: "none",
                fontWeight: 500,
              }}
            >
              🗑 Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const renderCoursesByCategory = (category) => {
    const filtered = courses.filter((c) => c.category === category);
    if (!filtered.length)
      return <p style={{ textAlign: "center", padding: 20 }}>No courses found.</p>;
    return <Table rowKey="_id" columns={getColumns()} dataSource={filtered} pagination={false} />;
  };

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontWeight: 600 }}>📚 Browse Courses</h2>
        <Link to="/admin/courses/create">
          <Button
            style={{
              background: buttonGradient,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              padding: "0 20px",
            }}
          >
            ➕ Add Course
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
      ) : (
        <Tabs
          defaultActiveKey={categories[0]}
          centered
          tabBarStyle={{
            fontWeight: 600,
            color: "#45385e",
            fontSize: 16,
          }}
        >
          {categories.map((cat) => (
            <Tabs.TabPane tab={cat} key={cat}>
              {renderCoursesByCategory(cat)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default GetCourses;
