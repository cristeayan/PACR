import router from 'next/router';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const { user } = useUser();
  
  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarInner}>
      
      <div style={styles.profileCard}>
        <img style={styles.profileCoverImage} src='/Placeholder Cover.png' alt='Profile Cover' />
        <img style={styles.profileImage} src={user? "http://127.0.0.1:8000"+user.profile_picture:'/dummy-man.png'} alt='Profile Pic' onClick={()=>{router.push('/profile')}} />
        <div style={styles.profileContentWrap}>
        <div style={styles.profileName} onClick={()=>{router.push('/profile')}}>{user? user.first_name+' '+user.last_name:null}</div>
        <div style={styles.profileInfo}>
          Post Doctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education
         </div>
         </div>
      </div>
      <div style={styles.statsCard}>
        <div style={styles.statsTitle}>Your Research Statistics</div>
        <div style={styles.statsItem}>H-Index: 4.0</div>
        <div style={styles.statsItem}>PACR Score: 78.2</div>
        <div style={styles.statsItem}>Total Reads: 27,432</div>
        <div style={styles.statsItem}>Total Citations: 32</div>
      </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    height: '100%',
  },
  sidebarInner: {
    overflowY: 'auto',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '5px 4px 16px 0px #0000001C',
    maxHeight: '60rem',
    height: '100%',
  },
  profileCard: {
    marginBottom: '20px',
    border: '0.5px solid #313131',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '16px',
  },
  profileCoverImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginTop: '-72px',
    backgroundColor: '#fff',
  },
  profileContentWrap: {
    padding: '0 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  profileName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#313131',
    cursor: 'pointer',
  },
  profileInfo: {
    fontSize: '0.875rem',
    color: '#313131',
    textAlign: 'center',
    lineHeight: '20px',
  },
  statsCard: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  statsTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  statsItem: {
    marginBottom: '5px',
    color: '#555',
  },
};
export default Sidebar;
