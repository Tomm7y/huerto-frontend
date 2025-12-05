import React, { useState, useEffect } from 'react';

// Datos Mock (Respaldo si falla backend)
const MOCK_PRODUCTOS = [
  { id: 1, nombre: "Manzanas Fuji", precio: 1200, categoria: "Frutas", desc: "Dulces y crujientes.", img: "🍎" },
  { id: 2, nombre: "Zanahorias Bio", precio: 900, categoria: "Verduras", desc: "Sin pesticidas.", img: "🥕" },
];

const Catalogo = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Conexión al Backend
    fetch('http://localhost:8081/api/productos') 
      .then(res => {
        if(!res.ok) throw new Error("Error conectando al backend");
        return res.json();
      })
      .then(data => {
        console.log("Datos recibidos:", data); // Mira la consola para ver si llega "imagen"
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error de conexión:", err);
        setError("No se pudo conectar. Usando datos de prueba.");
        setProductos(MOCK_PRODUCTOS); 
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando productos frescos...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Catálogo de Productos</h2>
      {error && <div className="alert alert-warning text-center">{error}</div>}
      
      <div className="row g-4">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-4">
            <div className="card h-100 shadow-sm hover-effect">
              <div className="card-body text-center">
                {/* CORRECCIÓN AQUÍ: Agregamos prod.imagen (Java) || prod.img (Mock) */}
                <div className="mb-3 display-1">{prod.imagen || prod.img || "📦"}</div>
                
                <h5 className="fw-bold">{prod.nombre}</h5>
                <p className="text-muted small">{prod.descripcion || prod.desc}</p>
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