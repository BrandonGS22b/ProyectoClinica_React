import React, { useState, useEffect } from "react";
import { getListUsers } from "./../../API/UsuariosAPI";
import { getSedes } from "./../../API/SedesAPI";
import { getUbicaciones } from "./../../API/UbicacionesAPI";
import Ubicaciones from "../Ubicaciones/Ubicaciones";

function FormAgenda(props) {
    const { onSave, agenda, isEditing, medicos, sedes } = props;

    const [ date, setDate ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ form, setForm ] = useState({
        _id: null,
        tipoAgenda: "",
        estadoAgenda: "Activa",
        fechaAgenda: "",
        horaInicio: "",
        horaFin: "",
        medico: "",
        consultorio: ""
    });
    const [ medicosList, setMedicosList ] = useState([]);
    const [ sedesList, setSedesList ] = useState([]);
    const [ consultoriosList, setConsultoriosList ] = useState([]);

    const [ sedesConsultorios, setSedesConsultorios ] = useState([]);

    useEffect(() => {

        getSedes()
        .then(response => {
            setSedesConsultorios(response);
        })
        .catch(error => console.log(error));

        setMedicosList(medicos);
        setSedesList(sedes);
    }, [ medicos, sedes ]);

    useEffect(() => {
        if (agenda) {
            setForm(agenda);
        }
    }, [ agenda ]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    };

    const handleMedicoChange = (e) => {
        sedesList.map(sede => {
            console.log(sede);            
        });
        sedesList.map(sede => {
            console.log(sede.sedes.nombreSede);            
        });
        const selectedMedico = medicosList.find(medico => medico._id === e.target.value);
        setForm({
            ...form,
            medico: {
                idMedico: selectedMedico._id.toString(),
                codigo: selectedMedico.codigo,
                nombres: selectedMedico.nombres,
                apellidos: selectedMedico.apellidos,
                tipoDocumento: selectedMedico.tipoDocumento,
                documento: selectedMedico.documento,
                estado: selectedMedico.estado,
                especialidad: selectedMedico.especialidad.especialidad,
            }
        });        
    };

    const handleSedeChange = (e) => {
        const selectedSede = sedesList.find(sede => sede.sedes.idSede === Number(e.target.value));
        setForm({
            ...form,
            consultorio: {
                sede: {
                    idSede: selectedSede.sedes.idSede,
                    nombreSede: selectedSede.sedes.nombreSede,
                    direccionSede: selectedSede.sedes.direccionSede,
                    departamento: selectedSede.departamentoUbicacion,
                    municipio: selectedSede.municipioUbicacion,
                    codigoUbicacion: selectedSede.codigoUbicacion
                }
            }
        });
        const consultoriosSede = sedesConsultorios.find(sede => sede.idSede === Number(e.target.value));
        setConsultoriosList(consultoriosSede.consultorios);
        
    };

    const handleConsultorioChange = (e) => {
        const selectedConsultorio = consultoriosList.find(consultorio => consultorio._id === e.target.value);
        setForm({
            ...form,
            consultorio: {
                ...form.consultorio,
                idConsultorio: selectedConsultorio.idConsultorio,
                codigoConsultorio: selectedConsultorio.codigoConsultorio,
                descripcionConsultorio: selectedConsultorio.descripcionConsultorio
            }
        });
    };

    const handleTipoAgendaChange = (e) => {
        const tipoAgenda = e.target.value;
        let horaInicio;
        let horaFin;

        if (tipoAgenda === "Mañana") {
            horaInicio = "07:00";
            horaFin = "13:00";
        } else if (tipoAgenda === "Tarde") {
            horaInicio = "13:00";
            horaFin = "20:00";
        }

        setForm({
            ...form,
            tipoAgenda,
            horaInicio,
            horaFin
        });
    };

    const handleFechaAgendaChange = (e) => {
        const fechaAgenda = e.target.value;
        setForm({
            ...form,
            fechaAgenda
        });
    }

    const handleEstadoAgendaChange = (e) => {
        const estadoAgenda = e.target.value;
        setForm({
            ...form,
            estadoAgenda
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="container mt-3 mb-5">
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="card p-4">
                    <div className="row mb-3">
                        <p className="fw-bold">Jornada Mañana 7 a.m - 1 p.m</p>
                        <p className="fw-bold">Jornada Tarde 1 p.m - 8 p.m</p>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Tipo de Agenda:</label>
                                <select className="form-control" name="tipoAgenda" value={form.tipoAgenda} onChange={handleTipoAgendaChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="Mañana">Mañana</option>
                                    <option value="Tarde">Tarde</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Médico:</label>
                                <select className="form-control" name="medico" value={form.medico?._id} onChange={handleMedicoChange}>
                                    <option value="">Seleccionar</option>
                                    {medicosList.map(medico => (
                                        <option key={medico._id} value={medico._id}>
                                            {medico.nombres} {medico.apellidos}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Sede:</label>
                                <select className="form-control" name="sede" value={form.consultorio?.sede?.idSede} onChange={handleSedeChange}>
                                    <option value="">Seleccionar</option>
                                    {sedesList.map(sede => (
                                        <option key={sede.sedes.idSede} value={sede.sedes.idSede}>
                                            {sede.sedes.nombreSede}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Consultorio:</label>
                                <select className="form-control" name="consultorio" value={form.consultorio?.consultorio?._id} onChange={handleConsultorioChange}>
                                    <option value="">Seleccionar</option>
                                    {consultoriosList.map(consultorio => (
                                        <option key={consultorio._id} value={consultorio._id}>
                                            {consultorio.descripcionConsultorio}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Fecha:</label>
                                <input type="date" className="form-control" value={form.fechaAgenda} onChange={handleFechaAgendaChange} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Estado:</label>
                                <select className="form-control" value={form.estadoAgenda} onChange={handleEstadoAgendaChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="Activa">Activa</option>
                                    <option value="Inactiva">Inactiva</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">Guardar Agenda</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormAgenda;
