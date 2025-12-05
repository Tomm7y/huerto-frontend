import React from 'react';
import { ShoppingCart, User, LogOut, UserCircle } from 'lucide-react';

const Navbar = ({ setVista, carritoCount, usuario, cerrarSesion }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
      <div className="container-fluid px-4"> {/* Usamos container-fluid para más amplitud */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#" onClick={() => setVista('home')}>
          <span className="me-2">🌱</span> HuertoHogar
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => setVista('home')}>Inicio</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => setVista('catalogo')}>Catálogo</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => setVista('nosotros')}>Nosotros</button></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Botón Carrito con Badge */}
            <button className="btn btn-outline-light position-relative" onClick={() => setVista('carrito')}>
              <ShoppingCart size={20} />
              {carritoCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carritoCount}
                </span>
              )}
            </button>

            {/* Menú de Usuario */}
            {usuario ? (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                  <User size={18} /> {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><button className="dropdown-item" onClick={() => setVista('perfil')}><UserCircle size={16} className="me-2"/> Mi Perfil</button></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><button className="dropdown-item text-danger" onClick={cerrarSesion}><LogOut size={16} className="me-2"/> Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-light fw-bold" onClick={() => setVista('login')}>Ingresar</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
