import React, { useState, useEffect } from 'react';
import Footer from '../generales/Footer';
import { getConsultorios } from "../../API/ConsultoriosAPI";  

function FormSedes(props) {
    const { sede, onSave, verLista } = props;
    const [formData, setFormData] = useState({
        _id: null,
        idSede: "",
        nombreSede: "",
        direccionSede: "",
        consultorios: []  // Inicializado como una lista vacía
    });

    const [consultoriosDisponibles, setConsultoriosDisponibles] = useState([]);

    useEffect(() => {
        if (sede) {
            setFormData({
                ...sede,
                _id: sede._id || null,
                consultorios: sede.consultorios || []
            });
        }

        // Obtener todos los consultorios disponibles
        getConsultorios()
            .then((data) => setConsultoriosDisponibles(data))
            .catch((err) => console.log(err));
    }, [sede]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newConsultorios = [...formData.consultorios];
        newConsultorios[index] = value;
        setFormData({
            ...formData,
            consultorios: newConsultorios
        });
    };

    const addConsultorioField = () => {
        setFormData({
            ...formData,
            consultorios: [...formData.consultorios, ""]
        });
    };

    const removeConsultorioField = (index) => {
        const newConsultorios = [...formData.consultorios];
        newConsultorios.splice(index, 1);
        setFormData({
            ...formData,
            consultorios: newConsultorios
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanFormData = { ...formData };
        onSave(cleanFormData);
    };

    return (
        <div className="container mt-2">
            <form className="border p-6 rounded shadow bg-body my-3" onSubmit={handleSubmit}>
                <fieldset className="border p-3">
                    <legend className="text-primary mb-3">Formulario de Sedes</legend>

                    <label htmlFor="idSede" className="form-label"><b>Datos de la Sede</b></label>
                    <div className="row g-1">
                        <input
                            type="text"
                            className="form-control"
                            id="_id"
                            name="_id"
                            value={formData._id}
                            onChange={handleChange}
                            hidden
                        />
                        <div className="col-md-6">
                            <label htmlFor="idSede" className="form-label">ID SEDE</label>
                            <input
                                type="text"
                                className="form-control"
                                id="idSede"
                                name="idSede"
                                value={formData.idSede}
                                onChange={(e) => setFormData({ ...formData, idSede: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nombreSede" className="form-label">Nombre de la Sede</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreSede"
                                name="nombreSede"
                                value={formData.nombreSede}
                                onChange={(e) => setFormData({ ...formData, nombreSede: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="direccionSede" className="form-label">Dirección de la Sede</label>
                            <input
                                type="text"
                                className="form-control"
                                id="direccionSede"
                                name="direccionSede"
                                value={formData.direccionSede}
                                onChange={(e) => setFormData({ ...formData, direccionSede: e.target.value })}
                                required
                            />
                        </div>

                        <label htmlFor="consultorios" className="form-label">Consultorios</label>
                        {formData.consultorios.map((consultorio, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <select
                                    className="form-control"
                                    id={`consultorios-${index}`}
                                    name="consultorios"
                                    value={consultorio}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                >
                                    <option value="">Seleccione un consultorio</option>
                                    {consultoriosDisponibles.map((consultorio) => (
                                        <option key={consultorio._id} value={consultorio._id}>
                                            {consultorio.descripcionConsultorio}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-danger ms-2" onClick={() => removeConsultorioField(index)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ))}

                        <button type="button" className="btn btn-success mt-2" onClick={addConsultorioField}>
                            <i className="fas fa-plus"></i> Añadir Consultorio
                        </button>
                    </div>
                </fieldset>
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary me-2">
                        <i className="fas fa-paper-plane me-1"></i> Enviar
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default FormSedes;
