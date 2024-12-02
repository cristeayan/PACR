import React, { useState } from 'react';

const ProfileImageUpload = ({ type, image, token, user, setUserAndToken }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal
  const openModal = () => setIsModalOpen(true);

  // Close Modal
  const closeModal = () => {
    setPreviewImage(null);
    setIsModalOpen(false);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUploadedImageFile(file);
    }
  };

  // Save Uploaded Image
  const saveImage = async () => {
    if (!uploadedImageFile) return;

    const formData = new FormData();
    formData.append(type === 'profile' ? 'profile_picture' : 'cover_picture', uploadedImageFile);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserAndToken(updatedUser, token);
        closeModal();
      } else {
        throw new Error('Failed to upload the image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Delete Image
  const deleteImage = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [type === 'profile' ? 'profile_picture' : 'cover_picture']: null,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserAndToken(updatedUser, token);
        setPreviewImage(null);
        closeModal();
      } else {
        throw new Error('Failed to delete the image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div>
      {/* Image Display */}
      <img
        src={previewImage || image}
        alt={`${type} preview`}
        style={type === 'profile' ? styles.profileImage : styles.coverImage}
        onClick={openModal}
      />

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <h2>{`Edit ${type === 'profile' ? 'Profile' : 'Cover'} Image`}</h2>
            <div>
              {previewImage || image ? (
                <img
                  src={previewImage || image}
                  alt="Preview"
                  style={type === 'profile' ? styles.profileEditPreview : styles.coverEditPreview}
                />
              ) : (
                <p style={styles.addPhotoPlaceholder}>Add Photo Here</p>
              )}
            </div>

            <div style={styles.modalActions}>
              <button style={styles.deleteButton} onClick={deleteImage}>
                Delete
              </button>
              <div style={styles.choosePhotoButton}>
                Choose Photo
                <input type="file" accept="image/*" style={styles.fileInput} onChange={handleImageUpload} />
              </div>
              <button style={styles.saveButton} onClick={saveImage}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  profileImage: {
    width: '220px',
    height: '230px',
    borderRadius: '12px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  coverImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '400px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  profileEditPreview: {
    width: '150px',
    height: '150px',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  coverEditPreview: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  choosePhotoButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    position: 'relative',
    cursor: 'pointer',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addPhotoPlaceholder: {
    color: '#666',
    margin: '20px 0',
  },
};

export default ProfileImageUpload;
