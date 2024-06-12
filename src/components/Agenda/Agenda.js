import React, { useState, useEffect } from "react";
import FormAgenda from "./FormAgenda";
import TableAgenda from "./TableAgenda";
import Navegador from "./../generales/Navegador";
import { getAgendas, getAgenda, crearAgenda, eliminarAgenda, actualizarAgenda, getAgendasNombreMedico, getAgendasPorFecha, getAgendasPorFechaHora } from "./../../API/AgendaAPI";
import { getListUsers } from "./../../API/UsuariosAPI";
import { getSedes } from "./../../API/SedesAPI";
import { getUbicaciones } from "./../../API/UbicacionesAPI";
import Swal from "sweetalert2";
import Footer from "./../generales/Footer";

function Agenda(props) {
    const { usuarioActivo } = props;

    const [ agendas, setAgendas ] = useState([]);
    const [ medicos, setMedicos ] = useState([]);
    const [ sedes, setSedes ] = useState([]);

    const [ agenda, setAgenda ] = useState(null);
    const [ mostrarLista, setMostrarLista ] = useState(true);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ selectedDate, setSelectedDate ] = useState("");
    const [ selectedTime, setSelectedTime ] = useState("");

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        getAgendas()
            .then((data) => {
                setAgendas(data);
            })
            .catch((err) => console.log(err));


        getListUsers()
            .then((data) => {
                const doctores = data.filter(user => user.rol === "Medico");
                setMedicos(doctores);
            })
            .catch((err) => console.log(err));

        getUbicaciones()
            .then((data) => {
                setSedes(data);
            })
            .catch((err) => console.log(err));
    };

    const verLista = () => {
        if (mostrarLista) {
            setMostrarLista(false);
        } else {
            setAgenda({
                _id: null,
                codigoAgenda: "",
                nombreAgenda: "",
                descripcionAgenda: ""
            });
            setMostrarLista(true);
            setIsEditing(false);
        }
    };
    
    const guardar = (agenda) => {
        if (agenda._id) {
            actualizarAgenda(agenda)
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            icon: "success",
                            title: "Agenda actualizada",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        listar();
                        setAgenda(null);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al actualizar la agenda",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((err) => console.log(err));
        } else {
            crearAgenda(agenda)
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            icon: "success",
                            title: "Agenda creada",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        listar();
                        setAgenda(null);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear la agenda",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const eliminar = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminarlo!",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarAgenda(id)
                    .then((data) => {
                        if (data) {
                            Swal.fire({
                                icon: "success",
                                title: "Agenda eliminada",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            listar();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al eliminar la agenda",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const editar = (id) => {
        getAgenda(id)
            .then((data) => {
                setAgenda(data);
                setMostrarLista(false);
                setIsEditing(true);
            })
            .catch((err) => console.log(err));
    };
    const buscar = () => {
        if (query === "") {
            listar();
        } else {
            getAgendasNombreMedico(query)
                .then((data) => {
                    if (data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No encontrado',
                            text: `El medico '${query}' no tiene agendas.`,
                        });
                    } else {
                        setQuery("");
                        setAgendas(data);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const buscarFecha = () => {
        console.log("fecha: "+ selectedDate + " hora: " + selectedTime);
        console.log(typeof(selectedDate) + " " + typeof(selectedTime));
        if (selectedDate === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: `Debe seleccionar una fecha'.`,
            });
        } 
        if (selectedTime === "" && selectedDate !== "") {
            getAgendasPorFecha(selectedDate)
                .then((data) => {
                    if (data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No encontrado',
                            text: `No hay agendas para la fecha '${selectedDate}'.`,
                        });
                    } else {
                        console.log(data)
                        setSelectedDate("");
                        setSelectedTime("");
                        setAgendas(data);
                    }
                })
                .catch((err) => console.log(err));
        } 
        if(selectedTime !== "" && selectedDate !== "") {
            getAgendasPorFechaHora(selectedDate, selectedTime)
                .then((data) => {
                    if (data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No encontrado',
                            text: `No hay agendas para la fecha '${selectedDate}' y hora '${selectedTime}'.`,
                        });
                    } else {
                        // console.log(data)
                        setSelectedDate("");
                        setSelectedTime("");
                        setAgendas(data);
                    }
                })
                .catch((err) => console.log(err));
        }
    };



    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };



    // iterar agendas cada 20 min
    const generateTimeIntervals = (startTime, endTime, intervalMinutes) => {
        const intervals = [];
        let currentTime = startTime;
      
        while (currentTime < endTime) {
          const nextTime = new Date(currentTime.getTime() + intervalMinutes * 60000);
          intervals.push({
            horaInicio: currentTime.toTimeString().substring(0, 5),
            horaFin: nextTime.toTimeString().substring(0, 5),
          });
          currentTime = nextTime;
        }
      
        return intervals;
      };

      const createAgendaIntervals = (originalAgenda, intervals) => {
        return intervals.map(interval => {
          return {
            ...originalAgenda,
            horaInicio: interval.horaInicio,
            horaFin: interval.horaFin
          };
        });
      };

      const processAgenda = (originalAgenda) => {
        const startTime = new Date(`1970-01-01T${originalAgenda.horaInicio}:00`);
        const endTime = new Date(`1970-01-01T${originalAgenda.horaFin}:00`);
        const intervals = generateTimeIntervals(startTime, endTime, 20);
        const agendas = createAgendaIntervals(originalAgenda, intervals);
      
        agendas.forEach(agenda => {
            guardar(agenda); // Aquí llamas a tu método para crear la agenda
        });
        setMostrarLista(true);
      };
      

    return (
        <Navegador>
            <div>
                <div className="container">
                    <h1 className="text-center mb-3">Agendas</h1>
                    <div className="row">
                        <div className="col-6">
                            {mostrarLista ? (
                                <button className="btn btn-success" onClick={verLista}>
                                    Agregar agenda
                                </button>
                            ) : (
                                <button className="btn btn-warning" onClick={verLista}>
                                    Ver lista de agendas
                                </button>
                            )}
                        </div>
                        {mostrarLista ? (
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar por primer nombre medico"
                                        value={query}
                                        onChange={handleChange}
                                    />
                                    <button className="btn btn-outline-warning" type="button" onClick={buscar}>
                                        Buscar
                                    </button>
                                </div>
                                <div className="input-group m-1">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={selectedTime}
                                        step="1200"
                                        onChange={handleTimeChange}
                                    />
                                    <button className="btn btn-outline-warning" type="button" onClick={buscarFecha}>
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {mostrarLista ? (
                        <TableAgenda
                            agendas={agendas}
                            onDelete={eliminar}
                            edit={editar}
                        />
                    ) : (
                        <FormAgenda agenda={agenda} onSave={processAgenda} isEditing={isEditing} medicos={medicos} sedes={sedes} />
                    )
                    }
                </div>
            </div>
            <Footer />
        </Navegador>
    );
}


export default Agenda;