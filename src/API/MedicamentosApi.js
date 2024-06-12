const url = "https://e191be2024g3.onrender.com/medicamento";

export async function getMedicamentos() {
    try {
        const res = await fetch(url + "/GetAll");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener todos los medicamentos",error);
        return [];
    }
}

export async function getMedicamento(id) {
    try {
        const res = await fetch(url + "/GetById/" + id);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener el medicamento", error);
        return null;
    }
}

export async function crearMedicamento(medicamento) {
    try {
        const res = await fetch(url + "/Create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamento),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al crear el medicamento", error);
        return null;
    }
}

export async function eliminarMedicamento(id){
    try {
        const res = await fetch(url + "/DeleteById/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        return data;    
    } catch (error) {
        console.log("Error al eliminar el medicamento con id: " + id, error);
        return null;
    }
}

export async function actualizarMedicamento(medicamento){
    try {
        const res = await fetch(url + "/UpdateById/" + medicamento._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamento),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al actualizar el medicamento", error);
        return null;
    }
}

export async function getMedicamentosPorNombre(nombre){
    try {
        const res = await fetch(url + "/GetNombre/" + nombre);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener medicamentos por nombre", error);
        return [];
    }
}
