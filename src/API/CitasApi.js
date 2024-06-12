import axios from "axios";

const url = "https://e191be2024g4-prod.onrender.com/citas/";

// Función para obtener la lista de citas con los filtros
export const listarFiltrados = async (rol, userId) => {
	try {
		const response = await axios.get(url + "GetAllFilters", {
			headers: {
				role: rol,
				userId: userId
			}
		});
		return response.data.data;
	} catch (error) {
		console.error("Error al obtener citas:", error);
		throw error;
	}
};


export async function agregarCita(cita) {
	try {
		const res = await fetch(url + "Create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cita),
		});

		// Verificar si la respuesta es exitosa
		if (res.status === 201) {
			const data = await res.json();
			return data;
		} else {
			const errorData = await res.json();
			throw new Error(`Error ${res.status}: ${errorData.mensaje}`);
		}
	} catch (error) {
		console.error("Error adding cita:", error);
		throw error;
	}
}

export async function eliminarCita(id) {
	try {
		const res = await fetch(url + `${id}`, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error deleting cita:", error);
		throw error;
	}
}

export async function cancelCita(id) {
	try {
		const response = await axios.patch(
			`${url}CancelCita/${id}`,
			{
				headers: { "content-type": "application/json" },
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error actualizando cita:", error);
		throw error;
	}
}

export async function asistenciaCita(id, sendAsitencia) {
	try {
		const response = await axios.patch(
			`${url}Asistencia/${id}`,
			{ asistencia: sendAsitencia },
			{
				headers: { "content-type": "application/json" },
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error actualizando cita:", error);
		throw error;
	}
}

export async function SearchByIdCita(id) {
	try {
		const response = await fetch(`${url}SearchByIdCita/${id}`);

		// Verificar si la solicitud fue exitosa
		if (!response.ok) {
			throw new Error('No se pudo obtener la cita por ID');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error al obtener la cita por ID:', error);
		throw error;
	}
};
