import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function AuthForm() {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await api.login(cedula, contraseña);
                alert('Login exitoso');
                navigate('/dashboard');
            } else {
                await api.register({ cedula, nombre, apellido, contraseña });
                alert('Registro exitoso');
                setIsLogin(true);
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };
    return (
        <div>
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Cédula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                />
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? '¿No tienes cuenta? Registrarse' : '¿Ya tienes cuenta? Iniciar Sesión'}
            </button>
        </div>
    );
}

export default AuthForm;
