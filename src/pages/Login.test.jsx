import '@testing-library/jest-dom'; 
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Login from './Login';
import React from 'react';

describe('Pruebas del Componente Login', () => {
  const iniciarSesionMock = vi.fn();
  const irARegistroMock = vi.fn();

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe renderizar el formulario correctamente', () => {
    render(<Login iniciarSesion={iniciarSesionMock} irARegistro={irARegistroMock} />);
    
    // Ahora sí encontrará estos elementos porque restauramos los placeholders en Login.jsx
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nombre@ejemplo.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('Debe actualizar los inputs cuando el usuario escribe', () => {
    render(<Login iniciarSesion={iniciarSesionMock} irARegistro={irARegistroMock} />);
    
    const emailInput = screen.getByPlaceholderText(/nombre@ejemplo.com/i);
    const passInput = screen.getByPlaceholderText(/••••••/i);

    fireEvent.change(emailInput, { target: { value: 'usuario@prueba.cl' } });
    fireEvent.change(passInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('usuario@prueba.cl');
    expect(passInput.value).toBe('123456');
  });

  it('Debe mostrar error si el backend responde con fallo (Credenciales incorrectas)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Credenciales incorrectas' }),
      text: async () => 'Credenciales incorrectas'
    });

    render(<Login iniciarSesion={iniciarSesionMock} irARegistro={irARegistroMock} />);
    
    fireEvent.change(screen.getByPlaceholderText(/nombre@ejemplo.com/i), { target: { value: 'error@prueba.cl' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••/i), { target: { value: 'malapass' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument();
    });
  });

  it('Debe llamar a iniciarSesion si el backend responde exitosamente', async () => {
    const mockUserResponse = { 
      token: 'fake-jwt-token', 
      nombre: 'Test User', 
      role: 'USER' 
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserResponse,
    });

    render(<Login iniciarSesion={iniciarSesionMock} irARegistro={irARegistroMock} />);
    
    fireEvent.change(screen.getByPlaceholderText(/nombre@ejemplo.com/i), { target: { value: 'ok@prueba.cl' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(iniciarSesionMock).toHaveBeenCalledWith({
        nombre: 'Test User',
        email: 'ok@prueba.cl',
        role: 'USER'
      });
    });
  });
});