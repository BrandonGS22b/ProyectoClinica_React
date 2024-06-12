const url = "https://e191be2024g5-ool.onrender.com/sede/sedes";

export async function getSedes(){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export async function addSede(Sede){
    const res = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Sede)
    }
    );
    const data = await res.json();
    return data;
}

export async function editSede(Sede, id){
    const res = await fetch(url + `/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Sede)
    }
    );
    const data = await res.json();
    return data;
}

export async function deleteSede(id){
    const res = await fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    }
    );
    const data = await res.json();
    return data;
}
