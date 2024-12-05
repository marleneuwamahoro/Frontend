import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoleListPage = () => {
  const [roles, setRoles] = useState([]); // To hold roles data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch roles from backend when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://backendapprication-8eeb6fd4c701.herokuapp.com/roles'); // Assuming your API endpoint is /api/roles
        setRoles(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div style={styles.container}>Loading roles...</div>;
  }

  if (error) {
    return <div style={styles.container}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerText}>Role Management</h1>
        </div>
      </header>

      {/* Button Group */}
      <div style={styles.buttonGroup}>
        <a href="/AdminDaschboard" style={styles.buttonBack}>
          Back to Dashboard
        </a>
        <a href="/AddRole" style={styles.buttonAdd}>
          Add New Role
        </a>
      </div>

      {/* Table Section */}
      <div style={styles.card}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Role Name</th>
                <th style={styles.tableHeader}>Allowed Menus</th>
              </tr>
            </thead>
            <tbody>
              {roles && roles.length > 0 ? (
                roles.map((role) => (
                  <tr key={role.id}>
                    <td style={styles.tableCell}>{role.id}</td>
                    <td style={styles.tableCell}>
                      <span style={styles.roleBadge}>{role.name}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.menusList}>
                        {Array.isArray(role.allowedMenus)
                          ? role.allowedMenus.map((menu, index) => (
                              <span key={index} style={styles.menuItem}>
                                {menu}
                              </span>
                            ))
                          : role.allowedMenus.split(',').map((menu, index) => (
                              <span key={index} style={styles.menuItem}>
                                {menu}
                              </span>
                            ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={styles.tableCell}>
                    No roles available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f4f6f8",
    color: "#1a1a1a",
    lineHeight: "1.6",
    minHeight: "100vh",
    padding: "2rem",
  },
  header: {
    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    padding: "2rem 0",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  headerText: {
    fontSize: "2rem",
    color: "white",
    fontWeight: "600",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  buttonBack: {
    backgroundColor: "#64748b",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonAdd: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    whiteSpace: "nowrap",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #e2e8f0",
  },
  tableCell: {
    padding: "1rem",
    borderBottom: "1px solid #e2e8f0",
    color: "#1e293b",
  },
  roleBadge: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  menusList: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  menuItem: {
    backgroundColor: "#f1f5f9",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
    color: "#475569",
  },
};

export default RoleListPage;
