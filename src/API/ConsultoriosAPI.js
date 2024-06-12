const url = "https://e191be2024g5-ool.onrender.com/sede/consultorios"

export async function getConsultorios(){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export async function addConsultorio(Consultorio){
    const res = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Consultorio)
    }
    );
    const data = await res.json();
    return data;
}

export async function editConsultorio(Consultorio, id){
    const res = await fetch(url + `/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Consultorio)
    }
    );
    const data = await res.json();
    return data;
}

export async function deleteConsultorio(id){
    const res = await fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    }
    );
    const data = await res.json();
    return data;
}
