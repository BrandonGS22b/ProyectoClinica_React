import React, { useState, useEffect } from "react";

function FormMedicamentos(props) {
    const { onSave, medicamento, isEditing } = props;
    const [ form, setForm ] = useState({
        _id: null,
        codigo: "",
        nombre: "",
        laboratorio: "",
        componenteActivo: "",
        descripcionMedicamento: ""
    });

    const limpiar = () => {
        setForm({
            _id: null,
            codigo: "",
            nombre: "",
            laboratorio: "",
            componenteActivo: "",
            descripcionMedicamento: ""
        });
    };

    useEffect(() => {
        if (medicamento) {
            setForm(medicamento);
        }
    }, [ medicamento ]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        limpiar();
    };

    const isFormFilled = () => {
        return form.codigo || form.nombre || form.laboratorio || form.componenteActivo || form.descripcionMedicamento;
    };


    return (
        <div className="container mt-3 mb-5">

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="card">
                    <div className="card-header fw-bold fs-4 text-secondary">
                        {isEditing ? "Editar Medicamento" : "Nuevo Medicamento"}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <label className="form-label fw-bold">Código:</label>
                                    <input className="form-control" type="text" name="codigo" value={form.codigoMedicamento} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <label className="form-label fw-bold">Nombre:</label>
                                    <input className="form-control" type="text" name="nombre" value={form.nombreMedicamento} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <label className="form-label fw-bold">Laboratorio:</label>
                                    <input className="form-control" type="text" name="laboratorio" value={form.nombreMedicamento} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <label className="form-label fw-bold">Componente:</label>
                                    <input className="form-control" type="text" name="componenteActivo" value={form.nombreMedicamento} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <label className="form-label fw-bold">Descripción:</label>
                                    <input className="form-control" type="text" name="descripcionMedicamento" value={form.descripcionMedicamento} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-success w-100" type="submit">
                                    {isEditing ? "Editar" : "Guardar"}
                                </button>
                            </div>
                            {isFormFilled() && (
                                <div className="col-md-6">
                                    <button className="btn btn-secondary w-100" type="button" onClick={limpiar}>
                                        Limpiar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default FormMedicamentos;