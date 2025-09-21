import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  message,
  Switch,
  Row,
  Col,
  Card,
  Typography,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const categoryOptions = [
  "Web Development",
  "Data Science",
  "Mobile Apps",
  "AI/ML",
  "Other",
];

const CreateCourseForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("fee", values.fee);
      formData.append("duration", values.duration);
      formData.append("contactNumber", values.contactNumber);
      formData.append("isTrending", values.isTrending);

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file.originFileObj);
        });
      }

      if (values.syllabus && values.syllabus.length > 0) {
        formData.append("syllabus", values.syllabus[0].originFileObj);
      }

      const res = await axios.post("http://localhost:5016/api/v1/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        message.success("✅ Course created successfully!");
      } else {
        message.error("❌ Failed to create course.");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "20px 30px",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
        Create New Course
      </Title>

      <Divider>Course Information</Divider>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Course Title"
              name="title"
              rules={[{ required: true, message: "Please enter course title" }]}
            >
              <Input placeholder="Enter course title" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                {categoryOptions.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter course description" }]}
        >
          <TextArea rows={4} placeholder="Enter course description" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Fee (₹)"
              name="fee"
              rules={[{ required: true, message: "Please enter fee" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter course fee"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please enter duration" }]}
            >
              <Input placeholder="e.g. 6 weeks, 3 months" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            { required: true, message: "Please enter contact number" },
            {
              pattern: /^[6-9]\d{9}$/,
              message: "Enter valid 10-digit mobile number",
            },
          ]}
        >
          <Input placeholder="Enter contact number" />
        </Form.Item>

        <Form.Item label="Trending" name="isTrending" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Divider>Uploads</Divider>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Course Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload multiple beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Images</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Syllabus (PDF)"
              name="syllabus"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
                <Button icon={<UploadOutlined />}>Upload PDF</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            style={{ borderRadius: 8, padding: "0 40px" }}
          >
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateCourseForm;
