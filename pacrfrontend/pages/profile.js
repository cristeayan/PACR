import Head from 'next/head';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import "../app/globals.css";
import { useUser } from '../context/UserContext';
import PostBox from '@/components/PostBox';
import ResearchPost from '../components/ResearchPost';
import Post from '../components/Post';
import Footer from '../components/Footer';
import ReactModal from 'react-modal';
import Postcopy from '@/components/Post copy';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to handle active tab
  const { user ,token , setUserAndToken } =   useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'profile' or 'cover'
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({
    profile: 'dummy-man.png',
    cover: '/Monitor Image.png',
  });
  const [uploadedImageFile, setUploadedImageFile] = useState(null);


  useEffect(() => {
    if (user) {
      setUploadedImage({
        profile: user.profile_picture || 'dummy-man.png',
        cover: user.cover_picture || '/Monitor Image.png',
      });
    }
  }, [user]);

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Open Modal (Edit or Preview)
  const openModal = (type, preview = false) => {
    setModalType(type); // Ensure `modalType` is correctly set
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
            <div style={postStyle}>
              <h2 style={aboutHeading}>About</h2>
              <p style={aboutText}>Passionate about transcending boundaries and igniting imaginations, I've embraced the digital canvas for my artistic journey. Specializing in graphic design, UX design, digital art, and architecture, my work aims to create meaningful experiences and evoke emotions, blending beauty with functionality.</p>
              <p style={seeMoreText}>...See More</p>
              <div style={horizontalDivider}></div>
              <div style={aboutDetailStyle}>
                <div style={aboutInnerWrap}>
                  <span style={aboutWorkplaceLabel}>Department</span>
                  <span style={aboutDetailText}>:</span>
                  <span style={aboutDetailText}>Gastroenterology</span>
                </div>
                <div style={aboutInnerWrap}>
                  <span style={aboutWorkplaceLabel}>Industry</span>
                  <span style={aboutDetailText}>:</span>
                  <span style={aboutDetailText}>Medical</span>
                </div>
                <div style={aboutInnerWrap}>
                  <span style={aboutWorkplaceLabel}>Workplace</span>
                  <span style={aboutDetailText}>:</span>
                  <span style={aboutDetailText}>Beth Israel</span>
                </div>
              </div>
              <div style={horizontalDivider}></div>
              <div style={aboutDetailStyle}>
                <div style={aboutDetailwrap}>
                  <img src='Profile Work Icon.svg'></img>
                  <p style={aboutDetailText}>Works at Beth Israel Deaconess Medical Center</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Postdoc Icon.svg'></img>
                  <p style={aboutDetailText}>Postdoc Research Fellow</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Studied Icon.svg'></img>
                  <p style={aboutDetailText}>Studied at Kasturba Medical College, Mangalore</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Lives Icon.svg'></img>
                  <p style={aboutDetailText}>Lives in Boston, MA</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Joined Icon.svg'></img>
                  <p style={aboutDetailText}>Joined on August 1st, 2022</p>
                </div>
              </div>
            </div>

            <div style={experienceContainer}>
              <h2 style={experienceHeading}>Experience</h2>

              <div style={experienceInnerWrap}>
                {/* Experience Item 1 */}
                <div style={experienceItem}>
                  <img src="firebase_icon.png" alt="Beth Israel Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Beth Israel Deaconess Medical Center</p>
                      <p style={experienceDetails}>Full Time · 8 Months</p>
                    </div>
                    <div>
                      <p style={experienceLocation}>Boston, Massachusetts, United States Of America</p>
                    </div>
                    <div style={experienceRoles}>
                      <div style={experienceInnerRoles}>
                        <div style={rolesWrap}>
                          <p style={roleTitle}>Clinical Observership</p>
                          <p style={roleDetails}>March 2024 - Present · 8 Months</p>
                        </div>
                        <div style={rolesWrap}>
                          <p style={roleTitle}>Postdoctoral Research Fellow</p>
                          <p style={roleDetails}>March 2024 - Present · 8 Months · On-Site</p>
                        </div>
                      </div>
                      <div style={rolesDescriptionWrap}>
                        <p style={roleDescription}>Postdoctoral Research Fellow - Department Of Gastroenterology</p>
                        <div style={experienceImages}>
                          <img src="experience_dummy_1.png" alt="Experience Image 1" style={experienceImage} />
                          <img src="experience_dummy_2.png" alt="Experience Image 2" style={experienceImage} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Item 2 */}
                <div style={experienceItem}>
                  <img src="postdoctoral_icon.png" alt="International Research Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Postdoctoral Research Fellow</p>
                      <p>International Research Initiative · <span style={experienceDetails}>Full Time</span></p>
                      <p style={experienceDetails}>March 2024 - Present · 8 Months</p>
                    </div>
                    <p style={experienceLocation}>Boston, Massachusetts, United States Of America · On-Site</p>
                    <p style={roleDescription}>PostDoctoral Research Fellow - Class Of 2025</p>
                  </div>
                </div>

                {/* Experience Item 3 */}
                <div style={experienceItem}>
                  <img src="hms_icon.png" alt="Harvard Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Postdoctoral Research Fellow</p>
                      <p>Harvard Medical School · <span style={experienceDetails}>Full Time</span></p>
                      <p style={experienceDetails}>March 2024 - Present · 8 Months</p>
                    </div>
                    <p style={experienceLocation}>Boston, Massachusetts, United States Of America · On-Site</p>
                    <p style={roleDescription}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard Medical School</p>
                  </div>
                </div>
              </div>

              <p style={seeMoreText}>...See More</p>
            </div>

            <div style={experienceContainer}>
              <h2 style={experienceHeading}>Education</h2>

              <div style={educationInnerWrap}>
                {/* Education Item 1 */}
                <div style={experienceItem}>
                  <img src="Kasturba.png" alt="Kasturba Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Kasturba Medical College, Mangalore</p>
                      <p style={roleTitle}>Bachelor of Medicine, Bachelor of Surgery - MBBS, Medicine</p>
                    </div>
                    <div>
                      <p style={experienceLocation}>2017 - 2022</p>
                    </div>
                  </div>
                </div>

                {/* Education Item 2 */}
                <div style={experienceItem}>
                  <img src="postdoctoral_icon.png" alt="International Research Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>KE English School</p>
                      <p style={roleTitle}>Higher Secondary Education</p>
                    </div>
                    <div>
                      <p style={experienceLocation}>2017 - 2022</p>
                    </div>
                  </div>
                </div>

                {/* Education Item 3 */}
                <div style={experienceItem}>
                  <img src="postdoctoral_icon.png" alt="International Research Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Gems Education</p>
                      <p style={roleTitle}>Middle School</p>
                    </div>
                    <div>
                      <p style={experienceLocation}>2010 - 2015</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={experienceContainer}>
              <h2 style={experienceHeading}>Publications</h2>

              <div style={publicationsInnerWrap}>
                {/* Publication Item 1 */}
                <div style={experienceItem}>
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Whole blood viscosity in type 2 diabetes mellitus and its association with the presence and severity of diabetic cochleopathy and other microangiopathie</p>
                      <p style={experienceLocation}>Porto Biomedical Journal · <span>8 Months</span></p>
                    </div>
                    <a href='#' style={publicationButton}>Show Publication<img src='Publication Arrow.svg' alt='Publication Arrow' /></a>
                    <div style={backgroundAimsWrap}>
                      <span style={aimsText}>Background/Aims:</span>
                      <span style={aimsText}>Although studies correlating idiopathic sensorineural hearing loss (SNHL) to whole blood viscosity (WBV) have been</span>
                      <span style={boldSeeMore}>...See More</span>
                    </div>
                    <div style={otherAuthorWrap}>
                      <span style={otherAuthor}>Other Authors</span>
                      <a href='#'><img src='Other_Authors.png' alt='Other Authors Image' /></a>
                    </div>
                  </div>
                </div>
                {/* Publication Item 2 */}
                <div style={horizontalDivider}></div>
                <div style={experienceItem}>
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Comparative Analysis of Supraglottic Airway vs. Infraglottic Airway in Endoscopic Retrograde Cholangiopancreatography: A Systematic Review and Meta-Analysis</p>
                      <p style={experienceLocation}>Gastroenterology and Hepatology From Bed to Bench Journal · <span>Oct 5, 2024</span></p>
                    </div>
                    <a href='#' style={publicationButton}>Show Publication<img src='Publication Arrow.svg' alt='Publication Arrow' /></a>
                    <div style={backgroundAimsWrap}>
                      <span style={aimsText}>Background/Aims:</span>
                      <span style={aimsText}>Although studies correlating idiopathic sensorineural hearing loss (SNHL) to whole blood viscosity (WBV) have been</span>
                      <span style={boldSeeMore}>...See More</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div style={experienceContainer}>
              <h2 style={experienceHeading}>Licenses / Certifications</h2>

              <div style={educationInnerWrap}>
                {/* Education Item 1 */}
                <div style={experienceItem}>
                  <img src="CITI.png" alt="CITI Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>CITI Certification</p>
                      <p style={experienceTitle}>CITI Program</p>
                      <p style={experienceLocation}>Issued Apr 2024</p>
                    </div>
                    <div>
                      <p style={experienceTitle}><span style={boldText}>Skills:</span> Human Subjects Research</p>
                    </div>
                  </div>
                </div>

                {/* Education Item 2 */}
                <div style={experienceItem}>
                  <img src="Avade.png" alt="Avade Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>AVADE Certificate</p>
                      <p style={experienceTitle}>AVADE® Training</p>
                      <p style={experienceLocation}>Issued Mar 2024</p>
                    </div>
                    <div>
                      <p style={experienceTitle}><span style={boldText}>Skills:</span> Human Subjects Research</p>
                    </div>
                  </div>
                </div>

                {/* Education Item 3 */}
                <div style={experienceItem}>
                  <img src="Asthma.png" alt="Asthma Logo" style={experienceIcon} />
                  <div style={experienceDetailWrap}>
                    <div style={experienceTitleWrap}>
                      <p style={experienceTitle}>Asthma, Allergy and COPD Forum</p>
                      <p style={experienceTitle}>Dubai Health Authority</p>
                      <p style={experienceLocation}>Issued Feb 2024</p>
                    </div>
                    <div>
                      <p style={experienceTitle}><span style={boldText}>Skills:</span> Human Subjects Research</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <button style={styles.deleteButton} onClick={() => deleteImage(modalType)}>
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
            <div style={userInfoStyle}>
              <h1 style={userNameHeading}>{user ? user.first_name + ' ' + user.last_name : "why"}</h1>
              <p style={userProfileTagline}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University | MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education</p>
            </div>
          </div>

          {/* User Location Information */}
          <div style={locationWrapperStyle}>
            <p style={userLocationStyle}>Boston, Massachusetts, United States</p>
            <div style={dotWrapperStyle}></div>
            <div style={userContactWrapStyle}>
              <img src='Profile Phone Icon.svg' alt='Phone Icon' />
              <img src='Profile Message Icon.svg' alt='Message Icon' />
              <img src='Profile Globe Icon.svg' alt='Globe Icon' />
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
              <Postcopy />
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
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16.8px',
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

const postStyle = {
  padding: '24px 18px 30px 28px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '5px 4px 16px 0px #0000001C',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const aboutHeading = {
  fontSize: '20px',
  color: '#313131',
  fontWeight: '600',
  lineHeight: '28px',
  letterSpacing: '-2%',
};

const aboutText = {
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: '400',
  color: '#313131',
};

const seeMoreText = {
  fontSize: '12px',
  lineHeight: '16.8px',
  fontWeight: '500',
  letterSpacing: '2%',
  color: '#4fcff5',
  textAlign: 'end',
};

const horizontalDivider = {
  backgroundColor: '#ADADAD',
  width: '100%',
  height: '1px',
};

const aboutDetailStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const aboutDetailwrap = {
  display: 'flex',
  flexDirection: 'row',
  gap: '14px',
  alignItems: 'center',
};

const aboutDetailText = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '26px',
  letterSpacing: '2%',
};

const aboutInnerWrap = {
  display: 'grid',
  gridTemplateColumns: '90px 10px auto',
  alignItems: 'center',
  gap: '24px',
};

const aboutWorkplaceLabel = {
  fontSize: '14px',
  lineHeight: '26px',
  fontWeight: '600',
  color: '#4FCFF5',
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

// Experience Box Styling

const experienceContainer = {
  padding: '24px 28px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '5px 4px 16px 0px #0000001C',
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
};

const experienceInnerWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
};

const educationInnerWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
};

const publicationsInnerWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const experienceDetailWrap = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
};

const experienceTitleWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const experienceHeading = {
  fontSize: '20px',
  color: '#313131',
  fontWeight: '600',
  lineHeight: '28px',
};

const experienceItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
};

const experienceIcon = {
  width: 'auto',
};

const experienceTitle = {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '18px',
  color: '#313131',
  textTransform: 'capitalize',
};

const experienceDetails = {
  color: '#ADADAD',
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '400',
  textTransform: 'capitalize',
};

const experienceLocation = {
  color: '#ADADAD',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: '400',
  textTransform: 'capitalize',
};

const experienceRoles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const experienceInnerRoles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const rolesWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const roleTitle = {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '18px',
  color: '#313131',
};

const roleDetails = {
  color: '#ADADAD',
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '400',
};

const rolesDescriptionWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const roleDescription = {
  fontSize: '16px',
  lineHeight: '18px',
  fontWeight: '400',
  color: '#313131',
};

const experienceImages = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const experienceImage = {
  width: 'auto',
  height: 'auto',
  borderRadius: '6px',
  objectFit: 'cover',
};

const publicationButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '14px 28px',
  border: '1px solid #313131',
  borderRadius: '200px',
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '400',
  color: '#313131',
  textDecoration: 'none',
};

const aimsText = {
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '300',
  color: '#313131',
};

const boldSeeMore = {
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: '500',
  color: '#313131',
  textAlign: 'end',
};

const otherAuthorWrap = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const otherAuthor = {
  fontSize: '12px',
  lineHeight: '14px',
  fontWeight: '500',
  color: '#313131',
};

const backgroundAimsWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const boldText = {
  fontWeight: '600',
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
    // maxWidth: modalType === 'profile' ? '400px' : '800px',
    width: '100%',
    maxWidth: '992px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
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
  addPhotoPlaceholder: {
    color: '#313131',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default Profile;