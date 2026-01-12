"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Calendar, Spin, Table } from "antd";
import "../../src/pages/dashbord.css"
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
import { FaCalendarAlt, FaBullhorn } from "react-icons/fa";

/* ================= API URLS ================= */
const EVENTS_API = "https://paisagramsbackend.vercel.app/api/events";
const CAMPAIGN_API = "https://paisagramsbackend.vercel.app/api/campaion/";

const Dashboard = () => {
  /* ================= STATES ================= */
  const [counts, setCounts] = useState({
    events: 0,
    campaigns: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("events");

  /* ================= HELPERS ================= */
  const getDate = (item) =>
    item?.createdAt || item?.created_at || item?.date;

  /* ================= FETCH DATA ================= */
  const fetchDashboardData = async () => {
    try {
      const [eventsRes, campaignRes] = await Promise.all([
        axios.get(EVENTS_API),
        axios.get(CAMPAIGN_API),
      ]);

      // 🔑 API RESPONSE HANDLING
      const events = eventsRes?.data?.data || [];
      const campaigns = campaignRes?.data?.data || [];

      /* ===== COUNTS ===== */
      setCounts({
        events: events.length,
        campaigns: campaigns.length,
      });

      /* ===== RECENT ACTIVITY (LAST 3 EVENTS) ===== */
      const recent = [...events]
        .sort(
          (a, b) =>
            new Date(getDate(b)) - new Date(getDate(a))
        )
        .slice(0, 3)
        .map((item, index) => ({
          key: index,
          name: item?.name || "Event",
          type: "Event Created",
          date: new Date(getDate(item)).toLocaleDateString(),
        }));

      setRecentActivity(recent);

      /* ===== EVENT-WISE GRAPH ===== */
      const dayMap = {};
      events.forEach((event) => {
        const day = new Date(getDate(event)).toLocaleDateString("en-US", {
          weekday: "short",
        });
        dayMap[day] = (dayMap[day] || 0) + 1;
      });

      setChartData(
        Object.keys(dayMap).map((day) => ({
          day,
          value: dayMap[day],
        }))
      );
    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ================= UI CONFIG ================= */
  const cards = [
    {
      key: "events",
      label: "Campaigns",
      icon: <FaCalendarAlt size={28} color="#fff" />,
      color: "linear-gradient(135deg,#6366f1,#3b82f6)",
    },
    {
      key: "campaigns",
      label: "Users",
      icon: <FaBullhorn size={28} color="#fff" />,
      color: "linear-gradient(135deg,#f97316,#facc15)",
    },
  ];



  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "60px" }}>
        <Spin size="large" />
      </div>
    );
  }

  /* ================= RENDER ================= */
return (
  <div className="dashboard-wrapper">
    <h1 className="dashboard-title">Admin Dashboard</h1>

    {/* ===== METRIC CARDS ===== */}
    <Row gutter={[24, 24]}>
      {cards.map((card) => (
        <Col xs={24} md={12} key={card.key}>
          <Card
            onClick={() => setSelected(card.key)}
            className="metric-card"
            style={{
              background: card.color,
             
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
                <h2 style={{ fontSize: "38px", margin: 0 }}>
                  {counts[card.key]}
                </h2>
                <p style={{ fontSize: "16px", opacity: 0.9 }}>
                  {card.label}
                </p>
              </div>
              <div className="icon-wrap">{card.icon}</div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>

    {/* ===== MAIN SECTION ===== */}
    <Row gutter={[24, 24]} style={{ marginTop: "36px" }}>
      {/* GRAPH */}
      <Col xs={24} md={16}>
        <Card className="glass-card">
          <h3 className="section-title"> Event-wise Activity</h3>

          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={chartData} className="chart-glow">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={4}
                dot={{ r: 6 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      {/* RIGHT PANEL */}
      <Col xs={24} md={8}>
      
        <Card className="glass-card" style={{ marginBottom: "22px" }}>
            <h3 className="section-title">Calendar</h3>
          <Calendar fullscreen={false} />
        </Card>

        {/* <Card className="glass-card">
          <h3 className="section-title">🕒 Recent Activity</h3>
          <Table
            columns={activityColumns}
            dataSource={recentActivity}
            pagination={false}
            size="small"
          />
        </Card> */}
      </Col>
    </Row>
  </div>
);

};

export default Dashboard;
