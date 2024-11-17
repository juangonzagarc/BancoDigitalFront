import React, { useState } from 'react';
import { updateAccountBalance } from './api/api';

function ModificarSaldo() {
    const [accountId, setAccountId] = useState("");
    const [newBalance, setNewBalance] = useState("");

    const handleUpdateBalance = async () => {
        console.log("Datos antes de enviar:");
        console.log("accountId:", accountId);
        console.log("newBalance:", newBalance);

        if (!accountId || !newBalance) {
            console.error("accountId o newBalance no están definidos o están vacíos.");
            alert("Por favor, asegúrate de ingresar el ID de la cuenta y el nuevo saldo.");
            return;
        }

        try {
            const parsedBalance = parseFloat(newBalance);
            if (isNaN(parsedBalance) || parsedBalance < 0) {
                console.error("newBalance no es un número válido o es negativo.");
                alert("Por favor, ingresa un valor válido y positivo para el saldo.");
                return;
            }

            await updateAccountBalance(accountId, parsedBalance);
            console.log("Actualización de saldo completada");
            alert("Saldo actualizado exitosamente.");
        } catch (error) {
            console.error("Error en handleUpdateBalance:", error);
            alert("Hubo un error al actualizar el saldo.");
        }
    };

    return (
        <div>
            <h2>Modificar Saldo</h2>

            <label>ID de la Cuenta:</label>
            <input
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Ingresa el ID de la cuenta"
            />

            <label>Nuevo Saldo:</label>
            <input
                type="text"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="Ingresa el nuevo saldo"
            />

            <button onClick={handleUpdateBalance}>Actualizar Saldo</button>
        </div>
    );
}

export default ModificarSaldo;