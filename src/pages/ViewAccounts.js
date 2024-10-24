import React, { useEffect, useState } from 'react';
import api from '../api';

const ViewAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const response = await api.getAccounts();
                setAccounts(response); // Asegúrate de que la respuesta sea la correcta
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Lista de Cuentas</h1>
            {accounts.length > 0 ? (
                <ul>
                    {accounts.map((account) => (
                        <li key={account.id}>
                            <p>ID: {account.id}</p>
                            <p>Cédula: {account.cedula}</p>
                            <p>Nombre: {account.nombre}</p>
                            <p>Saldo: {account.balance}</p>
                            <p>Fecha de Creación: {account.fechaCreacion}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay cuentas disponibles.</p>
            )}
        </div>
    );
};

export default ViewAccounts;
