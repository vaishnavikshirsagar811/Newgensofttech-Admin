// BatchManagement.jsx
import React, { useEffect, useState } from "react";
import { Table,Space, Button, Popconfirm, message, Form, Input, InputNumber, DatePicker, Switch, Select, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/v1/batches`;

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch batches
  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) setBatches(res.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Create or update batch
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      };

      let res;
      if (editingBatch) {
        res = await axios.put(`${API_URL}/${editingBatch._id}`, payload);
      } else {
        res = await axios.post(API_URL, payload);
      }

      if (res.data.success) {
        message.success(editingBatch ? "Batch updated!" : "Batch created!");
        setModalVisible(false);
        form.resetFields();
        fetchBatches();
        setEditingBatch(null);
      } else {
        message.error("Operation failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  };

  // Delete batch
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.success) {
        message.success("Batch deleted");
        fetchBatches();
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to delete batch");
    }
  };

  // Open modal for edit
  const handleEdit = (record) => {
    setEditingBatch(record);
    form.setFieldsValue({
      ...record,
      dateRange: [moment(record.startDate), moment(record.endDate)],
    });
    setModalVisible(true);
  };

  const columns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Instructor", dataIndex: "instructorName", key: "instructorName" },
    { title: "Time Slot", dataIndex: "timeSlot", key: "timeSlot" },
    { title: "Mode", dataIndex: "mode", key: "mode" },
    { title: "Seats", dataIndex: "seatsAvailable", key: "seatsAvailable" },
    { title: "Fee", dataIndex: "fee", key: "fee" },
    { title: "Trending", dataIndex: "isTrending", key: "isTrending", render: (val) => (val ? "Yes" : "No") },
    { title: "Actions", key: "actions", render: (_, record) => (
        <>
        <Space size="middle">
    <Button
      type="primary"
      icon={<EditOutlined />}
      onClick={() => handleEdit(record)}
      size="small"
    >
      Edit
    </Button>

    <Popconfirm
      title="Are you sure to delete this batch?"
      onConfirm={() => handleDelete(record._id)}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        size="small"
      >
        Delete
      </Button>
    </Popconfirm>
  </Space>
        </>
      )
    }
  ];

  return (
    <>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    margin:'20px'
  }}
>
  <h1 style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>Batch Management</h1>

  <Button
    type="primary"
    style={{
      background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
      border: "none",
      fontWeight: "bold",
    }}
  >
    <Link to="/admin/batches/create" style={{ color: "white" }}>
      Add Batch
    </Link>
  </Button>
</div>

    <div style={{ padding: 20 }}>
         


      <Table
        dataSource={batches}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingBatch ? "Edit Batch" : "Add Batch"}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setEditingBatch(null); }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="timeSlot" label="Time Slot" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
            <Select>
              <Option value="Online">Online</Option>
              <Option value="Offline">Offline</Option>
            </Select>
          </Form.Item>

          <Form.Item name="instructorName" label="Instructor Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="dateRange" label="Start & End Date" rules={[{ required: true }]}>
            <RangePicker />
          </Form.Item>

          <Form.Item name="seatsAvailable" label="Seats Available" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="isTrending" label="Is Trending" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="fee" label="Fee" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingBatch ? "Update Batch" : "Create Batch"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default BatchManagement;
