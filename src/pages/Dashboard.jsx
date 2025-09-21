import React, { useState } from "react";
import { Card, Row, Col, Calendar } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dataSets = {
    enquiries: [
      { day: "Mon", value: 20 },
      { day: "Tue", value: 40 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 55 },
      { day: "Fri", value: 65 },
      { day: "Sat", value: 80 },
      { day: "Sun", value: 100 },
    ],
    jobApplications: [
      { day: "Mon", value: 200 },
      { day: "Tue", value: 400 },
      { day: "Wed", value: 300 },
      { day: "Thu", value: 600 },
      { day: "Fri", value: 500 },
      { day: "Sat", value: 700 },
      { day: "Sun", value: 800 },
    ],
    resignations: [
      { day: "Mon", value: 5 },
      { day: "Tue", value: 10 },
      { day: "Wed", value: 8 },
      { day: "Thu", value: 6 },
      { day: "Fri", value: 12 },
      { day: "Sat", value: 7 },
      { day: "Sun", value: 9 },
    ],
    leaveApplications: [
      { day: "Mon", value: 15 },
      { day: "Tue", value: 18 },
      { day: "Wed", value: 25 },
      { day: "Thu", value: 20 },
      { day: "Fri", value: 30 },
      { day: "Sat", value: 28 },
      { day: "Sun", value: 32 },
    ],
  };

  const totals = Object.fromEntries(
    Object.entries(dataSets).map(([key, data]) => [
      key,
      data.reduce((sum, d) => sum + d.value, 0),
    ])
  );

  const [selected, setSelected] = useState("enquiries");


const cards = [
  {
    key: "enquiries",
    label: "Enquiries",
    color: "#1a3fa0",
    calendarBg: "#0038A81A", // solid background
    chartBg: "#0038A81A",
  },
  {
    key: "jobApplications",
    label: "Job Application",
    color: "#2ca02c",
    calendarBg: "#027F001F",
    chartBg: "#027F001F",
  },
  {
    key: "resignations",
    label: "Resignation",
    color: "#800080",
    calendarBg: "#68016C1F",
    chartBg: "#68016C1F",
  },
  {
    key: "leaveApplications",
    label: "Leave Application",
    color: "#c49c0b",
    calendarBg: "#ceca034d",
    chartBg: "#ceca034d",
  },
];


  const currentCard = cards.find((c) => c.key === selected);

  return (
    <div style={{ padding: "20px" }}>
      {/* Cards */}
      <Row gutter={16}>
        {cards.map((card) => (
          <Col span={6} key={card.key}>
            <Card
              style={{
                background: card.color,
                color: "#fff",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow:
                  selected === card.key
                    ? "0 6px 15px rgba(0,0,0,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                transform: selected === card.key ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelected(card.key)}
            >
              <h2 style={{ color: "#fff", margin: 0 }}>{totals[card.key]}</h2>
              <p style={{ color: "#fff", margin: 0 }}>{card.label}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart + Calendar */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Left: Line Chart */}
        <Col span={16}>
        {/* Chart */}
<div
  style={{
    background: currentCard.chartBg,
    padding: "20px",
    borderRadius: "12px",
  }}
>
  <h3 style={{ marginBottom: "20px", color: currentCard.color }}>
    {currentCard.label} Trend
  </h3>
   <div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // added shadow
  }}
>
  
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={dataSets[selected]}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke={currentCard.color}
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
</div>  

{/* Calendar */}


        </Col>

        {/* Right: Calendar */}
        <Col span={8}>
          <Card
            style={{
              borderRadius: "12px",
              background: currentCard.calendarBg,
            }}
          >
            <Calendar
              fullscreen={false}
              headerRender={({ value }) => (
                <div style={{ padding: "10px", textAlign: "center" }}>
                  <span
                    style={{
                      color: currentCard.color,
                      fontWeight: "bold",
                    }}
                  >
                    {value.format("MMMM YYYY")}
                  </span>
                </div>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
