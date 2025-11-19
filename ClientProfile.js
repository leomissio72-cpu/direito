import React, { useState, useEffect } from 'react';
import ProcessList from './ProcessList';
import ImageGallery from './ImageGallery';

const ClientProfile = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState(null);

  useEffect(() => {
    fetchClientData();
    fetchProcesses();
  }, [clientId]);

  const fetchClientData = async () => {
    const response = await fetch(`/api/clients/${clientId}`);
    const data = await response.json();
    setClient(data);
  };

  const fetchProcesses = async () => {
    const response = await fetch(`/api/processes?clientId=${clientId}`);
    const data = await response.json();
    setProcesses(data);
  };

  return (
    <div className="client-profile">
      <div className="profile-header">
        <h1>Perfil do Cliente</h1>
        {client && (
          <div className="client-info">
            <h2>{client.name}</h2>
            <p>CPF: {client.cpf} | Telefone: {client.phone}</p>
            <p>Email: {client.email}</p>
          </div>
        )}
      </div>

      <ProcessList 
        processes={processes} 
        onProcessSelect={setSelectedProcess}
      />

      {selectedProcess && (
        <ImageGallery 
          process={selectedProcess} 
          onImageUpload={fetchProcesses}
        />
      )}
    </div>
  );
};

export default ClientProfile;
