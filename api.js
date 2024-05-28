async function enviarCedulaApi(cedula) {
    try {
        // URL de los servicios
        const sriUrl = `http://localhost:8080/sri/${cedula}`;
        const antUrl = `http://localhost:8080/ant/${cedula}`;

        // Realizar la solicitud al servicio SRI
        const sriResponse = await fetch(sriUrl);
        if (!sriResponse.ok) {
            throw new Error('Error al consultar SRI');
        }
        const sriData = await sriResponse.text();

        if (sriData !== 'true' && sriData !== 'false') {
            throw new Error('Respuesta inválida del servicio SRI');
        }

        // Realizar la solicitud al servicio ANT solo si el servicio SRI devuelve 'true'
        if (sriData === 'true') {
            const antResponse = await fetch(antUrl);
            if (!antResponse.ok) {
                throw new Error('Error al consultar ANT');
            }
            const antData = await antResponse.text();

            console.log('Resultado del servicio ANT:', antData);
            alert(`Resultado del servicio ANT: ${antData}`);
        } else {
            alert('La cédula no es válida según el servicio SRI');
        }

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}

