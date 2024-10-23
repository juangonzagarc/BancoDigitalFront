import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Bienvenido al Banco Digital</h1>
            <div>
                <button>
                    <Link to="/estado-cuenta" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Ver Estado de la Cuenta
                    </Link>
                </button>
                <button>
                    <Link to="/consulta-general" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Consulta General de Cuentas
                    </Link>
                </button>
                <button>
                    <Link to="/realizar-deposito" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Realizar Depósito
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
