import React, { useState, useEffect } from "react";
import Navegador from "../generales/Navegador";
import TableConsultorios from "./TableConsultorios";
import FormConsultorios from "./FormConsultorios";
import {
  getConsultorios,
  addConsultorio,
  editConsultorio,
  deleteConsultorio,
} from "../../API/ConsultoriosAPI";
import Swal from "sweetalert2";

import Footer from "../generales/Footer";

function Consultorios(props) {
  const { usuarioActivo } = props;

  const [consultorios, setConsultorios] = useState([]);
  const [consultorio, setConsultorio] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(true);
  /*//SEARCH PROTOTYPE
  const [filter, setFilter] = useState("");
  const [filteredConsultorios, setFilteredConsultorios] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterConsultorios = () => {
    if (filter === "") {
      setFilteredConsultorios(consultorios);
    } else {
      const filtered = consultorios.filter(consultorio =>
        consultorio.idConsultorio.includes(filter)
      );
      setFilteredConsultorios(filtered);
    }
  };*/

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    getConsultorios()
      .then((data) => {
        setConsultorios(data);
      })
      .catch((err) => console.log(err));
  };

  if (consultorios.length === 0) listar();

  const verLista = () => {
    if (mostrarLista) {
      setMostrarLista(false);
    } else {
      setConsultorio({
        _id: null,
        idConsultorio: "",
        codigoConsultorio: "",
        descripcionConsultorio: "",
      });
      setMostrarLista(true);
    }
  };

  const guardar = (consultorio) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, guardarlo!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(consultorio._id);
          if (!consultorio._id) {
            addConsultorio(consultorio)
              .then(() => listar())
              .catch((err) => console.log(err));
          } else {
            const respuesta = editConsultorio(consultorio);
            console.log(respuesta);
            editConsultorio(consultorio, consultorio._id)
              .then(() => listar())
              .catch((err) => console.log(err));
          }
          Swal.fire("¡Guardado!", "El registro ha sido guardado.", "success");
          setMostrarLista(true);
        }
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
        deleteConsultorio(id)
          .then((data) => {
            console.log(data);
            console.log(id);
            if (data.eliminarHistoriadCount === 1) {
              Swal.fire(
                "¡Eliminado!",
                "El registro ha sido eliminado.",
                "success"
              );
              setMostrarLista(true);
              listar();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const ver = (consultorio) => {
    setConsultorio(consultorio);
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
          {/*PROTOTIPO DE BUSQUEDA
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Filtrar por ID Consultorio"
              value={filter}
              onChange={handleFilterChange}
            />
            <button className="btn btn-primary" onClick={filterConsultorios}>
              Filtrar
            </button>
          </div>
          */}
          <button className="btn btn-primary ms-0" onClick={verLista}>
            <i className="fas fa-arrow-left"></i> Volver
          </button>
        </div>

        <div className="bg-primary bg-gradient p-8 rounded">
          {!mostrarLista && (
            <div>
              <FormConsultorios onSave={guardar} consultorio={consultorio} />
            </div>
          )}
          {mostrarLista && (
            <TableConsultorios
              consultorios={consultorios}
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

export default Consultorios;