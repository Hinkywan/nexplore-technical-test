import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Duties from './pages/Duties';
import './App.scss';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item key="1">
              <Link to="/duties">Duties</Link>
            </Menu.Item>
            {/* Add other menu items as needed */}
          </Menu>
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/duties" element={<Duties />} />
            {/* Add other routes as needed */}
            <Route path="*" element={<Navigate to="/duties" />} />
          </Routes>
        </Content>
        <Footer className="footer">©2024 Created by Hinky Wan</Footer>
      </Layout>
    </Router>
  );
};

export default App;