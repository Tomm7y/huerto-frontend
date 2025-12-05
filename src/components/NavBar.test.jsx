import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import React from 'react';

// Mock de iconos para evitar errores de Lucide
vi.mock('lucide-react', () => ({
  ShoppingCart: () => <span data-testid="icon-cart">Cart</span>,
  User: () => <span>User</span>,
  LogOut: () => <span>LogOut</span>,
  UserCircle: () => <span>UserCircle</span>,
}));

describe('Componente Navbar', () => {
  
  it('Debe mostrar el título de la marca correctamente', () => {
    render(<Navbar carritoCount={0} usuario={null} setVista={() => {}} />);
    // Busca el texto "HuertoHogar"
    expect(screen.getByText(/HuertoHogar/i)).toBeInTheDocument();
  });

  it('Debe mostrar el botón "Ingresar" cuando NO hay usuario logueado', () => {
    render(<Navbar carritoCount={0} usuario={null} setVista={() => {}} />);
    // Busca el botón Ingresar
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('Debe mostrar el nombre del usuario cuando SÍ hay usuario logueado', () => {
    const usuarioMock = { nombre: 'Juan Perez' };
    render(<Navbar carritoCount={0} usuario={usuarioMock} setVista={() => {}} />);
    // Busca el nombre del usuario
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
  });

  it('Debe mostrar el badge del carrito cuando hay productos', () => {
    render(<Navbar carritoCount={5} usuario={null} setVista={() => {}} />);
    // Busca el número 5
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});