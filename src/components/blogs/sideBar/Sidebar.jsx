import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  PictureOutlined,
  StarOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  TeamOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { toast } from 'react-toastify';
import Shreelogo from '../../../assets/logo/NEWGEN-Softech-Logo.png';
import axios from "axios";
import './Sidebar.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const pathToKeyMap = {
    '/admin': '1',
    '/admin/courses/list': '2',
    '/admin/banner': '3',
    '/admin/batches/list': '4',
    '/admin/testimonials': '5',
    '/admin/contact': '6',
    '/admin/portfolio': '7',
    '/admin/employees/list': '8',
    '/admin/employees/leaves': '9',
    '/admin/career/jobs': '10',
    '/admin/career/applications': '11',
  };

  const selectedKey = pathToKeyMap[location.pathname] || '';

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderWidth = collapsed ? 80 : 200;

  // Logout function without alert
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      logout();
      navigate('/login');
      toast.success("✅ Logged out successfully", { autoClose: 2000 });
    } catch (err) {
      toast.error("❌ Logout failed", { autoClose: 2000 });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        trigger={null}
        className="sidebar"
      >
        {/* Logo */}
        <div className="logo-box">
          <img
            src={Shreelogo}
            alt="Logo"
            className={`logo ${collapsed ? "collapsed" : ""}`}
          />
        </div>

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          className="menu"
          items={[
            { key: '1', icon: <AppstoreOutlined />, label: 'Dashboard', onClick: () => navigate('/admin') },
            { key: '2', icon: <FileTextOutlined />, label: 'Courses', onClick: () => navigate('/admin/courses/list') },
            { key: '3', icon: <PictureOutlined />, label: 'Banner', onClick: () => navigate('/admin/banner') },
            { key: '5', icon: <StarOutlined />, label: 'Testimonials', onClick: () => navigate('/admin/testimonials') },
            { key: '6', icon: <PhoneOutlined />, label: 'Contact', onClick: () => navigate('/admin/contact') },
            { key: '7', icon: <TeamOutlined />, label: 'Registration', onClick: () => navigate('/admin/Resgister') },
            { key: 'logout', icon: <LogoutOutlined />, label: 'Log Out', onClick: handleLogout },
          ]}
        />
      </Sider>

      <Layout style={{ marginLeft: siderWidth, transition: "margin-left 0.3s" }}>
        <Header className="header">
          {/* Collapse Button */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
          />

          {/* Right Section */}
          <div className="header-right">
            <GlobalOutlined className="header-icon" />
          </div>
        </Header>

        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
