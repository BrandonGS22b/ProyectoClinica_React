import React, { useState, useEffect } from "react";
import Navegador from "../generales/Navegador";
import FormSedes from "./FormSedes.js"
import TableSedes from "./TableSedes.js"
import { getSedes, addSede, editSede, deleteSede } from "../../API/SedesAPI";
import Swal from "sweetalert2";
import Footer from "../generales/Footer";

function Sedes(props) {
  const { usuarioActivo } = props;

  const [sedes, setSedes] = useState([]);
  const [sede, setSede] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(true);

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    getSedes()
      .then((data) => {
        setSedes(data);
      })
      .catch((err) => console.log(err));
  };

  if (sedes.length === 0) listar();

  const verLista = () => {
    if (mostrarLista) {
      setMostrarLista(false);
    } else {
      listar();
      setMostrarLista(true);
    }
  };

  const guardar = (sede) => {
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
          console.log(sede._id);
          if (!sede._id) {
            addSede(sede)
              .then(() => listar())
              .catch((err) => console.log(err));
          } else {
            const respuesta = editSede(sede);
            console.log(respuesta);
            editSede(sede, sede._id)
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
        deleteSede(id)
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

  const ver = (sede) => {
    setSede(sede);
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
          
          {/**/}

          <button className="btn btn-primary ms-0" onClick={verLista}>
            <i className="fas fa-arrow-left"></i> Volver
          </button>
        </div>

        <div className="bg-primary bg-gradient p-8 rounded">
          {!mostrarLista && (
            <div>
              <FormSedes onSave={guardar} sede={sede} />
            </div>
          )}
          {mostrarLista && (
            <TableSedes
              sedes={sedes}
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

export default Sedes;