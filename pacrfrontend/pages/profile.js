import Head from 'next/head';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import "../app/globals.css";
import { useUser } from '../context/UserContext';
import PostBox from '@/components/PostBox';
import ResearchPost from '../components/ResearchPost';
import Post from '../components/Post';
import ProfileAbout from '../components/ProfileComponents/ProfileAbout';
import ProfileExperience from '../components/ProfileComponents/ProfileExperience';
import ProfileEducation from '../components/ProfileComponents/ProfileEducation';
import ProfilePublications from '../components/ProfileComponents/ProfilePublications';
import ProfileCertifications from '../components/ProfileComponents/ProfileCertifications';
import EditIntroModal from '../components/ProfileComponents/EditIntroModal';
import Footer from '../components/Footer';
import ReactModal from 'react-modal';
import Postcopy from '@/components/Post copy';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to handle active tab
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'profile' or 'cover'
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditIntroModalOpen, setIsEditIntroModalOpen] = useState(false); // New state for the "Edit Intro" modal
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    headline: user?.headline || '',
    location: user?.location || '',
    contact: user?.contact || { phone: '', email: '', website: '' },
  });
  const [uploadedImage, setUploadedImage] = useState({
    profile: 'dummy-man.png',
    cover: '/Monitor Image.png',
  });
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  // Functions to handle Intro Modal
  const openIntroModal = () => setIsIntroModalOpen(true);
  const closeIntroModal = () => setIsIntroModalOpen(false);

  // Open Modal (Edit or Preview)
  const openModal = (type, preview = false) => {
    setModalType(type);
    setIsPreviewMode(preview);
    setIsModalOpen(true);
    if (preview) {
      setPreviewImage(uploadedImage[type]); // Show uploaded image in preview mode
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
    setIsPreviewMode(false);
  };

  // Open Delete Confirmation Modal
  const openDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  // Close Delete Confirmation Modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  // Handle Delete Image
  const handleDeleteImage = () => {
    setUploadedImage({
      ...uploadedImage,
      [modalType]: null, // Remove image
    });
    setPreviewImage(null); // Clear preview
    closeDeleteConfirmation(); // Close confirmation popup
    //closeModal();
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the file object
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // For local preview
      setUploadedImageFile(file); // Store the file object for uploading
    }
  };

  // Save Uploaded Image
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
          // Fetch the updated user data
          const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const updatedUser = await userResponse.json();
            setUserAndToken(updatedUser, token); // Update the context with new user data
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


  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div style={leftColumnStyle}>
            {/* Profile Tab Content */}
            <ProfileAbout />
            <ProfileExperience />
            <ProfileEducation />
            <ProfilePublications />
            <ProfileCertifications />
          </div>
        );
      case 'About':
        return <div>About Content</div>;
      case 'Research':
        return <div>Research Content</div>;
      case 'Network':
        return <div>Network Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Modal */}
      {isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: styles.modalOverlay,
            content: styles.modalContent,
          }}
        >
          {/* Cross Icon */}
          <button style={styles.closeButton} onClick={closeModal}>
            ×
          </button>

          {isPreviewMode ? (
            <>
              {/* Heading for Profile Photo Preview */}
              {modalType === 'profile' && <h2 style={styles.modalHeading}>Profile Photo</h2>}

              {/* Preview Image */}
              <img
                src={previewImage}
                alt="Preview"
                style={modalType === 'profile' ? styles.profileImagePreview : styles.coverImagePreview}
              />
            </>
          ) : (
            <>
              {/* Edit Modal Heading */}
              <h2 style={styles.modalHeading}>Edit {modalType === 'profile' ? 'Profile' : 'Cover'} Image</h2>

              {/* Current Image Preview */}
              {previewImage || uploadedImage[modalType] ? (
                <img
                  src={previewImage || uploadedImage[modalType]}
                  alt="Edit Preview"
                  style={modalType === 'profile' ? styles.profileEditPreview : styles.coverEditPreview}
                />
              ) : (
                <p style={styles.addPhotoPlaceholder}>Add Photo Here</p>
              )}

              {/* Buttons*/}
              <div style={styles.modalActions}>
                {/* Delete Button */}
                <button
                  style={styles.deleteButton}
                  onClick={() => setDeleteConfirmationOpen(true)} // Open confirmation popup
                >
                  Delete
                </button>
                <div style={styles.modalActionsInner}>
                  <div style={styles.choosePhotoButton}>
                    Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      style={styles.fileInput}
                      onChange={handleImageUpload}
                    />
                  </div>
                  <button style={styles.saveButton} onClick={saveImage}>
                    Save
                  </button>
                </div>
              </div>

            </>
          )}
        </ReactModal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <ReactModal
          isOpen={isDeleteConfirmationOpen}
          onRequestClose={closeDeleteConfirmation}
          style={{
            overlay: styles.modalOverlay,
            content: styles.modalDeleteContent,
          }}
        >
          {/* Cross Button */}
          <button style={styles.closeButton} onClick={closeDeleteConfirmation}>
            ×
          </button>
          {/* Modal Content */}
          <h2 style={styles.deleteModalHeading}>
            Delete {modalType === 'profile' ? 'Profile' : 'Cover'} Photo?
          </h2>
          <p>
            {modalType === 'profile'
              ? 'Are you sure? Having a profile picture helps others recognize you.'
              : 'Delete photo? A background image is a great way to help your profile stand out.'}
          </p>
          {/* Buttons */}
          <div style={styles.modalDeleteActions}>
            <button style={styles.cancelButton} onClick={closeDeleteConfirmation}>
              Cancel
            </button>
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

      {/* Profile Main Content */}
      <div style={profilePageStyle}>
        {/* Header Section with Background Image */}
        <div style={headerStyle}>
          {/* <img src="/Monitor Image.png" alt="Profile Background" style={backgroundImageStyle} />
          <div style={coverEditImageWrap}>
            <img src='Cover Edit Icon.svg' alt='Edit Icon' style={coverEditImage} /> */}
          <img
            src={uploadedImage.cover}
            alt="Cover"
            style={backgroundImageStyle}
            onClick={() => openModal('cover', true)} // Open Preview Modal
          />
          <div style={coverEditImageWrap} onClick={() => openModal('cover')}>
            <img src='Cover Edit Icon.svg' alt='Edit Icon' />
          </div>
        </div>

        {/* User Information */}
        <div style={profileMainWrapper}>
          <div style={profileInfoWrapperStyle}>
            <div style={profilePicMainWrap}>
              <div style={userImageWrapperStyle}>
                {/* <img src={user ? user.profile_picture : 'dummy-man.png'} alt="Profile" style={profileImageStyle} /> */}
                <img
                  src={uploadedImage.profile}
                  alt="Profile"
                  style={profileImageStyle}
                  onClick={() => openModal('profile', true)} // Open Preview Modal
                />
                <div style={profileEditImageWrap} onClick={() => openModal('profile')}>
                  <img src="Profile Editable Icon.svg" alt="Edit Icon" />
                </div>
              </div>
              <div style={introEditIconWrap}>
                <img src='Edit Icon.svg' alt='Edit Icon' style={introEditIcon} onClick={openEditIntroModal} />
              </div>
            </div>
            <div style={userInfoStyle}>
              {/* <h1 style={userNameHeading}>{user ? user.first_name + ' ' + user.last_name : "why"}</h1> */}
              <h1 style={userNameHeading}>{user?.first_name + ' ' + user?.last_name || 'Your Name'}</h1>
              {/* <h1 style={userNameHeading}>{`${formData.firstName} ${formData.lastName}`}</h1> */}
              <p style={userProfileTagline}>{formData.headline || 'Your headline or tagline goes here.'}</p>
            </div>
          </div>

          <EditIntroModal
            isOpen={isEditIntroModalOpen}
            onClose={closeEditIntroModal}
            user={user}
            onSave={handleSave}
          />

          {/* User Location Information */}
          <div style={locationWrapperStyle}>
            <p style={userLocationStyle}>{formData.location || 'Add your location here'}</p>
            <div style={dotWrapperStyle}></div>
            <div style={userContactWrapStyle}>
              {!(formData.contact.showPhone || formData.contact.showEmail || formData.contact.showWebsite) ? (
                <p style={{ fontSize: '14px', color: '#939393' }}>
                  Your contact details will be shown here.
                </p>
              ) : (
                <>
                  {formData.contact.showPhone && (
                    <a
                      href={`tel:${formData.contact.phone}`}
                      style={{ position: 'relative', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <img
                        src="Profile Phone Icon.svg"
                        alt="Phone Icon"
                        onMouseEnter={() => setTooltip({ type: 'phone', visible: true })}
                        onMouseLeave={() => setTooltip({ type: '', visible: false })}
                      />
                      {tooltip.visible && tooltip.type === 'phone' && (
                        <div style={tooltipStyles}>{formData.contact.phone}</div>
                      )}
                    </a>
                  )}
                  {formData.contact.showEmail && (
                    <a
                      href={`mailto:${formData.contact.email}`}
                      style={{ position: 'relative', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <img
                        src="Profile Message Icon.svg"
                        alt="Email Icon"
                        onMouseEnter={() => setTooltip({ type: 'email', visible: true })}
                        onMouseLeave={() => setTooltip({ type: '', visible: false })}
                      />
                      {tooltip.visible && tooltip.type === 'email' && (
                        <div style={tooltipStyles}>{formData.contact.email}</div>
                      )}
                    </a>
                  )}
                  {formData.contact.showWebsite && (
                    <a
                      href={formData.contact.website.startsWith('http') ? formData.contact.website : `https://${formData.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ position: 'relative', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <img
                        src="Profile Globe Icon.svg"
                        alt="Website Icon"
                        onMouseEnter={() => setTooltip({ type: 'website', visible: true })}
                        onMouseLeave={() => setTooltip({ type: '', visible: false })}
                      />
                      {tooltip.visible && tooltip.type === 'website' && (
                        <div style={tooltipStyles}>{formData.contact.website}</div>
                      )}
                    </a>
                  )}
                </>
              )}
            </div>
          </div>



          {/* Stats Section */}
          <div style={mainStatsWrapperStyle}>
            <div style={mainInnerWrapperStyle}>
              <div style={statsWrapperStyle}>
                <p style={followersTextStyle}><span style={statsBoldStyle}>2,478</span> Followers</p>
                <div style={greyDotWrapperStyle}></div>
                <p style={followersTextStyle}><span style={statsBoldStyle}>1,298</span> Friends</p>
              </div>
              <div style={statsWrapperStyle}>
                <p style={statsTextStyle}>Total Reads: <span style={analyticsBoldStyle}>27,432</span></p>
                <div style={blueDotWrapperStyle}></div>
                <p style={statsTextStyle}>H-index: <span style={analyticsBoldStyle}>4.0</span></p>
                <div style={blueDotWrapperStyle}></div>
                <p style={statsTextStyle}>PACR Score: <span style={analyticsBoldStyle}>78.2</span></p>
                <div style={blueDotWrapperStyle}></div>
                <p style={statsTextStyle}>Citations: <span style={analyticsBoldStyle}>32</span></p>
              </div>
            </div>
            <a href='#' style={analyticsButtonStyle}><img src='Analytics Icon.svg' alt='Analytics Icon' /> Analytics</a>
          </div>

          {/* Horizontal Divider */}
          <div style={dividerWrapperStyle}></div>

          {/* Tabs Section */}
          <div style={tabsWrapperStyle}>
            <div style={activeTab === 'Profile' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Profile')}>Profile</div>
            <div style={activeTab === 'About' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('About')}>Statistics</div>
            <div style={activeTab === 'Research' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Research')}>Research</div>
            <div style={activeTab === 'Network' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Network')}>Network</div>
          </div>

          {/* Tab Content */}
          <div style={contentWrapperStyle}>
            {renderTabContent()}

            {/* Right Column (This is where the posting box will appear in the Profile tab) */}
            <div style={rightColumnStyle}>
              <PostBox />
              <Post />
              {/* <div>
                {posts.map((post) => (
                  <Postcopy key={post.id} post={post} token={token} onPostUpdate={fetchPosts} />
                ))}
              </div> */}
              <ResearchPost />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


// Add CSS Styles
const profilePageStyle = {
  width: '100%',
  backgroundColor: '#fff',
  paddingBottom: '80px',
};

const profileMainWrapper = {
  width: '100%',
  maxWidth: '1320px',
  display: 'block',
  margin: '0 auto',
};

const headerStyle = {
  width: '100%',
  height: '100%',
  maxHeight: '32.75rem',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
};

const backgroundImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '0 0 24px 24px',
};

const profileInfoWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '0 0 24px',
  marginTop: '-8.25rem',
};

const profilePicMainWrap = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  width: '100%',
};

const userImageWrapperStyle = {
  padding: '10px',
  borderRadius: '16px',
  backgroundColor: '#fff',
  position: 'relative',
};

const profileImageStyle = {
  width: '220px',
  height: '230px',
  borderRadius: '12px',
  objectFit: 'cover',

};

const userNameHeading = {
  fontSize: '48px',
  lineHeight: '48px',
  letterSpacing: '-4%',
  fontWeight: '500',
  marginBottom: '12px',
};

const userProfileTagline = {
  fontSize: '16px',
  lineHeight: '22.4px',
  fontWeight: '400',
  color: '#000000',
};

const userInfoStyle = {
  maxWidth: '48rem',
};

const locationWrapperStyle = {
  display: 'flex',
  justifyContent: 'left',
  gap: '16px',
  alignItems: 'center',
};

const userLocationStyle = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16px',
  color: '#939393',
};

const userContactWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const dotWrapperStyle = {
  width: '4px',
  height: '4px',
  backgroundColor: '#313131',
  borderRadius: '50%',
};

const greyDotWrapperStyle = {
  width: '4px',
  height: '4px',
  backgroundColor: '#939393',
  borderRadius: '50%',
};

const blueDotWrapperStyle = {
  width: '4px',
  height: '4px',
  backgroundColor: '#36c8f4',
  borderRadius: '50%',
};

const mainStatsWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '24px',
};

const statsWrapperStyle = {
  display: 'flex',
  justifyContent: 'left',
  gap: '16px',
  alignItems: 'center',
};

const statsTextStyle = {
  fontSize: '12px',
  lineHeight: '14.84px',
  fontWeight: '400',
  textTransform: 'uppercase',
  color: '#313131',
};

const statsBoldStyle = {
  fontWeight: '600',
};

const analyticsBoldStyle = {
  color: '#36C8F4',
  fontWeight: '600',
};

const followersTextStyle = {
  fontSize: '12px',
  lineHeight: '14.84px',
  fontWeight: '400',
  textTransform: 'uppercase',
  color: '#939393',
};

const mainInnerWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '12px',
};

const analyticsButtonStyle = {
  backgroundColor: '#70d4fc',
  borderRadius: '200px',
  padding: '16px 40px',
  fontSize: '16px',
  lineHeight: '18px',
  letterSpacing: '2%',
  fontWeight: '500',
  textDecoration: 'none',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const dividerWrapperStyle = {
  width: '100%',
  height: '0.5px',
  backgroundColor: '#36C8F4',
  margin: '46px 0 36px',
};

const tabsWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  columnGap: '146px',
  padding: '10px 0',
};

const tabStyle = {
  cursor: 'pointer',
  padding: '0 20px 10px',
  fontWeight: '400',
  color: '#313131',
  fontSize: '16px',
  lineHeight: '22.4px',
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: '2px solid #70D4FC',
  color: '#36c8f4',
  fontWeight: '600',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
};

const contentWrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr',
  gridTemplateRows: '1fr',
  gridColumnGap: '20px',
  gridRowGap: '20px',
  marginTop: '40px',
};

const leftColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
};

const rightColumnStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const photoGalleryStyle = {
  marginTop: '20px',
};

const photosWrapper = {
  display: 'flex',
};

const photoStyle = {
  width: '100px',
  height: '100px',
  marginRight: '10px',
  borderRadius: '8px',
  objectFit: 'cover',
};

const featuredPostStyle = {
  padding: '15px',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
};

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

const coverEditImageWrap = {
  width: '100%',
  maxWidth: '1320px',
  position: 'absolute',
  bottom: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const coverEditImage = {
  width: 'auto',
};

const profileEditImageWrap = {
  position: 'absolute',
  right: '20px',
  bottom: '20px',
  display: 'flex',
};

const introEditIconWrap = {
  width: 'auto',
  cursor: 'pointer',
};

const introEditIcon = {
  width: '26px',
};

const tooltipStyles = {
  position: 'absolute',
  top: '-34px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#70D4FC',
  color: '#fff',
  padding: '6px 8px',
  borderRadius: '4px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  zIndex: 10,
};

const styles = {
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999',
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

export default Profile;