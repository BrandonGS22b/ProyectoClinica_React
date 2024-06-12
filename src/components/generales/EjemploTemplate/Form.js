import React from 'react';
import Footer from '../Footer';

function Form(props) {
    return (
        <div className="container mt-2">
            <form className="border p-6 rounded shadow bg-body  my-3">
                <fieldset>
                    <legend className="text-primary mb-3">Formulario</legend>
                    <div className="row g-1">
                        <div className="col-md-6">
                            <label htmlFor="Nombre" className="form-label">Nombre del paciente:</label>
                            <input type="text" className="form-control" id="Nombre" name="Nombre" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="Edad" className="form-label">Edad:</label>
                            <input type="text" className="form-control" id="Edad" name="Edad" />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="Telefono" className="form-label">Teléfono:</label>
                            <input type="text" className="form-control" id="Telefono" name="Telefono" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="Correo" className="form-label">Correo electrónico:</label>
                            <input type="text" className="form-control" id="Correo" name="Correo" />
                        </div>
                        
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="Especialidad" className="form-label">Especialidad:</label>
                            <select className="form-select" id="Especialidad" name="Especialidad">
                                <option value="-">Seleccione...</option>
                                <option value="pediatria">Pediatría</option>
                                <option value="general">Medicina General</option>
                                <option value="ginecologia">Ginecología</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="SeleccionarClinica">
                                    Seleccionar esta clínica como favorita
                                </label>
                            </div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="Focal" />
                                <label className="form-check-label" htmlFor="Focal">
                                    Focal
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="Sanitas" />
                                <label className="form-check-label" htmlFor="Sanitas">
                                    Sanitas
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-primary me-2"><i className="fas fa-paper-plane me-1"></i>Enviar</button>
                        <button type="reset" className="btn btn-secondary"><i className="fas fa-broom me-1"></i>Limpiar</button>
                    </div>
                </fieldset>
                
            </form>
            <Footer />
        </div>
    );
}

export default Form;