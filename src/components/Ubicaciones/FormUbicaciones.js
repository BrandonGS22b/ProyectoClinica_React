import React, { useState, useEffect } from "react";
import Footer from "../generales/Footer";
import { getSedes } from "../../API/SedesAPI";  // Asegúrate de importar correctamente tu API

function FormUbicaciones(props) {
    const { ubicacion, onSave, verLista } = props;
    const [formState, setFormState] = useState({
        _id: null,
        codigoUbicacion: "",
        nombreUbicacion: "",
        departamentoUbicacion: "",
        municipioUbicacion: "",
        sedes: ""
    });

    const [sedes, setSedes] = useState([]);  // Inicializa sedes como un array vacío

    useEffect(() => {
        if (ubicacion) {
            setFormState({
                ...ubicacion,
                _id: ubicacion._id || null,
                sedes: ubicacion.sedes ? (ubicacion.sedes._id || ubicacion.sedes) : ""
            });
        }

        // Obtener todas las sedes
        getSedes()
            .then((data) => setSedes(data))
            .catch((err) => console.log(err));
    }, [ubicacion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formState);
    };

    return (
        <div className="container mt-2">
            <form className="border p-6 rounded shadow bg-body my-3" onSubmit={handleSubmit}>
                <fieldset className="border p-3">
                    <legend className="text-primary mb-3">Formulario de Ubicaciones</legend>

                    <label htmlFor="codigoUbicacion" className="form-label">Código de Ubicación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="codigoUbicacion"
                        name="codigoUbicacion"
                        value={formState.codigoUbicacion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="nombreUbicacion" className="form-label">Nombre de Ubicación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreUbicacion"
                        name="nombreUbicacion"
                        value={formState.nombreUbicacion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="departamentoUbicacion" className="form-label">Departamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="departamentoUbicacion"
                        name="departamentoUbicacion"
                        value={formState.departamentoUbicacion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="municipioUbicacion" className="form-label">Municipio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="municipioUbicacion"
                        name="municipioUbicacion"
                        value={formState.municipioUbicacion}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="sedes" className="form-label">Sede</label>
                    <select
                        className="form-control"
                        id="sedes"
                        name="sedes"
                        value={formState.sedes}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una sede</option>
                        {sedes.map((sede) => (
                            <option key={sede._id} value={sede._id}>
                                {sede.nombreSede}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary me-2">
                        <i className="fas fa-paper-plane me-1"></i>Enviar
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => verLista()}
                    >
                        <i className="fas fa-arrow-left me-1"></i>Cancelar
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default FormUbicaciones;


