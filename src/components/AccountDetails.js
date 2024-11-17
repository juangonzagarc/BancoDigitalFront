import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import api from '../api/api';

function AccountDetails() {
    const { user } = useContext(UserContext);
    const [accountData, setAccountData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && user.accountId) {
            const fetchAccountDetails = async () => {
                try {
                    const data = await api.getAccountDetails(user.accountId);
                    setAccountData(data);
                } catch (err) {
                    setError('Error fetching account details: ' + err.message);
                }
            };
            fetchAccountDetails();
        } else {
            setError('Account ID is required but was not provided');
        }
    }, [user]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!accountData) {
        return <div>Loading account details...</div>;
    }

    return (
        <div>
            <h2>Account Details</h2>
            <p>Account ID: {accountData.id}</p>
            <p>Balance: {accountData.balance}</p>
            <p>Creation Date: {accountData.creationDate}</p>
        </div>
    );
}

export default AccountDetails;
