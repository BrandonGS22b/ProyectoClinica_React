import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../Usuarios/Login'
import Home from './Home'
import Historias from '../historias/Historias'
import Template from './EjemploTemplate/Template'
import RecuperarPass from '../Usuarios/RecuperarPass'
import Footer from './Footer'
import Citas  from '../Citas/Citas'
import Navegador from './Navegador'
import OrdenIncapacidad  from '../Ordenes/OrdenIncapacidad/OrdenIncapacidad';
import OrdenMedicamento  from '../Ordenes/OrdenMedicamentos/OrdenMedicamento';
import OrdenRemision  from '../Ordenes/OrdenRemision/OrdenRemision';
import OrdenExamen  from '../Ordenes/OrdenExamen/OrdenExamen';
import Usuarios from '../Usuarios/Usuarios'
import Sedes from '../Sedes/Sedes'
import Consultorios from '../Consultorios/Consultorios'
import Ubicaciones from '../Ubicaciones/Ubicaciones'
import Perfil from '../Usuarios/Perfil'
import Configuracion from '../Usuarios/Configuracion'
import Medicamentos from '../Medicamentos/Medicamentos'
import Agenda from '../Agenda/Agenda'



function Router() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/Home' element={<Home/>}></Route>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/Historias' element={<Historias/>}></Route>               
                <Route path='/OrdenIncapacidad' element={<OrdenIncapacidad/>}></Route>
                <Route path='/OrdenMedicamento' element={<OrdenMedicamento/>}></Route>
                <Route path='/OrdenExamen' element={<OrdenExamen/>}></Route>
                <Route path='/OrdenRemision' element={<OrdenRemision/>}></Route>
                <Route path='/Template' element={<Template/>}></Route>
                <Route path='/Table' element={<Template/>}></Route>
                <Route path='/Form' element={<Template/>}></Route>
                <Route path='/RecuperarPass' element={<RecuperarPass/>}></Route>
                <Route path='/Footer' element={<Footer/>}></Route>
                <Route path='/Navegador' element={<Navegador/>}></Route>
                <Route path='/Usuarios' element={<Usuarios/>}></Route>
                <Route path='/Citas' element={<Citas/>}></Route>
                <Route path='/Ubicaciones' element={<Ubicaciones/>}></Route>
                <Route path='/Consultorios' element={<Consultorios/>}></Route>
                <Route path='/Sedes' element={<Sedes/>}></Route>
                <Route path='/RecuperarPass' element={<RecuperarPass/>}></Route>
                <Route path='/Perfil' element={<Perfil/>}></Route>
               
                <Route path='/Medicamentos' element={<Medicamentos/>}></Route>
                <Route path='/Agenda' element={<Agenda/>}></Route>
                
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router