import React from 'react';
import { MapPin, Leaf, Heart, Utensils, Apple, Carrot, Wheat, Milk } from 'lucide-react';

const Nosotros = () => (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h1 className="fw-bold text-success">Sobre HuertoHogar</h1>
      <p className="lead text-muted">Llevando la frescura del campo a tu mesa desde 2010.</p>
    </div>

    <div className="row align-items-center mb-5">
      <div className="col-md-6 text-center">
        <div className="display-1">🚜</div>
      </div>
      <div className="col-md-6">
        <h3 className="fw-bold">Nuestra Misión</h3>
        <p className="text-muted">Promover la agricultura sostenible y apoyar a los agricultores locales, entregando productos orgánicos de la más alta calidad directamente a tu hogar.</p>
      </div>
    </div>

    {/* Sección: Impacto y Compromiso */}
    <div className="mb-5">
      <h2 className="text-center fw-bold text-secondary mb-4">Nuestro Impacto y Compromiso</h2>
      <div className="row g-4">
        {/* Impacto Ambiental */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 text-center">
            <div className="text-success mb-3 d-flex justify-content-center"><Leaf size={48} /></div>
            <h4 className="fw-bold">Impacto Ambiental</h4>
            <p className="text-muted small">
              <strong>Huella de Carbono:</strong> Al preferir productos locales, reducimos las emisiones de transporte. 
              Fomentamos prácticas agrícolas sostenibles que regeneran el suelo.
            </p>
          </div>
        </div>

        {/* Contribuciones a la Comunidad */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 text-center">
            <div className="text-danger mb-3 d-flex justify-content-center"><Heart size={48} /></div>
            <h4 className="fw-bold">Comunidad</h4>
            <p className="text-muted small">
              Tu compra apoya directamente a familias agricultoras. Valoramos el <strong>origen</strong> de cada producto 
              para resaltar su autenticidad y fortalecer la economía local.
            </p>
          </div>
        </div>

        {/* Experiencia y Recetas */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 text-center">
            <div className="text-warning mb-3 d-flex justify-content-center"><Utensils size={48} /></div>
            <h4 className="fw-bold">Vida Saludable</h4>
            <p className="text-muted small">
              No solo vendemos ingredientes; inspiramos tu cocina. Ofrecemos <strong>recetas sugeridas</strong> 
              y recomendaciones personalizadas para que aproveches al máximo cada cosecha.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Nueva Sección: Descripciones de Categorías */}
    <div className="mb-5">
      <h2 className="text-center fw-bold text-secondary mb-4">Nuestra Selección</h2>
      <div className="row g-4">
        
        {/* Frutas Frescas */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 d-flex flex-row align-items-start">
            <div className="text-danger me-3"><Apple size={40} /></div>
            <div>
              <h5 className="fw-bold">Frutas Frescas</h5>
              <p className="text-muted small mb-0">
                Experiencia directa del campo a tu hogar. Cultivadas y cosechadas en su punto óptimo de madurez para asegurar sabor y frescura. 
                Perfectas para consumir solas, en ensaladas o como ingrediente principal en postres y smoothies.
              </p>
            </div>
          </div>
        </div>

        {/* Verduras Orgánicas */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 d-flex flex-row align-items-start">
            <div className="text-warning me-3"><Carrot size={40} /></div>
            <div>
              <h5 className="fw-bold">Verduras Orgánicas</h5>
              <p className="text-muted small mb-0">
                Cultivadas sin pesticidas ni químicos, garantizando un sabor auténtico. Seleccionadas por su calidad nutricional, 
                son ideales para ensaladas, guisos y platos saludables, promoviendo una alimentación consciente y sostenible.
              </p>
            </div>
          </div>
        </div>

        {/* Productos Orgánicos */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 d-flex flex-row align-items-start">
            <div className="text-success me-3"><Wheat size={40} /></div>
            <div>
              <h5 className="fw-bold">Productos Orgánicos</h5>
              <p className="text-muted small mb-0">
                Elaborados con ingredientes naturales y procesados responsablemente. Desde miel hasta granos, 
                ofrecemos una selección que apoya un estilo de vida saludable y respetuoso con el medio ambiente, sin comprometer el sabor.
              </p>
            </div>
          </div>
        </div>

        {/* Productos Lácteos */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 d-flex flex-row align-items-start">
            <div className="text-info me-3"><Milk size={40} /></div>
            <div>
              <h5 className="fw-bold">Productos Lácteos</h5>
              <p className="text-muted small mb-0">
                De granjas locales dedicadas a la producción responsable. Leches, yogures y derivados ricos en calcio 
                que conservan su frescura y sabor auténtico, perfectos para la nutrición de toda la familia.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <h3 className="mb-4 d-flex align-items-center"><MapPin className="text-danger me-2"/> Nuestras Tiendas</h3>
    <div className="card shadow-sm border-0">
      <div className="card-body bg-light text-center p-4 rounded">
        <h4 className="text-muted mb-3">Mapa de Cobertura</h4>
        <div className="alert alert-secondary mb-4">
            <strong>Sucursales en:</strong> Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso, Concepción.
        </div>
        
        {/* Mapa Embed de Google Maps */}
        <div className="ratio ratio-16x9" style={{maxHeight: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
            <iframe 
                src="https://maps.google.com/maps?q=Chile&t=&z=5&ie=UTF8&iwloc=&output=embed" 
                title="Mapa de Tiendas HuertoHogar"
                width="100%" 
                height="400" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy">
            </iframe>
        </div>
        <small className="text-muted mt-2 d-block">Cobertura desde la zona central hasta el sur de Chile.</small>
      </div>
    </div>
  </div>
);

export default Nosotros;