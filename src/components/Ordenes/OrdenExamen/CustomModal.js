import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const CustomModal = ({ show, handleClose, ordenExamen }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Información Orden de Examen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5><b>DATOS ORDEN</b></h5>
                <b>Vigencia:</b> <p>{ordenExamen?.vigencia}</p>
                <b>Fecha de Creación: </b><p>{formatDate(ordenExamen?.fechaCreacion)}</p>
                <b>Paciente: </b><p>{ordenExamen?.paciente?.nombres} {ordenExamen?.paciente?.apellidos}</p>
                <b>Documento Paciente: </b><p>{ordenExamen?.paciente?.tipoDocumento} {ordenExamen?.paciente?.documento}</p>
                <b>Médico: </b><p>{ordenExamen?.medico?.nombres} {ordenExamen?.medico?.apellidos}</p>
                <b>Documento Medico: </b><p>{ordenExamen?.medico?.tipoDocumento} {ordenExamen?.medico?.documento}</p>
                <h5><b>DATOS RESULTADOS</b></h5>
                <b>id Resultado: </b><p>{ordenExamen?.resultados?.idResultado} </p>
                <b>Fecha Resultado: </b><p>{ordenExamen?.resultados?.fechaResultado} </p>
                <b>Estado Resultado: </b><p>{ordenExamen?.resultados?.estadoResultado} </p>
                <b>Archivos Adjuntos: </b><p>{ordenExamen?.resultados?.archivosAdjuntos} </p>
                <b>Método Analisis: </b><p>{ordenExamen?.resultados?.metodoAnalisis} </p>
                <b>Descripcion: </b><p>{ordenExamen?.resultados?.observaciones} </p>
                <h5><b>DATOS EXAMEN</b></h5>
                <b>Nombre Examen: </b><p>{ordenExamen?.examen?.nombreExamen} </p>
                <b>código Examen: </b><p>{ordenExamen?.examen?.codigoExamen} </p>
                <b>Descripcion: </b><p>{ordenExamen?.examen?.descripcion} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
