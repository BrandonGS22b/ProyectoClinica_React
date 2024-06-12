import React, { useState, useEffect } from "react";
import TableUbicaciones from "./TableUbicaciones";
import FormUbicaciones from "./FormUbicaciones";
import { getUbicaciones, addUbicacion, editUbicacion, deleteUbicacion } from "../../API/UbicacionesAPI";
import Swal from "sweetalert2";
import Footer from "../generales/Footer";
import Navegador from "../generales/Navegador";

function Ubicaciones() {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [ubicacion, setUbicacion] = useState(null);
    const [mostrarLista, setMostrarLista] = useState(true);

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        getUbicaciones()
            .then((data) => {
                setUbicaciones(data);
            })
            .catch((err) => console.log(err));
    };

    if (ubicaciones.length === 0) listar();

    const verLista = () => {
        if (mostrarLista) {
            setMostrarLista(false);
        } else {
            setUbicacion(null);
            setMostrarLista(true);
        }
    };

    const guardar = (ubicacion) => {
      
        
        if (!ubicacion._id) {
          
            const codigoExistente = ubicaciones.some(u => u.codigoUbicacion === ubicacion.codigoUbicacion);
        const nombreExistente = ubicaciones.some(u => u.nombreUbicacion === ubicacion.nombreUbicacion);

        if (codigoExistente) {
            Swal.fire({
                title: "Error",
                text: "El código de ubicación ya está registrado.",
                icon: "error",
            });
            return;
        }

        if (nombreExistente) {
            Swal.fire({
                title: "Error",
                text: "El nombre de la ubicación ya está registrado.",
                icon: "error",
            });
            return;
        }
            addUbicacion(ubicacion)
                .then(() => {
                    listar();
                    Swal.fire("¡Guardado!", "El registro ha sido guardado.", "success");
                    setMostrarLista(true);
                })
                .catch((err) => console.log(err));
        } else {
            
            editar(ubicacion);
        }
    };

    const editar = (ubicacion) => {
        editUbicacion(ubicacion)
            .then(() => {
                listar();
                Swal.fire("¡Editado!", "El registro ha sido editado.", "success");
                setMostrarLista(true);
            })
            .catch((err) => console.log(err));
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
                deleteUbicacion(id)
                .then(() => listar())
                .catch((err) => console.log(err));
            }
        });
    };

    const ver = (ubicacion) => {
        setUbicacion(ubicacion);
        setMostrarLista(false);
    };

    return (
        <Navegador>
		<div className="historias-container">
        <div className="historias-content" style={{ backgroundImage: 'url(/fondo.png)' }}>
          <div className="container mt-3 content"> {/* Agrega la clase 'content' aquí */}
        <div style={{ backgroundImage: "url(/fondo.png)", minHeight: "100vh" }}>
            <div className="container mt-3">
                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-success me-3" onClick={verLista}>
                        <i className={mostrarLista ? "fas fa-plus" : "fas fa-list-alt"}></i>
                    </button>
                    {!mostrarLista ? (
                        <button className="btn btn-primary ms-0" onClick={verLista}>
                            <i className="fas fa-save"></i> Guardar
                        </button>
                    ) : (
                        <button className="btn btn-primary ms-0" onClick={verLista}>
                            <i className="fas fa-arrow-left"></i> Volver
                        </button>
                    )}
                </div>
                <div className="bg-primary bg-gradient p-8 rounded">
                    {!mostrarLista && (
                        <FormUbicaciones onSave={guardar} ubicacion={ubicacion} />
                    )}
                    {mostrarLista && (
                        <TableUbicaciones
                            ubicaciones={ubicaciones}
                            onEdit={editar}
                            onDelete={eliminar}
                            onView={ver}
                            verLista={verLista}
                        />
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
}

export default Ubicaciones;

