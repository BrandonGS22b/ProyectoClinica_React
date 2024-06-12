const url = "https://e191be2024g5-ool.onrender.com/sede/ubicaciones";

export async function getUbicaciones(){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
export async function addUbicacion(ubicacion){
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(ubicacion)
        });
        if (!res.ok) {
            throw new Error('Error al agregar la ubicación');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function editUbicacion(ubicacion){
    try {
        const res = await fetch(`${url}/${ubicacion._id}`, { 
            method: 'PATCH', 
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(ubicacion)
        });
        if (!res.ok) {
            throw new Error('Error al editar la ubicación');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteUbicacion(id){
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type": 'application/json'},
        });
        if (!res.ok) {
            throw new Error('Error al eliminar la ubicación');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

