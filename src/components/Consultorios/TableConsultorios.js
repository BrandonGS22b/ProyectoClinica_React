import React, { useState, useEffect } from 'react';

function TableConsultorios(props) {
    const { consultorios, onDelete, onView } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredConsultorios, setFilteredConsultorios] = useState([]);

    useEffect(() => {
        if (consultorios) {
            setFilteredConsultorios(consultorios);
        }
    }, [consultorios]);

    useEffect(() => {
        if (consultorios) {
            setFilteredConsultorios(
                consultorios.filter(consultorio =>
                    consultorio.descripcionConsultorio.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, consultorios]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!consultorios || consultorios.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container my-5">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por descripción de consultorio"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>                
                        <th scope="col" className="table-primary">Id del consultorio</th>
                        <th scope="col" className="table-primary">Código Consultorio</th>
                        <th scope="col" className="table-primary">Descripción del consultorio</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredConsultorios.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.idConsultorio}</td>
                            <td>{item.codigoConsultorio}</td>
                            <td>{item.descripcionConsultorio}</td>
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

export default TableConsultorios;
