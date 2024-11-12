// RealizarDeposito.js
import React, { useState, useEffect } from 'react';
import { getAccounts } from './api/api';
import { useNavigate } from 'react-router-dom';
//import './styles/AccountListStyles.css'; // Descomenta si resuelves el error de CSS

const RealizarDeposito = () => {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                console.log("Datos recibidos de getAccounts:", data); // Verificar datos recibidos
                setAccounts(data);
            } catch (error) {
                console.error("Error al obtener las cuentas:", error);
            }
        };
        fetchAccounts();
    }, []);

    const handleAccountSelect = (account) => {
        console.log("Cuenta seleccionada:", account); // Verificar cuenta seleccionada
        navigate(`/modificar-saldo/${account.numeroCuenta}`);
    };

    return (
        <div className="consulta-cuentas-container">
            <h2>Seleccione una cuenta para modificar el saldo</h2>
            <div className="account-list">
                {accounts.length > 0 ? (
                    accounts.map(account => (
                        <button
                            key={account.numeroCuenta}
                            onClick={() => handleAccountSelect(account)}
                            className="account-item-button"
                        >
                            Cuenta: {account.numeroCuenta}, Cliente: {account.nombre}, Saldo: {account.saldo}, Fecha de Creación: {account.fechaCreacion}
                        </button>
                    ))
                ) : (
                    <p>No hay cuentas disponibles para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default RealizarDeposito;
