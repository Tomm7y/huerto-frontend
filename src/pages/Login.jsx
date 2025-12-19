import React, { useState } from 'react';

const Login = ({ iniciarSesion, irARegistro }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      localStorage.setItem('token_huerto', data.token);

      iniciarSesion({ 
        nombre: data.nombre, 
        email: email, 
        role: data.role 
      });

    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success fw-bold">Bienvenido</h2>
        {error && <div className="alert alert-danger p-2 text-center small">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* CORRECCIÓN: Agregamos htmlFor e id para accesibilidad */}
            <label htmlFor="email" className="form-label text-muted">Correo Electrónico</label>
            <input 
              id="email"
              type="email" 
              className="form-control" 
              placeholder="nombre@ejemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-muted">Contraseña</label>
            <input 
              id="password"
              type="password" 
              className="form-control" 
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">¿No tienes cuenta? <button onClick={irARegistro} className="btn btn-link text-success text-decoration-none fw-bold p-0 align-baseline">Regístrate</button></small>
        </div>
      </div>
    </div>
  );
};

export default Login;