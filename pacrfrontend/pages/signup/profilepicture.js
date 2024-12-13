'use client'

import "../../app/globals.css";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfilePictureUpload = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null); // Reference to file input element
  const router = useRouter();
  const [user,setUser]=useState(null)
  const [token,setToken]=useState(null)


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file)); // Generate a preview URL for dropped file
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Trigger file input on click
  const handleClick = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null); // Remove the preview when removing the picture
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      alert('Please select or drop a profile picture to upload.');
      return;
    }

    const data = new FormData();
    data.append('profile_picture', profilePicture);

    try {
      await axios.patch(`http://127.0.0.1:8000/api/users/${user.id}/`, data,
         {headers: {
          'Authorization': `Bearer ${token}`}});
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Show the world what beauty and brains look like</h1>
      <form onSubmit={handleSubmit} style={styles.formStyle}>
        <div
          style={isDragOver ? styles.dropZoneActive : styles.dropZone}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick} // Handle click to open file dialog
        >
          {profilePicturePreview ? (
            <img src={profilePicturePreview} alt="Profile Preview" style={styles.profilePicture} />
          ) : (
            <div style={styles.uploadPlaceholder}>
              <img src='/Profile Picture Placeholder.svg' style={styles.uploadPlaceholderImage} alt='Placeholder'></img>
              <p style={styles.uploadPlaceholderText}><span style={styles.spanUpload}>Upload</span> <br/> or <br/> Drop your files here.</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={styles.fileInput}
          ref={fileInputRef} // Use the ref to trigger the file input
        />
        <div style={styles.buttonGroup}>
          <button type="button" style={styles.cancelButton} onClick={handleRemovePicture}>Cancel</button>
          <button type="submit" style={styles.button}>Save</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '72px 20px',
    rowGap: '70px',
  },
  heading: {
    marginBottom: '8px',
    background: 'linear-gradient(125.75deg, #3DC8FF 11.75%, #90DBF9 63.07%, #FFFFFF 114%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '52px',
    fontWeight: '500',
    lineHeight: '57.2px',
    letterSpacing: '-0.03em',
    textAlign: 'center',
    maxWidth: '43.75rem',
  },
  dropZone: {
    width: '292px',
    height: '284px',
    border: '1px solid #313131',
    backgroundColor: '#f2f2f2',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '72px',
    cursor: 'pointer', // Make the drop zone clickable
  },
  dropZoneActive: {
    width: '292px',
    height: '284px',
    border: '1px solid #00bfff',
    backgroundColor: '#f0f8ff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '72px',
    cursor: 'pointer', // Keep clickable on active state
  },
  uploadPlaceholder: {
    color: '#aaa',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '44px',
  },
  uploadPlaceholderImage: {
    width: '48px',
    height: '48px',
  },
  profilePicture: {
    width: '280px',
    height: '268px',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  uploadPlaceholderText: {
    color: '#313131',
    fontSize: '16px',
    fontWeight: '400',
  },
  spanUpload: {
    color: '#00b8ff',
    fontWeight: '500',
  },
  fileInput: {
    display: 'none', // Hide the default file input
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  button: {
    padding: '16px 60px',
    backgroundColor: '#70d4fc',
    color: 'white',
    border: 'none',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
  },
  cancelButton: {
    padding: '16px 60px',
    backgroundColor: '#ffffff',
    color: '#313131',
    border: '1px solid #313131',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default ProfilePictureUpload;