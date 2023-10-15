import React, { useState } from 'react';
import styles from '@/components/admin/produtoInput.module.css';
import { storage } from '../../firebase'; 

function ImageUploadForm() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    if (image) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(image.name);

      const uploadTask = fileRef.put(image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Erro ao enviar a imagem:', error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Enviar Imagem</button>

      {uploadProgress > 0 && <p>Progresso de Upload: {uploadProgress}%</p>}
      {imageUrl && <img src={imageUrl} alt="Imagem Enviada" />}
    </div>
  );
}

export default ImageUploadForm;
