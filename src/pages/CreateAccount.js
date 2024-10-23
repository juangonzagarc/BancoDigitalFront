import React, { useState } from 'react';
import { createAccount, getClientByDocumentId } from '../api';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');

    const handleDocumentChange = async (e) => {
        setDocumentId(e.target.value);
        if (e.target.value.length > 5) {
            try {
                const response = await getClientByDocumentId(e.target.value);
                if (response.data) {
                    setName(response.data.nombre);
                }
            } catch (error) {
                console.log("Cliente no encontrado");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAccount = { name, documentId, balance };
            await createAccount(newAccount);
            setMessage('Cuenta creada con éxito');
            setName('');
            setDocumentId('');
            setBalance(0);
        } catch (error) {
            setMessage('Error al crear la cuenta');
            console.error('Error creating account:', error);
        }
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID de Documento:</label>
                    <input
                        type="text"
                        value={documentId}
                        onChange={handleDocumentChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={name !== ''}
                    />
                </div>
                <div>
                    <label>Saldo Inicial:</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Cuenta</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateAccount;
