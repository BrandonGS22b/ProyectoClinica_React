import React from "react";

function TableMedicamentos(props) {
    const { medicamentos, onDelete, onView, edit } = props;

    if (!medicamentos || medicamentos.length === 0) {
        return <div class="spinner-border text-warning m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>;
    }

    return (
        <div className="container my-5">
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col" className="table-primary">Código</th>
                        <th scope="col" className="table-primary">Nombre</th>
                        <th scope="col" className="table-primary">Laboratorio</th>
                        <th scope="col" className="table-primary">Componente</th>
                        <th scope="col" className="table-primary">Descripción</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {medicamentos.map((item, index) => {
                        return (<tr key={item._id}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
                            <td>{item.laboratorio}</td>
                            <td>{item.componenteActivo}</td>
                            <td>{item.descripcionMedicamento}</td>
                            <td>
                                <button className="btn btn-outline-success me-2 btn-block"><i className="fas fa-pencil-alt" onClick={() => { edit(item._id); }}></i></button>
                                <button className="btn btn-outline-danger me-2 btn-block"><i className="fas fa-trash" onClick={() => { onDelete(item._id) }}></i></button>                                
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    );
}


export default TableMedicamentos;