const styles = {
  sidebar: {
    flex: '0 0 250px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100vh',
    overflowY: 'auto',
  },
  profileCard: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  profileName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  profileInfo: {
    fontSize: '0.9rem',
    marginBottom: '10px',
    color: '#555',
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
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside style={styles.sidebar}>
      <div style={styles.profileCard}>
        {/* Check if user exists before trying to access profile_picture */}
        {user ? (
          <>
            <img
              style={styles.profileImage}
              src={`http://127.0.0.1:8000${user.profile_picture}`}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <div style={styles.profileName}>{`${user.first_name} ${user.last_name}`}</div>
            <div style={styles.profileInfo}>
              {/* Update with actual user info or hardcoded data */}
              Post Doctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University<br />
              MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education
            </div>
          </>
        ) : (
          <div style={styles.profileInfo}>Loading user information...</div>
        )}
      </div>
      <div style={styles.statsCard}>
        <div style={styles.statsTitle}>Your Research Statistics</div>
        <div style={styles.statsItem}>H-Index: 4.0</div>
        <div style={styles.statsItem}>PACR Score: 78.2</div>
        <div style={styles.statsItem}>Total Reads: 27,432</div>
        <div style={styles.statsItem}>Total Citations: 32</div>
      </div>
    </aside>
  );
}

export default Sidebar;
