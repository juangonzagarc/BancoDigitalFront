import { useEffect, useState } from 'react';
import { getAccounts } from './api';

function ConsultaGeneral() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAccounts();
            setAccounts(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Consulta General de Cuentas</h2>
            <ul>
                {accounts.map(account => (
                    <li key={account.numeroCuenta}>
                        Cuenta: {account.numeroCuenta}, Cliente: {account.nombre} {account.apellido}, Saldo: {account.saldo}, Fecha de Creación: {account.fechaCreacion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConsultaGeneral;
