import { useEffect, useState } from 'react';
import { getAccountDetails } from './api/api';

function EstadoCuenta() {
    const [accountDetails, setAccountDetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const details = await getAccountDetails();
            setAccountDetails(details);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Estado de la Cuenta</h2>
            <p>Nombre: {accountDetails.nombre}</p>
            <p>Apellido: {accountDetails.apellido}</p>
            <p>Cédula: {accountDetails.cedula}</p>
            <p>Saldo: {accountDetails.saldo}</p>
        </div>
    );
}

export default EstadoCuenta;
