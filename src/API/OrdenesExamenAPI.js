const url = "https://ordenes-1.onrender.com/ordenesExamen/"

export async function getListaOrdenesExamen(){
    const res = await fetch(url + "GetAll");
    const datos = await res.json();
    return datos.OrdenExamen;
}

export async function agregarOrdenExamen(OrdenExamen){
    const res = await fetch(url + "Create/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenExamen)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function actualizarOrdenExamen(OrdenExamen){
    const res = await fetch(url + "Update/" + `${OrdenExamen._id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenExamen)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function eliminarOrdenExamen(id){
    const res = await fetch(url + "Delete/" + `${id}`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    }
    );
    const datos = await res.json();
    return datos;
}

export async function cancelarOrdenExamen(id, razonCancelacion) {
    const res = await fetch(url + "Cancel/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ razonCancelacion }) 
    });
    const datos = await res.json();
    return datos;
}