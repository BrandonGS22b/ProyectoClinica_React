import React, { useState, useEffect } from 'react';

function TableUbicaciones(props) {
    const { ubicaciones, onEdit, onDelete, onView, verLista } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUbicaciones, setFilteredUbicaciones] = useState([]);

    useEffect(() => {
        if (ubicaciones) {
            setFilteredUbicaciones(ubicaciones);
        }
    }, [ubicaciones]);

    useEffect(() => {
        if (ubicaciones) {
            setFilteredUbicaciones(
                ubicaciones.filter(ubicacion =>
                    ubicacion.nombreUbicacion.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, ubicaciones]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!ubicaciones || ubicaciones.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container my-5">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por nombre de ubicación"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col" className="table-primary">Código de Ubicación</th>
                        <th scope="col" className="table-primary">Nombre Ubicación</th>
                        <th scope="col" className="table-primary">Departamento</th>
                        <th scope="col" className="table-primary">Municipio</th>
                        <th scope="col" className="table-primary">Sede</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUbicaciones.map((item) => (
                        <tr key={item._id}>
                            <td>{item.codigoUbicacion}</td>
                            <td>{item.nombreUbicacion}</td>
                            <td>{item.departamentoUbicacion}</td>
                            <td>{item.municipioUbicacion}</td>
                            <td>
                                {item.sedes ? (
                                    Array.isArray(item.sedes) ? (
                                        <ul>
                                            {item.sedes.map((sede) => (
                                                <li key={sede._id}>
                                                    {sede.nombreSede} - {sede.direccionSede}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div>
                                            {item.sedes.nombreSede} - {item.sedes.direccionSede}
                                        </div>
                                    )
                                ) : (
                                    <div>No asignada</div>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-success me-2"
                                    onClick={() => { verLista(); onView(item); }}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className="btn btn-outline-danger me-2"
                                    onClick={() => { onDelete(item._id); }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => { /* Implementa la lógica para visualizar las sedes asociadas */ }}
                                >
                                    <i className="fas fa-building"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableUbicaciones;
