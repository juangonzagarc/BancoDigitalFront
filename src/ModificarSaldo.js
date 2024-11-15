import React, { useState, useEffect } from 'react';
import { updateAccountBalance, getAccountById } from './api/api';

function ModificarSaldo() {
    const [accountId, setAccountId] = useState("");  // Para buscar la cuenta ingresando el ID
    const [account, setAccount] = useState(null);    // Estado para guardar los datos de la cuenta
    const [newBalance, setNewBalance] = useState(""); // Estado para el nuevo saldo

    // Función para obtener detalles de la cuenta
    const fetchAccountDetails = async (id) => {
        try {
            const accountData = await getAccountById(id);
            setAccount(accountData);
        } catch (error) {
            console.error("Error al obtener los detalles de la cuenta:", error);
            alert("No se pudo encontrar la cuenta con ese ID.");
            setAccount(null); // Si falla, limpiar la información
        }
    };

    // Manejador para actualizar el saldo
    const handleUpdateBalance = async () => {
        if (!account || !newBalance) {
            alert("Por favor, asegúrate de que los detalles de la cuenta estén cargados y el nuevo saldo esté ingresado.");
            return;
        }

        try {
            const parsedBalance = parseFloat(newBalance);
            if (isNaN(parsedBalance) || parsedBalance < 0) {
                alert("Por favor, ingresa un valor válido y positivo para el saldo.");
                return;
            }

            // Llamada a la API para actualizar el saldo
            await updateAccountBalance(accountId, parsedBalance);
            alert("Saldo actualizado exitosamente.");
        } catch (error) {
            console.error("Error en handleUpdateBalance:", error);
            alert("Hubo un error al actualizar el saldo.");
        }
    };

    // Al cambiar el accountId, buscar los detalles de la cuenta
    useEffect(() => {
        if (accountId) {
            fetchAccountDetails(accountId);
        } else {
            setAccount(null); // Limpiar la información si no hay ID
        }
    }, [accountId]);

    return (
        <div>
            <h2>Modificar Saldo</h2>

            {/* Campo para ingresar el ID de la cuenta */}
            <label>ID de la Cuenta:</label>
            <input
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Ingresa el ID de la cuenta"
            />

            {account ? (
                <>
                    {/* Mostrar el nombre del cliente y el saldo actual */}
                    <h3>Cliente: {account.nombre} {account.apellido}</h3>
                    <p>Saldo actual: {account.saldo}</p>
                </>
            ) : (
                <p>Ingresa un ID de cuenta válido para ver los detalles.</p>
            )}

            {/* Campo para ingresar el nuevo saldo */}
            <label>Nuevo Saldo:</label>
            <input
                type="text"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="Ingresa el nuevo saldo"
            />

            {/* Botón para actualizar el saldo */}
            <button onClick={handleUpdateBalance}>Actualizar Saldo</button>
        </div>
    );
}

export default ModificarSaldo;