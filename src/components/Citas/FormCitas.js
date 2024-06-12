import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EstadoAgenda } from "./Citas";
import { useSession } from "../Usuarios/Login";
import { getListUsers } from "../../API/UsuariosAPI";

function FormCitas(props) {
    const { onSave } = props;
    const { session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [uniqueSpecialties, setUniqueSpecialties] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://e191be2024g3.onrender.com/agenda/GetAll")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                const specialties = jsonData.map((item) => item.tipoAgenda);
                const uniqueSpecialties = [...new Set(specialties)];
                setUniqueSpecialties(uniqueSpecialties);
                setSelectedSpecialty(uniqueSpecialties[0]);
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));

        if (session?.rol === "Administrador") {
            getUsersFromDatabase();
        }
    }, [session]);

    const getUsersFromDatabase = async () => {
        try {
            const userList = await getListUsers();
            const filteredUsers = userList.filter((user) => user.rol === "Paciente");
            setUsers(filteredUsers);
            setSelectedUser(filteredUsers[0]);
        } catch (error) {
            console.error("Error al obtener la lista de usuarios:", error);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
        setAppointments(data);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSpecialtyChange = (e) => {
        const specialty = e.target.value;
        setSelectedSpecialty(specialty);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        const selected = users.find((user) => user._id === userId);
        setSelectedUser(selected);
    };

    const handleSubmit = (cita) => {
        if (session?.rol === "Administrador") {
            if (!selectedUser) {
                alert("Por favor, seleccione un usuario.");
                return;
            }

            onSave({
                usuario: selectedUser,
                cita
            });
        } else {
            onSave({ cita });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Asignación Citas Médicas</h2>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>Especialidad</Form.Label>
                        {uniqueSpecialties.length > 0 && (
                            <Form.Control
                                as="select"
                                value={selectedSpecialty}
                                onChange={handleSpecialtyChange}
                            >
                                {uniqueSpecialties.map((specialty, index) => (
                                    <option key={index} value={specialty}>
                                        {specialty}
                                    </option>
                                ))}
                            </Form.Control>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Fecha Deseada</Form.Label>
                        <Form.Control
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Form.Group>

                    {session?.rol === "Administrador" && (
                        <>
                            <Form.Group>
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedUser ? selectedUser._id : ""}
                                    onChange={handleUserChange}
                                >
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.tipoDocumento}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            {selectedUser && (
                                <>
                                    <Form.Group>
                                        <Form.Label>Documento</Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                    </Form.Group>
                                </>
                            )}
                        </>
                    )}

                    <Button variant="success" onClick={handleShowModal} className="mt-3">
                        Consultar
                    </Button>
                </Form>
            )}

            <AppointmentModal
                show={showModal}
                handleClose={handleCloseModal}
                appointments={appointments}
                selectedDate={selectedDate}
                selectedSpecialty={selectedSpecialty}
                onSave={handleSubmit}
            />
        </div>
    );
}

function AppointmentModal({
    show,
    handleClose,
    appointments,
    selectedDate,
    selectedSpecialty,
    onSave,
}) {
    const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.fechaAgenda)
            .toISOString()
            .split("T")[0];
        const appointmentSpecialty = appointment.tipoAgenda;
        const isActive = appointment.estadoAgenda === EstadoAgenda.ACTIVA;
        const hasConsultorio = appointment.consultorio && appointment.consultorio.idConsultorio;

        return (
            appointmentDate === selectedDate &&
            appointmentSpecialty === selectedSpecialty &&
            isActive &&
            hasConsultorio
        );
    });

    console.log("Filtered Appointments:", filteredAppointments);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Citas Disponibles para {selectedDate}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {filteredAppointments.length > 0 ? (
                    <ul>
                        {filteredAppointments.map((cita, index) => (
                            <Button
                                key={index}
                                variant="primary"
                                onClick={() => onSave(cita)}
                                className="mb-2">
                                <li>
                                    {cita.horaInicio} - {cita.horaFin} con Dr.{" "}
                                    {cita.medico.nombres} {cita.medico.apellidos}
                                </li>
                            </Button>
                        ))}
                    </ul>
                ) : (
                    <p>No hay citas disponibles para esta fecha y especialidad.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormCitas;
