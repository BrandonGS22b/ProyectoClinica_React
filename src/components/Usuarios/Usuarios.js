import React, { useEffect, useState, useContext } from 'react';
import Navegador from '../generales/Navegador';
import Footer from '../generales/Footer';
import TableUsuarios from './TableUsuarios';
import { getListUsers, addUser, updateUser, searchUsersByName, disableUser, enableUser, searchById } from '../../API/UsuariosAPI';
import FormUsuarios from './FormUsuarios';
import Swal from 'sweetalert2';

//esto es para acceder al usuario activo
import { useSession } from "../Usuarios/Login";

function Usuarios(props) {
  const { usuarioActivo } = props;
  const [mostrarLista, setMostrarLista] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [filtro, setFiltro] = useState('');

  //y aca guardo a este mismo usuario
  const { session, setSession } = useSession();
  const [compara, setCompara] = useState([]);

  const listar = () => {
    getListUsers()
      .then((data) => { setUsuarios(data) })
      .catch((err) => { console.log(err) });
  };

  if (usuarios.length === 0) {
    listar();
  }

  const verLista = (e) => {
    setMostrarLista(!mostrarLista);
    console.log("Mostrar lista:", mostrarLista);
    if (mostrarLista) {
      setMostrarLista(false);
    } else {
      setMostrarLista(true);
      setUsuario({
        _id: "",
        codigo: "",
        nombres: "",
        apellidos: "",
        direccion: "",
        telefono: "",
        correo: "",
        tipoDocumento: "",
        documento: "",
        rol: "",
        estado: "",
        fechaNacimiento: "",
        tipoSangre: "",
        clave: "",
        ubicacion: {
          idUbicacion: "",
          departamento: "",
          municipio: "",
          codigoUbicacion: ""
        },
        especialidad: {
          idEspecialidades: "",
          especialidad: ""
        }
      });
    }
  };

  const guardar = async (usuario) => {
    try {
      if (!usuario._id) {
        await addUser(usuario);
        listar();
        setMostrarLista(true);
        return 'Usuario creado exitosamente.';
      } else {
        const compare = await searchById(usuario._id);
        const originalClave = compare[0].clave;
        //console.log("Hola claveE: " + usuario.clave + " ClaveO: " + originalClave);
        if (originalClave === usuario.clave) {
          delete usuario.clave;
        }
        await updateUser(usuario, usuario._id);
        listar();
        setMostrarLista(true);
        return 'Usuario actualizado exitosamente.';
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error al guardar el usuario. Intente de nuevo.');
    }
  };

  const ver = (usuario) => {
    //console.log("Este es el usuario seleccionado: "+ JSON.stringify(usuario) );
    setUsuario(usuario);
    setMostrarLista(false);
  };

  const EstadoActDesc = async (usuario) => {
    try {
      if (usuario.estado === 'Activo') {
        await disableUser(usuario._id);
        Swal.fire('Usuario desactivado', '', 'success');
      } else {
        await enableUser(usuario._id);
        Swal.fire('Usuario activado', '', 'success');
      }
      listar();
    } catch (error) {
      console.log(error);
      Swal.fire('Error al cambiar el estado del usuario', '', 'error');
    }
  };

  const handleFilterChange = async (event) => {
    try {
      const valor = event.target.value;
      setFiltro(valor);
      const usuariosEncontrados = await searchUsersByName(valor);
      setUsuarios(usuariosEncontrados);
    } catch (error) {
      console.error('Error al buscar usuarios por nombre:', error);
    }
  };

  const filteredUsers = usuarios.filter(usuario =>
    usuario.nombres.toLowerCase().includes(filtro.toLowerCase())
  );

  //Falta colocar el <Navegador/>
  return (
  	<Navegador>
			<div className="historias-container">
				<div className="historias-content" style={{ backgroundImage: 'url(/fondo.png)' }}>
					<div className="container mt-3 content">
						
						<div style={{ backgroundImage: "url(/fondo.png)", minHeight: "100vh" }}>
							<div className="container mt-3">
               
                <div className="d-flex justify-content-between mb-2">
                  <input
                    type="text"
                    className="form-control me-2 m-2"
                    placeholder="Buscar por nombre..."
                    value={filtro}
                    onChange={handleFilterChange}
                  />
                  <button className="btn btn-success me-2 m-2" onClick={verLista}>
                    <i className={mostrarLista ? "fas fa-plus" : "fas fa-list-alt"}></i> {/* Icono cambiará dependiendo de mostrarLista */}
                  </button>

                  
                  <button className="btn btn-primary m-2" onClick={() => window.history.back()}>
                    <i className="fas fa-arrow-left"></i> Volver
                  </button>
                </div>
                <div className="bg-primary bg-gradient p-8 rounded">
                  {mostrarLista ? (
                    <div>
                      <TableUsuarios usuarios={filteredUsers} onView={ver} onToggleActive={EstadoActDesc} />
                    </div>
                  ) : (
                    <div>
                      <FormUsuarios onSave={guardar} setUsuario={setUsuario} getUsuario={usuario} />
                    </div>
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

export default Usuarios;
