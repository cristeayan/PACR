import { useUser } from '../context/UserContext';
import React, { useState } from 'react';

const PostBox = () => {
  const { user } = useUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Dragging state for visual feedback

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file upload via input
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Delete uploaded file (prevent opening file explorer)
  const deleteUploadedFile = (event) => {
    event.stopPropagation(); // Prevent the file input from being triggered
    setUploadedFile(null);
  };

  return (
    <>
      {/* Your Existing PostBox Code */}
      <div style={postBoxWrapperStyle}>
        <img
          src={user ? 'http://127.0.0.1:8000' + user.profile_picture : '/dummy-man.png'}
          alt='Profile'
          style={postBoxProfilePicStyle}
        />
        <div style={postBoxContentStyle}>
          <div style={postBoxInputWrapStyle}>
            <input
              type='text'
              placeholder='Let the world know what you want to say...'
              style={postBoxInputStyle}
            />
            <button style={postBoxSubmitStyle}>Submit</button>
          </div>
          <div style={postBoxButtonsWrapperStyle}>
            <button style={postBoxButtonStyle} onClick={() => setIsPopupOpen(true)}>
              <img src='Upload Photo Icon.png' alt='Photo/Video' /> Photo/Video
            </button>
            <button style={postBoxButtonStyle}>
              <img src='Share Event Icon.png' alt='Share Event' /> Share Event
            </button>
            <button style={postBoxButtonStyle}>
              <img src='Upload Research Icon.png' alt='Upload Research' /> Upload Research
            </button>
          </div>
        </div>
      </div>

      {/* New Modal for Upload */}
      {isPopupOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle}>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <label
              htmlFor='fileInput'
              style={{
                ...fileInputLabelStyle,
                ...(isDragging ? draggingStyle : {}), // Apply drag style only to label
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div style={filePreviewContainerStyle}>
                  {uploadedFile.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt='Uploaded Preview'
                      style={previewImageStyle}
                    />
                  ) : (
                    <video controls style={previewImageStyle}>
                      <source src={URL.createObjectURL(uploadedFile)} />
                    </video>
                  )}
                  <button onClick={deleteUploadedFile} style={deleteButtonStyle}>
                    X
                  </button>
                </div>
              ) : (
                <p>Drag & drop files here or click to upload</p>
              )}
            </label>
            <button onClick={() => setIsPopupOpen(false)} style={closeButtonStyle}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Styles
const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const popupContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
};

const fileInputLabelStyle = {
  display: 'block',
  padding: '40px',
  border: '2px dashed #ddd',
  cursor: 'pointer',
  marginBottom: '20px',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
};

const draggingStyle = {
  borderColor: '#88D8F9', // Visual feedback while dragging
  backgroundColor: '#f0faff', // Light blue background for better feedback
};

const previewImageStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '10px',
};

const filePreviewContainerStyle = {
  position: 'relative',
};

const deleteButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
};

const closeButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#88D8F9',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
};

// Your Existing Styles
const postBoxWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '5px 4px 16px 0px #0000001C',
  marginBottom: '20px',
  gap: '16px',
};

const postBoxProfilePicStyle = {
  width: '90px',
  height: '94px',
  borderRadius: '12px',
  border: '0.5px solid #313131',
};

const postBoxContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
};

const postBoxInputStyle = {
  width: '100%',
  padding: '14px 24px',
  fontSize: '12px',
  lineHeight: '13.2px',
  border: '1px solid #ddd',
  borderRadius: '200px',
  backgroundColor: '#f2f2f2',
  color: '#313131',
};

const postBoxButtonsWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const postBoxButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#313131',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16.8px',
  letterSpacing: '2%',
  backgroundColor: 'transparent',
};

const postBoxInputWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const postBoxSubmitStyle = {
  backgroundColor: '#88D8F9',
  borderRadius: '40px',
  padding: '12px 18px',
  border: 'none',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#fff',
  cursor: 'pointer',
};

export default PostBox;