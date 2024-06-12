import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { formatInTimeZone } from "date-fns-tz";
import Swal from "sweetalert2";
import { parseISO } from "date-fns";
import { Link } from 'react-router-dom';
// import { EstadoCita } from "./Citas";
import { useSession } from "../Usuarios/Login";
import { asistenciaCita } from "../../API/CitasApi";

const EstadoCita = Object.freeze({
    ACTIVA: "Activa",
    CANCELADA: "Cancelada",
});

function TableCitas(props) {
    const { citas, onDelete } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const { session } = useSession(); // Obtener los datos del usuario que inicia sesión

    useEffect(() => {
        if (selectedCita) {
            setIsChecked(selectedCita.asistencia);
        }
    }, [selectedCita]);

    const formatearFecha = (fechaISO, hora) => {
        if (!fechaISO) return 'Fecha no disponible';
        if (!hora) return 'Hora no disponible';

        // Parsear la fecha ISO
        const fecha = parseISO(fechaISO);
        if (isNaN(fecha)) return 'Fecha no válida';

        // Extraer horas y minutos de la hora proporcionada
        const [hours, minutes] = hora.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return 'Hora no válida';

        // Crear una nueva fecha combinando la fecha y la hora proporcionadas
        const combinedDate = new Date(Date.UTC(
            fecha.getUTCFullYear(),
            fecha.getUTCMonth(),
            fecha.getUTCDate(),
            hours,
            minutes
        ));

        // Formatear la fecha en la zona horaria deseada
        const timeZone = 'UTC'; // Puedes cambiarlo a otra zona horaria si es necesario
        return formatInTimeZone(combinedDate, timeZone, 'yyyy-MM-dd HH:mm');
    };

    function obtenerNombreCompleto(nombre, apellido) {
        if (!nombre || !apellido) {
            return "Médico no disponible";
        } else {
            const nombreCompleto = nombre + " " + apellido;
            return nombreCompleto;
        }
    }

    const handleCheckboxChange = (idCita, event) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        asistenciaCita(idCita, isChecked)
            .then((data) => {
                if (data) {
                    console.log("Cita modificada con éxito");
                } else {
                    console.error("No se pudo modificar la cita");
                }
            })
            .catch((err) => {
                console.error(`Error al modificar la cita con ID: ${idCita}`, err);
            });
    };

    const handleView = (cita) => {
        setSelectedCita(cita);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleDelete = (idCita, idAgenda) => {
        Swal.fire({
            title: 'Confirmar cancelación',
            text: "¿Estás seguro de que deseas cancelar esta cita?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(idCita, idAgenda);
                Swal.fire(
                    'Cancelada!',
                    'La cita ha sido cancelada.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="container mt-2 d-flex flex-column w-100">
            <div className="table-responsive w-100">
                <table className="table table-hover table-sm shadow w-100">
                    <thead className="table-primary" style={{ verticalAlign: "middle" }}>
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
                                        {formatearFecha(
                                            cita.agenda?.fechaAgenda,
                                            cita.agenda?.horaAgenda
                                        )}
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
                                        {obtenerNombreCompleto(cita?.medico.nombresMedico, cita?.medico.apellidosMedico)}
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
                                        {cita.paciente?.apellidosPaciente || "Apellido no disponible"}
                                    </td>
                                    <td className="small-cell">
                                        {cita.paciente?.correo || "Correo no disponible"}
                                    </td>
                                    <td
                                        className="align-middle text-nowrap"
                                        style={{ whiteSpace: "nowrap" }}>
                                        {cita.estadoCita === EstadoCita.ACTIVA ? (
                                            <button
                                                className="btn btn-sm me-2 btn-outline-danger"
                                                onClick={() => handleDelete(cita._id, cita.agenda.idAgenda)}>
                                                <i class="fas fa-ban"></i>
                                            </button>
                                        ) : null}
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => handleView(cita)}>
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No hay citas disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCita ? (
                        <>
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {formatearFecha(
                                    selectedCita.agenda?.fechaAgenda,
                                    selectedCita.agenda?.horaAgenda
                                )}
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
                                <strong>Médico:</strong>{" "}
                                {obtenerNombreCompleto(selectedCita?.medico.nombresMedico, selectedCita?.medico.apellidosMedico)}
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
                                <strong>Nombre del Paciente:</strong>{" "}
                                {selectedCita.paciente?.nombresPaciente || "Nombre no disponible"}
                            </p>
                            <p>
                                <strong>Apellido del Paciente:</strong>{" "}
                                {selectedCita.paciente?.apellidosPaciente || "Apellido no disponible"}
                            </p>
                            <p>
                                <strong>Correo del Paciente:</strong>{" "}
                                {selectedCita.paciente?.correo || "Correo no disponible"}
                            </p>
                        </>
                    ) : (
                        <p>No hay información disponible</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {(selectedCita?.estadoCita === EstadoCita.ACTIVA && (session?.rol === "Medico" || session?.rol === "Administrador")) ? (
                        <Link to={`/Historias?${selectedCita?._id}`}>
                            <Button variant="primary">Crear Historia</Button>
                        </Link>
                    ) : null}
                    {(session?.rol === "Administrador") ? (
                        <Form.Group controlId="checkbox">
                            <Form.Check
                                type="checkbox"
                                label="Asistencia"
                                checked={isChecked}
                                onChange={(event) => handleCheckboxChange(selectedCita._id, event)}
                            />
                        </Form.Group>
                    ) : null}

                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TableCitas;
