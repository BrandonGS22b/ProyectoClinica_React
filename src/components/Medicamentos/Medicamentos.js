import React, { useState, useEffect } from "react";
import Navegador from "./../generales/Navegador";
import FormMedicamentos from "./FormMedicamento";
import TableMedicamentos from "./TableMedicamentos";
import { getMedicamentos, getMedicamento, crearMedicamento, eliminarMedicamento, actualizarMedicamento, getMedicamentosPorNombre } from "./../../API/MedicamentosApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./../generales/Footer";

function Medicamentos(props) {
    const { usuarioActivo } = props;

    const [ medicamentos, setMedicamentos ] = useState([]);
    const [ medicamento, setMedicamento ] = useState(null);
    const [ mostrarLista, setMostrarLista ] = useState(true);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        getMedicamentos()
            .then((data) => {
                setMedicamentos(data);
            })
            .catch((err) => console.log(err));
    };

    if (medicamentos.length === 0) listar();

    const verLista = () => {
        if (mostrarLista) {
            setMostrarLista(false);
        } else {
            setMedicamento({
                _id: null,
                codigoMedicamento: "",
                nombreMedicamento: "",
                descripcionMedicamento: ""
            });
            setMostrarLista(true);
            setIsEditing(false);
        }
    };

    const guardar = (medicamento) => {
        if (medicamento._id) {
            actualizarMedicamento(medicamento)
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            icon: "success",
                            title: "Medicamento actualizado",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        listar();
                        setMostrarLista(true);
                        setMedicamento(null);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al actualizar el medicamento",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((err) => console.log(err));
        } else {
            crearMedicamento(medicamento)
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            icon: "success",
                            title: "Medicamento creado",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        listar();
                        setMostrarLista(true);
                        setMedicamento(null);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear el medicamento",
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
                eliminarMedicamento(id)
                    .then((data) => {
                        if (data) {
                            Swal.fire({
                                icon: "success",
                                title: "Medicamento eliminado",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            listar();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al eliminar el medicamento",
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
        getMedicamento(id)
            .then((data) => {
                setMedicamento(data);
                setMostrarLista(false);
                setIsEditing(true);
            })
            .catch((err) => console.log(err));
    };

    const buscar = () => {
        if (query === "") {
            listar();
        } else {
            getMedicamentosPorNombre(query)
                .then((data) => {
                    if (data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No encontrado',
                            text: `El medicamento *${query}* no existe.`,
                        });
                    } else {
                        setMedicamentos(data);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <Navegador>
            <div>
                <div className="container">
                    <h1 className="text-center mb-3">Medicamentos</h1>
                    <div className="row">
                        <div className="col-6">

                            {mostrarLista ? (
                                <button className="btn btn-success" onClick={verLista}  >
                                    Agregar medicamento
                                </button>
                            ) : (
                                <button className="btn btn-warning" onClick={verLista}  >
                                    Ver lista de medicamentos
                                </button>
                            )}


                        </div>
                        {mostrarLista ? (
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar por nombre"
                                        value={query}
                                        onChange={handleChange}
                                    />
                                    <button className="btn btn-outline-secondary" type="button" onClick={buscar}>
                                        Buscar
                                    </button>
                                </div>
                            </div>) : null}
                    </div>
                    {mostrarLista ? (
                        <TableMedicamentos
                            medicamentos={medicamentos}
                            onDelete={eliminar}
                            edit={editar}
                        />
                    ) : (
                        <FormMedicamentos medicamento={medicamento} onSave={guardar} isEditing={isEditing} />
                    )}
                </div>
            </div>
            <Footer />
        </Navegador>
    );

}


export default Medicamentos;