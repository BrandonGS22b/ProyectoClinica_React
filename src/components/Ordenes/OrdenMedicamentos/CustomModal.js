import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const CustomModal = ({ show, handleClose, ordenMedicamento, abrirMedicamentosModal }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Información Orden de Medicamentos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Estado:</b> <p>{ordenMedicamento?.estado}</p>
                <b>Fecha de Creación: </b><p>{formatDate(ordenMedicamento?.fechaCreacion)}</p>
                <b>Paciente: </b><p>{ordenMedicamento?.paciente?.nombres} {ordenMedicamento?.paciente?.apellidos}</p>
                <b>Documento Paciente: </b><p>{ordenMedicamento?.paciente?.tipoDocumento} {ordenMedicamento?.paciente?.documento}</p>
                <b>Médico: </b><p>{ordenMedicamento?.medico?.nombres} {ordenMedicamento?.medico?.apellidos}</p>
                <b>Documento Medico: </b><p>{ordenMedicamento?.medico?.tipoDocumento} {ordenMedicamento?.medico?.documento}</p>
                <div>
                    <Button variant="primary" onClick={abrirMedicamentosModal}>Ver detalle de medicamentos</Button>
                </div>
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
