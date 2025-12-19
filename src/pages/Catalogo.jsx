import React, { useState, useEffect } from 'react';
import { Trash2, Edit, PlusCircle, X } from 'lucide-react';

const Catalogo = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState('');
  
  // Estado para el formulario (Crear/Editar)
  const [formVisible, setFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [prodActual, setProdActual] = useState({
    id: null, nombre: '', precio: '', categoria: 'Frutas', descripcion: '', imagen: '🍎'
  });

  // Cargar productos y verificar rol al inicio
  useEffect(() => {
    cargarProductos();
    
    // Verificar si es Admin leyendo del localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario_huerto'));
    const tokenGuardado = localStorage.getItem('token_huerto');
    
    if (usuarioGuardado && usuarioGuardado.role === 'ADMIN') {
      setIsAdmin(true);
    }
    if (tokenGuardado) {
      setToken(tokenGuardado);
    }
  }, []);

  const cargarProductos = () => {
    setLoading(true);
    fetch('http://localhost:8081/api/productos')
      .then(res => {
        if(!res.ok) throw new Error("Error conectando al backend");
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error cargando catálogo.");
        setLoading(false);
      });
  };

  // Manejar cambios en inputs del formulario
  const handleChange = (e) => {
    setProdActual({ ...prodActual, [e.target.name]: e.target.value });
  };

  // Preparar formulario para CREAR
  const iniciarCreacion = () => {
    setProdActual({ id: null, nombre: '', precio: '', categoria: 'Frutas', descripcion: '', imagen: '🍎' });
    setModoEdicion(false);
    setFormVisible(true);
  };

  // Preparar formulario para EDITAR
  const iniciarEdicion = (prod) => {
    setProdActual(prod);
    setModoEdicion(true);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir para ver el form
  };

  // ENVIAR FORMULARIO (Crear o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = modoEdicion 
      ? `http://localhost:8081/api/productos/${prodActual.id}`
      : 'http://localhost:8081/api/productos';
    
    const method = modoEdicion ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Token JWT Importante
        },
        body: JSON.stringify(prodActual)
      });

      if (!res.ok) throw new Error("Error al guardar producto");

      alert(modoEdicion ? "Producto actualizado" : "Producto creado");
      setFormVisible(false);
      cargarProductos(); // Recargar lista
    } catch (error) {
      alert(error.message);
    }
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {
    if(!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Error al eliminar");
      
      cargarProductos(); // Recargar lista
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div className="text-center py-5">Cargando...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Catálogo de Productos</h2>
      
      {/* SECCIÓN ADMIN: Botón para añadir */}
      {isAdmin && !formVisible && (
        <div className="text-center mb-4">
          <button className="btn btn-primary rounded-pill shadow" onClick={iniciarCreacion}>
            <PlusCircle size={20} className="me-2"/> Agregar Nuevo Producto
          </button>
        </div>
      )}

      {/* FORMULARIO ADMIN (Visible solo si formVisible es true) */}
      {isAdmin && formVisible && (
        <div className="card shadow p-4 mb-5 border-success">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-success fw-bold">{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h4>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setFormVisible(false)}><X size={20}/></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="nombre" value={prodActual.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" name="precio" value={prodActual.precio} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Emoji/Imagen</label>
                <input type="text" className="form-control" name="imagen" value={prodActual.imagen} onChange={handleChange} placeholder="🍎" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <select className="form-select" name="categoria" value={prodActual.categoria} onChange={handleChange}>
                  <option value="Frutas">Frutas</option>
                  <option value="Verduras">Verduras</option>
                  <option value="Organicos">Orgánicos</option>
                </select>
              </div>
              <div className="col-md-8">
                <label className="form-label">Descripción</label>
                <input type="text" className="form-control" name="descripcion" value={prodActual.descripcion} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3 fw-bold">
              {modoEdicion ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </form>
        </div>
      )}

      {error && <div className="alert alert-warning text-center">{error}</div>}
      
      <div className="row g-4">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-4">
            <div className="card h-100 shadow-sm hover-effect">
              <div className="card-body text-center position-relative">
                {/* Visualización Admin: Botones de Acción */}
                {isAdmin && (
                  <div className="position-absolute top-0 end-0 p-2">
                    <button className="btn btn-sm btn-light text-primary me-1" onClick={() => iniciarEdicion(prod)}>
                      <Edit size={16}/>
                    </button>
                    <button className="btn btn-sm btn-light text-danger" onClick={() => eliminarProducto(prod.id)}>
                      <Trash2 size={16}/>
                    </button>
                  </div>
                )}

                <div className="mb-3 display-1">{prod.imagen || "📦"}</div>
                
                <h5 className="fw-bold">{prod.nombre}</h5>
                <p className="text-muted small">{prod.descripcion}</p>
                <h4 className="text-success fw-bold">${prod.precio}</h4>
                <button className="btn btn-outline-success w-100 mt-2 rounded-pill" onClick={() => agregarAlCarrito(prod)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;