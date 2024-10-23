import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import api from '../api'; // Asegúrate de que api.js está en la ruta correcta

function AuthForm() {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Alterna entre login y registro
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook de React Router para redirección

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Llamar al servicio de login
                await api.login(cedula, contraseña); // Cambié el nombre a login, que ya tienes en api.js
                alert('Login exitoso');
                navigate('/dashboard'); // Redirigir a la pantalla de dashboard
            } else {
                // Llamar al servicio de registro
                await api.register({ cedula, nombre, apellido, contraseña }); // Cambié a register
                alert('Registro exitoso');
                setIsLogin(true); // Cambiar a la pantalla de login tras el registro
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
