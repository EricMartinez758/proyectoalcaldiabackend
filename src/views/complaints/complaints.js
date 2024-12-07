import React, { useState, useEffect } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las denuncias
  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/complaints'); // Cambia la URL según tu API
      if (!response.ok) throw new Error('Error al cargar las denuncias');
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) return <p>Cargando denuncias...</p>;
  if (error) return <p>Error al cargar denuncias: {error}</p>;

  return (
    <div>
      <h2>Listado de Denuncias Realizadas</h2>
      <CTable hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Usuario</CTableHeaderCell>
            <CTableHeaderCell>Problema</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
            <CTableHeaderCell>Parroquia</CTableHeaderCell>
            <CTableHeaderCell>Dirección</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Fecha</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {complaints.map((complaint) => (
            <CTableRow key={complaint.complaints_id}>
              <CTableDataCell>{complaint.complaints_id}</CTableDataCell>
              <CTableDataCell>{complaint.id}</CTableDataCell>
              <CTableDataCell>{complaint.problems_id}</CTableDataCell>
              <CTableDataCell>{complaint.description}</CTableDataCell>
              <CTableDataCell>{complaint.id_parish}</CTableDataCell>
              <CTableDataCell>{complaint.address}</CTableDataCell>
              <CTableDataCell>{complaint.status_id}</CTableDataCell>
              <CTableDataCell>{complaint.complaint_date}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default Complaints;
