import React, { useState, useEffect } from "react";

function Workers() {
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [form, setForm] = useState({
    id: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    status: "",
  });

  // Fetch initial data
  useEffect(() => {
    fetch("http://localhost:4000/employees")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openInsertModal = () => {
    setForm({
      id: "",
      firstname: "",
      lastname: "",
      phone: "",
      role: "worker", 
      status: "active", 
    });
    setModalInsert(true);
  };

  const closeInsertModal = () => setModalInsert(false);

  const openEditModal = (item) => {
    setForm(item);
    setModalUpdate(true);
  };

  const closeEditModal = () => setModalUpdate(false);

  const handleInsert = () => {
    fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((newEmployee) => {
        setData([...data, newEmployee]);
        closeInsertModal();
      })
      .catch((error) => console.error("Error inserting data: ", error));
  };

  const handleEdit = () => {
    fetch(`http://localhost:4000/employees/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((updatedEmployee) => {
        const updatedData = data.map((item) =>
          item.id === form.id ? updatedEmployee : item
        );
        setData(updatedData);
        closeEditModal();
      })
      .catch((error) => console.error("Error updating data: ", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this record?")) {
      fetch(`http://localhost:4000/employees/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          const filteredData = data.filter((item) => item.id !== id);
          setData(filteredData);
        })
        .catch((error) => console.error("Error deleting data: ", error));
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={openInsertModal}>
        Insert New Employee
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mx-1"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Insert */}
      {modalInsert && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Insert Employee</h5>
                <button className="btn-close" onClick={closeInsertModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <select
                  name="role"
                  className="form-control mb-2"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="worker">Worker</option>
                  <option value="supervisor">Supervisor</option>
                </select>
                <select
                  name="status"
                  className="form-control"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleInsert}>
                  Insert
                </button>
                <button className="btn btn-secondary" onClick={closeInsertModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {modalUpdate && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  className="form-control mb-2"
                  value={form.firstname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  className="form-control mb-2"
                  value={form.lastname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control mb-2"
                  value={form.phone}
                  onChange={handleChange}
                />
                <select
                  name="role"
                  className="form-control mb-2"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="worker">Worker</option>
                  <option value="supervisor">Supervisor</option>
                </select>
                <select
                  name="status"
                  className="form-control"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleEdit}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={closeEditModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workers;
