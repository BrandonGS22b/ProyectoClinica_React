import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const CustomModal = ({ show, handleClose, ordenIncapacidad }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Información Orden de Incapacidad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Descripción:</b> <p>{ordenIncapacidad?.descripcion}</p>
                <b>Fecha de Creación: </b><p>{formatDate(ordenIncapacidad?.fechaCreacion)}</p>
                <b>Fecha de Inicio:</b> <p>{formatDate(ordenIncapacidad?.fechaInicio)}</p>
                <b>Fecha de Fin: </b><p>{formatDate(ordenIncapacidad?.fechaFin)}</p>
                <b>Paciente: </b><p>{ordenIncapacidad?.paciente?.nombres} {ordenIncapacidad?.paciente?.apellidos}</p>
                <b>Documento Paciente: </b><p>{ordenIncapacidad?.paciente?.tipoDocumento} {ordenIncapacidad?.paciente?.documento}</p>
                <b>Médico: </b><p>{ordenIncapacidad?.medico?.nombres} {ordenIncapacidad?.medico?.apellidos}</p>
                <b>Documento Medico: </b><p>{ordenIncapacidad?.medico?.tipoDocumento} {ordenIncapacidad?.medico?.documento}</p>
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
