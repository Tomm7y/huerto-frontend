import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import Nosotros from './pages/Nosotros'; 

function App() {
  const [vista, setVista] = useState('home');
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Funciones globales
  const iniciarSesion = (userData) => {
    setUsuario(userData);
    setVista('catalogo');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setVista('home');
    setCarrito([]);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Navbar setVista={setVista} usuario={usuario} carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} cerrarSesion={cerrarSesion} />
      
      <main className="flex-grow-1 d-flex flex-column w-100">
        {vista === 'home' && <Home setVista={setVista} />}
        {vista === 'login' && <Login iniciarSesion={iniciarSesion} irARegistro={() => setVista('registro')} />}
        {vista === 'registro' && <Registro iniciarSesion={iniciarSesion} irALogin={() => setVista('login')} />}
        {vista === 'catalogo' && <Catalogo agregarAlCarrito={agregarAlCarrito} />}
        {vista === 'carrito' && <Carrito carrito={carrito} setCarrito={setCarrito} setVista={setVista} usuario={usuario} />}
        {vista === 'perfil' && <Perfil usuario={usuario} />}
        {vista === 'nosotros' && <Nosotros />}
      </main>

      <Footer />
    </div>
  );
}
export default App;