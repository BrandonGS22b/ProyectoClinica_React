import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { validateCorreoCedula, changePassword } from '../../API/UsuariosAPI';

function RecuperarPass() {
    const [usuario, setUsuario] = useState({ correo: '', documento: '', clave: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await validateCorreoCedula(usuario.correo, usuario.documento);

            if (data.isValid) {
                try {
                    const changePassResponse = await changePassword(usuario.correo, usuario.clave);

                    if (changePassResponse.success) {
                        swal('Contraseña cambiada', 'Tu contraseña ha sido actualizada correctamente', 'success');
                        navigate('/');
                    } else {
                        swal('Error', 'No se pudo cambiar la contraseña', 'error');
                    }
                } catch (error) {
                    swal('Error', 'Ocurrió un error durante el cambio de contraseña. Inténtalo nuevamente.', 'error');
                }
            } else {
                swal('Error de validación', 'Correo o cédula incorrectos', 'error');
            }
        } catch (error) {
            swal('Error', 'Ocurrió un error durante la validación. Inténtalo nuevamente.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="vh-100 d-flex align-items-center" style={{ backgroundImage: 'url(./img/fondo3.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg rounded-3">
                            <div className="row g-0">
                                <div className="col-md-5 bg-white p-4 d-flex align-items-center">
                                    <img src="/bg.svg" alt="recover form" className="img-fluid mx-auto d-block" style={{ maxWidth: '150%', maxHeight: '200%' }} />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-dark">
                                        <form onSubmit={handleSubmit}>
                                            <div className="text-center mb-3">
                                                <img src="./img/logo2.png" alt="Recover Password" className="img-fluid border border-4 border-primary rounded-circle" style={{ maxWidth: '150px' }} />
                                            </div>
                                            <h5 className="fw-normal mb-5">Recuperar Contraseña</h5>

                                            <div className="mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white"><i className="fas fa-envelope text-primary"></i></span>
                                                    <input type="email" className="custom-input form-control form-control-lg" name="correo" value={usuario.correo} onChange={handleChange} placeholder="Correo" required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white"><i className="fas fa-id-card text-primary"></i></span>
                                                    <input type="text" className="custom-input form-control form-control-lg" name="documento" value={usuario.documento} onChange={handleChange} placeholder="Cédula" required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white"><i className="fas fa-lock text-primary"></i></span>
                                                    <input type="password" className="custom-input form-control form-control-lg" name="clave" value={usuario.clave} onChange={handleChange} placeholder="Nueva Contraseña" required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <button className="btn btn-primary btn-lg w-100" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Enviando...' : 'Recuperar Contraseña'}
                                                </button>
                                            </div>
                                            <p className="mb-0 text-center"><a href="/" className="text-primary">Volver al inicio de sesión</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecuperarPass;
