"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Tag, Spin } from "antd";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Register = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchRegistrations = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE_URL}/api/v1/Registration`);
  //     if (res.data.success) {
  //       setRegistrations(res.data.data); // API returns array
  //     }
  //   } catch (error) {
  //     console.error("Error fetching registrations:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const fetchRegistrations = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/Registration`);
    if (res.data.success) {
      const sorted = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRegistrations(sorted); // newest first
    }
  } catch (error) {
    console.error("Error fetching registrations:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Batch",
      key: "batch",
      render: (_, record) =>
        record.batch && record.batch.courseName ? (
          <Tag color="#108ee9">{record.batch.courseName}</Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Fees",
      dataIndex: "fees",
      key: "fees",
      render: (fees) => <Tag color="#52c41a">{fees}</Tag>,
    },
    {
      title: "Installment",
      dataIndex: "installmentType",
      key: "installmentType",
    },
  ];

  if (loading)
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Card
            style={{
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h3>All Registrations</h3>
            <Table
              dataSource={registrations}
              columns={columns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              bordered
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                    <p>
                      <strong>WhatsApp Number:</strong> {record.whatsappNumber}
                    </p>
                    <p>
                      <strong>Adhaar Number:</strong> {record.adhaarNumber}
                    </p>
                    <p>
                      <strong>Reference Source:</strong> {record.referenceSource}
                    </p>
                    <p>
                      <strong>Branch:</strong> {record.branch}
                    </p>
                    <p>
                      <strong>Working Status:</strong> {record.workingStatus}
                    </p>
                    <p>
                      <strong>Terms Accepted:</strong> {record.termsAccepted ? "Yes" : "No"}
                    </p>
                    {record.batch && (
                      <>
                        <p>
                          <strong>Batch Mode:</strong> {record.batch.mode}
                        </p>
                        <p>
                          <strong>Instructor:</strong> {record.batch.instructorName}
                        </p>
                        <p>
                          <strong>Time Slot:</strong> {record.batch.timeSlot}
                        </p>
                        <p>
                          <strong>Location:</strong> {record.batch.location}
                        </p>
                        <p>
                          <strong>Duration:</strong> {record.batch.duration}
                        </p>
                        <p>
                          <strong>Description:</strong> {record.batch.description}
                        </p>
                      </>
                    )}
                  </div>
                ),
                rowExpandable: (record) => true,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
