const styles = {
  recommendations: {
    height: '100%',
  },
  recommendationsInner: {
    overflowY: 'auto',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '5px 4px 16px 0px #0000001C',
    maxHeight: '60rem',
    height: '100%',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  recommendationItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationInfo: {
    color: '#555',
  },
};

const Recommendations = () => {
  return (
    <aside style={styles.recommendations}>
      <div style={styles.recommendationsInner}>
      <div style={styles.title}>Recommended Researchers</div>
      <div style={styles.recommendationItem}>
        <img style={styles.profileImage} src="/profile-pic.jpg" alt="Researcher" />
        <div>
          <div style={styles.name}>Researcher Name</div>
          <div style={styles.recommendationInfo}>Field of Study</div>
        </div>
      </div>
      <div style={styles.recommendationItem}>
        <img style={styles.profileImage} src="/profile-pic.jpg" alt="Researcher" />
        <div>
          <div style={styles.name}>Researcher Name</div>
          <div style={styles.recommendationInfo}>Field of Study</div>
        </div>
      </div>
      <div style={styles.recommendationItem}>
        <img style={styles.profileImage} src="/profile-pic.jpg" alt="Researcher" />
        <div>
          <div style={styles.name}>Researcher Name</div>
          <div style={styles.recommendationInfo}>Field of Study</div>
        </div>
      </div>
     </div>
    </aside>
  );
}

export default Recommendations;
