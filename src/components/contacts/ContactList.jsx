// ContactList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Space, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactList.css"; // Optional for responsive styling

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch contacts from API
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/contact`)
      .then((res) => {
        if (res.data.success && res.data.data) {
          // Wrap single object in array if needed
          const contactsArray = Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data];

          setContacts(contactsArray);
          setFilteredContacts(contactsArray);
        }
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        toast.error("❌ Failed to fetch contacts.");
      });
  }, []);

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.subject?.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

  // Delete contact
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/api/v1/contact/${id}`)
      .then(() => {
        const updated = contacts.filter((item) => item._id !== id);
        setContacts(updated);
        setFilteredContacts(updated);
        toast.success("✅ Contact deleted successfully");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("❌ Failed to delete contact");
      });
  };

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", align: "center" },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    { title: "Phone", dataIndex: "phone", key: "phone", align: "center" },
    { title: "Subject", dataIndex: "subject", key: "subject", align: "center" },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      align: "center",
      width: 300,
      render: (text) => (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{text}</div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this contact?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="contact-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="contact-heading">Contact Enquiries</h2>

      <Space className="top-controls" style={{ marginBottom: "10px" }}>
        <Input
          placeholder="Search by name, email, or subject"
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          allowClear
        />
      </Space>

      {/* Desktop Table */}
      <div className="desktop-table">
        <Table
          dataSource={filteredContacts}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {filteredContacts.map((contact) => (
          <div className="card" key={contact._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Subject:</strong> {contact.subject}</p>
            <p><strong>Message:</strong> {contact.message}</p>
            <Popconfirm
              title="Delete this contact?"
              onConfirm={() => handleDelete(contact._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger block>
                Delete
              </Button>
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
