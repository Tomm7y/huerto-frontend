import React, { useState } from 'react';

const Login = ({ iniciarSesion, irARegistro }) => { // Agregamos irARegistro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!email.includes('@')) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    iniciarSesion({ nombre: 'Estudiante', email, rol: 'Cliente' });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success fw-bold">Bienvenido</h2>
        {error && <div className="alert alert-danger p-2 text-center small">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">Iniciar Sesión</button>
        </form>
        <div className="mt-3 text-center">
          {/* Botón funcional hacia el registro */}
          <small className="text-muted">¿No tienes cuenta? <button onClick={irARegistro} className="btn btn-link text-success text-decoration-none fw-bold p-0 align-baseline">Regístrate</button></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
