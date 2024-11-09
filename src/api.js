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

// Obtener detalles de una cuenta específica
export const getAccountDetails = async (accountId) => {
    if (!accountId) {
        const errorMsg = 'Account ID is required but was not provided';
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        const response = await axios.get(`${BASE_URL}/accounts/${accountId}`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching account details');
    }
};

// Realizar depósito en una cuenta
export const deposit = async (accountId, amount) => {
    if (!accountId) {
        const errorMsg = 'Account ID is required for deposit';
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        const response = await axios.post(`${BASE_URL}/accounts/deposit`, {
            accountId,
            amount,
        });
        return response.data;
    } catch (error) {
        handleError(error, 'Error making deposit');
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
export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        handleError(error, 'Error registering user');
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
    getAccountDetails,
    getClientByDocumentId,
    register,
    login
};

export default api;
