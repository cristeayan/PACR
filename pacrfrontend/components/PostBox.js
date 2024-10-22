import { useUser } from '../context/UserContext';
import React, { useState } from 'react';
import axios from 'axios';


const PostBox = () => {
  const { user } = useUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropped, setIsDropped] = useState(false); // Add state to track if files are dropped
  const [isNextClicked, setIsNextClicked] = useState(false); // Track when "Next" is clicked
  const [postContent, setPostContent] = useState(''); // For managing input text

  // Handle file drop or file input change
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || event.dataTransfer.files);
    if (files.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
      setIsDropped(true); // Files are dropped, so we hide the drag overlay
    }
    setIsDragging(false); // Stop drag effect once files are uploaded
  };

  // Drag event handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileUpload(event);
  };

  const handleNextClick = () => {
    setIsNextClicked(true); // Set "Next" clicked state to true
  };

  const handlePostSubmit = () => {
    const token = localStorage.getItem('token')
    if (token) {
      if (postContent.trim()) {
        // Submit the post content here
        try {
          axios.post(`http://127.0.0.1:8000/api/posts/`, {"content":postContent},
             {headers: {
              'Authorization': `Bearer ${token}`}});
              alert("posted")

        } catch (error) {
          alert(error.message);
        }
        setPostContent(''); // Clear the input after submission
      }
    }
  };

  return (
    <>
      {/* PostBox UI */}
      <div style={postBoxWrapperStyle}>
        <div style={postBoxContentStyle}>
          <div style={postBoxInputWrapStyle}>
            <img
              src={user ? 'http://127.0.0.1:8000' + user.profile_picture : '/dummy-man.png'}
              alt='Profile'
              style={postBoxProfilePicStyle}
            />
            <div style={inputContainerStyle}>
              <input
                type='text'
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder='Let the world know what you want to say...'
                style={postBoxInputStyle}
              />
              {postContent.trim() && (
                <button style={submitButtonInsideInputStyle} onClick={handlePostSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>
          <div style={postBoxButtonsWrapperStyle}>
            <button style={postBoxButtonStyle} onClick={() => setIsPopupOpen(true)}>
              <img src='Upload Photo Icon.png' alt='Photo/Video' /> Media
            </button>
            <button style={postBoxButtonStyle}>
              <img src='Share Event Icon.png' alt='Share Event' /> Event
            </button>
            <button style={postBoxButtonStyle}>
              <img src='Upload Research Icon.png' alt='Upload Research' /> Upload Research
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Media Upload */}
      {isPopupOpen && (
        <div style={popupOverlayStyle}>
          <div
            style={popupContentStyle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Close Icon */}
            <button onClick={() => setIsPopupOpen(false)} style={closeIconStyle}>
              &times;
            </button>

            {/* Dragging Overlay (visible during drag, hidden when files are dropped) */}
            {isDragging && !isDropped && (
              <div style={dragOverlayStyle}>
                <p style={dragOverlayTextStyle}>Drop your files here</p>
              </div>
            )}

            {/* Centered Content (shown when no files are uploaded) */}
            {!uploadedFiles.length && !isDragging && (
              <div style={centeredContentStyle}>
                <img src='/Modal Image.svg' alt='Placeholder' style={modalImageStyle} />

                <h2 style={modalHeadingStyle}>Select files to begin</h2>
                <p style={modalSubHeadingStyle}> Share images or a single video in your post.</p>

                {/* Upload Button */}
                <input
                  type='file'
                  id='fileInput'
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  multiple
                />
                <label htmlFor='fileInput' style={uploadButtonStyle}>
                  Upload from computer
                </label>
              </div>
            )}

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && !isNextClicked && (
              <>
                <div style={filePreviewContainerStyle}>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} style={mediaGridItemStyle}>
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt='Uploaded Preview'
                          style={previewImageStyle}
                        />
                      ) : (
                        <video controls style={previewImageStyle}>
                          <source src={URL.createObjectURL(file)} />
                        </video>
                      )}
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                <button style={nextButtonStyle} onClick={handleNextClick}>
                  Next
                </button>
              </>
            )}

            {/* Show Post Button after "Next" is clicked */}
            {isNextClicked && (
              <div style={finalPostBoxStyle}>
                {/* Display uploaded files in grid like LinkedIn */}
                <div style={uploadedMediaGridStyle}>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} style={mediaGridItemStyle}>
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt='Final Preview'
                          style={finalPreviewImageStyle}
                        />
                      ) : (
                        <video controls style={finalPreviewImageStyle}>
                          <source src={URL.createObjectURL(file)} />
                        </video>
                      )}
                    </div>
                  ))}
                </div>

                {/* Post Button */}
                <button style={postButtonStyle}>
                  Post
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Styles
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
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#fff',
};

const postBoxContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '24px',
};

const postBoxInputWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const inputContainerStyle = {
  position: 'relative',
  width: '100%',
};

const postBoxInputStyle = {
  width: '100%',
  padding: '10px 16px',
  fontSize: '14px',
  lineHeight: '18px',
  border: '1px solid #ddd',
  borderRadius: '200px',
  backgroundColor: '#fff',
  color: '#313131',
  height: '48px',
  paddingRight: '70px', // Ensure space for submit button
};

const submitButtonInsideInputStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#88D8F9',
  border: 'none',
  borderRadius: '200px',
  padding: '8px 16px',
  color: '#fff',
  cursor: 'pointer',
};

const postBoxButtonsWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-around',
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

const dragOverlayStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(240, 250, 255, 0.85)',
  border: '2px dashed #88D8F9',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '10',
};

const dragOverlayTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0073b1',
};

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
  padding: '40px',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '1120px',
  height: '100%',
  maxHeight: '860px',
  position: 'relative',
  textAlign: 'center',
  boxSizing: 'border-box',
};

const closeIconStyle = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

const centeredContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const modalImageStyle = {
  width: 'auto',
  height: 'auto',
  marginBottom: '20px',
};

const modalHeadingStyle = {
  marginBottom: '10px',
  fontSize: '24px',
};

const modalSubHeadingStyle = {
  marginBottom: '24px',
  fontSize: '16px',
  color: '#313131',
};

const uploadButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#70D4FC',
  color: '#fff',
  border: 'none',
  borderRadius: '200px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
};

const filePreviewContainerStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const previewImageStyle = {
  maxWidth: '100%',
  maxHeight: '150px',
};

const nextButtonStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: '#88D8F9',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
};

const finalPostBoxStyle = {
  marginTop: '20px',
};

const uploadedMediaGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginBottom: '20px',
};

const mediaGridItemStyle = {
  maxWidth: '100%',
};

const finalPreviewImageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

const postButtonStyle = {
  padding: '12px 20px',
  backgroundColor: '#0073b1',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default PostBox;
