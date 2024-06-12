const url = "https://e191be2024g3.onrender.com/agenda";

export async function getAgendas() {
    try {
        const res = await fetch(url + "/GetAll");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener todas las agendas", error);
        return [];
    }
}

export async function getAgenda(id) {
    try {
        const res = await fetch(url + "/GetById/" + id);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener la agenda", error);
        return null;
    }
}

export async function crearAgenda(agenda) {
    try {
        const res = await fetch(url + "/Create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(agenda),
        });
        const data = await res.json();
        console.log("Agenda creada con exito" + data);
        return data;
    } catch (error) {
        console.log("Error al crear la agenda", error);
        return null;
    }
}

export async function eliminarAgenda(id) {
    try {
        const res = await fetch(url + "/Delete/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        return data;    
    } catch (error) {
        console.log("Error al eliminar la agenda con id: " + id, error);
        return null;
    }
}

export async function actualizarAgenda(agenda) {
    try {
        const res = await fetch(url + "/Update/" + agenda._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(agenda),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al actualizar la agenda", error);
        return null;
    }
}

export async function getAgendasPorMedico(idMedico) {
    try {
        const res = await fetch(url + "/GetByIdMedico/" + idMedico);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener agendas por medico", error);
        return [];
    }
}

export async function getAgendasPorConsultorio(idConsultorio) {
    try {
        const res = await fetch(url + "/GetByIdConsultorio/" + idConsultorio);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener agendas por consultorio", error);
        return [];
    }
}

export async function getAgendasPorFecha(fecha) {
    try {
        const res = await fetch(url + "/GetByDate/" + fecha);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener agendas por fecha", error);
        return [];
    }
}

export async function getAgendasPorFechaHora(fecha, hora) {
    try {
        const res = await fetch(url + "/GetByDateHour/" + fecha + "/" + hora);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener agendas por fecha y hora", error);
        return [];
    }
}

export async function getAgendasNombreMedico(nombre) {
    try {
        const res = await fetch(url + "/GetByMedico/" + nombre);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error al obtener agendas por medico", error);
        return [];
    }
}
