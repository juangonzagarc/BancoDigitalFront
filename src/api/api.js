import axios from 'axios';

const BASE_URL = 'https://localhost:8081/api';

const handleError = (error, defaultMessage) => {
    const errorMsg = error.response?.data?.message || defaultMessage;
    console.error(errorMsg);
    throw new Error(errorMsg);
};

export const createAccount = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/create`, data);
        return response.data;
    } catch (error) {
        handleError(error, 'Error creating account');
    }
};

export const getAccounts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/accounts/all`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching accounts');
    }
};

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
            withCredentials: true
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

export const getClientByDocumentId = async (cedula) => {
    try {
        const response = await axios.get(`${BASE_URL}/cliente/${cedula}`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching client');
    }
};

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

export const login = async (cedula, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { cedula, password });
        return response.data;
    } catch (error) {
        handleError(error, 'Error during login');
    }
};

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
