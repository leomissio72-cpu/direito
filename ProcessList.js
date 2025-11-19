import React from 'react';

const ProcessList = ({ processes, onProcessSelect }) => {
  return (
    <div className="process-list">
      <h3>Processos do Cliente</h3>
      {processes.map(process => (
        <div 
          key={process.id} 
          className="process-item"
          onClick={() => onProcessSelect(process)}
        >
          <div className="process-header">
            <h4>{process.title}</h4>
            <span className={`status ${process.status}`}>
              {process.status}
            </span>
          </div>
          <p>Valor: R$ {process.value}</p>
          <p>Previsão: {process.deadline}</p>
          <div className="process-images">
            {process.images && process.images.length > 0 ? (
              <span>{process.images.length} imagem(ns)</span>
            ) : (
              <span className="no-images">Nenhuma imagem</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessList;
