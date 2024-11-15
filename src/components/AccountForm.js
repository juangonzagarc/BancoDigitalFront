import {useState} from "react";

function AccountForm() { // Cambié el nombre a AccountForm
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [saldoInicial, setSaldoInicial] = useState(''); // Nuevo campo para el saldo inicial

    const handleSubmit = (e) => {
        e.preventDefault();
        const usuario = { cedula, nombre, apellido, contrasena, saldoInicial };

        // Enviar el objeto usuario al backend
        fetch('http://localhost:8081/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <input type="number" placeholder="Saldo Inicial" value={saldoInicial} onChange={(e) => setSaldoInicial(e.target.value)} />
            <button type="submit">Registrarse</button>
        </form>
    );
}
