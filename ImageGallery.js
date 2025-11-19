import React, { useState } from 'react';
import ImageUpload from '../UI/ImageUpload';
import Modal from '../UI/Modal';

const ImageGallery = ({ process, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('processId', process.id);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onImageUpload();
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h4>Imagens do Processo: {process.title}</h4>
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <div className="images-grid">
        {process.images && process.images.length > 0 ? (
          process.images.map(image => (
            <div 
              key={image.id} 
              className="image-item"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={`/uploads/images/${image.filename}`} 
                alt={image.originalName}
              />
              <p>{image.originalName}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma imagem encontrada para este processo.</p>
        )}
      </div>

      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <img 
            src={`/uploads/images/${selectedImage.filename}`} 
            alt={selectedImage.originalName}
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
