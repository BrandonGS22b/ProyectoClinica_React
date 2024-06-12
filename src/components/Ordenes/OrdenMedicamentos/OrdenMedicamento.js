import React, { useState, useEffect } from 'react';
import TableOrdenMedicamento from './TableOrdenMedicamento';
import FormOrdenMedicamento from './FormOrdenMedicamento';
import {
  getListaOrdenesMedicamento, actualizarOrdenMedicamento, agregarOrdenMedicamento, cancelarOrdenMedicamento
} from "../../../API/OrdenesMedicamentoAPI";
import { getListarHistoriasId } from '../../../API/HistoriasApi';
import { getMedicamentos } from '../../../API/MedicamentosApi'
import Swal from "sweetalert2";
import Navegador from "../../generales/Navegador";
import CustomModal from './CustomModal';
import MedicamentosModal from './MedicamentosModal'; 
import { Link } from 'react-router-dom';
import { useSession } from "../../Usuarios/Login";

function OrdenMedicamento() {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [OrdenesMedicamento, setOrdenesMedicamento] = useState([]);
  const [OrdenMedicamento, setOrdenMedicamento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMedicamentoModal, setShowMedicamentoModal] = useState(false); 
  const idHistoriasURL = window.location.search.substring(1);
  const { session } = useSession(); 

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    if (idHistoriasURL) {
      setMostrarLista(false);
    }

    getListaOrdenesMedicamento()
      .then((datos) => {
        let ordenesFiltradas;
        if (session.rol === "Paciente") {
          ordenesFiltradas = datos.filter(OrdenMedicamento => OrdenMedicamento.paciente.idUsuario === session.id);
        } else if (session.rol === "Medico") {
          ordenesFiltradas = datos.filter(OrdenMedicamento => OrdenMedicamento.medico.idUsuario === session.id);
        } else {
          ordenesFiltradas = datos;
        }
        setOrdenesMedicamento(ordenesFiltradas);
      })
      .catch((error) => console.error("Error:", error));

    if (!mostrarLista) {
      getListarHistoriasId({ idHistoria: idHistoriasURL })
        .then((datos) => {
          setOrdenMedicamento({
            _id: null,
            idHistorias: datos.historia._id,
            estado: "",
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
            medicamento: []
          })
            .then(() => {
              getMedicamentos()
                .then((medicamentos) => {
                  setOrdenMedicamento((prevOrdenMedicamento) => ({
                    ...prevOrdenMedicamento,
                    medicamento: medicamentos, 
                  }));
                })
                .catch((error) => console.error("Error al obtener los medicamentos:", error));
            })
        }).catch((err) => console.log(err));
    }
  };

  const ver = (OrdenMedicamento) => {
    setOrdenMedicamento(OrdenMedicamento);
    setShowModal(true);
  };

  const abrirMedicamentosModal = () => {
    setShowMedicamentoModal(true);
  };

  const verLista = () => {
    setMostrarLista((prevMostrarLista) => {
      if (!prevMostrarLista) {
        listar();
      }
      return !prevMostrarLista;
    });
  };

  const guardar = (OrdenMedicamento) => {
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

        if (OrdenMedicamento._id === null) {
          agregarOrdenMedicamento(OrdenMedicamento)
            .then((respuesta) => {
              listar();
              Swal.fire("¡Guardado!", "El registro ha sido guardado.", "success");
            })
            .catch((error) => {
              Swal.fire("Error", "Hubo un problema al guardar el registro.", "error");
            });
        } else {
          actualizarOrdenMedicamento(OrdenMedicamento)
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
          cancelarOrdenMedicamento(id, result.value) 
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
          <h3>Órdenes de Medicamentos</h3>
          <div className="content p-0">
            {mostrarLista ? (
              <TableOrdenMedicamento
                OrdenesMedicamento={OrdenesMedicamento}
                onCancel={cancelar}
                onView={ver}
              />
            ) : (
              <FormOrdenMedicamento
                onSave={guardar}
                OrdenMedicamento={OrdenMedicamento}
                idHistoriaURL={idHistoriasURL}
              />
            )}
          </div>
        </div>
      </div>
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        ordenMedicamento={OrdenMedicamento} 
        abrirMedicamentosModal={abrirMedicamentosModal} 
      />
      <MedicamentosModal 
        show={showMedicamentoModal}
        handleClose={() => setShowMedicamentoModal(false)}
        ordenMedicamento={OrdenMedicamento} 
      />
    </Navegador>
  );
}

export default OrdenMedicamento;
