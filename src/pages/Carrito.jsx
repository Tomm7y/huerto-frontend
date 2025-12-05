import React from 'react';
import { Trash2 } from 'lucide-react';

const Carrito = ({ carrito, setCarrito, setVista, usuario }) => {
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // Restauramos las funciones del formato "Pro"
  const actualizarCantidad = (id, cambio) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, cantidad: Math.max(1, item.cantidad + cambio) };
      }
      return item;
    }));
  };

  const eliminarItem = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Mantenemos la lógica nueva de pago con validación de usuario
  const handlePagar = () => {
    if (usuario) {
      alert(`¡Gracias por tu compra, ${usuario.nombre}! Tu pedido ha sido registrado.`);
      setCarrito([]); 
      setVista('home');
    } else {
      alert("Debes iniciar sesión o registrarte para completar la compra.");
      setVista('login');
    }
  };

  // Diseño "Pro" para estado vacío
  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center flex-grow-1 d-flex flex-column justify-content-center">
        <div className="display-1 text-muted mb-3">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p className="text-muted">¡Agrega productos frescos para comenzar!</p>
        <button className="btn btn-success mt-3 rounded-pill px-4" onClick={() => setVista('catalogo')}>
            Ir al Catálogo
        </button>
      </div>
    );
  }

  // Diseño "Pro" a dos columnas
  return (
    <div className="container py-5">
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      <div className="row">
        {/* Columna Izquierda: Lista de Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <ul className="list-group list-group-flush">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center">
                    <span className="fs-2 me-3">{item.img}</span>
                    <div>
                      <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                      <small className="text-muted">${item.precio} unidad/kg</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="input-group input-group-sm" style={{width: '110px'}}>
                      <button className="btn btn-outline-secondary" onClick={() => actualizarCantidad(item.id, -1)}>-</button>
                      <input type="text" className="form-control text-center bg-white" value={item.cantidad} readOnly />
                      <button className="btn btn-outline-secondary" onClick={() => actualizarCantidad(item.id, 1)}>+</button>
                    </div>
                    <span className="fw-bold" style={{minWidth: '70px'}}>${item.precio * item.cantidad}</span>
                    <button className="btn btn-link text-danger p-0" onClick={() => eliminarItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Resumen de Pago */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm p-4 bg-light border-0">
            <h5 className="card-title fw-bold mb-4">Resumen del Pedido</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Envío</span>
              <span className="text-success fw-bold">Gratis</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fs-4 fw-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            {/* Botón con la nueva lógica handlePagar */}
            <button className="btn btn-success w-100 py-2 rounded-pill shadow-sm fw-bold" onClick={handlePagar}>
              Ir a Pagar
            </button>
            <button className="btn btn-link text-muted w-100 mt-2 text-decoration-none" onClick={() => setCarrito([])}>
                Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;