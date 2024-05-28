document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cedulaForm');
    const cedulaInput = document.getElementById('cedula');
    const errorDiv = document.getElementById('error');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const cedula = cedulaInput.value.trim();
        
        if (validarCedulaEcuatoriana(cedula)) {
            alert('Cédula válida');
            errorDiv.style.display = 'none';
            // Aquí puedes agregar la lógica para enviar el formulario o realizar otra acción
        } else {
            errorDiv.style.display = 'block';
        }
    });

    function validarCedulaEcuatoriana(cedula) {
        // Verificar si tiene exactamente 10 dígitos
        if (cedula.length !== 10) {
            return false;
        }

        // Verificar si los dos primeros dígitos corresponden a la provincia de Pichincha (17)
        const provincia = cedula.substring(0, 2);
        if (provincia !== '17') {
            return false;
        }

        // Validar que todos los caracteres sean dígitos
        if (!/^\d+$/.test(cedula)) {
            return false;
        }

        // Validación de la cédula usando el algoritmo de módulo 10
        const digits = cedula.split('').map(Number);
        const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let sum = 0;

        for (let i = 0; i < 9; i++) {
            let product = digits[i] * coefficients[i];
            if (product >= 10) {
                product -= 9;
            }
            sum += product;
        }

        const verifier = (10 - (sum % 10)) % 10;
        return verifier === digits[9];
    }
});
