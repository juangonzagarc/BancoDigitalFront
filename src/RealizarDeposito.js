import { useState } from 'react';
import { deposit } from './api';

function RealizarDeposito() {
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [monto, setMonto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await deposit(numeroCuenta, monto);
        alert('Depósito realizado exitosamente');
    };

    return (
        <div>
            <h2>Realizar Depósito</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Número de Cuenta"
                    value={numeroCuenta}
                    onChange={(e) => setNumeroCuenta(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                />
                <button type="submit">Realizar Depósito</button>
            </form>
        </div>
    );
}

export default RealizarDeposito;
