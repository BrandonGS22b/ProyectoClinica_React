import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useSession } from "../../Usuarios/Login";

function FormOrdenExamen(props) {
    const { onSave, OrdenExamen, showButtons = true } = props;
    const { session } = useSession();
    const [showResults, setShowResults] = useState(false);
    const [showExamination, setShowExamination] = useState(false);

    const [formData, setFormData] = useState({
        _id: null,
        idHistorias: "",
        vigencia: "",
        fechaCreacion: "",
        estado: "",
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
        },
    });

    const toggleResults = () => {
        setShowResults(!showResults);
    };

    const toggleExamination = () => {
        setShowExamination(!showExamination);
    };

    useEffect(() => {
        if (OrdenExamen) {
            setFormData(OrdenExamen)
            
        }
    }, [OrdenExamen]);

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
                            <input type="text" className="form-control" id="pacienteNombres" name="paciente.nombres" value={formData.paciente.nombres} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacienteApellidos" className="form-labelpaciente">Apellidos</label>
                            <input type="text" className="form-control" id="pacienteApellidos" name="paciente.apellidos" value={formData.paciente.apellidos} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacientetipoDocumento" className="form-labelpaciente">Tipo de documento</label>
                            <select className="form-control" id="pacientetipoDocumento" name="paciente.tipoDocumento" value={formData.paciente.tipoDocumento} onChange={handleChange}>
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cedula de Extranjería">Cedula de Extranjería</option>
                                <option value="Cedula de Ciudadanía">Cedula de Ciudadanía</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pacienteDocumento" className="form-labelpaciente">Documento</label>
                            <input type="text" className="form-control" id="pacienteDocumento" name="paciente.documento" value={formData.paciente.documento} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border p-3 mt-3">
                    <label htmlFor="Nombre" className="form-labelmedico"><b>DATOS MEDICO</b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="medicoIdUsuario" name="medico.idUsuario" value={formData.medico.idUsuario} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="medicoNombres" className="form-labelmedico">Nombre</label>
                            <input type="text" className="form-control" id="medicoNombres" name="medico.nombres" value={formData.medico.nombres} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoApellidos" className="form-labelmedico">Apellidos</label>
                            <input type="text" className="form-control" id="medicoApellidos" name="medico.apellidos" value={formData.medico.apellidos} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicotipoDocumento" className="form-labelmedico">Tipo de documento</label>
                            <select className="form-control" id="medicotipoDocumento" name="medico.tipoDocumento" value={formData.medico.tipoDocumento} onChange={handleChange}>
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Licencia">Cedula de Extranjería</option>
                                <option value="CC">Cedula de Ciudadanía</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoDocumento" className="form-labelmedico">Documento</label>
                            <input type="text" className="form-control" id="medicoDocumento" name="medico.documento" value={formData.medico.documento} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoEspecialidad" className="form-labelmedico">Especialidad</label>
                            <select className="form-control" id="medicoEspecialidad" name="medico.especialidad" value={formData.medico.especialidad} onChange={handleChange}>
                                <option value="">Seleccione la especialidad del medico</option>
                                <option value="Medicina Interna">Medicina Interna</option>
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
                <div className="container mt-3">
                    <div>
                        <button type="button" className="btn btn-primary" onClick={toggleResults}>Adjuntar resultados</button>
                        <button type="button" className="btn btn-secondary" onClick={toggleExamination}>Adjuntar examen</button>
                    </div>

                    {showResults && (
                        <div>
                            <fieldset className="border p-3 mt-3">
                                <label htmlFor="examen" className="form-labelResultados"><b>ADJUNTAR RESULTADOS</b></label>
                                <div className="row g-1">
                                <div className="col-md-6">
                                        <label htmlFor="IdResultados" className="form-label">Id Resultados</label>
                                        <input required type="text" className="form-control" id="IdResultados" name="resultados.idResultado" value={formData.resultados.idResultado} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="fechaResultados" className="form-label">Fecha Creación</label>
                                        <input required type="date" className="form-control" id="fechaResultados" name="resultados.fechaResultado" value={formatDate(formData.resultados.fechaResultado)} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="estadoResultado" className="form-labelestado">Estado de resultado</label>
                                        <input required type="text" className="form-control" id="estadoResultado" name="resultados.estadoResultado" value={formData.resultados.estadoResultado} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="archivosAdjuntos" className="form-labelajuntos">Archivos adjuntos</label>
                                        <input required type="text" className="form-control" id="archivosAdjuntos" name="resultados.archivosAdjuntos" value={formData.resultados.archivosAdjuntos} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="metodoAnalisis" className="form-labelmetodo">Metodo Analisis</label>
                                        <input required type="text" className="form-control" id="metodoAnalisis" name="resultados.metodoAnalisis" value={formData.resultados.metodoAnalisis} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="observaciones" className="form-labelobservaciones">Observaciones</label>
                                        <input required type="text" className="form-control" id="observaciones" name="resultados.observaciones" value={formData.resultados.observaciones} onChange={handleChange} />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    )}
                    {showExamination && (
                        <div>
                            <fieldset className="border p-3 mt-3">
                                <label htmlFor="examen" className="form-labelmedico"><b>CREAR EXAMEN</b></label>
                                <div className="row g-1">
                                    <div className="col-md-6">
                                        <label htmlFor="nombreExamen" className="form-labelmedico">Nombre del examen</label>
                                        <input required type="text" className="form-control" id="nombreExamen" name="examen.nombreExamen" value={formData.examen.nombreExamen} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="codigoExamen" className="form-labelmedico">Codigo del examen</label>
                                        <input required type="text" className="form-control" id="codigoExamen" name="examen.codigoExamen" value={formData.examen.codigoExamen} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="descripcion" className="form-labelmedico">Descripcion del examen</label>
                                        <input required type="text" className="form-control" id="descripcion" name="examen.descripcion" value={formData.examen.descripcion} onChange={handleChange} />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    )}
                </div>
                <fieldset className="border p-3 mt-3">
                    <label htmlFor="Nombre" className="form-labelpaciente"><b>DATOS ORDEN </b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="idHistorias" name="idHistorias" value={formData.idHistorias} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="vigencia" className="form-label"> Vigencia </label>
                            <input required type="text" className="form-control" id="vigencia" name="vigencia" value={formData.vigencia} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="estado" className="form-label"> Estado </label>
                            <input required type="text" className="form-control" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
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

export default FormOrdenExamen;