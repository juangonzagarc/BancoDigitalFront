import { useState } from 'react';
import { createAccount } from './api';

function AccountForm() {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [saldo, setSaldo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cedula || !nombre || saldo < 0) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }

        const newAccount = {
            cedula,
            nombre,
            balance: saldo  // Usa 'balance' en lugar de 'saldo' para que coincida con el DTO
        };

        try {
            await createAccount(newAccount);
            alert('Cuenta creada con éxito');
            // Resetea los campos del formulario
            setCedula('');
            setNombre('');
            setSaldo('');
            setError('');
        } catch (error) {
            setError('Error al crear la cuenta: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Saldo"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Crear Cuenta</button>
        </form>
    );
}

export default AccountForm;
