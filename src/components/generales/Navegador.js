import Home from './Home';
import Footer from "./Footer";
import swal from 'sweetalert';
import Usuarios from "../Usuarios/Usuarios";
import Sedes from '../Sedes/Sedes'
import Historias from '../historias/Historias'
import Citas from '../Citas/Citas';
import Perfil from '../Usuarios/Perfil';

// importaciones de react 
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "../Usuarios/Login";


function Navegador({ children }) {
  const [ content, setContent ] = useState(<Home />);

  const navigate = useNavigate();
  const [ usuarioActivo, setUsuarioActivo ] = useState(null);
  const { session, setSession } = useSession();

  const [ showHome, setShowHome ] = useState(false);
  const [ showHistorias, setShowHistorias ] = useState(false);
  const [ showUsuarios, setShowUsuarios ] = useState(false);
  const [ showConsultorio, setShowConsultorio ] = useState(false);
  const [ showSedes, setShowSedes ] = useState(false);
  const [ showUbicaciones, setShowUbicaciones ] = useState(false);
  const [ showOrdenes, setShowOrdenes ] = useState(false);
  const [ showMedicamentos, setShowMedicamentos ] = useState(false);
  const [ showAgenda, setShowAgenda ] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [ session, navigate ]);

  useEffect(() => {
    const usuarioNombre = session && session.nombre;
    const usuarioRol = session && session.rol;

    if (usuarioNombre && usuarioRol) {
      setUsuarioActivo({ nombre: usuarioNombre, rol: usuarioRol });

      // Control de visibilidad de los accesos según el rol del usuario
      if (usuarioRol === 'Paciente') {
        setShowHome(true);
        setShowHistorias(true);
      } else if (usuarioRol === 'Medico') {
        setShowHome(true);
        setShowHistorias(true);
        setShowConsultorio(true);
        setShowSedes(true);
        setShowOrdenes(true);
        setShowAgenda(true);
      } else if (usuarioRol === 'Administrador') {
        setShowHome(true);
        setShowHistorias(true);
        setShowUsuarios(true);
        setShowConsultorio(true);
        setShowSedes(true);
        setShowUbicaciones(true);
        setShowOrdenes(true);
        setShowMedicamentos(true);
        setShowAgenda(true);
      }
    }
  }, [ session ]);
//cuando se cierra session
  const handleButtonClick = (component, buttonName, path) => {
    setContent(component);
    navigate(path); // Navegar a la ruta especificada
  };

  const handleLogout = () => {
    setSession(null);
    swal({
      title: "Sesión cerrada",
      text: "Tu sesión ha sido cerrada exitosamente.",
      icon: "success"
    }).then(() => {
      navigate("/", { replace: true });
    });
  };

  const handleUsuariosClick = () => {
    if (session && session.rol === 'Administrador') {
      handleButtonClick(<Usuarios />, 'Usuarios', '/Usuarios');
    }
  };

  const handlePerfil = () => {
    handleButtonClick(<Perfil />, 'Perfil', '/Perfil');
  };

  return (
    <div className="d-flex" id="wrapper">
      <div className="bg-white" id="sidebar-wrapper">
        <a className="navbar-brand" href="#">
          <img src="./img/logo.png" alt="Login" style={{ maxWidth: "180px" }} />
        </a>
        <div className="list-group list-group-flush my-3">
          {showHome && (
            <Link to="/Home" className="list-group-item bg-transparent second-text fw-bold custom-list-button3">
              <i className="fas fa-home me-2"></i>Home
            </Link>
          )}
          {showHistorias && (
            <Link to="/Historias" className="list-group-item bg-transparent second-text fw-bold custom-list-button1">
              <i className="fas fa-history me-2"></i>Historias
            </Link>
          )}

          {showUsuarios && (
            <button className="list-group-item bg-transparent second-text fw-bold custom-list-button1" onClick={handleUsuariosClick}>
              <i className="fas fa-users me-2"></i>Usuarios
            </button>
          )}

          <Link to="/Citas" className="list-group-item bg-transparent second-text fw-bold custom-list-button5">
            <i className="fas fa-calendar-alt me-2"></i>Citas
          </Link>

          {showConsultorio && (
            <Link to="/Consultorios" className="list-group-item bg-transparent second-text fw-bold custom-list-button">
              <i className="fas fa-clinic-medical me-2"></i>Consultorios
            </Link>
          )}

          {showSedes && (
            <Link to="/Sedes" className="list-group-item bg-transparent second-text fw-bold custom-list-button3">
              <i className="fas fa-building me-2"></i>Sedes
            </Link>
          )}

          {showMedicamentos && (
            <Link to="/Medicamentos" className="list-group-item bg-transparent second-text fw-bold custom-list-button">
              <i className="fas fa-prescription-bottle-alt"></i>Medicamentos
            </Link>
          )}

          {showAgenda && (
            <Link to="/Agenda" className="list-group-item bg-transparent second-text fw-bold custom-list-button3">
              <i className="fas fa-calendar-alt me-2"></i>Agenda
            </Link>
          )}

          {showUbicaciones && (
            <Link to="/Ubicaciones" className="list-group-item bg-transparent second-text fw-bold custom-list-button">
              <i className="fas fa-map-marker-alt me-2"></i>Ubicaciones
            </Link>
          )}

          {showOrdenes && (
            <div className="dropdown">
              <button className="list-group-item bg-transparent second-text fw-bold custom-list-button2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-file-alt me-2"></i>Ordenes
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link to="/OrdenIncapacidad" className="dropdown-item">Ordenes de Incapacidad</Link></li>
                <li><Link to="/OrdenExamen" className="dropdown-item">Ordenes de Examen</Link></li>
                <li><Link to="/OrdenMedicamento" className="dropdown-item">Ordenes de Medicamento</Link></li>
                <li><Link to="/OrdenRemision" className="dropdown-item">Ordenes de Remision</Link></li>
              </ul>
            </div>
          )}

          <button className="list-group-item bg-transparent second-text fw-bold custom-list-button1" onClick={handleLogout}>
            <i className="fas fa-power-off me-2"></i>Salir
          </button>
        </div>
      </div>


      
      <div id="page-content-wrapper">
         <>menu parte de arriba</>
        <div className="container-fluid px-3">
          <div className="row g-2 my-0">
            <div className="user-info-container p-4 bg-white shadow-sm d-flex justify-content-between align-items-center rounded flex-grow-1">
              <div id="izquierda1"></div>
              <i className="fas fa-user user-icon fs-1 primary-text border rounded-full secondary-bg p-4" id="izquierda"></i>
              <div className="user-details">
                {session ? (
                  <>
                    <h3 className="fs-2 mb-0">Usuario: {session.nombre}</h3>
                    <p className="fs-5 mb-1">Rol: {session.rol}</p>
                  </>
                ) : (
                  <p className="fs-5 mb-1">Cargando información del usuario...</p>
                )}
              </div>
              <div id="izquierda1">
                <a className="navbar-brand" href="#">
                  <img src="./img/logo.png" alt="Login" style={{ maxWidth: "120px" }} />
                  <p>Dirección: Unidades Tecnológicas de Santander</p>
                </a>
              </div>
              <div id="izquierda1">
                <ul className="navbar-nav">
                  <li className="dropdown nav-item profile-dropdown">
                    <a className="nav-link profile-dropdown-btn" href="#" data-bs-toggle="dropdown">
                      <i className="fas fa-cog fa-2x profile-img"></i>
                      <span className="xp-user-live"></span>
                    </a>
                    <ul className="dropdown-menu small-menu profile-dropdown-list">
                      <li className="profile-dropdown-list-item">
                        <a href="#" onClick={handlePerfil}><span className="fas fa-user"></span>Perfil</a>
                      </li>
                 
                      <li className="profile-dropdown-list-item">
                        <a href="/" onClick={handleLogout}><span className="fas fa-sign-out-alt"></span>Salir</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 d-flex flex-column">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navegador;