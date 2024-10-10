import Head from 'next/head';
import Header from '../components/Header';
import { UserProvider } from '@/context/UserContext';
import { useState } from 'react';
import "../app/globals.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to handle active tab

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div style={leftColumnStyle}>
            {/* Profile Tab Content */}
            <div style={postStyle}>
              <p>Just navigating my way through this world of research...</p>
              <p>Work: Beth Israel Deaconess Medical Center</p>
              <p>Joined: August 1st, 2022</p>
            </div>
            <div style={photoGalleryStyle}>
              <h3>Photos</h3>
              <div style={photosWrapper}>
                <img src="/path-to-photo1.jpg" alt="Photo1" style={photoStyle} />
                <img src="/path-to-photo2.jpg" alt="Photo2" style={photoStyle} />
                <img src="/path-to-photo3.jpg" alt="Photo3" style={photoStyle} />
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

      <UserProvider>
        {/* Header */}
        <Header />

        {/* Profile Main Content */}
        <div style={profilePageStyle}>
          {/* Header Section with Background Image */}
          <div style={headerStyle}>
            <img src="/Placeholder Cover Image.jpg" alt="Profile Background" style={backgroundImageStyle} />
          </div>

          {/* User Information */}
          <div style={profileMainWrapper}>
          <div style={profileInfoWrapperStyle}>
            <div style={userImageWrapperStyle}>
              <img src="/Placeholder Profile Pic.png" alt="Profile" style={profileImageStyle} />
            </div>
            <div style={userInfoStyle}>
              <h1 style={userNameHeading}>Dr. Matthew Antony Manoj</h1>
              <p style={userProfileTagline}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University | MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education</p>
              <p>Boston, MA | Total Reads: 27,432 | Citations: 32</p>
            </div>
          </div>

          {/* Stats Section */}
          <div style={statsWrapperStyle}>
            <p>Total Reads: 27,432 | H-index: 4.0 | PACR Score: 78.2 | Citations: 32</p>
          </div>

          {/* Tabs Section */}
          <div style={tabsWrapperStyle}>
            <div style={activeTab === 'Profile' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Profile')}>Profile</div>
            <div style={activeTab === 'About' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('About')}>About</div>
            <div style={activeTab === 'Research' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Research')}>Research</div>
            <div style={activeTab === 'Network' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Network')}>Network</div>
          </div>

          {/* Tab Content */}
          <div style={contentWrapperStyle}>
            {renderTabContent()}

            {/* Featured Section (Right Column) */}
            <div style={rightColumnStyle}>
              <div style={featuredPostStyle}>
                <h3>Featured</h3>
                <p>Excited to share that I will be joining the research at Harvard...</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </UserProvider>
    </div>
  );
};

// Add CSS Styles
const profilePageStyle = {
  width: '100%',
  backgroundColor: '#fff',
};

const profileMainWrapper = {
  width: '100%',
  maxWidth: '1320px',
  display: 'block',
  margin: '0 auto',
};

const headerStyle = {
  width: '100%',
  height: '524px',
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

const statsWrapperStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  textAlign: 'center',
};

const tabsWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px 0',
  borderBottom: '1px solid #ccc',
};

const tabStyle = {
  cursor: 'pointer',
  padding: '10px 20px',
  fontWeight: 'bold',
  color: '#333',
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: '2px solid blue',
};

const contentWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
};

const leftColumnStyle = {
  width: '60%',
};

const rightColumnStyle = {
  width: '35%',
};

const postStyle = {
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
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

export default Profile;
