import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const MedicamentosModal = ({ show, handleClose, ordenMedicamento }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalle medicamentos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Medicamentos:</b>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Dosis</th>
                            <th>Cantidad</th>
                            <th>Entregas</th>
                            <th>Entregas Hechas</th>
                            <th>Indicaciones</th>
                            <th>Vigencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenMedicamento?.medicamento?.map((medicamento, index) => ( // Verifica si ordenMedicamento y medicamento existen
                            <tr key={index}>
                                <td>{medicamento.nombre}</td>
                                <td>{medicamento.codigo}</td>
                                <td>{medicamento.dosis}</td>
                                <td>{medicamento.cantidad}</td>
                                <td>{medicamento.entregas}</td>
                                <td>{medicamento.entregasHechas}</td>
                                <td>{medicamento.indicaciones}</td>
                                <td>{medicamento.vigencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MedicamentosModal;
