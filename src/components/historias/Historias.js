import React, { useState, useEffect } from "react";
import Navegador from "../generales/Navegador";
import TableHistorias from "./TableHistorias";
import TableHistoriasDetalle from "./TableHistoriasDetalle";
import FormHistorias from "./FormHistorias";
import Footer from "../generales/Footer";
import { getListarHistorias, agregarHistoria, actualizarHistoria, eliminarHistoria, getListarHistoriasId } from "../../API/HistoriasApi";
import { getListUsers } from "../../API/UsuariosAPI";
import { useSession } from "../Usuarios/Login";
import { SearchByIdCita } from "../../API/CitasApi";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function Historias(props) {
  const { usuarioActivo } = props;

  const [historias, setHistorias] = useState([]);
  const [historia, setHistoria] = useState(null);

  const { session } = useSession(); // Obtener los datos del usuario que inicia sesión
  const [usuarios, setUsuarios] = useState("");
  const [todayDate, setTodayDate] = useState('');

  const [mostrarTabla, setMostrarTabla] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  let codigo = "";
  const navigate = useNavigate();

  var urlCita = (window.location != window.parent.location) ?
    window.parent.location.href : window.location.href;

  let partes = urlCita.split("?");
  let idCita = partes[1];

  useEffect(() => {
    if (idCita) {
      setMostrarTabla(false)
      setMostrarDetalle(false)
      setMostrarFormulario(true)
    } else {
      setMostrarTabla(true)
      setMostrarDetalle(false)
      setMostrarFormulario(false)
    }
    listar();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    setTodayDate(formattedDate);
  }, []);

  const listar = () => {
    getListarHistorias()
      .then((data) => {
        setHistorias(data);
        // Filtra las historias para que solo se muestren codigoHistoria únicos
        const codigoConsecutivo = [];

        data.forEach((item) => {
          codigoConsecutivo.push(item.codigoHistoria);
        });
        codigo = findAndIncrementMaxNumber(codigoConsecutivo);
      })
      .catch((err) => console.log(err));

    getListUsers()
      .then((user) => {
          setUsuarios(user);
      })
      .catch((err) => console.log(err));

    SearchByIdCita(idCita)
      .then((data) => {
        setHistoria({
          _id: null,
          codigoHistoria: codigo,
          motivo: "",
          antecendentes: "",
          temperatura: "",
          peso: "",
          altura: "",
          presionAlterial: "",
          diagnostico: "",
          valoracion: "",
          tipoConsulta: "",
          paciente: {
            idPaciente: data.data.paciente.idPaciente,
            nombresPaciente: data.data.paciente.nombresPaciente,
            apellidosPaciente: data.data.paciente.apellidosPaciente,
            tipoDocumentoPaciente: data.data.paciente.tipoDocumentoPaciente,
            documentoPaciente: data.data.paciente.documentoPaciente,
            estadoPaciente: data.data.paciente.estadoPaciente
          },
          medico: {
            idMedico: data.data.medico.idMedico,
            nombresMedico: data.data.medico.nombresMedico,
            apellidosMedico: data.data.medico.apellidosMedico,
            tipoDocumentoMedico: data.data.medico.tipoDocumentoMedico,
            documentoMedico: data.data.medico.documentoMedico,
            estadoMedico: data.data.medico.estadoMedico,
            especialidadMedico: data.data.medico.especialidad
          },
          cita: {
            idCita: data.data._id,
            tipoCita: data.data.tipoCita,
            estadoCita: data.data.agenda.estadoAgenda,
            fechaAgenda: data.data.agenda.fechaAgenda,
            horaAgenda: data.data.agenda.horaAgenda,
          }
        });
        setMostrarFormulario(true);
      })
      .catch((err) => console.log(err));
  };

  if (historias.length === 0) listar();

  const verLista = () => {
    if (!mostrarDetalle) {
      setMostrarDetalle(true);
      setMostrarFormulario(false);
    } else {
      setHistoria({
        _id: null,
        codigoHistoria: "",
        motivo: "",
        antecendentes: "",
        temperatura: "",
        peso: "",
        altura: "",
        presionAlterial: "",
        diagnostico: "",
        valoracion: "",
        tipoConsulta: "",
        paciente: {
          idPaciente: "",
          nombresPaciente: "",
          apellidosPaciente: "",
          tipoDocumentoPaciente: "",
          documentoPaciente: "",
          estadoPaciente: ""
        },
        medico: {
          idMedico: "",
          nombresMedico: "",
          apellidosMedico: "",
          tipoDocumentoMedico: "",
          documentoMedico: "",
          estadoMedico: "",
          especialidadMedico: ""
        },
        cita: {
          idCita: "",
          tipoCita: "",
          estadoCita: "",
          fechaAgenda: "",
          horaAgenda: "",
        }
      });
      setMostrarDetalle(false);
      setMostrarFormulario(true);
    }
  };

  const guardar = (historia) => {
    alert("esta en guardar")
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
          if (!historia._id) {
            agregarHistoria(historia)
              .then((res) => {
                listar()
                console.log(JSON.stringify(res));
              })
              .catch((err) => alert(err));
          } else {
            actualizarHistoria(historia)
              .then((res) => {
                listar()
                console.log(JSON.stringify(res));
              })
              .catch((err) => console.log(err));

          }
          Swal.fire("¡Guardado!", "El registro ha sido guardado.", "success");
          setMostrarTabla(true);
          setMostrarDetalle(false);
          setMostrarFormulario(false);
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
        eliminarHistoria(id)
          .then((data) => {
            console.log(id);
            listar();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const verTabla = (historia) => {
    setHistoria(historia);
    setMostrarTabla(true);
    setMostrarDetalle(false);
    setMostrarFormulario(false);
  };

  const verDetalle = (historia) => {
    setHistoria(historia);
    setMostrarTabla(false);
    setMostrarDetalle(true);
    setMostrarFormulario(false);
    setSelectedItemId(historia);
  };

  const verFormulario = (historia) => {
    setHistoria(historia);
    setMostrarTabla(false);
    setMostrarDetalle(false);
    setMostrarFormulario(true);
  };

  const volverHome = (historia) => {
    setHistoria(historia);
    setMostrarTabla(false);
    setMostrarDetalle(false);
    setMostrarFormulario(false);
  };

  const goToHome = () => {
    navigate("/Home");
  };

  function findAndIncrementMaxNumber(inputArray) {
    let numbers = [];

    // Separar números del array
    inputArray.forEach(item => {
      let numStr = '';
      // Extraer solo los números de cada string
      for (let char of item) {
        if (!isNaN(char) && char !== ' ') {
          numStr += char;
        }
      }
      if (numStr) {
        numbers.push(Number(numStr));
      }
    });
    // Encontrar el número mayor
    let maxNumber = Math.max(...numbers);
    // Sumar 1 al número mayor
    let incrementedNumber = maxNumber + 1;
    // Concatenar el prefijo "HOO" con el número incrementado
    let codigoHistoria = "H" + incrementedNumber.toString().padStart(4, '0'); // Ajusta 3 según el formato deseado

    return codigoHistoria;
  }

  //se guarda el usuario activo
  //const usuarioActivos = usuarios.filter(item => item.documento === "1098777750");
  /*const permisos = (usuario) => {
    usuarioActivo = usuario
    console.log(usuarioActivo)
  }*/

  return (
    <Navegador>
    <div className="historias-container">
      <div className="historias-content" style={{ backgroundImage: 'url(/fondo.png)' }}>
        <div className="container mt-3 content">
          <div>
        {mostrarTabla && (
          <div className="container mt-3 d-flex justify-content-center">
            <h2 className="text-dark">HISTORIAS</h2>
          </div>
        )}

        {!mostrarTabla && (
          <div className="d-flex justify-content-between mb-3">
            {/* Es el boton verde de navegacion general */}
            <button className="btn btn-primary me-3" >
              {todayDate}
            </button>
            <h2 className="text-dark">HISTORIAS</h2>
            {/*Es el boton Azul de Volver general */}
            <button className="btn btn-primary ms-0" onClick=
              {mostrarDetalle ? verTabla : (mostrarFormulario ? verLista : null)}>
              <i className="fas fa-arrow-left"></i> Volver
            </button>

          </div>
        )}

        <div className="bg-primary bg-gradient p-8 rounded">
          {mostrarTabla && (
            <TableHistorias historias={historias} session={session} onView={verDetalle} />
          )}
          {mostrarDetalle && (
            <TableHistoriasDetalle historias={historias} onDelete={eliminar} onView={verFormulario} selectedItemId={selectedItemId} />
          )}
          {mostrarFormulario && (
            <FormHistorias onSave={guardar} historia={historia} />
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
    <Footer />
    </Navegador>
  );
}

export default Historias;