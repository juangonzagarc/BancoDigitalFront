import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AccountForm from '../components/AccountForm';
import DepositForm from '../components/DepositForm';
import AccountList from '../components/AccountList';
import { getAccounts, createAccount, deposit } from '../api/api';

const Home = () => {
    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = async () => {
        try {
            const response = await getAccounts();
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleCreateAccount = async (newAccount) => {
        await createAccount(newAccount);
        fetchAccounts();
    };

    const handleDeposit = async (depositData) => {
        await deposit(depositData);
        fetchAccounts();
    };

    return (
        <div>
            <Header />
            <AccountForm onCreate={handleCreateAccount} />
            <DepositForm onDeposit={handleDeposit} />
            <AccountList accounts={accounts} />
        </div>
    );
};

export default Home;
