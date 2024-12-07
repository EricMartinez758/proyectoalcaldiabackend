import React, { useState, useEffect } from "react";

function Users() {
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openInsertModal = () => {
    setForm({ id: "", username: "", password: "" });
    setModalInsert(true);
  };

  const closeInsertModal = () => setModalInsert(false);

  const openEditModal = (item) => {
    setForm(item);
    setModalUpdate(true);
  };

  const closeEditModal = () => setModalUpdate(false);

  const handleInsert = () => {
    const newData = { ...form, id: data.length + 1 };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setData([...data, newUser]);
        closeInsertModal();
      })
      .catch((error) => console.error("Error inserting data: ", error));
  };

  const handleEdit = () => {

    fetch(`http://localhost:5000/users/${autoincrement.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        const updatedData = data.map((item) =>
          item.id === form.id ? updatedUser : item
        );
        setData(updatedData);
        closeEditModal();
      })
      .catch((error) => console.error("Error updating data: ", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this record?")) {
      fetch(`http://localhost:5000/users/${id}`, {
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
        Insert New User
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>
                <button className="btn btn-success btn-sm mx-1" onClick={() => openEditModal(item)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(item.id)}>
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
                <h5 className="modal-title">Insert User</h5>
                <button className="btn-close" onClick={closeInsertModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
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
                <h5 className="modal-title">Edit User</h5>
                <button className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control mb-2"
                  value={form.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  value={form.password}
                  onChange={handleChange}
                />
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

export default Users;
