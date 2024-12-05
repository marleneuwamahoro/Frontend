import React, { useState } from 'react';
import axios from 'axios';

const AddRole = ({ onSubmit, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    allowedMenus: ''
  });

  // Updated inline CSS for the new design
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#eaeaea",
      color: "#444",
      lineHeight: "1.6",
      minHeight: "100vh",
      padding: "0 10px"
    },
    header: {
      background: "linear-gradient(to right, #4caf50, #388e3c)",
      color: "white",
      padding: "2rem 0",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    },
    headerText: {
      fontSize: "2.5rem",
      marginBottom: "10px"
    },
    buttonContainer: {
      textAlign: "center",
      margin: "20px"
    },
    button: {
      padding: "12px",
      background: "#ff5722",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      textDecoration: "none",
      margin: "0 10px",
      transition: "background 0.3s",
      cursor: "pointer"
    },
    buttonHover: {
      background: "#ff784e"
    },
    formContainer: {
      width: "90%",
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      background: "white",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      transition: "border-color 0.3s"
    },
    inputFocus: {
      borderColor: "#4caf50",
      outline: "none"
    },
    submitButton: {
      padding: "12px",
      background: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      transition: "background 0.3s",
      width: "100%",
      cursor: "pointer"
    },
    submitButtonHover: {
      background: "#388e3c"
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginBottom: "20px"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      name: formData.name,
      allowedMenus: formData.allowedMenus.split(',')
    };

    try {
      const response = await axios.post('https://backendapprication-8eeb6fd4c701.herokuapp.com/roles', roleData);
      alert('Role added successfully!');
      if (onSubmit) onSubmit(response.data);
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Failed to add role');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>Add New Role</h1>
      </header>

      <div style={styles.buttonContainer}>
        <a
          href="/AdminDashboard"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#ff5722")}
        >
          Back to Dashboard
        </a>
        <a
          href="/Role-List"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#ff5722")}
        >
          View All Roles
        </a>
      </div>

      <div style={styles.formContainer}>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Role Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="allowedMenus" style={styles.label}>Allowed Menus (comma separated):</label>
            <input
              type="text"
              id="allowedMenus"
              name="allowedMenus"
              value={formData.allowedMenus}
              onChange={handleChange}
              style={styles.input}
              placeholder="Menu1, Menu2"
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => (e.target.style.background = styles.submitButtonHover.background)}
            onMouseLeave={(e) => (e.target.style.background = "#4caf50")}
          >
            Add Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
