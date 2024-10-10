import React from 'react';
import Post from 'Post'; // Import the Post component


const styles = {
  feed: {
    flex: '1',
    padding: '20px',
    overflowY: 'auto',
  },
  storySection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  storyCard: {
    flex: '1',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  createPost: {
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  postInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  postOptions: {
    display: 'flex',
    gap: '10px',
  },
  post: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  postAuthor: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    color: '#555',
  },
};

const Feed = () => {
  return (
    <section style={styles.feed}>
      <div style={styles.storySection}>
        <div style={styles.storyCard}>Story 1</div>
        <div style={styles.storyCard}>Story 2</div>
        <div style={styles.storyCard}>Story 3</div>
      </div>
      <div style={styles.createPost}>
        <textarea style={styles.postInput} placeholder="What's on your mind?"></textarea>
        <div style={styles.postOptions}>
          <button>Post</button>
          {/* <button>Video</button>
          <button>Article</button> */}
        </div>
      </div>
      <div style={styles.post}>
        <div style={styles.postHeader}>
          <img style={styles.profileImage} src="/profile-pic.jpg" alt="Author" />
          <div style={styles.postAuthor}>Author Name</div>
        </div>
        <div style={styles.postContent}>
          This is a sample post content.
        </div>
      </div>
      <div style={styles.post}>
        <div style={styles.postHeader}>
          <img style={styles.profileImage} src="/profile-pic.jpg" alt="Author" />
          <div style={styles.postAuthor}>Author Name</div>
        </div>
        <div style={styles.postContent}>
          This is another sample post content.
        </div>
      </div>
    </section>
  );
}

export default Feed;
