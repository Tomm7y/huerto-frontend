import React from 'react';

const Home = ({ setVista }) => {
  return (
    <div className="text-center py-5 bg-light flex-grow-1 d-flex flex-column justify-content-center">
      <div className="container">
        <div className="mb-4 display-1">🥦</div>
        <h1 className="display-4 fw-bold text-success mb-3">Fresco, Orgánico y Local</h1>
        <p className="lead mb-4 text-muted">La mejor selección de frutas y verduras directamente del campo a tu puerta.</p>
        <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-success btn-lg px-5 rounded-pill shadow" onClick={() => setVista('catalogo')}>
            Ver Catálogo
            </button>
            <button className="btn btn-outline-success btn-lg px-5 rounded-pill" onClick={() => setVista('nosotros')}>
            Conócenos
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;