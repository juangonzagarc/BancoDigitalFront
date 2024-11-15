import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

// Función para manejar errores de Axios de forma consistente
const handleError = (error, defaultMessage) => {
    const errorMsg = error.response?.data?.message || defaultMessage;
    console.error(errorMsg);
    throw new Error(errorMsg);
};

// Crear una cuenta de ahorros
export const createAccount = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/create`, data);
        return response.data;
    } catch (error) {
        handleError(error, 'Error creating account');
    }
};

// Obtener todas las cuentas
export const getAccounts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/all`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching accounts');
    }
};

// Realizar depósito en una cuenta
export const deposit = async (accountId, amount) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/deposit`, {
            accountId: accountId,
            amount: amount
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error making deposit');
    }
};


export const getAccountById = async (numeroCuenta) => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/${numeroCuenta}`, {
            withCredentials: true // Agrega esto si usas cookies para autenticación
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching account details:", error);
        throw error;
    }
};


export const updateAccountBalance = async (accountId, amount) => {
    try {
        const response = await axios.put(`${BASE_URL}/accounts/update-balance`, {
            accountId: accountId,
            amount: amount
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error al actualizar el saldo');
    }
};






// Obtener cliente por documento de identidad
export const getClientByDocumentId = async (cedula) => {
    try {
        const response = await axios.get(`${BASE_URL}/cliente/${cedula}`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching client');
    }
};

// Registro de usuarios
// api.js
export const register = async (data) => {
    if (typeof window !== 'undefined') {
        window.api = api;
    }
    console.log('Datos enviados para registro:', data);
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
    }
};





// Login de usuarios
export const login = async (cedula, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { cedula, password });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during login');
    }
};

// Exportar todas las funciones
const api = {
    createAccount,
    deposit,
    getAccounts,
    getAccountById,
    updateAccountBalance,
    getClientByDocumentId,
    register,
    login
};

export default api;
