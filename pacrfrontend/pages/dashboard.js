import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Recommendations from '../components/Recommendations';
import Post from '../components/Post'; // Import Post component
import "../app/globals.css";
import PostBox from '@/components/PostBox';
import CreatePost from '@/components/CreatePost';
import DisplayPost from '@/components/DisplayPost';


const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Header />
        <div style={mainContainer}>
          <div style={mainInnerContainer}>
            <Sidebar />
            <main style={{ display: 'flex', flexDirection: 'column' }}>
              <PostBox/>
              {/* You can directly render the Post component here */}
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                <Post />
                <DisplayPost /> {/* Rendering a single Post */}
                <CreatePost/>
              </div>
            </main>
            <Recommendations />
          </div>
        </div>
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



export default Dashboard;
