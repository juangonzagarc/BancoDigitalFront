import React, { useEffect, useState } from 'react';
import { getAccounts } from './api';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                setAccounts(data);
            } catch (error) {
                setError('Error al obtener las cuentas');
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div>
            <h2>Lista de Cuentas</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {accounts.map((account) => (
                    <li key={account.numeroCuenta}>
                        <p>ID: {account.numeroCuenta}</p>
                        <p>Cédula: {account.cedula}</p>
                        <p>Nombre: {account.nombre}</p>
                        <p>Saldo: {account.balance}</p>
                        <p>Fecha de Creación: {account.fechaCreacion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountList;
