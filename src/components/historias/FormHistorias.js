import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function FormHistorias(props) {
    const navegar = useNavigate;
    //alert("ingeso a formhistorias")

    const { onSave, historia } = props;

    const [showPaciente, setShowPaciente] = useState(false);
    const [showValoracion, setShowValoracion] = useState(true);
    const [showMedico, setShowMedico] = useState(false);
    const [showCita, setShowCita] = useState(false);
    const [showOrden, setShowOrden] = useState(false);

    const [thisHistoria, setThisHistoria,] = useState({
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
            idPaidPaciente: "",
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
            horaAgenda: ""
        }
    });

    useEffect(() => {
        if (historia) {
            setThisHistoria(historia);
        }
    }, [historia]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        setThisHistoria(prevState => {
            // Hacemos una copia del estado anterior
            let obj = { ...prevState };
    
            if (keys.length === 1) {
                // Actualizamos la propiedad de nivel superior
                obj[keys[0]] = value;
            } else {
                // Navegamos por el objeto para actualizar la propiedad anidada
                let nestedObj = obj;
                for (let i = 0; i < keys.length - 1; i++) {
                    // Solo hacemos una copia de la parte del objeto que estamos modificando
                    nestedObj[keys[i]] = { ...nestedObj[keys[i]] };
                    nestedObj = nestedObj[keys[i]];
                }
                nestedObj[keys[keys.length - 1]] = value;
            }
    
            return obj;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(thisHistoria);
    };

    const togglePaciente = () => {
        setShowPaciente(prevState => !prevState);
    };

    const toggleValoracion = () => {
        setShowValoracion(prevState => !prevState);
    };

    const toggleMedico = () => {
        setShowMedico(prevState => !prevState);
    };

    const toggleCita = () => {
        setShowCita(prevState => !prevState);
    };

    const toggleOrden = () => {
        setShowOrden(prevState => !prevState);
    };

    const nombreUsuario = (thisHistoria.paciente.nombresPaciente + " " +thisHistoria.paciente.apellidosPaciente).toUpperCase();
    console.log(thisHistoria.tipoConsulta)
    return (
        <div className="container mt-5">
            <div class="container">
                <h3 className="text-dark">{nombreUsuario && `${nombreUsuario}`}</h3>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-auto">
                    <button className="btn btn-primary ms-2" onClick={toggleValoracion}> Valoración</button>
                        <button className="btn btn-primary ms-2" onClick={togglePaciente}> Paciente</button>
                        <button className="btn btn-primary ms-2" onClick={toggleMedico}>Médico</button>
                        <button className="btn btn-primary ms-2" onClick={toggleCita}>Cita</button>
                        <button className="btn btn-primary ms-2" onClick={toggleOrden}>Órdenes</button>
                    </div>
                </div>
            </div>
            <form className="border p-1 rounded shadow bg-body  my-3">
                <fieldset>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label htmlFor="codigoHistoria" className="form-label">Código de Historia:</label>
                            <input type="text" className="form-control" id="codigoHistoria" name="codigoHistoria" value={thisHistoria.codigoHistoria} onChange={handleChange} readOnly/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {showValoracion &&
                            <div>
                                <legend className="text-primary mb-3">Valoración</legend>
                                <div className="row g-3">
                                    <div className="col-md-2">
                                        <label htmlFor="temperatura" className="form-label">Temperatura:</label>
                                        <input type="text" className="form-control" id="temperatura" name="temperatura" value={thisHistoria.temperatura} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="peso" className="form-label">Peso:</label>
                                        <input type="text" className="form-control" id="peso" name="peso" value={thisHistoria.peso} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="altura" className="form-label">Altura:</label>
                                        <input type="text" className="form-control" id="altura" name="altura" value={thisHistoria.altura} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="presionAlterial" className="form-label">Presión Arterial:</label>
                                        <input type="text" className="form-control" id="presionAlterial" name="presionAlterial" value={thisHistoria.presionAlterial} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="tipoConsulta" className="form-label">Tipo de Consulta:</label>
                                        <select type="text" className="form-select" id="tipoConsulta" name="tipoConsulta" value={thisHistoria.tipoConsulta} onChange={handleChange}>
                                            <option value="-">Seleccione...</option>
                                            <option value="Control">Control</option>
                                            <option value="Urgencias">Urgencias</option>
                                            <option value="Prioritaria">Prioritaria</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="motivo" className="form-label">Motivo:</label>
                                        <textarea type="text" className="form-control" id="motivo" name="motivo" value={thisHistoria.motivo} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="antecendentes" className="form-label">Antecedentes:</label>
                                        <textarea className="form-control" id="antecendentes" name="antecendentes" value={thisHistoria.antecendentes} onChange={handleChange}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="diagnostico" className="form-label">Diagnostico:</label>
                                        <textarea type="text" className="form-control" id="diagnostico" name="diagnostico" value={thisHistoria.diagnostico} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="valoracion" className="form-label">Valoracion:</label>
                                        <textarea type="text" className="form-control" id="valoracion" name="valoracion" value={thisHistoria.valoracion} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-12">
                        {showPaciente &&
                            <div>
                                <legend className="text-primary mb-3">Paciente</legend>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label htmlFor="paciente.tipoDocumentoPaciente" className="form-label">Tipo de Documento del Paciente:</label>
                                        <input type="text" className="form-control" id="paciente.tipoDocumentoPaciente" name="paciente.tipoDocumentoPaciente" value={thisHistoria.paciente.tipoDocumentoPaciente} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="paciente.documentoPaciente" className="form-label">Documento del Paciente:</label>
                                        <input type="text" className="form-control" id="paciente.documentoPaciente" name="paciente.documentoPaciente" value={thisHistoria.paciente.documentoPaciente} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="paciente.nombresPaciente" className="form-label">Nombres del Paciente:</label>
                                        <input type="text" className="form-control" id="paciente.nombresPaciente" name="paciente.nombresPaciente" value={thisHistoria.paciente.nombresPaciente} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="paciente.apellidosPaciente" className="form-label">Apellidos del Paciente:</label>
                                        <input type="text" className="form-control" id="paciente.apellidosPaciente" name="paciente.apellidosPaciente" value={thisHistoria.paciente.apellidosPaciente} onChange={handleChange} readOnly />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-12">
                        {showMedico &&
                            <div>
                                <legend className="text-primary mb-3">Medico</legend>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label htmlFor="medico.nombresMedico" className="form-label">Nombres del Médico:</label>
                                        <input type="text" className="form-control" id="medico.nombresMedico" name="medico.nombresMedico" value={thisHistoria.medico.nombresMedico} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="medico.apellidosMedico" className="form-label">Apellidos del Médico:</label>
                                        <input type="text" className="form-control" id="medico.apellidosMedico" name="medico.apellidosMedico" value={thisHistoria.medico.apellidosMedico} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="medico.especialidadMedico" className="form-label">Nombre Especialidad del Médico:</label>
                                        <input type="text" className="form-control" id="medico.especialidadMedico" name="medico.especialidadMedico" value={thisHistoria.medico.especialidadMedico} onChange={handleChange} readOnly />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-12">
                        {showCita &&
                            <div>
                                <legend className="text-primary mb-3">Cita</legend>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label htmlFor="cita.tipoCita" className="form-label">Tipo de Cita:</label>
                                        <input type="text" className="form-control" id="cita.tipoCita" name="cita.tipoCita" value={thisHistoria.cita.tipoCita} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="cita.estadoCita" className="form-label">Estado de la Cita:</label>
                                        <input type="text" className="form-control" id="cita.estadoCita" name="cita.estadoCita" value={thisHistoria.cita.estadoCita} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="cita.fechaAgenda" className="form-label">Fecha de Agenda de la Cita:</label>
                                        <input type="text" className="form-control" id="cita.fechaAgenda" name="cita.fechaAgenda" value={new Date(thisHistoria.cita.fechaAgenda).toLocaleDateString()} onChange={handleChange} readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="cita.horaAgenda" className="form-label">Hora de Agenda de la Cita:</label>
                                        <input type="text" className="form-control" id="cita.horaAgenda" name="cita.horaAgenda" value={thisHistoria.cita.horaAgenda} onChange={handleChange} readOnly />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-12">
                        {showOrden &&
                            <div>
                                <legend className="text-primary mb-3">Ordenes</legend>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-auto">
                                            <Link to={`/OrdenIncapacidad?${thisHistoria?._id}`}>
                                                <button className="btn btn-success ms-2">Incapacidades</button>
                                            </Link>
                                            <Link to={`/OrdenMedicamento?${thisHistoria?._id}`}>
                                                <button className="btn btn-success ms-2">Medicamentos</button>
                                            </Link>
                                            <Link to={`/OrdenExamen?${thisHistoria?._id}`}>
                                                <button className="btn btn-success ms-2">Examenes</button>
                                            </Link>
                                            <Link to={`/OrdenRemision?${thisHistoria?._id}`}>
                                                <button className="btn btn-success ms-2">Remisiones</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-primary me-2"><i className="fas fa-paper-plane me-1" onClick={handleSubmit}></i>Enviar</button>
                        <button type="reset" className="btn btn-secondary"><i className="fas fa-broom me-1"></i>Limpiar</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default FormHistorias