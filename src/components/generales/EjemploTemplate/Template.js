import React, { useState } from 'react';
import Table from './Table';
import Form from './Form';

function Template() {
    const [mostrarLista, setMostrarLista] = useState(true);
    
    const verLista = () => {
        setMostrarLista(!mostrarLista);
    }

    return (
<div className="template-container" style={{ backgroundImage: 'url(./img/fondo.png)' }}>
  <div className="container mt-0">
    <div className="d-flex justify-content-between mb-0">
      <button className="btn btn-success me-0" onClick={verLista}>
        <i className={mostrarLista ? "fas fa-plus" : "fas fa-list-alt"}></i>
      </button>
      <a href="" className="btn btn-danger ms-0">
        <i className="fas fa-arrow-left"></i> Volver
      </a>
    </div>
    <div className="content p-0">
      {mostrarLista ? <Table /> : <Form />}
    </div>
  </div>
</div>
    );
}

export default Template;