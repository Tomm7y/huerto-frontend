import React from 'react';

const Perfil = ({ usuario }) => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Mi Perfil</h2>
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex align-items-center mb-4">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', fontSize: '24px'}}>
                {usuario?.nombre?.charAt(0)}
            </div>
            <div>
                <h4 className="mb-0">{usuario?.nombre}</h4>
                <p className="text-muted mb-0">{usuario?.email}</p>
            </div>
        </div>
        <hr />
        <h5>Historial de Pedidos</h5>
        <div className="alert alert-info mt-3">
            No tienes pedidos recientes. ¡Explora nuestro catálogo!
        </div>
      </div>
    </div>
  );
};

export default Perfil;