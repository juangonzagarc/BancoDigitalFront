import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import ConsultaGeneral from './ConsultaGeneral';
import RealizarDeposito from './RealizarDeposito';
import ModificarSaldo from './ModificarSaldo';
import CreateAccount from './pages/CreateAccount';
import ViewAccounts from './pages/ViewAccounts';
import { UserProvider } from './UserContext';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<AuthForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/consulta-general" element={<ConsultaGeneral />} />
                        <Route path="/realizar-deposito" element={<RealizarDeposito />} />
                        <Route path="/crear-cuenta" element={<CreateAccount />} />
                        <Route path="/ver-cuentas" element={<ViewAccounts />} />
                        <Route path="/modificar-saldo/:numeroCuenta" element={<ModificarSaldo />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
