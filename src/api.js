import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

// Crear una cuenta de ahorros
export const createAccount = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/create`, data);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error creating account';
        console.error('Error creating account:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Obtener todas las cuentas
export const getAccounts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/all`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error fetching accounts';
        console.error('Error fetching accounts:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Obtener detalles de una cuenta específica
export const getAccountDetails = async (accountId) => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/${accountId}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error fetching account details';
        console.error('Error fetching account details:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Realizar depósito en una cuenta (renombrado de realizarDeposito a deposit)
export const deposit = async (accountId, amount) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/deposit`, {
            accountId,
            amount,
        });
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error making deposit';
        console.error('Error making deposit:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Obtener cliente por documento de identidad
export const getClientByDocumentId = async (cedula) => {
    try {
        const response = await axios.get(`${BASE_URL}/cliente/${cedula}`);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error fetching client';
        console.error('Error fetching client:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Registro de usuarios
export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error registrando usuario';
        console.error('Error registrando usuario:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Login de usuarios
export const login = async (cedula, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { cedula, password });
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error en el inicio de sesión';
        console.error('Error en el inicio de sesión:', errorMsg);
        throw new Error(errorMsg);
    }
};

// Exportar todas las funciones, incluidas login y register
const api = {
    createAccount,
    deposit,
    getAccounts,
    getAccountDetails,  // Añadido getAccountDetails
    getClientByDocumentId,
    register,
    login
};

export default api;
