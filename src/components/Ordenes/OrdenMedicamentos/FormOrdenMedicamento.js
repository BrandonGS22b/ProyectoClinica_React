import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';
import { useSession } from "../../Usuarios/Login";
import { getMedicamentos } from '../../../API/MedicamentosApi';

function FormOrdenMedicamento(props) {
    const { onSave, OrdenMedicamento, showButtons = true } = props;
    const { session } = useSession();

    const [formData, setFormData] = useState({
        _id: null,
        idHistorias: "",
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
        medicamento: []
    });

    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        getMedicamentos()
            .then((medicamentos) => {
                setMedicamentos(medicamentos);
            })
            .catch((error) => console.error("Error al obtener los medicamentos:", error));

        if (OrdenMedicamento) {
            setFormData(OrdenMedicamento);
        }
    }, [OrdenMedicamento]);

    const [newMedicamento, setNewMedicamento] = useState({
        idMedicamento: "",
        nombre: "",
        codigo: "",
        dosis: "",
        cantidad: null,
        entregas: null,
        entregasHechas: "",
        indicaciones: "",
        vigencia: null,
        _id: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [category, field] = name.split('.');
        if (field) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [category]: {
                    ...prevFormData[category],
                    [field]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleMedicamentoChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMedicamentos = formData.medicamento.map((medicamento, i) => (
            i === index ? { ...medicamento, [name]: value } : medicamento
        ));
        setFormData((prevFormData) => ({
            ...prevFormData,
            medicamento: updatedMedicamentos,
        }));
    };

    const handleChangeMedicamentoSeleccionado = (index, e) => {
        const selectedMedicamentoId = e.target.value;
        const selectedMedicamento = medicamentos.find(medicamento => medicamento._id === selectedMedicamentoId);
        const updatedMedicamentos = [...formData.medicamento];
        updatedMedicamentos[index] = { ...selectedMedicamento };
        setFormData((prevFormData) => ({
            ...prevFormData,
            medicamento: updatedMedicamentos,
        }));
    };

    const agregarMedicamento = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            medicamento: [
                ...prevFormData.medicamento,
                {
                    nombre: '',
                    codigo: '',
                    dosis: '',
                    cantidad: "",
                    entregas: "",
                    entregasHechas: '',
                    indicaciones: '',
                    vigencia: ""
                }
            ]
        }));
    };

    const handleRemoveMedicamento = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            medicamento: prevFormData.medicamento.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (session.rol === "Paciente") {
            Swal.fire({
                title: "No tienes permitido hacer esto",
                icon: "error",
            });
        } else{
            const selectedMedicamento = formData.medicamento.map(med => ({
                ...med
            }));
            const formDataWithMedicamentoInfo = {
                ...formData,
                medicamento: selectedMedicamento
            };
            if (onSave) {
                onSave(formDataWithMedicamentoInfo);
            }
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
                    <label htmlFor="pacientelabel" className="form-labelpaciente"><b>DATOS MEDICO</b></label>
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="medico.idUsuario" name="medico.idUsuario" value={formData.medico.idUsuario} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="medicoNombres" className="form-labelpaciente">Nombre</label>
                            <input type="text" readOnly className="form-control" id="medicoNombres" name="medico.nombres" value={formData.medico.nombres} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoApellidos" className="form-labelpaciente">Apellidos</label>
                            <input readOnly type="text" className="form-control" id="medicoApellidos" name="medico.apellidos" value={formData.medico.apellidos} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicotipoDocumento" className="form-labelpaciente">Tipo de documento</label>
                            <select disabled className="form-control" id="medicotipoDocumento" name="medico.tipoDocumento" value={formData.medico.tipoDocumento} onChange={handleChange}>
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cedula de Extranjería">Cedula de Extranjería</option>
                                <option value="CC">Cedula de Ciudadanía</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoDocumento" className="form-labelpaciente">Documento</label>
                            <input readOnly type="text" className="form-control" id="medicoDocumento" name="medico.documento" value={formData.medico.documento} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="medicoEspecialidad" className="form-labelpaciente">Especialidad</label>
                            <input readOnly type="text" className="form-control" id="medicoEspecialidad" name="medico.especialidad" value={formData.medico.especialidad} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border p-3 mt-3">
                    <div className="row g-1">
                        <input type="hidden" className="form-control" id="idHistorias" name="idHistorias" value={formData.idHistorias} onChange={handleChange} />
                        <div className="col-md-6">
                            <label htmlFor="fechaCreacion" className="form-labelpaciente">Fecha Creación:</label>
                            <input required type="date" className="form-control" id="fechaCreacion" name="fechaCreacion" value={formatDate(formData.fechaCreacion)} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label>Estado:</label>
                            <input required type="text" className="form-control" name="estado" value={formData.estado} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="border p-3 mt-3">
                    <legend className="text-primary mb-3">Agregar Medicamento</legend>
                    {formData.medicamento.map((medicamento, index) => (
                        <div key={index} className="row g-1">
                            <div className="form-group">
                                <select required className="form-select" value={medicamento._id} onChange={(e) => handleChangeMedicamentoSeleccionado(index, e)}>
                                    <option value="">Selecciona un medicamento</option>
                                    {medicamentos.map((medicamento) => (
                                        <option key={medicamento._id} value={medicamento._id}>
                                            {medicamento.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`dosis${index}`} name="dosis" value={medicamento.dosis} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Dosis" required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`cantidad${index}`} name="cantidad" value={medicamento.cantidad} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Cantidad" required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`entregas${index}`} name="entregas" value={medicamento.entregas} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Entregas" required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`entregasHechas${index}`} name="entregasHechas" value={medicamento.entregasHechas} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Entregas Hechas" required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`indicaciones${index}`} name="indicaciones" value={medicamento.indicaciones} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Indicaciones" required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id={`vigencia${index}`} name="vigencia" value={medicamento.vigencia} onChange={(e) => handleMedicamentoChange(index, e)} placeholder="Vigencia" required />
                            </div>
                            <div className="col-md-15">
                                <Button variant="danger" onClick={() => handleRemoveMedicamento(index)}><i className="fas fa-trash"></i></Button>
                            </div>
                        </div>
                    ))}
                    <br></br>
                    <Button variant="primary" onClick={agregarMedicamento}>Agregar Medicamento</Button>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <label><b>Lista de Medicamentos Recetados</b></label>
                            <ul className="list-group">
                                {formData.medicamento.map((med, index) => (
                                    <li key={index} className="list-group-item">
                                        {med.indicaciones} - {med.dosis} - {med.cantidad}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </fieldset>
                {showButtons && (
                    <div className="mt-3 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary me-2"><i className="fas fa-paper-plane me-1"></i>Guardar</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default FormOrdenMedicamento;
