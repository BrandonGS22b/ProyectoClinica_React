const url = "https://ordenes-1.onrender.com/ordenesIncapacidad/"

export async function getListaOrdenesIncapacidad(){
    const res = await fetch(url + "GetAll");
    const datos = await res.json();
    return datos.OrdenIncapacidad;
}

export async function agregarOrdenIncapacidad(OrdenIncapacidad){
    const res = await fetch(url + "Create/", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenIncapacidad)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function actualizarOrdenIncapacidad(OrdenIncapacidad){
    const res = await fetch(url + "Update/" + `${OrdenIncapacidad._id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenIncapacidad)
    }
    );
    const datos = await res.json();
    return datos;
}

export async function eliminarOrdenIncapacidad(id){
    const res = await fetch(url + "Delete/" + `${id}`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    }
    );
    const datos = await res.json();
    return datos;
}

export async function cancelarOrdenIncapacidad(id, razonCancelacion) {
    const res = await fetch(url + "Cancel/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ razonCancelacion }) 
    });
    const datos = await res.json();
    return datos;
}