import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useSession } from "../../Usuarios/Login";

function FormOrdenIncapacidad(props) {
    const { onSave, OrdenIncapacidad, showButtons = true } = props;
    const { session } = useSession();

    const [formData, setFormData] = useState({
        _id: null,
        idHistorias: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        fechaCreacion: "",
        paciente: {
            idUsuario: "",
            nombres: "",
            apellidos: "",
            tipoDocumento: "",
            documento: "",
        },
        medico: {
            idUsuario: "",
            nombres: "",
            apellidos: "",
            tipoDocumento: "",
            documento: "",
            especialidad: "",
        }
    });

    useEffect(() => {
        if (OrdenIncapacidad) {
            setFormData(OrdenIncapacidad)
        }
    }, [OrdenIncapacidad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 1) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFormData(prevState => {
                let obj = { ...prevState };
                keys.reduce((o, key, idx) => {
                    if (idx === keys.length - 1) {
                        o[key] = value;
                    } else {
                        o[key] = o[key] || {};
                    }
                    return o[key];
                }, obj);
                return obj;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (session.rol === "Paciente") {
            Swal.fire({
                title: "No tienes permitido hacer esto",
                icon: "error",
            });
        } else {
            onSave(formData);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="container mt-2">
            <form className="border p-6 rounded shadow bg-body my-3" onSubmit={handleSubmit}>
                <fieldset className="border p-3">
                    <legend className="text-primary mb-3">Formulario</legend>
                    <label htmlFor="pacientelabel" className="form-labelpaciente"><b>DATOS PACIENTE</b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="paciente.idUsuario" name="paciente.idUsuario" value={formData.paciente.idUsuario} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="pacienteNombres" className="form-labelpaciente">Nombre</label>
                            <input type="text" readOnly className="form-control" id="pacienteNombres" name="paciente.nombres" value={formData.paciente.nombres} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacienteApellidos" className="form-labelpaciente">Apellidos</label>
                            <input readOnly type="text" className="form-control" id="pacienteApellidos" name="paciente.apellidos" value={formData.paciente.apellidos} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacientetipoDocumento" className="form-labelpaciente">Tipo de documento</label>
                            <select disabled className="form-control" id="pacientetipoDocumento" name="paciente.tipoDocumento" value={formData.paciente.tipoDocumento} onChange={handleChange}>
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cedula de Extranjería">Cedula de Extranjería</option>
                                <option value="CC">Cedula de Ciudadanía</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacienteDocumento" className="form-labelpaciente">Documento</label>
                            <input readOnly type="text" className="form-control" id="pacienteDocumento" name="paciente.documento" value={formData.paciente.documento} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border p-3 mt-3">
                    <label htmlFor="Nombre" className="form-labelmedico"><b>DATOS MEDICO</b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="medicoIdUsuario" name="medico.idUsuario" value={formData.medico.idUsuario} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="medicoNombres" className="form-labelmedico">Nombre</label>
                            <input type="text" readOnly className="form-control" id="medicoNombres" name="medico.nombres" value={formData.medico.nombres} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoApellidos" className="form-labelmedico">Apellidos</label>
                            <input type="text" readOnly className="form-control" id="medicoApellidos" name="medico.apellidos" value={formData.medico.apellidos} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicotipoDocumento" className="form-labelmedico">Tipo de documento</label>
                            <select disabled className="form-control" id="medicotipoDocumento" name="medico.tipoDocumento" value={formData.medico.tipoDocumento} onChange={handleChange}>
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cedula de Extranjería">Cedula de Extranjería</option>
                                <option value="CC">Cedula de Ciudadanía</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoDocumento" className="form-labelmedico">Documento</label>
                            <input type="text" readOnly className="form-control" id="medicoDocumento" name="medico.documento" value={formData.medico.documento} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoEspecialidad" className="form-labelmedico">Especialidad</label>
                            <select disabled className="form-control" id="medicoEspecialidad" name="medico.especialidad" value={formData.medico.especialidad} onChange={handleChange}>
                                <option value="">Seleccione la especialidad del medico</option>
                                <option value="MedicinaInterna">Medicina Interna</option>
                                <option value="General">Medicina General</option>
                                <option value="Cardiología">Cardiología</option>
                                <option value="Dermatología">Dermatología</option>
                                <option value="Gastroenterología">Gastroenterología</option>
                                <option value="Nefrología">Nefrología</option>
                                <option value="Neumología">Neumología</option>
                                <option value="Pediatría">Pediatría</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border p-3 mt-3">
                    <label htmlFor="Nombre" className="form-labelpaciente"><b>DATOS ORDEN</b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="idHistorias" name="idHistorias" value={formData.idHistorias} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input required type="text" className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                            <input required type="date" className="form-control" id="fechaInicio" name="fechaInicio" value={formatDate(formData.fechaInicio)} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                            <input required type="date" className="form-control" id="fechaFin" name="fechaFin" value={formatDate(formData.fechaFin)} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaCreacion" className="form-label">Fecha Creación</label>
                            <input required type="date" className="form-control" id="fechaCreacion" name="fechaCreacion" value={formatDate(formData.fechaCreacion)} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>

                {showButtons && (
                    <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-primary me-2"><i className="fas fa-paper-plane me-1"></i>Enviar</button>
                    </div>
                )}
            </form>
        </div>
    );
}
export default FormOrdenIncapacidad;