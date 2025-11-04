"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Calendar, Spin, Table } from "antd";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FaBook, FaEnvelope, FaUserPlus } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    courses: 0,
    contacts: 0,
    registrations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("courses");

  // Fetch counts from APIs
  const fetchCounts = async () => {
    try {
      const [coursesRes, contactsRes, regRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/v1/courses`),
        axios.get(`${API_BASE_URL}/api/v1/contact`),
        axios.get(`${API_BASE_URL}/api/v1/Registration`),
      ]);
      setDataCounts({
  courses: coursesRes.data.count || coursesRes.data.totalCount || 0,
  contacts: contactsRes.data.count || contactsRes.data.totalCount || 0,
  registrations: regRes.data.count || regRes.data.totalCount || 0,
});

     
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const cards = [
    {
      key: "courses",
      label: "Courses",
      icon: <FaBook size={28} color="#fff" />,
      color: "linear-gradient(135deg,#6a11cb,#2575fc)",
      sparkData: [5, 8, 6, 9, 12, 10, 15],
    },
    {
      key: "contacts",
      label: "Enquiries",
      icon: <FaEnvelope size={28} color="#fff" />,
      color: "linear-gradient(135deg,#f7971e,#ffd200)",
      sparkData: [20, 15, 18, 22, 25, 20, 30],
    },
    {
      key: "registrations",
      label: "Registrations",
      icon: <FaUserPlus size={28} color="#fff" />,
      color: "linear-gradient(135deg,#00b09b,#96c93d)",
      sparkData: [2, 4, 3, 5, 6, 4, 7],
    },
  ];

  const chartData = {
    courses: [
      { day: "Mon", value: 5 },
      { day: "Tue", value: 8 },
      { day: "Wed", value: 6 },
      { day: "Thu", value: 9 },
      { day: "Fri", value: 12 },
      { day: "Sat", value: 10 },
      { day: "Sun", value: 15 },
    ],
    contacts: [
      { day: "Mon", value: 20 },
      { day: "Tue", value: 15 },
      { day: "Wed", value: 18 },
      { day: "Thu", value: 22 },
      { day: "Fri", value: 25 },
      { day: "Sat", value: 20 },
      { day: "Sun", value: 30 },
    ],
    registrations: [
      { day: "Mon", value: 2 },
      { day: "Tue", value: 4 },
      { day: "Wed", value: 3 },
      { day: "Thu", value: 5 },
      { day: "Fri", value: 6 },
      { day: "Sat", value: 4 },
      { day: "Sun", value: 7 },
    ],
  };

  const recentActivity = [
    { key: "1", name: "John Doe", type: "Enquiry", date: "2025-10-01" },
    { key: "2", name: "Jane Smith", type: "Registration", date: "2025-10-02" },
    { key: "3", name: "Michael Lee", type: "Course Added", date: "2025-10-03" },
  ];

  const activityColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const currentCard = cards.find((c) => c.key === selected);

  if (loading)
    return (
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
      {/* Metric Cards */}
      <Row gutter={[24, 24]}>
        {cards.map((card) => (
          <Col xs={24} sm={12} md={8} key={card.key}>
            <Card
              onClick={() => setSelected(card.key)}
              style={{
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                background: card.color,
                color: "#fff",
                boxShadow:
                  selected === card.key
                    ? "0 12px 25px rgba(0,0,0,0.3)"
                    : "0 4px 15px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
                    {dataCounts[card.key]}
                  </h2>
                  <p style={{ margin: 0, fontSize: "16px" }}>{card.label}</p>
                </div>
                {card.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Chart + Calendar + Activity */}
      <Row gutter={[24, 24]} style={{ marginTop: "30px" }}>
        {/* Left: Line Chart */}
        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "#4f46e5" }}>
              {currentCard.label} Trend
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData[selected]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6a11cb" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#2575fc" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6a11cb" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#2575fc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <XAxis dataKey="day"/>
                <YAxis/>
                <Tooltip contentStyle={{ borderRadius: "8px", border:"none", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" }}/>
                <Line type="monotone" dataKey="value" stroke="url(#lineGrad)" strokeWidth={3} dot={{r:5, fill:"#fff"}} activeDot={{r:8}}/>
                <Line type="monotone" dataKey="value" stroke="transparent" fill="url(#areaGrad)"/>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Right: Calendar + Activity */}
        <Col xs={24} md={8}>
          {/* Calendar */}
          <Card style={{ borderRadius: "16px", padding: "10px", marginBottom:"20px", boxShadow:"0 6px 20px rgba(0,0,0,0.1)", background:"#fff" }}>
            <Calendar fullscreen={false} headerRender={({ value }) => (
              <div style={{ textAlign:"center", fontWeight:"bold", color:"#4f46e5" }}>{value.format("MMMM YYYY")}</div>
            )}/>
          </Card>

          {/* Recent Activity */}
          <Card style={{ borderRadius: "16px", padding:"10px", boxShadow:"0 6px 20px rgba(0,0,0,0.1)", background:"#fff" }}>
            <h3 style={{ marginBottom:"15px", color:"#4f46e5" }}>Recent Activity</h3>
            <Table
              columns={activityColumns}
              dataSource={recentActivity}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
