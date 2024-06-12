import React, { useState, useEffect } from "react";
import { listarFiltrados } from "../../API/CitasApi";
import { Button, Modal } from "react-bootstrap";
import { useSession } from "../Usuarios/Login";
import Navegador from "../generales/Navegador";

const Home = () => {
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null); // Estado para la cita seleccionada
  const { session } = useSession(); // Obtén los datos de sesión

  console.log("Sesión del usuario:", session);

  const filtrarCitasPorFecha = (citas) => {
    if (session.rol === "Administrador") {
      return citas.filter((cita) => cita.estadoCita !== "Cancelada"); // Administrador ve todas las citas, excepto las canceladas
    }
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha
    return citas.filter((cita) => {
      const fechaCita = new Date(cita.agenda.fechaAgenda);
      return fechaCita >= hoy && cita.estadoCita !== "Cancelada"; // Excluir citas canceladas
    });
  };

  const handleShowModal = (cita) => {
    setSelectedCita(cita); // Establece la cita seleccionada
    setShowModal(true);
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCita(null); // Restablece la cita seleccionada
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.rol && session.id) {
          const rol = session.rol;
          const id = session.id;
          const data = await listarFiltrados(rol, id);
          const citasFiltradas = filtrarCitasPorFecha(data);
          setCitas(citasFiltradas);
        } else {
          console.error("Datos de sesión no disponibles.");
        }
      } catch (error) {
        console.error("Error al listar citas:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <Navegador>
      <div className="container mt-2 d-flex flex-column w-100">
        <div className="table-responsive w-100">
          <table className="table table-hover table-sm shadow w-100">
            <thead
              className="table-primary"
              style={{ verticalAlign: "middle" }}
            >
              <tr>
                <th className="text-center SetCellHeight">Fecha</th>
                <th className="SetCellHeight">Consultorio</th>
                <th className="SetCellHeight">Sede</th>
                <th className="SetCellHeight">Médico</th>
                <th className="SetCellHeight">Estado Cita</th>
                <th className="SetCellHeight">Tipo Cita</th>
                <th className="SetCellHeight">Nombre</th>
                <th className="SetCellHeight">Apellido</th>
                <th className="SetCellHeight">Correo</th>
                <th className="SetCellHeight">Acciones</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle" }}>
              {citas.length > 0 ? (
                citas.map((cita) => (
                  <tr key={cita._id}>
                    <td className="small-cell">
                      {new Date(cita.agenda.fechaAgenda).toLocaleDateString()}{" "}
                      {cita.agenda.horaAgenda}
                    </td>
                    <td className="small-cell">
                      {cita.agenda?.consultorio?.codigoConsultorio ||
                        "Consultorio no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.agenda?.consultorio?.sede?.direccionSede ||
                        "Sede no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.medico.nombresMedico} {cita.medico.apellidosMedico}
                    </td>
                    <td className="small-cell">
                      {cita.estadoCita || "Estado no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.tipoCita || "Tipo no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.paciente?.nombresPaciente || "Nombre no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.paciente?.apellidosPaciente ||
                        "Apellido no disponible"}
                    </td>
                    <td className="small-cell">
                      {cita.paciente?.correo || "Correo no disponible"}
                    </td>
                    <td className="small-cell">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleShowModal(cita)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No hay citas disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Renderiza el modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCita ? (
            <>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(selectedCita.agenda.fechaAgenda).toLocaleDateString()}{" "}
                {selectedCita.agenda.horaAgenda}
              </p>
              <p>
                <strong>Consultorio:</strong>{" "}
                {selectedCita.agenda?.consultorio?.codigoConsultorio ||
                  "Consultorio no disponible"}
              </p>
              <p>
                <strong>Sede:</strong>{" "}
                {selectedCita.agenda?.consultorio?.sede?.direccionSede ||
                  "Sede no disponible"}
              </p>
              <p>
                <strong>Médico:</strong> {selectedCita.medico.nombresMedico}{" "}
                {selectedCita.medico.apellidosMedico}
              </p>
              <p>
                <strong>Estado Cita:</strong>{" "}
                {selectedCita.estadoCita || "Estado no disponible"}
              </p>
              <p>
                <strong>Tipo Cita:</strong>{" "}
                {selectedCita.tipoCita || "Tipo no disponible"}
              </p>
              <p>
                <strong>Nombre:</strong>{" "}
                {selectedCita.paciente?.nombresPaciente ||
                  "Nombre no disponible"}
              </p>
              <p>
                <strong>Apellido:</strong>{" "}
                {selectedCita.paciente?.apellidosPaciente ||
                  "Apellido no disponible"}
              </p>
              <p>
                <strong>Correo:</strong>{" "}
                {selectedCita.paciente?.correo || "Correo no disponible"}
              </p>
            </>
          ) : (
            <p>No hay información disponible</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Navegador>
  );
};

export default Home;
