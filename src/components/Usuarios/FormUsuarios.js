import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

import { getUbicaciones } from '../../API/UbicacionesAPI';

function FormUsuarios(props) {
  const {getUsuario, setUsuario, onSave, registrar=false} = props;
  //console.log("He recivido lo soguiente: "+ JSON.stringify(setUsuario));
  const navigate = useNavigate();
  //const [usuario, setUsuario] = useState(null);
  const [verEspecialidad, setVerEspecialidad] = useState(false);
  //evitar que se de multiples veces al boton enviar  
  const [loading, setLoading] = useState(false);
  //Conseguir datos de ubicaciones
  const [ubicaciones, setUbicaciones] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  
  const [thisUsuario, setThisUsuario] = useState({
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

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const ubicacionesData = await getUbicaciones();
        setUbicaciones(ubicacionesData);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchUbicaciones();
  }, []);

  const limpiar = () =>{
    setThisUsuario({
        _id: null,
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
  };

    
    useEffect(() => {
        if (!getUsuario) {
          limpiar();
        } else {
          const formattedDate = getUsuario.fechaNacimiento ? getUsuario.fechaNacimiento.split('T')[0] : ''; // Extrae solo la parte de la fecha y elimina la parte de la hora
          setThisUsuario({
            ...getUsuario,
            fechaNacimiento: formattedDate || ""
          });
        }
      }, [getUsuario]);

    if (thisUsuario === null) {
        limpiar();
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Yo", thisUsuario);
        if (name === "rol") {
            if (value === "Medico") {
                setVerEspecialidad(true);
            } else {
                setVerEspecialidad(false);
            }
        }
    
        if (name === "departamentoUbicacion") {
            const ubicacion = ubicaciones.find(ub => ub.departamentoUbicacion === value);
            if (ubicacion) {
                setThisUsuario(prevState => ({
                    ...prevState,
                    ubicacion: {
                        ...prevState.ubicacion,
                        idUbicacion: ubicacion._id,
                        departamento: value,
                        municipio: ubicacion.municipioUbicacion,
                        codigoUbicacion: ubicacion.codigoUbicacion
                    }
                }));
            }
            setDepartamentoSeleccionado(value);
        } else if (name === "Especialidad") {
        const idEspecialidad = value.toLowerCase(); // Convierte el nombre de la especialidad en minúsculas y lo usa como ID
        setThisUsuario(prevState => ({
            ...prevState,
            especialidad: {
                idEspecialidades: idEspecialidad,
                especialidad: value
            }
        }));
        } else {
            setThisUsuario(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

  const onClickSave = async (e)=> {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await onSave(thisUsuario);
        limpiar();
        swal.fire({
          title: "Bienvenido!",
          text: response,
          icon: "success"
        });
    } catch (error) {
        console.log("Error en el servidor al guardar los datos");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      navigate('/Usuarios');
    }
  }, [loading, navigate]);
  /*
  console.log("AA", thisUsuario);
  console.log("AB", thisUsuario.ubicacion);
  console.log("AC", thisUsuario.ubicacion.municipio);
  */
  return (
    <div className="container mt-5">
        <form className="border p-5 rounded shadow bg-body">
            <fieldset>
                <legend className="text-primary mb-4">Nuevo Usuario</legend>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="Codigo" className="form-label">Codigo:</label>
                        <input type="text" className="form-control" id="Codigo" name="codigo" value={thisUsuario.codigo} onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Nombres" className="form-label">Nombres:</label>
                        <input type="text" className="form-control" id="Nombres" name="nombres" value={thisUsuario.nombres} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="Apellidos" className="form-label">Apellidos:</label>
                        <input type="text" className="form-control" id="Apellidos" name="apellidos" value={thisUsuario.apellidos} onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Direccion" className="form-label">Direccion:</label>
                        <input type="text" className="form-control" id="Direccion" name="direccion" value={thisUsuario.direccion} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="Telefono" className="form-label">Teléfono:</label>
                        <input type="number" className="form-control" id="Telefono" name="telefono" value={thisUsuario.telefono} onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Correo" className="form-label">Correo electrónico:</label>
                        <input type="email" className="form-control" id="Correo" name="correo" value={thisUsuario.correo} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="TDocumento" className="form-label">Tipo de Documento:</label>
                        <select className="form-select" id="TDocumento" name="tipoDocumento" value={thisUsuario.tipoDocumento} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            <option value="CC">Cedula de Ciudadania</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="RC">Registro Civil de Nacimiento</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Documento" className="form-label">Documento:</label>
                        <input type="text" className="form-control" id="Documento" name="documento" value={thisUsuario.documento} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                {!registrar &&<div className="col-md-6">
                        <label htmlFor="Rol" className="form-label">Rol:</label>
                        <select className="form-select" id="Rol" name="rol" value={thisUsuario.rol} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            <option value="Paciente">Paciente</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Medico">Medico</option>
                            <option value="Auxiliar">Auxiliar</option>
                        </select>
                    </div>}
                    {!registrar && <div className="col-md-6">
                        <label htmlFor="Estado" className="form-label">Estado:</label>
                        <select className="form-select" id="Estado" name="estado" value={thisUsuario.estado} onChange={handleChange}>
                            <option value="">Seleccione...</option>
                            <option value="Activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>}
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                        <input type="date" className="form-control" id="fechaNacimiento" name="fechaNacimiento" value={thisUsuario.fechaNacimiento} onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="tipoSangre" className="form-label">Tipo de Sangre:</label>
                        <select className="form-select" id="tipoSangre" name="tipoSangre" value={thisUsuario.tipoSangre} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            <option value="Rh+">Rh+</option>
                            <option value="Rh-">Rh-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="departamentoUbicacion" className="form-label">Departamento:</label>
                        <select className="form-select" id="departamentoUbicacion" name="departamentoUbicacion" value={thisUsuario.ubicacion.departamento} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            {ubicaciones.map((ubicacion, index) => (
                            <option key={index} value={ubicacion.departamentoUbicacion}>{ubicacion.departamentoUbicacion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="municipioUbicacion" className="form-label">Municipio:</label>
                        <input type="text" className="form-control" id="municipioUbicacion" name="municipioUbicacion" value={thisUsuario.ubicacion.municipio} onChange={handleChange} required disabled />
                    </div>
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label htmlFor="codigoUbicacion" className="form-label">Código Ubicación:</label>
                        <input type="text" className="form-control" id="codigoUbicacion" name="codigoUbicacion" value={thisUsuario.ubicacion.codigoUbicacion} onChange={handleChange} required disabled />
                    </div>
                    {verEspecialidad && <div className="col-md-6">
                        <label htmlFor="Especialidad" className="form-label">Especialidad:</label>
                        <select className="form-select" id="Especialidad" name="Especialidad" value={thisUsuario.especialidad.especialidad} onChange={handleChange}>
                            <option value="">Seleccione...</option>
                            <option value="pediatria">Pediatría</option>
                            <option value="Medicina general">Medicina General</option>
                            <option value="ginecologia">Ginecología</option>
                        </select>
                    </div>}
                </div>
                <div className="row g-3 mb-3">
                    <div >
                        <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                        <input type="password" className="form-control" id="contrasena" name="clave" autoComplete="new-password" value={thisUsuario.clave} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type='submit' className="btn btn-primary me-2" onClick={onClickSave}><i className="fas fa-paper-plane me-1" disabled={loading}></i>{loading ? "Guardando..." : "Guardar"}</button>
                    <button type="reset" className="btn btn-secondary"><i className="fas fa-broom me-1" ></i>Limpiar</button>
                </div>
            </fieldset>
        </form>
    </div>
  );
}

export default FormUsuarios