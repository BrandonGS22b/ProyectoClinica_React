import React, { useState, useEffect } from "react";
import TableCitas from "./TableCitas"; // Componente de la tabla de citas
import FormCitas from "./FormCitas"; // Formulario de citas
import Swal from "sweetalert2";
import Footer from "../generales/Footer";
import Navegador from "../generales/Navegador";
import { agregarCita, cancelCita, listarFiltrados } from "../../API/CitasApi";
import { useSession } from "../Usuarios/Login";
import { searchById } from "../../API/UsuariosAPI";

export const EstadoAgenda = Object.freeze({
    ACTIVA: "Activa",
    INACTIVA: "Inactiva",
});

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [mostrarLista, setMostrarLista] = useState(true);
    const { session } = useSession(); // Obtener los datos del usuario que inicia sesión
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionData = async () => {
            setLoading(true);
            try {
                if (session) {
                    const data = await searchById(session.id);
                    setUsuario(data[0]);
                } else {
                    console.error("Datos de sesión no disponibles.");
                }
            } catch (error) {
                console.error("Error al filtrar citas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessionData();
    }, [session]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (usuario && usuario.rol && usuario._id) {
                    const rol = usuario.rol;
                    const id = usuario._id;
                    const data = await listarFiltrados(rol, id);
                    setCitas(data);
                } else {
                    console.error("Datos de usuario no disponibles.");
                }
            } catch (error) {
                console.error("Error al listar citas:", error);
            } finally {
                setLoading(false);
            }
        };

        if (usuario && mostrarLista) {
            fetchData();
        }
    }, [mostrarLista, usuario]);

    const verLista = () => {
        setMostrarLista(!mostrarLista);
    };


    const guardar = (appointment) => {

        console.log(appointment);
        const appointmentData = {
            tipoCita: appointment.cita.tipoAgenda,
            agenda: {
                idAgenda: appointment.cita._id || undefined,
                fechaAgenda: appointment.cita.fechaAgenda || undefined,
                horaAgenda: appointment.cita.horaInicio || undefined,
                estadoAgenda: appointment.cita.estadoAgenda || undefined,
                consultorio: appointment.cita.consultorio ? {
                    idConsultorio: appointment.cita.consultorio.idConsultorio || undefined,
                    codigoConsultorio: appointment.cita.consultorio.codigoConsultorio || undefined,
                    descripcionConsultorio: appointment.cita.consultorio.descripcionConsultorio || undefined,
                    sede: appointment.cita.consultorio.sede ? {
                        idSede: appointment.cita.consultorio.sede.idSede || undefined,
                        nombreSede: appointment.cita.consultorio.sede.nombreSede || undefined,
                        direccionSede: appointment.cita.consultorio.sede.direccionSede || undefined,
                        departamento: appointment.cita.consultorio.sede.departamento || undefined,
                        municipio: appointment.cita.consultorio.sede.municipio || undefined,
                        codigoUbicacion: appointment.cita.consultorio.sede.codigoUbicacion || undefined,
                    } : undefined,
                } : undefined,
            },
            medico: appointment.cita.medico ? {
                idMedico: appointment.cita.medico.idMedico || undefined,
                nombresMedico: appointment.cita.medico.nombres || undefined,
                apellidosMedico: appointment.cita.medico.apellidos || undefined,
                tipoDocumentoMedico: appointment.cita.medico.tipoDocumento || undefined,
                documentoMedico: appointment.cita.medico.documento || undefined,
                estadoMedico: appointment.cita.medico.estado || undefined,
                especialidad: appointment.cita.medico.especialidad || undefined,
            } : undefined,
            paciente: {
                idPaciente: usuario._id,
                nombresPaciente: usuario.nombres,
                apellidosPaciente: usuario.apellidos,
                tipoDocumentoPaciente: usuario.tipoDocumento,
                documentoPaciente: usuario.documento,
                estadoPaciente: usuario.estado,
                correo: usuario.correo,
            },
        };
    
        console.log("Datos de la cita a guardar:", appointmentData);

        return new Promise((resolve, reject) => {
            const confirmResult = Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas guardar esta cita?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, guardar cita",
                cancelButtonText: "Cancelar",
            });

            // Manejar la respuesta del usuario
            confirmResult.then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, intentar agregar la cita
                    console.log("Confirmación recibida, intentando agregar la cita");
                    console.log('appointmentData --->', appointmentData);
                    agregarCita(appointmentData)
                        .then((data) => {
                            console.log("Cita creada con éxito:", data);
                            Swal.fire({
                                title: "Cita guardada",
                                text: "La cita se ha guardado correctamente",
                                icon: "success",
                            });
                            fetch(`https://e191be2024g3.onrender.com/agenda/UpdateStatus/${appointmentData.agenda.idAgenda}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "estadoAgenda": EstadoAgenda.INACTIVA
                                })
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        console.log("Agenda desactivada exitosamente");
                                    } else {
                                        console.error("Error al desactivar la agenda");
                                    }
                                })
                                .catch((error) => {
                                    console.error(`Error al desactivar la agenda con ID: ${appointmentData.agenda.idAgenda}:`, error);
                                })
                            setMostrarLista(true);
                            resolve(data); // Resolver la promesa con los datos de agregarCita
                        })
                        .catch((error) => {
                            console.error("Error al crear la cita:", error);
                            Swal.fire({
                                title: "Error",
                                text: `Ocurrió un error al guardar la cita: ${error.message}`,
                                icon: "error",
                            });
                            reject(error); // Rechazar la promesa con el error de agregarCita
                        });
                }
            });
        });
    };

    const cancelar = (idCita, idAgenda) => {
        fetch(`https://e191be2024g3.onrender.com/agenda/UpdateStatus/${idAgenda}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "estadoAgenda": EstadoAgenda.ACTIVA
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Agenda activada exitosamente");
                } else {
                    console.error("Error al activar la agenda");
                }
            })
            .catch((error) => {
                console.error(`Error al activar la agenda con ID: ${idAgenda}:`, error);
            })
        cancelCita(idCita)
            .then((data) => {
                if (data) {
                    setCitas((prevCitas) =>
                        prevCitas.filter((cita) => cita._id !== idCita)
                    );
                } else {
                    console.error("No se pudo cancelar la cita");
                }
            })
            .catch((err) => {
                console.error(`Error al cancelar la cita con ID: ${idCita}`, err);
            });
    };

    const ver = (cita) => {
        setCitas(cita);
        setMostrarLista(false);
    };

    return (
        <Navegador>
            <div className="historias-container">
                <div className="historias-content" style={{ backgroundImage: 'url(/fondo.png)' }}>
                    <div className="container mt-3 content">
                        <div style={{ backgroundImage: "url(/fondo.png)", minHeight: "100vh" }}>
                            <div className="container mt-3">
                                <div className="d-flex justify-content-between mb-3">
                                    {usuario.rol !== 'Médico' && (
                                        <button className="btn btn-success me-3" onClick={verLista}>
                                            <i className={mostrarLista ? "fas fa-plus" : "fas fa-list-alt"}></i>
                                        </button>
                                    )}
                                </div>

                                <div className="bg-primary bg-gradient p-8 rounded">
                                    {loading && <div>Cargando...</div>}
                                    {!loading && !mostrarLista && (
                                        <div>
                                            <FormCitas onSave={guardar} />
                                        </div>
                                    )}
                                    {!loading && mostrarLista && (
                                        <TableCitas citas={citas} onDelete={cancelar} onView={ver} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Navegador>
    );
};

export default Citas;