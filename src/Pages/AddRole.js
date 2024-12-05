import React, { useState } from 'react';
import axios from 'axios';

const AddRole = ({ onSubmit, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    allowedMenus: ''
  });

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
      const response = await axios.post(
        'https://backendapprication-8eeb6fd4c701.herokuapp.com/roles',
        roleData
      );
      alert('Role added successfully!');
      if (onSubmit) onSubmit(response.data);
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Failed to add role');
    }
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-success text-white text-center py-4 shadow-sm">
        <h1 className="display-4">Add New Role</h1>
      </header>

      {/* Buttons */}
      <div className="text-center my-3">
        <a href="/AdminDashboard" className="btn btn-warning me-2">
          Back to Dashboard
        </a>
        <a href="/Role-List" className="btn btn-warning">
          View All Roles
        </a>
      </div>

      {/* Form Container */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                {errorMessage && (
                  <div className="alert alert-danger text-center">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                  {/* Role Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Role Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                      placeholder="Enter role name"
                    />
                  </div>
                  {/* Allowed Menus */}
                  <div className="mb-3">
                    <label htmlFor="allowedMenus" className="form-label">
                      Allowed Menus (comma separated):
                    </label>
                    <input
                      type="text"
                      id="allowedMenus"
                      name="allowedMenus"
                      value={formData.allowedMenus}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Menu1, Menu2"
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Add Role
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
