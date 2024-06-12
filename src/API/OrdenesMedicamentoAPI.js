const url = "https://ordenes-1.onrender.com/ordenesMedicamento/"

export async function getListaOrdenesMedicamento(){
    const res = await fetch(url + "GetAll");
    const datos = await res.json();
    return datos.OrdenMedicamento;
}

export async function agregarOrdenMedicamento(OrdenMedicamento){
    const res = await fetch(url + "Create/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenMedicamento)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function actualizarOrdenMedicamento(OrdenMedicamento){
    const res = await fetch(url + "Update/" + `${OrdenMedicamento._id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenMedicamento)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function eliminarOrdenMedicamento(id){
    const res = await fetch(url + "Delete/" + `${id}`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    }
    );
    const datos = await res.json();
    return datos;
}

export async function cancelarOrdenMedicamento(id, razonCancelacion) {
    const res = await fetch(url + "Cancel/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ razonCancelacion }) 
    });
    const datos = await res.json();
    return datos;
}