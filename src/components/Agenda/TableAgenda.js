import React from "react";
import ReactPaginate from "react-paginate";
import "./../../index.css"

function TableAgenda(props) {
    const { agendas, onDelete, onView, edit } = props;
    const [ pageNumber, setPageNumber ] = React.useState(0);

    const agendasPerPage = 8; // Número de filas por página
    const visitedPages = pageNumber * agendasPerPage;

    const sortedAgendas = agendas.sort((a, b) => {
        const dateA = new Date(a.fechaAgenda.$date);
        const dateB = new Date(b.fechaAgenda.$date);


        return dateA - dateB;
    });

    const displayAgendas = sortedAgendas.slice(visitedPages, visitedPages + agendasPerPage);

    if (!agendas || agendas.length === 0) {
        return <div className="spinner-border text-warning m-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    return (
        <div className="container mt-2 d-flex flex-column w-100">
            <table className="table table-striped table-bordered table-hover shadow-lg">
                <thead className="bg-primary text-white table-primary">
                    <tr>
                        <th scope="col" className="table-primary">Turno</th>
                        <th scope="col" className="table-primary">Estado</th>
                        <th scope="col" className="table-primary">Fecha</th>
                        <th scope="col" className="table-primary">Hora Inicio</th>
                        <th scope="col" className="table-primary">Hora Fin</th>
                        <th scope="col" className="table-primary">Médico</th>
                        <th scope="col" className="table-primary">Consultorio</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAgendas.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.tipoAgenda}</td>
                            <td>{item.estadoAgenda}</td>
                            {/* <td>{item.fechaAgenda}</td> */}
                            <td>{new Date(item.fechaAgenda).toLocaleDateString('en-IN', {
                        
                                timeZone: 'Asia/Kolkata'
                            })}</td>
                            <td>{item.horaInicio}</td>
                            <td>{item.horaFin}</td>
                            <td>{`${item.medico.nombres} ${item.medico.apellidos}`}</td>
                            <td>{`${item.consultorio.sede.nombreSede} - ${item.consultorio.descripcionConsultorio}`}</td>
                            <td>
                                <button className="btn btn-outline-success me-2 btn-block" onClick={() => edit(item._id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn btn-outline-danger me-2 btn-block" onClick={() => onDelete(item._id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-3">
                <ReactPaginate
                    previousLabel={"← Anterior"}
                    nextLabel={"Siguiente →"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(agendas.length / agendasPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(event) => setPageNumber(event.selected)}
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

export default TableAgenda;