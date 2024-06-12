import React, { useState, useEffect, createContext, useContext } from 'react';
import { LoginByUser } from '../../API/UsuariosAPI';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';




// Creamos el contexto para la variable de sesión
export const SessionContext = createContext(null);
// Hook personalizado para acceder al contexto de la sesión
export const useSession = () => useContext(SessionContext);

function Login() {

    const [usuario, setUsuario] = useState({ correo: '',
     clave: '' });
     
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Estado de la sesión para guardar los datos
    const { setSession } = useSession();



    

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const ingresar = async (e) => {
        e.preventDefault();
        setIsLoading(true);

         try {
            const response = await LoginByUser(usuario.correo, usuario.clave);
            if (response.token) {
                // Almacenamos la sesión en el estado global
                const sessionData = {
                    token: response.token,
                    nombre: response.nombre,
                    rol: response.rol,
                    id: response.id,
                    datos: response.usuario
                };

                // Almacenamos la sesión en el estado global
                setSession(sessionData);
              

                swal({
                    title: "Bienvenido!",
                    text: `Usuario autenticado. Rol: ${response.rol}`,
                    icon: "success"
                });

                navigate("/Home", { replace: true });
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                swal({
                    title: "Error!",
                    text: "El usuario está inactivo.",
                    icon: "error"
                });
            } else {
                swal({
                    title: "Error!",
                    text: "Usuario o clave inválidos, verifica por favor...",
                    icon: "error"
                });
            }
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
                                        <img src="/bg.svg" alt="login form" className="img-fluid mx-auto d-block" style={{ maxWidth: '150%', maxHeight: '200%' }} />
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-dark">
                                            <form onSubmit={ingresar}>
                                                <div className="text-center mb-3">
                                                    <img src="./img/logo2.png" alt="Login" className="img-fluid border border-4 border-primary rounded-circle" style={{ maxWidth: '150px' }} />
                                                </div>
                                                <h5 className="fw-normal mb-5">Iniciar Sesión</h5>

                                                <div className="mb-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-white"><i className="fas fa-user text-primary"></i></span>
                                                        <input type="text" className="custom-input form-control form-control-lg" name="correo" value={usuario.correo} onChange={handleChange} placeholder="Correo" />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-white"><i className="fas fa-lock text-primary"></i></span>
                                                        <input type="password" className="form-control form-control-lg" name="clave" value={usuario.clave} onChange={handleChange} placeholder="Contraseña" />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <button className="btn btn-primary btn-lg w-100" type="submit" disabled={isLoading}>
                                                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                                    </button>
                                                </div>
                                                <p className="mb-0 text-center">¿Olvidaste tu cuenta? <a href="/RecuperarPass" className="text-primary">Recordar Contraseña</a></p>
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

export default Login;