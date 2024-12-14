import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const ProfileImageCover = ({ user, token, setUserAndToken, styles, uploadedImage, isModalOpen, modalType, closeModal, }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'profile' or 'cover'
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({
    profile: 'dummy-man.png',
    cover: '/Monitor Image.png',
  });
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUploadedImage({
        profile: user.profile_picture || 'dummy-man.png',
        cover: user.cover_picture || '/Monitor Image.png',
      });
    }
  }, [user, onUploadImageChange]);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  // Functions to handle Intro Modal
  const openIntroModal = () => setIsIntroModalOpen(true);
  const closeIntroModal = () => setIsIntroModalOpen(false);

  const openModal = (type, preview = false) => {
    setModalType(type);
    setIsPreviewMode(preview);
    setIsModalOpen(true);
    onModalOpen(type, preview); // Notify parent component
    if (preview) {
      setPreviewImage(uploadedImage[type]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
    setIsPreviewMode(false);
  };

  const openDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteImage = () => {
    setUploadedImage({
      ...uploadedImage,
      [modalType]: null,
    });
    setPreviewImage(null);
    closeDeleteConfirmation();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUploadedImageFile(file);
    }
  };

  const saveImage = async () => {
    if (previewImage) {
      const formData = new FormData();
      formData.append(modalType === 'profile' ? 'profile_picture' : 'cover_picture', uploadedImageFile);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const updatedUser = await userResponse.json();
            setUserAndToken(updatedUser, token);
            closeModal();
          } else {
            throw new Error('Failed to fetch updated user data');
          }
        } else {
          throw new Error(`Failed to save image: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save the image. Please try again.');
      }
    }
  };

  const deleteImage = async (type) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [type === 'profile' ? 'profile_picture' : 'cover_picture']: null, // Set the field to null
        }),
      });

      if (response.ok) {
        // Fetch the updated user data
        const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const updatedUser = await userResponse.json();
          setUserAndToken(updatedUser, token); // Update the context with new user data
          setPreviewImage(null); // Clear the preview image
        } else {
          throw new Error('Failed to fetch updated user data');
        }
      } else {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete the image. Please try again.');
    }
  };

  return (
    <>
      {/* Modals */}
      {isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: styles.modalOverlay,
            content: styles.modalContent,
          }}
        >
          <button style={styles.closeButton} onClick={closeModal}>×</button>

          {isPreviewMode ? (
            <>
              {/* Heading for Profile Photo Preview */}
              {modalType === 'profile' && <h2 style={styles.modalHeading}>Profile Photo</h2>}

              {/* Preview Image */}
              <img
                src={previewImage || uploadedImage[modalType]}
                alt="Preview"
                style={modalType === 'profile' ? styles.profileImagePreview : styles.coverImagePreview}
              />
            </>
          ) : (
            <>
              <h2 style={styles.modalHeading}>
                Edit {modalType === 'profile' ? 'Profile' : 'Cover'} Image
              </h2>
              {previewImage || uploadedImage[modalType] ? (
                <img
                  src={previewImage || uploadedImage[modalType]}
                  alt="Edit Preview"
                  style={modalType === 'profile' ? styles.profileEditPreview : styles.coverEditPreview}
                />
              ) : (
                <p style={styles.addPhotoPlaceholder}>Add Photo Here</p>
              )}

              <div style={styles.modalActions}>
                <button
                  style={styles.deleteButton}
                  onClick={() => setDeleteConfirmationOpen(true)} // Open confirmation popup
                >
                  Delete
                </button>
                <div style={styles.modalActionsInner}>
                  <div style={styles.choosePhotoButton}>
                    Choose Photo
                    <input type="file" accept="image/*" style={styles.fileInput} onChange={handleImageUpload} />
                  </div>
                  <button style={styles.saveButton} onClick={saveImage}>Save</button>
                </div>
              </div>
            </>
          )}
        </ReactModal>
      )}

      {isDeleteConfirmationOpen && (
        <ReactModal
          isOpen={isDeleteConfirmationOpen}
          onRequestClose={closeDeleteConfirmation}
          style={{
            overlay: styles.modalOverlay,
            content: styles.modalDeleteContent,
          }}
        >
          <button style={styles.closeButton} onClick={closeDeleteConfirmation}>×</button>
          <h2 style={styles.deleteModalHeading}>
            Delete {modalType === 'profile' ? 'Profile' : 'Cover'} Photo?
          </h2>
          <p>
            {modalType === 'profile'
              ? 'Are you sure? Having a profile picture helps others recognize you.'
              : 'Delete photo? A background image is a great way to help your profile stand out.'}
          </p>
          <div style={styles.modalDeleteActions}>
            <button style={styles.cancelButton} onClick={closeDeleteConfirmation}>Cancel</button>
            <button
              style={styles.deleteModalButton}
              onClick={() => {
                handleDeleteImage(); // Perform delete action
                closeDeleteConfirmation(); // Only close confirmation popup
              }}
            >
              Delete
            </button>
          </div>
        </ReactModal>
      )}
    </>
  );
};

const styles = {
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    background: '#fff',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '992px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  modalDeleteContent: {
    position: 'relative',
    background: '#fff',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '450px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '30px',
    lineHeight: '22px',
    cursor: 'pointer',
    color: '#000',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '12px',
    margin: '20px auto',
  },
  coverImage: {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '20px',
  },
  modalDeleteActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  modalActionsInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    padding: '10px 20px',
    background: '#0073b1',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  choosePhotoButton: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    color: '#4FCFF5',
    textDecoration: 'none',
    padding: '16px 40px',
    borderRadius: '200px',
    textAlign: 'center',
    border: '1px solid #4FCFF5',
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#70d4fc',
    borderRadius: '200px',
    padding: '16px 40px',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  profileImagePreview: {
    margin: '20px 0 0',
    width: '260px',
    height: '260px',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '16px',
  },
  coverImagePreview: {
    width: '100%',
    maxHeight: '340px',
    objectFit: 'cover',
    margin: '20px 0 0',
  },
  profileEditPreview: {
    width: '260px',
    height: '260px',
    objectFit: 'cover',
    margin: '20px 0 0',
    borderRadius: '16px',
  },
  coverEditPreview: {
    width: '100%',
    maxHeight: '340px',
    objectFit: 'cover',
    margin: '20px 0 0',
  },
  modalHeading: {
    textAlign: 'start',
  },
  deleteButton: {
    backgroundColor: '#70d4fc',
    borderRadius: '200px',
    padding: '16px 40px',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  cancelButton: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    backgroundColor: '#fff',
    color: '#4FCFF5',
    textDecoration: 'none',
    padding: '12px 20px',
    borderRadius: '200px',
    textAlign: 'center',
    border: '1px solid #4FCFF5',
    cursor: 'pointer',
  },
  deleteModalButton: {
    backgroundColor: '#70d4fc',
    borderRadius: '200px',
    padding: '12px 20px',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteModalHeading: {
    fontSize: '20px',
  },
  addPhotoPlaceholder: {
    color: '#313131',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default ProfileImageCover;