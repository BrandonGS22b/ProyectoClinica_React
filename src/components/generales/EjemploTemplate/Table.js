import React from 'react'
import Footer from '../Footer';

function Table() {
  return (
    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
      <div className="container my-3">
        <table className="table table-hover shadow">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col" className="table-primary">Nombre</th>
              <th scope="col" className="table-primary">Especialidad</th>
              <th scope="col" className="table-primary">Horario</th>
              <th scope="col" className="table-primary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Clínica ABC</td>
              <td>Medicina General</td>
              <td>Lunes a Viernes: 8:00 AM - 5:00 PM</td>
              <td>
                <button className="btn btn-danger btn-sm" >Eliminar</button>
                <button className="btn btn-secondary btn-sm">Ver</button>  
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
            </tr>
            <tr>
              <td>Clínica XYZ</td>
              <td>Pediatría</td>
              <td>Lunes a Sábado: 9:00 AM - 6:00 PM</td>
              <td>
                <button className="btn btn-outline-danger btn-sm me-2"><i className="fas fa-trash"></i></button>
                <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-eye"></i></button>
              </td>
              
            </tr>
            

          </tbody>
        </table>
        <Footer />
      </div>
    </div>
  );
}

export default Table