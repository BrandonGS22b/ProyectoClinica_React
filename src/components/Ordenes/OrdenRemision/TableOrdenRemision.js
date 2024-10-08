import React, { useState, useEffect } from 'react';
import { useSession } from "../../Usuarios/Login";

function TableOrdenRemision(props) {
  const { OrdenesRemision, onView, onCancel } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');
  const [showLoading, setShowLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!OrdenesRemision || OrdenesRemision.length === 0) {
        setLoadingMessage('Lo sentimos, no encontramos ordenes asociadas.')
        setShowLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);

  }, [OrdenesRemision]);

  if (!session) {
    return <p>Loading session...</p>;
  }

  if (!showLoading || !OrdenesRemision || OrdenesRemision.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
        <div className="spinner-border text-primary" role="status" style={{ display: showLoading ? 'inline-block' : 'none' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-2">{loadingMessage}</span>
      </div>
    );
  }

  let filteredOrdenes = OrdenesRemision;

  if (session.rol !== 'Medico' && session.rol !== 'Paciente') {
    filteredOrdenes = OrdenesRemision.filter(orden => {
      const searchText = searchTerm.toLowerCase().trim();
      return (
        orden.idHistorias.toLowerCase().includes(searchText) ||
        orden.paciente.documento.toLowerCase().includes(searchText) ||
        orden._id.toLowerCase().includes(searchText) ||
        orden.medico.nombres.toLowerCase().includes(searchText)
      );
    });
  } else {
    filteredOrdenes = OrdenesRemision.filter(orden => {
      const searchText = searchTerm.toLowerCase().trim();
      const isUserInvolved = orden.paciente.idUsuario === session.id || orden.medico.idUsuario === session.id;
      return isUserInvolved && (
        orden.idHistorias.toLowerCase().includes(searchText) ||
        orden.paciente.documento.toLowerCase().includes(searchText) ||
        orden._id.toLowerCase().includes(searchText) ||
        orden.medico.nombres.toLowerCase().includes(searchText) 
      );
    });
  }

  return (
    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
      <div className="container my-3 overflow-auto">
    
        <input
          type="text"
          placeholder="Buscar por ID de Orden de Remision, Documento de paciente, nombre de medico"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />
      
        <table className="table table-hover shadow">
          <thead className="bg-primary text-white">
            <tr className="table-primary">
              <th>Fecha Creacion</th>
              <th>Estado</th>
              <th>Paciente</th>
              <th>Documento Paciente</th>
              <th>Médico</th>
              <th>Documento Médico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrdenes.map((ordenRemision) => (
              <tr key={ordenRemision._id}>
                <td>{new Date(ordenRemision.fechaCreacion).toLocaleDateString()}</td>
                <td>{ordenRemision.estado}</td>
                <td>{ordenRemision.paciente.nombres} {ordenRemision.paciente.apellidos}</td>
                <td>{ordenRemision.paciente.documento}</td>
                <td>{ordenRemision.medico.nombres} {ordenRemision.medico.apellidos}</td>
                <td>{ordenRemision.medico.documento}</td>
                <td>
                  <button className="btn btn-outline-primary btn-block" onClick={() => onView(ordenRemision)}><i className="fas fa-eye"></i></button>
                  {session.rol !== 'Paciente' && (
                    <button className='btn btn-outline-danger btn-block' onClick={() => { onCancel(ordenRemision._id) }}>
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

export default TableOrdenRemision;