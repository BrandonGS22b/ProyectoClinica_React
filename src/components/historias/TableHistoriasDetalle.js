import React, { useState } from 'react'

function TableHistorias(props) {

    const { historias, onDelete, onView, verLista, selectedItemId } = props;

    if (!historias || historias.length === 0) {
        return <p>Cargando...</p>;
    }

    // Filtra las historias para que solo se muestren documentos del paciente
    const historiasFiltradas = historias.filter(item => item.paciente.documentoPaciente === selectedItemId);
    //se coloca el nombre del usuario
    const nombreUsuario = historiasFiltradas.length > 0 ? `${historiasFiltradas[0].paciente.nombresPaciente} ${historiasFiltradas[0].paciente.apellidosPaciente}`.toUpperCase() : '';

    return (
        <div className="container my-5">
            <h3 className="text-dark">{nombreUsuario && `${nombreUsuario}`}</h3>
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col" className="table-primary">Codigo Historia</th>
                        <th scope="col" className="table-primary">Fecha</th>
                        <th scope="col" className="table-primary">Hora</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {historiasFiltradas.map((item, index) => {
                        const fechaCita = new Date(item.cita.fechaAgenda).toLocaleDateString(); // Cambia el tipo de fecha de cada cita.Agenda
                        return (<tr key={item._id}>
                            <td>{item.codigoHistoria}</td>
                            <td>{fechaCita}</td>
                            <td>{item.cita.horaAgenda}</td>
                            <td>
                                <button className="btn btn-outline-danger me-2 btn-block"><i className="fas fa-trash" onClick={() => { onDelete(item._id) }}></i></button>
                                <button className="btn btn-outline-primary btn-block"><i className="fas fa-eye" onClick={() => { onView(item) }}></i></button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default TableHistorias