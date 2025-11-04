// AddBatchForm.jsx
import React from "react";
import { Form, Input, DatePicker, InputNumber, Button, Switch, Select, message, Card, Row, Col } from "antd";
import axios from "axios";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AddBatchForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const payload = {
        courseName: values.courseName,
        timeSlot: values.timeSlot,
        mode: values.mode,
        instructorName: values.instructorName,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        seatsAvailable: values.seatsAvailable,
        isTrending: values.isTrending,
        fee: values.fee,
        contactNumber: values.contactNumber,
        location: values.location,
      };

      const res = await axios.post(`${API_BASE_URL}/api/v1/batches`, payload);
      if (res.data.success) {
        message.success("Batch created successfully!");
        form.resetFields();
      } else {
        message.error("Failed to create batch.");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    }
  };

  return (
    <Card
      title="Create New Batch"
      style={{ maxWidth: 800, margin: "40px auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true, message: "Please enter course name" }]}
            >
              <Input placeholder="Mathematics 101" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="timeSlot"
              label="Time Slot"
              rules={[{ required: true, message: "Please enter time slot" }]}
            >
              <Input placeholder="Mon-Wed-Fri 6:00 PM - 8:00 PM" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mode"
              label="Mode"
              rules={[{ required: true, message: "Please select mode" }]}
            >
              <Select placeholder="Select mode">
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="instructorName"
              label="Instructor Name"
              rules={[{ required: true, message: "Please enter instructor name" }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateRange"
              label="Start & End Date"
              rules={[{ required: true, message: "Please select start and end date" }]}
            >
              <RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="seatsAvailable"
              label="Seats Available"
              rules={[{ required: true, message: "Please enter seats available" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} placeholder="30" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="fee" label="Fee" rules={[{ required: true, message: "Please enter fee" }]}>
              <InputNumber min={0} style={{ width: "100%" }} placeholder="50000" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="isTrending" label="Is Trending" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contactNumber"
              label="Contact Number"
              rules={[{ required: true, message: "Please enter contact number" }]}
            >
              <Input placeholder="+919876543210" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input placeholder="Pune" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
          <Button type="primary" htmlType="submit" size="large" style={{ minWidth: 200 }}>
            Create Batch
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBatchForm;
