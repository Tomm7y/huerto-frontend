import React, { useState } from 'react';

const Registro = ({ iniciarSesion, irALogin }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña es muy corta.');
      return;
    }

    // Aquí conectarías con el Backend para guardar el usuario
    alert("¡Registro exitoso! Iniciando sesión...");
    iniciarSesion({ nombre, email, rol: 'Cliente' });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success fw-bold">Crear Cuenta</h2>
        {error && <div className="alert alert-danger p-2 text-center small">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">Nombre Completo</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Correo Electrónico</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted">Confirmar Contraseña</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">Registrarse</button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">¿Ya tienes cuenta? <button onClick={irALogin} className="btn btn-link text-success text-decoration-none fw-bold p-0 align-baseline">Inicia Sesión</button></small>
        </div>
      </div>
    </div>
  );
};

export default Registro;
