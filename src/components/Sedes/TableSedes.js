import React, { useState, useEffect } from 'react';

function TableSedes(props) {
    const { sedes, onDelete, onView } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSedes, setFilteredSedes] = useState([]);

    useEffect(() => {
        if (sedes) {
            setFilteredSedes(sedes);
        }
    }, [sedes]);

    useEffect(() => {
        if (sedes) {
            setFilteredSedes(
                sedes.filter(sede =>
                    sede.nombreSede.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, sedes]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!sedes || sedes.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container my-5">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por nombre de sede"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col" className="table-primary">Código de la sede</th>
                        <th scope="col" className="table-primary">Nombre de la Sede</th>
                        <th scope="col" className="table-primary">Dirección de la sede</th>
                        <th scope="col" className="table-primary">Consultorios</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSedes.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.idSede}</td>
                            <td>{item.nombreSede}</td>
                            <td>{item.direccionSede}</td>
                            <td>
                                {item.consultorios && item.consultorios.length > 0 && (
                                    <ul>
                                        {item.consultorios.map((consultorio) => (
                                            <li key={consultorio._id}>
                                                {consultorio.codigoConsultorio} - {consultorio.descripcionConsultorio}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-outline-danger me-2 btn-block" onClick={() => { onDelete(item._id) }}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn btn-outline-primary btn-block" onClick={() => { onView(item) }}>
                                    <i className="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableSedes;
