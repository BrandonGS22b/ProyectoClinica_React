const url = "https://usuariosg6.onrender.com/usuarios/";

export async function LoginByUser(correo, clave) {
    const res = await fetch(`${url}LoginByUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, clave })
    });

    const data = await res.json();

    if (res.ok) {
        return {
            message: data.message,
            token: data.token,
            rol: data.rol,
            nombre: data.nombres,
            id:  data._id,
            
        };
    } else {
        throw new Error(data.message);
    }
}

export async function getListUsers(){
    const res = await fetch(url+'GetAll');
    const data = await res.json();
    return data.Usuario;
}

export async function addUser(usuario) {
    const res = await fetch(url+"createUser", {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(usuario) 
    });
    const data = await res.json();
    return data;
}

export async function updateUser(usuario, id) {
    const res = await fetch(url+"EditUser/"+ `${id}`, {
       method: 'PATCH',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(usuario) 
    });
    const data = await res.json();
    console.log("Estoy en el API soy actualizar y tengo", usuario);
    return data;
}

export async function disableUser(id) {
    const res = await fetch(url + "DisableByUser/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    return data;
}

export async function enableUser(id) {
    const res = await fetch(url + "EnableByUser/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    return data;
}

export async function EditUser(id, correo, clave) {
    const res = await fetch(`${url}/EditUser/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, clave })
    });
    const data = await res.json();
    return data;
}

//Buscador

export async function searchUsersByName(nombre) {
    try {
        const res = await fetch(url + "SearchByName/" + nombre);
        const data = await res.json();
        return data.Usuario;
    } catch (error) {
        console.error('Error al buscar usuarios por nombre:', error);
        throw error;
    }
}

export async function searchById(id) {
    try {
        const res = await fetch(url + "SearchById/" + id);
        const data = await res.json();
        return data.Usuario;
    } catch (error) {
        console.error('Error al buscar usuarios por id:', error);
        throw error;
    }
}


export async function validateCorreoCedula(correo, documento) {
    try {
        const res = await fetch(`${url}ValidateCorreoCedula`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, documento })
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error al validar correo y cédula:', error);
        throw error;
    }
}

export const changePassword = async (correo, clave) => {
    try {
        const res = await fetch(`${url}changePassword`, {
            method: 'PATCH', // Cambiar a PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, clave }), // Utilizar newPassword en lugar de clave
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};