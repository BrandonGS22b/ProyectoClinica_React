import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function TableUsuarios(props) {
    const { usuarios, onDelete, onView, onToggleActive } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage] = useState(5);

    // Calcular los usuarios actuales
    const indexOfLastUser = (currentPage + 1) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    return (
        <div className="container mt-2 d-flex flex-column w-100">
            <div className="table-responsive w-100">
                <table className="table table-hover table-sm shadow w-100">
                    <thead className="table-primary" style={{ verticalAlign: "middle" }}>
                        <tr>
                            <th className="text-center SetCellHeight">Nombres</th>
                            <th className="SetCellHeight">Apellidos</th>
                            <th className="SetCellHeight">Direccion</th>
                            <th className="SetCellHeight">Telefono</th>
                            <th className="SetCellHeight">Correo</th>
                            <th className="SetCellHeight">Tipo Documento</th>
                            <th className="SetCellHeight">Documento</th>
                            <th className="SetCellHeight">Rol</th>
                            {/*<th className="SetCellHeight">Estado</th> */}
                            <th className="SetCellHeight">F. de nacimiento</th>
                            <th className="SetCellHeight">Grupo Sanguíneo</th>
                            <th className="SetCellHeight">Ubicación</th>
                            <th className="SetCellHeight">Cod. Ubi.</th>
                            <th className="SetCellHeight">Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: "middle" }}>
                        {currentUsers.map((Usuario) => {
                            return (
                                <tr key={Usuario._id}>
                                    <td className="small-cell SetCellHeight">{Usuario.nombres}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.apellidos}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.direccion}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.telefono}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.correo}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.tipoDocumento}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.documento}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.rol}</td>
                                    {/*<td className="small-cell SetCellHeight">{Usuario.estado}</td> */}
                                    <td className="small-cell SetCellHeight">{formatDate(Usuario.fechaNacimiento)}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.tipoSangre}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.ubicacion.municipio+"-"+Usuario.ubicacion.departamento}</td>
                                    <td className="small-cell SetCellHeight">{Usuario.ubicacion.codigoUbicacion}</td>
                                    <td className="align-middle text-nowrap" style={{ whiteSpace: "nowrap" }}>
                                        <button className={`btn btn-sm me-2 ${Usuario.estado === 'Activo' ? 'btn-outline-danger' : 'btn-outline-success'}`} onClick={() => onToggleActive(Usuario)}><i className="fas fa-user-slash"></i></button>
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => onView(Usuario)}><i className="fas fa-eye"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <ReactPaginate
                    previousLabel={"← Anterior"}
                    nextLabel={"Siguiente →"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(usuarios.length / usersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

export default TableUsuarios;
