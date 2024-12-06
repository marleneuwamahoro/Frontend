import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const UserDashboard = ({ firstname, lastname, username }) => {
  const [allowedMenus, setAllowedMenus] = useState([]);
  const [role, setRole] = useState('');

  // Fetch allowedMenus from localStorage when the component mounts
  useEffect(() => {
    const menus = JSON.parse(localStorage.getItem('allowedMenus'));
    const role = localStorage.getItem('role');
    setRole(role);
    if (menus) {
      setAllowedMenus(menus);
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="bg-primary text-white py-5 text-center">
        <h1 className="display-4">Welcome to Your Dashboard</h1>
        <p className="lead">Hello {firstname} {lastname}, you're logged in as {role}.</p>
      </header>

      {/* Dashboard Container */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h2 className="h4 m-0">{role}'s Menu</h2>
              </div>
              <div className="card-body">
                <p className="fs-5 mb-4">Explore the options available to you:</p>
                {/* User Menu */}
                <div className="d-flex flex-wrap gap-3 justify-content-start">
                  {allowedMenus && allowedMenus.length > 0 ? (
                    allowedMenus.map((menu, index) => (
                      <a
                        key={index}
                        href={`/${menu.toLowerCase().replace(" ", "-")}`}
                        className="btn btn-outline-primary btn-lg"
                      >
                        {menu}
                      </a>
                    ))
                  ) : (
                    <p>No menus available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="d-flex justify-content-center my-4">
        <Link to="/login" className="btn btn-danger btn-lg text-uppercase fw-bold">
          Logout
        </Link>
      </div>

    </>
  );
};

export default UserDashboard;
