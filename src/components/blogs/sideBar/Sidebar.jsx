import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileTextOutlined,
  PictureOutlined,
  StarOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { toast } from 'react-toastify';
import Shreelogo from '../../../assets/logo/NEWGEN-Softech-Logo.png';
import axios from "axios";
import './Sidebar.css';
import { GlobalOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";


const API_URL = import.meta.env.VITE_API_BASE_URL;
const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const pathToKeyMap = {
    '/admin': '1',
    '/admin/contact': '4',
    '/admin/banner': '5',
    '/admin/testimonials': '6',
    '/admin/portfolio': '8',
    '/admin/employees/list': '10',
    '/admin/employees/leaves': '11',
    '/admin/career/jobs': '12',
    '/admin/career/applications': '13',
  };

  const selectedKey = pathToKeyMap[location.pathname] || '';

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderWidth = collapsed ? 80 : 200;

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

                {
              key: '1',
              icon: <AppstoreOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/admin'),
            },
   {
              key: '2',
              icon: <StarOutlined />,
              label: 'Add Courses',
              onClick: () => navigate('/admin/courses/list'),
            },
            {
              key: '2',
              icon: <StarOutlined />,
              label: 'Add Banner',
              onClick: () => navigate('/admin/banner'),
            },

              {
              key: '2',
              icon: <StarOutlined />,
              label: 'Add Batches',
              onClick: () => navigate('/admin/batches/list'),
            },
              {
              key: '6',
              icon: <StarOutlined />,
              label: 'Testimonials',
              onClick: () => navigate('/admin/testimonials'),
            },
            {
              key: '4',
              icon: <PhoneOutlined />,
              label: 'Get in Touch',
              onClick: () => navigate('/admin/contact'),
            },
            // {
            //   key: '5',
            //   icon: <PictureOutlined />,
            //   label: 'Banner',
            //   onClick: () => navigate('/admin/banner'),
            // },
          
            // {
            //   key: '8',
            //   icon: <PictureOutlined />,
            //   label: 'Portfolio',
            //   onClick: () => navigate('/admin/portfolio'),
            // },
          
          
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Log Out',
              onClick: async () => {
                const confirmLogout = window.confirm("Are you sure you want to logout?");
                if (!confirmLogout) return;
                try {
                  await axios.post(`${API_URL}/api/auth/logout`, {}, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  });
                  logout();
                  navigate('/login');
                  toast.success("Logout successfully", { autoClose: 2000 });
                } catch (err) {
                  toast.error("Logout failed", { autoClose: 2000 });
                }
              },
            },
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
          {/* Globe */}
          <GlobalOutlined className="header-icon" />

          {/* Search */}
          <div className="search-box">
            <SearchOutlined className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>

          {/* Notification */}
          <BellOutlined className="header-icon" />

          {/* Avatar */}
          <div className="header-avatar">
            <img src="" alt="User" />
          </div>
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
