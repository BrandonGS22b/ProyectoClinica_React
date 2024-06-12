const url = "https://ordenes-1.onrender.com/ordenesRemision/"

export async function getListaOrdenesRemision(){
    const res = await fetch(url + "GetAll");
    const datos = await res.json();
    return datos.OrdenRemision;
}

export async function agregarOrdenRemision(OrdenRemision){
    const res = await fetch(url + "Create/",{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(OrdenRemision)
    }
);
const datos = await res.json();
return datos;
}

export async function actualizarOrdenRemision(OrdenRemision){
    const res = await fetch(url + "update/" + `${OrdenRemision._id}`,{
         method: 'PATCH',
         headers: {'content-type':'application/json' },
        body: JSON.stringify(OrdenRemision)
    }
    );
    const datos=await res.json();
    return datos;
}

export async function cancelarOrdenRemision(id, razonCancelacion) {
    const res = await fetch(url + "Cancel/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ razonCancelacion }) 
    });
    const datos = await res.json();
    return datos;
}

export async function eliminarOrdenRemision(id){
    const res= await fetch(url + "Delete/" + `${id}`,{
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    });
    const datos = await res.json();
    return datos;
}







