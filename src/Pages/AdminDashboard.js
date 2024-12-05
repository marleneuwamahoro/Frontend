import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backendapprication-8eeb6fd4c701.herokuapp.com/users');
        let usersData = Array.isArray(response.data) ? response.data : response.data.users;
        if (usersData) {
          const filteredUsers = usersData.filter(user => user.role !== 'administrator');
          setUsers(filteredUsers);
          setFilteredUsers(filteredUsers);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://backendapprication-8eeb6fd4c701.herokuapp.com/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      (user) => 
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
    setCurrentPage(0);
  }, [search, users, selectedRole]);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleRoleChange = (event) => setSelectedRole(event.target.value);
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://backendapprication-8eeb6fd4c701.herokuapp.com/delete/${userId}`);
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      } catch (err) {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://backendapprication-8eeb6fd4c701.herokuapp.com/edit/${selectedUser.id}`, selectedUser);
      setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
      closeModal();
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const startIndex = currentPage * pageSize;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  return (
    <div className="container-fluid">
      <header className="bg-primary text-white py-4 text-center mb-4">
        <h1>Admin Dashboard</h1>
        <div className="d-flex justify-content-center">
          <Link to="/Role-List" className="btn btn-outline-light mx-2">View Roles</Link>
          <Link to="/AddRole" className="btn btn-outline-light mx-2">Manage Roles</Link>
          <Link to="/Upload" className="btn btn-outline-light mx-2">Manage file</Link>
          <Link to="/login" className="btn btn-danger mx-2">Logout</Link>
        </div>
      </header>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by username or email"
          value={search}
          onChange={handleSearch}
        />
        <div className="d-flex">
          <select
            className="form-select mx-2"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
          <select
            className="form-select mx-2"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}</th>
            <th onClick={() => requestSort('username')}>Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}</th>
            <th onClick={() => requestSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}</th>
            <th onClick={() => requestSort('firstName')}>First Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}</th>
            <th onClick={() => requestSort('lastName')}>Last Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />)}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.slice(startIndex, startIndex + pageSize).map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button className="btn btn-warning mx-1" onClick={() => openEditModal(user)}>Edit</button>
                <button className="btn btn-danger mx-1" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && <div className="alert alert-warning text-center">No users found.</div>}

      <div className="pagination d-flex justify-content-center">
        {currentPage > 0 && <button className="btn btn-secondary" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} className={`btn ${index === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`} onClick={() => setCurrentPage(index)}>{index + 1}</button>
        ))}
        {currentPage < totalPages - 1 && <button className="btn btn-secondary" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal fade show d-block" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit User</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUserUpdate}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={selectedUser.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={selectedUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={selectedUser.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={selectedUser.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={closeModal}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
