import React from "react";

const EditUser = ({ user, roles }) => {
  return (
    <div className="container mt-4">
      <header className="bg-light text-primary py-3 text-center shadow-sm sticky-top">
        <h1 className="h4">Edit User</h1>
      </header>

      <div className="card mx-auto mt-4 shadow-sm" style={{ maxWidth: "700px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="h5 text-center m-0">Update User Information</h2>
        </div>
        <div className="card-body">
          <form action={`/edit/${user.id}`} method="post">
            <div className="row">
              {/* Username */}
              <div className="col-md-6 mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={user.username}
                  className="form-control"
                  required
                />
              </div>
              {/* Email */}
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  className="form-control"
                  required
                />
              </div>
              {/* Password */}
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={user.password}
                  className="form-control"
                  required
                />
              </div>
              {/* First Name */}
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName}
                  className="form-control"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={user.lastName}
                  className="form-control"
                  required
                />
              </div>
              {/* Date of Birth */}
              <div className="col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  defaultValue={user.dob}
                  className="form-control"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={user.phone}
                  className="form-control"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              {/* Role */}
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select id="role" name="role" className="form-select" required>
                  {roles.map((role) => (
                    <option
                      key={role.name}
                      value={role.name}
                      selected={role.name === user.role}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary w-50">
                Save Changes
              </button>
              <a href="/AdminDashboard" className="btn btn-secondary w-50 ms-2">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Back to Dashboard Link */}
      <div className="text-center mt-3">
        <a href="/AdminDashboard" className="text-primary text-decoration-none">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default EditUser;
