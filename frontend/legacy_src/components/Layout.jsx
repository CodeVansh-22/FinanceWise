import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/layout.css';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
      <div className="layout-main">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
