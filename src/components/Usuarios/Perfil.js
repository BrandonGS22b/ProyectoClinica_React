import React, { useState, useEffect } from 'react'
import Navegador from '../generales/Navegador'
import Footer from '../generales/Footer'
import { useSession } from "../Usuarios/Login";
import { searchById, updateUser } from '../../API/UsuariosAPI';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


function Perfil() {
    const { session, setSession } = useSession();
    const [dataUser, setDataUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editField, setEditField] = useState({ key: '', value: '' });

    useEffect(() => {
        if (session) {
            //console.log("Hola que hace");
            searchById(session.id)
            .then((data) => { setDataUser(data[0]) })
            .catch((err) => { console.log(err, "Hola que hace 3.0") });
        }
        
    }, [session])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleEditClick = (key, value) => {
        setEditField({ key, value });
        setShowModal(true);
    };

    const handleSave = async () => {
        const updateData = { [editField.key]: editField.value,  };
        try {
            await updateUser(updateData, dataUser._id);
            setDataUser({ ...dataUser, ...updateData });
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Usuario actualizado exitosamente.',
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        setEditField({ ...editField, value: e.target.value });
    };
    
    //console.log("Hola que hace2", dataUser);
    //<button><i className="fas fa-edit"></i></button>
    //<button className="btn btn-outline-secondary btn-sm"> <i class="fas fa-edit"></i></button>
    return (
        <Navegador>
            <div className="historias-container">
                <div className="container mt-3 content bg-white">
                    <div style={{ backgroundImage: "url(/fondo.png)", minHeight: "100vh" }}>
                        <div className="container mt-3">
                            {dataUser != null ? (
                                <>
                                    <div className="row">
                                        <div className="col-md-4 g-2">
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Nombre: {dataUser.nombres}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Apellidos: {dataUser.apellidos}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Tipo de Documento: {dataUser.tipoDocumento}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Documento: {dataUser.documento}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                        </div>
                                        <div className="col-md-4 g-2">
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Grupo Sanguíneo: {dataUser.tipoSangre}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Rol: {dataUser.rol}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Estado: {dataUser.estado}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Fecha de nacimiento: {formatDate(dataUser.fechaNacimiento)}</h5>
                                                <button className="btn btn-outline-light btn-sm" disabled> <i class="fas fa-edit"></i></button>
                                            </div>
                                        </div>
                                        <div className="col-md-4 g-2">
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Telefono: {dataUser.telefono}</h5>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditClick('telefono', dataUser.telefono)}> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Correo: {dataUser.correo}</h5>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditClick('correo', dataUser.correo)}> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Ubicacion: {dataUser.ubicacion.municipio} {dataUser.ubicacion.departamento}</h5>
                                                <button className="btn btn-outline-primary btn-sm"> <i class="fas fa-edit"></i></button>
                                            </div>
                                            <div className="d-flex justify-content-between my-4">
                                                <h5 className='fs-6'>Direccion: {dataUser.direccion}</h5>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditClick('direccion', dataUser.direccion)}> <i class="fas fa-edit"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Cargando información del usuario...</p>
                            )}
    
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Editar {editField.key}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>{editField.key}</Form.Label>
                                            <Form.Control type="text" value={editField.value} onChange={handleChange} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </Button >
                                    <Button variant="primary" onClick={handleSave}>
                                        Guardar Cambios
                                    </Button >
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Navegador>
    );
}

export default Perfil