import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Recommendations from '../components/Recommendations';
import Post from '../components/Post'; // Import Post component
import { UserProvider } from '@/context/UserContext';
import "../app/globals.css";


const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider>
        <Header />
        <div style={mainContainer}>
          <div style={mainInnerContainer}>
            <Sidebar />
            <main style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={postBoxWrapperStyle}>
                    <img src='/Placeholder Profile Pic.png' alt='Profile' style={postBoxProfilePicStyle} />
                    <div style={postBoxContentStyle}>
                      <input
                        type='text'
                        placeholder='Let the world know what you want to say...'
                        style={postBoxInputStyle}
                      />
                      <div style={postBoxButtonsWrapperStyle}>
                        <button style={postBoxButtonStyle}>
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
              {/* You can directly render the Post component here */}
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                <Post />
                <Post /> {/* Rendering a single Post */}
              </div>
            </main>
            <Recommendations />
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

const mainContainer = {
  width: '100%',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '130px',
};

const mainInnerContainer = {
  width: '100%',
  maxWidth: '1320px',
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr 0.5fr',
  gridTemplateRows: '1fr',
  gridColumnGap: '32px',
  gridRowGap: '20px',
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

export default Dashboard;
