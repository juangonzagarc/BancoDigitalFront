import React, { useState, useEffect } from 'react';
import { getAccounts, deposit } from './api';

function DepositForm() {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                setAccounts(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAccounts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount <= 0) {
            setError('El monto debe ser mayor que 0');
            return;
        }
        setError('');
        try {
            await deposit(accountId, parseFloat(amount));
            alert('Depósito realizado con éxito');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Seleccionar Cuenta:</label>
                <select value={accountId} onChange={(e) => setAccountId(e.target.value)} required>
                    <option value="" disabled>
                        Selecciona una cuenta
                    </option>
                    {accounts.map((account) => (
                        <option key={account.numeroCuenta} value={account.numeroCuenta}>
                            {account.numeroCuenta} - {account.cliente.nombre} (Saldo: {parseFloat(account.saldo).toFixed(2)})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Monto del Depósito:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Realizar Depósito</button>
        </form>
    );
}

export default DepositForm;
