import { useEffect, useState } from 'react';
import { getAccounts } from './api/api';
import './ConsultaGeneral.css';

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
        <div className="consulta-container">
            <h2 className="consulta-title">Consulta General de Cuentas</h2>
            <ul className="account-list">
                {accounts.map((account, index) => (
                    <li key={index} className="account-item">
                        Cuenta: {account.numeroCuenta}, Cliente: {account.nombre},
                        Saldo: {account.saldo}, Fecha de Creación: {account.fechaCreacion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultaGeneral;
