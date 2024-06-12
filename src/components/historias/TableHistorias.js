import React from 'react'

function TableHistorias(props) {

    const { historias, onView, session } = props;
    let historiasFiltradas = [];

    if (!historias || historias.length === 0) {
        return <p>Cargando...</p>;
    }

    console.log(session);

    if(session.rol === "Paciente"){
        historiasFiltradas = historias.filter(item => item.paciente.idPaciente === session.id);
    }else if(session.rol === "Medico"){
        historiasFiltradas = historias.filter(item => item.medico.idMedico === session.id);
    }else{
        historiasFiltradas = historias;
    }

    console.log(historiasFiltradas);

    // Filtra las historias para que solo se muestren documentos únicos
    const historiasUnicas = [];
    const documentosSet = new Set();

    historiasFiltradas.forEach((item) => {
        if (!documentosSet.has(item.paciente.documentoPaciente)) {
            documentosSet.add(item.paciente.documentoPaciente);
            historiasUnicas.push(item);
        }
    });

    console.log(historiasUnicas);

    return (
        <div className="container my-5">
            <table className="table table-hover shadow">
                <thead className="bg-primary text-white">
                    <tr>
                    <th scope="col" className="table-primary">Tipo</th>
                        <th scope="col" className="table-primary">Documento</th>
                        <th scope="col" className="table-primary">Nombres</th>
                        <th scope="col" className="table-primary">Apelidos</th>
                        <th scope="col" className="table-primary">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {historiasUnicas.map((item, index) => {
                        return (<tr key={item._id}>
                            <td>{item.paciente.tipoDocumentoPaciente}</td>
                            <td>{item.paciente.documentoPaciente}</td>
                            <td>{item.paciente.nombresPaciente}</td>
                            <td>{item.paciente.apellidosPaciente}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-block" onClick={() => onView(item.paciente.documentoPaciente)} ><i className="fas fa-eye" ></i></button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default TableHistorias