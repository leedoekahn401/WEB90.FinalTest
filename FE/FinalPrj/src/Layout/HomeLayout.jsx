import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = [
    { key: "/", icon: <UserOutlined />, label: "Quản lý giáo viên" },
    { key: "/positions", icon: <SolutionOutlined />, label: "Quản lý Chức vụ" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
        <div style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700
        }}>
          School System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname === "" ? "/" : pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: "16px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
