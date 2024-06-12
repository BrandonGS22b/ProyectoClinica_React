const url = "https://repositoriohistoria.onrender.com/historia";

export async function getListarHistorias() {
  const res = await fetch(url + "/GetAll");
  const data = await res.json();
  return data.historia;
}

export async function agregarHistoria(historia) {
  const res = await fetch(url + "/Create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(historia),
  });
  const data = await res.json();
  return data;
}

export async function actualizarHistoria(historia) {
  const res = await fetch(url + "/Update/" + `${historia._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(historia),
  });
  const data = await res.json();
  return data;
}

export async function eliminarHistoria(id) {
  const res = await fetch(url + "/Delete/" + `${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}

//Ruta para consultar por Id historia:
//El cuerpo del envio debe ser asi:
//   {
//    "idHistoria": "id de la Historias"  `${url}/SearchByHistoriaId/`
//   }
export async function getListarHistoriasId(idHistoria) {
  console.log("entro a get listar histortias id")
  const res = await fetch(url +"/SearchByHistoriaId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idHistoria)
  });
  const data = await res.json();
  return data;
}

//Ruta para consultar por codigo de historia:
//El cuerpo del envio debe ser asi:
//   {
//    "codigoHistoria": "codigo de la Historias"
//   }
export async function getListarHistoriasCodigo(codigoHistoria) {
  console.log("entro a get listar histortias id")
  const res = await fetch(url + "/SearchByCodigoHistoria", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(codigoHistoria)
  });
  const data = await res.json();
  return data;
}

//Ruta para consultar por codigo de paciente:
//El cuerpo del envio debe ser asi:
//   {
//    "paciente.documentoPaciente": "codigo del paciente"
//   }
export async function getHistoriasDocumentoPaciente(codigoPaciente) {
  console.log("entro a get listar histortias id")
  const res = await fetch(url + "/SearchByDocumentoPaciente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(codigoPaciente)
  });
  const data = await res.json();
  return data;
}

//Ruta para consultar por id de la cita:
//El cuerpo del envio debe ser asi:
//   {
//    "cita.idCita": "id de la cita"
//   }
export async function getHistoriasCitaId(idCita) {
  console.log("entro a get listar histortias id")
  const res = await fetch(url + "/SearchByIdCita", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idCita)
  });
  const data = await res.json();
  return data;
}