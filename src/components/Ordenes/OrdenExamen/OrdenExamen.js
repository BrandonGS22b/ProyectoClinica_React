import React, { useState, useEffect } from 'react';
import TableOrdenExamen from './TableOrdenExamen';
import FormOrdenExamen from './FormOrdenExamen';
import {
  getListaOrdenesExamen,actualizarOrdenExamen, agregarOrdenExamen, cancelarOrdenExamen
} from "../../../API/OrdenesExamenAPI";
import { getListarHistoriasId } from '../../../API/HistoriasApi';
import Swal from "sweetalert2";
import Navegador from "../../generales/Navegador";
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';
import { useSession } from "../../Usuarios/Login";

function OrdenExamen() {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [OrdenesExamen, setOrdenesExamen] = useState([]);
  const [OrdenExamen, setOrdenExamen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const idHistoriasURL = window.location.search.substring(1);
  const { session } = useSession();

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    if(idHistoriasURL){
      setMostrarLista(false)
    }

    getListaOrdenesExamen()
      .then((datos) => {
        let ordenesFiltradas;
        if (session.rol === "Paciente") {
          ordenesFiltradas = datos.filter(OrdenExamen => OrdenExamen.paciente.idUsuario === session.id);
        } else if (session.rol === "Medico") {
          ordenesFiltradas = datos.filter(OrdenExamen => OrdenExamen.medico.idUsuario === session.id);
        } else {
          ordenesFiltradas = datos;
        }
        setOrdenesExamen(ordenesFiltradas)
      })
      .catch((error) => console.error("Error:", error));

    if (!mostrarLista) {
      getListarHistoriasId({idHistoria:idHistoriasURL})
      .then((datos) => {
        setOrdenExamen({
          _id: null,
          idHistorias: datos.historia._id,
          vigencia: "",
          fechaCreacion: "",
          paciente: {
            idUsuario: datos.historia.paciente.idPaciente,
            nombres: datos.historia.paciente.nombresPaciente,
            apellidos: datos.historia.paciente.apellidosPaciente,
            tipoDocumento: datos.historia.paciente.tipoDocumentoPaciente,
            documento: datos.historia.paciente.documentoPaciente
          },
          medico: {
            idUsuario: datos.historia.medico.idMedico,
            nombres: datos.historia.medico.nombresMedico,
            apellidos: datos.historia.medico.apellidosMedico,
            tipoDocumento: datos.historia.medico.tipoDocumentoMedico,
            documento: datos.historia.medico.documentoMedico,
            especialidad: datos.historia.medico.especialidadMedico,
          },
          examen: {
            nombreExamen: "",
            codigoExamen: "",
            descripcion: "",
          },
          resultados: {
            idResultado: "",
            fechaResultado: "",
            estadoResultado: "",
            archivosAdjuntos: "",
            metodoAnalisis: "",
            observaciones: "",
          }
        });
      }).catch((err) => console.log(err));
    }
  };


  const ver = (OrdenExamen) => {
    setOrdenExamen(OrdenExamen);
    setShowModal(true);
  };

  const verLista = () => {
    setMostrarLista((prevMostrarLista) => {
      if (!prevMostrarLista) {
        listar();
      }
      return !prevMostrarLista;
    });
  };

  const guardar = (OrdenExamen) => {
    console.log(OrdenExamen)
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Verifica cuidadosamente la información!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "¡Sí, guardar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMostrarLista(true);

        if (OrdenExamen._id === null) {
          agregarOrdenExamen(OrdenExamen)
            .then((respuesta) => {
              console.log(respuesta)
              listar();
              Swal.fire("¡Guardado!", "El registro ha sido guardado.", "success");
            })
            .catch((error) => {
              console.error("Error al agregar:", error);
              Swal.fire("Error", "Hubo un problema al guardar el registro.", "error");
            });
        } else {
          actualizarOrdenExamen(OrdenExamen)
            .then((respuesta) => {
              listar();
              Swal.fire("¡Guardado!", "El registro ha sido actualizado.", "success");
            })
            .catch((error) => {
              Swal.fire("Error", "Hubo un problema al actualizar el registro.", "error");
            });
        }
      }
    }).catch((error) => {
      Swal.fire("Error", "Hubo un problema al confirmar la acción.", "error");
    });
  };

  const cancelar = (id) => {
    Swal.fire({
        title: "¿Está seguro?",
        text: "La orden será marcada como cancelada",
        input: "text",
        inputPlaceholder: "Ingrese la razón de cancelación",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cancelar",
    }).then((result) => {
        if (result.isConfirmed && result.value) {
          cancelarOrdenExamen(id, result.value) 
                .then(datos => {
                    if (datos) {
                        if (datos === false) {
                            Swal.fire("Error", "Hubo un problema al cancelar la orden.", "error");
                        } else {
                            Swal.fire("¡Cancelada!", "La orden ha sido cancelada.", "success");
                            listar();
                        }
                    } else {
                        Swal.fire("Error", "Hubo un problema al cancelar la orden.", "error");
                    }
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire("Error", "Hubo un problema al cancelar la orden.", "error");
                });
        } else if (!result.value) {
            Swal.fire("Error", "Debe ingresar una razón para cancelar la orden.", "error");
        }
    });
};

  return (
  <Navegador>
      <div className="template-container" style={{ backgroundImage: 'url(./img/fondo.png)' }}>
        <div className="container mt-0">
          <div className="d-flex justify-content-between mb-0">
            {idHistoriasURL && (
              <button className="btn btn-success me-3" onClick={verLista}>
                <i className={mostrarLista ? "fas fa-plus" : "fas fa-list-alt"}></i>
              </button>
            )}
            <Link to={"/Home"}>
            <button className="btn btn-danger ms-0">
              <i className="fas fa-arrow-left"></i> Volver
            </button>
            </Link>
          </div>
          <h3>Órdenes de Examen</h3>
          <div className="content p-0">
            {mostrarLista ? (
              <TableOrdenExamen
                OrdenesExamen={OrdenesExamen}
                onView={ver}
                onCancel={cancelar}
              />
            ) : (
              <FormOrdenExamen
                onSave={guardar}
                OrdenExamen={OrdenExamen}
                idHistoriaURL={idHistoriasURL}
              />
            )}
          </div>
        </div>
      </div>
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        ordenExamen={OrdenExamen}
      />
    </Navegador>
  );
}

export default OrdenExamen;