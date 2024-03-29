import React, { Children, useState } from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Functional component for the default layout of the application
function DefaultLayout({ children }) {
  // State to manage the collapse/expand state of the sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Redux state: User information
  const { user } = useSelector((state) => state.users);
  // Navigation function to navigate to different routes
  const navigateToPath = useNavigate();
  // Menu items for regular users
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-3-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  // Menu items for admin users
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-3-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-2-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  // Determine which set of menu items to render based on user role
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  // Get the currently active route
  const activeRoute = window.location.pathname;

  // Render the layout structure
  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">NG</h1>
          <h3 className="logo">Travels</h3>
          <h3 className="role">
            {user?.name} <br />
            Role :{user?.isAdmin ? " Admin" : " User"}
          </h3>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-item"
                } items`}
              >
                <i
                  className={item.icon}
                  onClick={() => {
                    if (item.path === "/logout") {
                      localStorage.removeItem("token");
                      navigateToPath("/login");
                    } else {
                      navigateToPath(item.path);
                    }
                  }}
                ></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigateToPath("/login");
                      } else {
                        navigateToPath(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-expand-right-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              class="ri-menu-fold-fill"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

// Export the DefaultLayout component
export default DefaultLayout;
