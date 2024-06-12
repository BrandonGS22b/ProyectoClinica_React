import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const CustomModal = ({ show, handleClose, ordenRemision }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Información Orden de Remision</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Nombre Remision:</b> <p>{ordenRemision?.nombreRemision}</p>
                <b>Codigo Remision: </b><p>{ordenRemision?.codigoRemision}</p>
                <b>Motivo:</b> <p>{ordenRemision?.motivo}</p>
                <b>Fecha Creacion: </b><p>{formatDate(ordenRemision?.fechaCreacion)}</p>
                <b>Paciente: </b><p>{ordenRemision?.paciente?.nombres} {ordenRemision?.paciente?.apellidos}</p>
                <b>Documento Paciente: </b><p>{ordenRemision?.paciente?.tipoDocumento} {ordenRemision?.paciente?.documento}</p>
                <b>Médico: </b><p>{ordenRemision?.medico?.nombres} {ordenRemision?.medico?.apellidos}</p>
                <b>Documento Medico: </b><p>{ordenRemision?.medico?.tipoDocumento} {ordenRemision?.medico?.documento}</p>
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