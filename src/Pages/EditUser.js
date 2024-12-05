import React from "react";

const EditUser = ({ user, roles }) => {
  const containerStyle = {
    maxWidth: "700px",
    background: "white",
    borderRadius: "10px",
    padding: "35px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  };

  const headerStyle = {
    width: "100%",
    backgroundColor: "#f0f4f8",
    color: "#2f6fb0",
    padding: "15px 0",
    textAlign: "center",
    position: "sticky",
    top: "0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  };

  const headerTextStyle = {
    fontSize: "1.6rem",
    fontWeight: "500",
    margin: "0",
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const formItemStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "0.85rem",
    color: "#2f6fb0",
    fontWeight: "500",
    marginBottom: "8px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "0.9rem",
    color: "#333",
    border: "1px solid #d3dbe4",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.3s",
  };

  const inputFocusStyle = {
    borderColor: "#2f6fb0",
    outline: "none",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "20px",
  };

  const submitButtonStyle = {
    flex: "1",
    padding: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    backgroundColor: "#2f6fb0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const submitButtonHoverStyle = {
    backgroundColor: "#245d99",
  };

  const cancelButtonStyle = {
    flex: "1",
    padding: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    backgroundColor: "#d1d5db",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const cancelButtonHoverStyle = {
    backgroundColor: "#b0b7c1",
  };

  const backToHomeStyle = {
    textAlign: "center",
    marginTop: "30px",
  };

  const linkStyle = {
    color: "#2f6fb0",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s",
  };

  const linkHoverStyle = {
    color: "#1e4f82",
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={headerTextStyle}>Edit User</h1>
      </header>

      <div style={containerStyle}>
        <h2 style={{ fontSize: "1.4rem", textAlign: "center", color: "#2f6fb0", marginBottom: "25px", fontWeight: "500" }}>
          Update User Information
        </h2>
        <form action={`/edit/${user.id}`} method="post">
          <div style={formGridStyle}>
            <div style={formItemStyle}>
              <label htmlFor="username" style={labelStyle}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={user.username}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2f6fb0")}
                onBlur={(e) => (e.target.style.borderColor = "#d3dbe4")}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user.email}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2f6fb0")}
                onBlur={(e) => (e.target.style.borderColor = "#d3dbe4")}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={user.password}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2f6fb0")}
                onBlur={(e) => (e.target.style.borderColor = "#d3dbe4")}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="firstName" style={labelStyle}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2f6fb0")}
                onBlur={(e) => (e.target.style.borderColor = "#d3dbe4")}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="lastName" style={labelStyle}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#2f6fb0")}
                onBlur={(e) => (e.target.style.borderColor = "#d3dbe4")}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="dob" style={labelStyle}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                defaultValue={user.dob}
                required
                style={inputStyle}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="phone" style={labelStyle}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={user.phone}
                required
                pattern="[0-9]{10}"
                style={inputStyle}
              />
            </div>
            <div style={formItemStyle}>
              <label htmlFor="role" style={labelStyle}>
                Role
              </label>
              <select id="role" name="role" required style={inputStyle}>
                {roles.map((role) => (
                  <option key={role.name} value={role.name} selected={role.name === user.role}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={buttonGroupStyle}>
            <button type="submit" style={submitButtonStyle}>
              Save Changes
            </button>
            <a href="/AdminDashboard" style={cancelButtonStyle}>
              Cancel
            </a>
          </div>
        </form>

        <div style={backToHomeStyle}>
          <p>
            <a href="/AdminDashboard" style={linkStyle}>
              Back to Dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
