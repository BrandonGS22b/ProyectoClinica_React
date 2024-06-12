import React, { useState, useEffect } from 'react';
import { useSession } from "../../Usuarios/Login";

function TableOrdenIncapacidad(props) {
  const { OrdenesIncapacidad, onView, onCancel } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');
  const [showLoading, setShowLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!OrdenesIncapacidad || OrdenesIncapacidad.length === 0) {
        setLoadingMessage('Lo sentimos, no encontramos ordenes asociadas.')
        setShowLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);

  }, [OrdenesIncapacidad]);

  if (!session) {
    return <p>Loading session...</p>;
  }

  if (!showLoading || !OrdenesIncapacidad || OrdenesIncapacidad.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
        <div className="spinner-border text-primary" role="status" style={{ display: showLoading ? 'inline-block' : 'none' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-2">{loadingMessage}</span>
      </div>
    );
  }

  let filteredOrdenes = OrdenesIncapacidad;

  if (session.rol !== 'Medico' && session.rol !== 'Paciente') {
    filteredOrdenes = OrdenesIncapacidad.filter(orden => {
      const searchText = searchTerm.toLowerCase().trim();
      return (
        orden.idHistorias.toLowerCase().includes(searchText) ||
        orden.paciente.documento.toLowerCase().includes(searchText) ||
        orden._id.toLowerCase().includes(searchText) ||
        orden.medico.nombres.toLowerCase().includes(searchText) || 
        orden.medico.nombres.toLowerCase().includes(searchText)
      );
    });
  } else {
    filteredOrdenes = OrdenesIncapacidad.filter(orden => {
      const searchText = searchTerm.toLowerCase().trim();
      const isUserInvolved = orden.paciente.idUsuario === session.id || orden.medico.idUsuario === session.id;
      return isUserInvolved && (
        orden.idHistorias.toLowerCase().includes(searchText) ||
        orden.paciente.documento.toLowerCase().includes(searchText) ||
        orden._id.toLowerCase().includes(searchText)
      );
    });
  }

  return (
    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
      <div className="container my-3 overflow-auto">
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por ID de Orden de Incapacidad, Documento de paciente, nombre de medico "
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />

        {/* Tabla de Ordenes de Incapacidad */}
        <table className="table table-hover shadow">
          <thead className="bg-primary text-white">
            <tr className="table-primary">
              <th>Fecha Inicio</th>
              <th>Estado</th>
              <th>Paciente</th>
              <th>Documento Paciente</th>
              <th>Médico</th>
              <th>Documento Medico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrdenes.map((orden) => (
              <tr key={orden._id}>
                <td>{new Date(orden.fechaInicio).toLocaleDateString()}</td>
                <td>{orden.estado}</td>
                <td>{orden.paciente.nombres} {orden.paciente.apellidos}</td>
                <td>{orden.paciente.documento}</td>
                <td>{orden.medico.nombres} {orden.medico.apellidos}</td>
                <td>{orden.medico.documento}</td>
                <td>
                  <button className="btn btn-outline-primary btn-block" onClick={() => onView(orden)}><i className="fas fa-eye"></i></button>
                  {session.rol !== 'Paciente' && (
                    <button className='btn btn-outline-danger btn-block' onClick={() => { onCancel(orden._id) }}>
                      <i class="fas fa-ban"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableOrdenIncapacidad;