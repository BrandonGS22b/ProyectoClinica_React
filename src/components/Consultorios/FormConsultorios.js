import { logRoles } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import Footer from '../generales/Footer';

function FormConsultorios(props) {

    const { onSave, consultorio } = props;
    const [formData, setFormData,] = useState({
        _id: null,
        idConsultorio: "",
        codigoConsultorio: "",
        descripcionConsultorio: "",
    });
    
    useEffect(() => {
        if (consultorio) {
            setFormData(consultorio);
        }
    }, [consultorio]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure formData does not contain circular references
        const cleanFormData = { ...formData };
        onSave(cleanFormData);
    };


    return (
        <div className="container mt-2">
            <form className="border p-6 rounded shadow bg-body my-3" onSubmit={handleSubmit}>
                <fieldset className="border p-3">
                    <legend className="text-primary mb-3">Formulario de Ubicaciones</legend>

                    <label htmlFor="idConsultorio" className="form-label"><b>Datos de la Ubicación</b></label>
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
                            <label htmlFor="idConsultorio" className="form-label">ID CONSULTORIO</label>
                            <input
                                type="text"
                                className="form-control"
                                id="idConsultorio"
                                name="idConsultorio"
                                value={formData.idConsultorio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="codigoConsultorio" className="form-label">Código de Ubicación</label>
                            <input
                                type="text"
                                className="form-control"
                                id="codigoConsultorio"
                                name="codigoConsultorio"
                                value={formData.codigoConsultorio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="descripcionConsultorio" className="form-label">Nombre de Ubicación</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcionConsultorio"
                                name="descripcionConsultorio"
                                value={formData.descripcionConsultorio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </fieldset>
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary me-2">
                        <i className="fas fa-paper-plane me-1"></i>Enviar
                    </button>
                </div>
            </form>
            
        </div>
    );
}

export default FormConsultorios