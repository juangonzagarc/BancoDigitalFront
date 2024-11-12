// ModificarSaldo.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccountById, updateAccountBalance } from './api/api'; // Asegúrate de que estas funciones estén bien importadas

const ModificarSaldo = () => {
    const { numeroCuenta } = useParams(); // Obtener el ID de la cuenta desde la URL
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

        useEffect(() => {
            const fetchAccount = async () => {
                try {
                    const data = await getAccountById(numeroCuenta);
                    if (data) {
                        setAccount(data);
                    } else {
                        alert("No se encontró la cuenta con el número especificado.");
                        navigate('/realizar-deposito');
                    }
                } catch (error) {
                    alert("Error al cargar los datos de la cuenta. Por favor, inténtelo de nuevo.");
                    console.error("Error al obtener la cuenta:", error);
                    navigate('/realizar-deposito');
                }
            };
            fetchAccount();
        }, [numeroCuenta, navigate]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDeposit = async () => {
        try {
            const newBalance = account.saldo + parseFloat(amount);
            await updateAccountBalance(account.numeroCuenta, newBalance);
            alert('Depósito realizado exitosamente');
            navigate('/realizar-deposito');
        } catch (error) {
            alert("Error al realizar el depósito. Por favor, inténtelo de nuevo.");
        }
    };

    const handleWithdraw = async () => {
        const newBalance = account.saldo - parseFloat(amount);
        if (newBalance < 0) {
            alert('No se puede retirar más del saldo disponible');
            return;
        }
        try {
            await updateAccountBalance(account.numeroCuenta, newBalance);
            alert('Retiro realizado exitosamente');
            navigate('/realizar-deposito');
        } catch (error) {
            alert("Error al realizar el retiro. Por favor, inténtelo de nuevo.");
        }
    };

    if (!account) return <div>Cargando datos de la cuenta...</div>;

    return (
        <div className="deposit-section">
            <h2>Modificar Saldo - Cuenta {account.numeroCuenta}</h2>
            <h2>Cliente: {account.nombre} {account.apellido}</h2>
            <p>Saldo Actual: {account.saldo}</p>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Monto"
            />
            <button onClick={handleDeposit}>Depositar</button>
            <button onClick={handleWithdraw}>Retirar</button>
        </div>
    );
};

export default ModificarSaldo;
