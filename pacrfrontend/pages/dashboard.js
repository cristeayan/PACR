import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Recommendations from '../components/Recommendations';
import Post from '../components/Post'; // Import Post component
import { UserProvider } from '@/context/UserContext';
import "../app/globals.css";


const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <UserProvider> */}
        <Header />
        <main style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
          <Sidebar />
          
          {/* You can directly render the Post component here */}
          <div style={{ flex: 1, padding: '20px' }}>
            <Post /> {/* Rendering a single Post */}
          </div>
          
          <Recommendations />
        </main>
      {/* </UserProvider> */}
    </div>
  );
}

export default Dashboard;
