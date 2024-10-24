import React, { useState } from 'react';

const ResearchPost = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');

  const addComment = () => {
    if (newComment) {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const editComment = (index) => {
    setEditingComment(index);
    setEditText(comments[index].text);
  };

  const saveEditComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = editText;
    setComments(updatedComments);
    setEditingComment(null);
  };

  const addReply = (index, replyText) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
  };

  const deleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies = updatedComments[commentIndex].replies.filter((_, i) => i !== replyIndex);
    setComments(updatedComments);
  };

  return (
    <div style={styles.postContainer}>
      <div style={styles.header}>
        <img
          src="/dummy-man.png"
          alt="Profile"
          style={styles.profileImg}
        />
        <div>
          <h3 style={styles.name}>Dr. Matthew Antony | You</h3>
          <p style={styles.title}>
            Post Doctoral Research Fellow at Beth Israel Deaconess...
          </p>
          <p style={styles.time}>2 mins ago</p>
        </div>
        <button style={styles.pdfButton}>Download PDF</button>
      </div>

      <div style={styles.tagsContainer}>
        <span style={styles.tag}>Case Report</span>
        <span style={styles.tag}>Open Medical Case Reports</span>
        <span style={styles.tag}>PDF Available</span>
      </div>

      <h2 style={styles.postTitle}>
        An unusual case report of bee sting toxicity as a result of 500 bee stings
      </h2>

      <div style={styles.links}>
        <a href="https://medicolegaljournal.com/issue23/volume124" style={styles.link}>
          Link To Article
        </a>
        <a href="https://scopus.com/article328396" style={styles.link}>
          Scopus
        </a>
        <span>PMID: 32476</span>
      </div>

      <div style={styles.tagsContainer}>
        <span style={styles.tag}>Toxicology</span>
        <span style={styles.tag}>Case Report</span>
        <span style={styles.tag}>Anatomy</span>
        <span style={styles.tag}>Complication</span>
      </div>

      <p style={styles.abstract}>
        Bee stings are reported all over the world but bee sting attacks are more prevalent in tropical regions...
      </p>

      {/* Static Media Slider */}
      <div style={styles.mediaSlider}>
        <div style={styles.mediaSlide}>Image/Media 1</div>
        <div style={styles.mediaSlide}>Image/Media 2</div>
        <div style={styles.mediaSlide}>Image/Media 3</div>
      </div>

      <div style={styles.footer}>
        <span>Jan 2024</span>
        <span>627 Reads</span>
        <span>2 Citations</span>
        <span>106 Downloads</span>
      </div>

      {/* Comment Section */}
      <div style={styles.commentSection}>
        <h4>Comments</h4>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={styles.commentInput}
        />
        <button onClick={addComment} style={styles.addCommentButton}>Comment</button>

        {comments.map((comment, index) => (
          <div key={index} style={styles.commentContainer}>
            {editingComment === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.commentInput}
                />
                <button onClick={() => saveEditComment(index)} style={styles.editButton}>Save</button>
              </div>
            ) : (
              <div>
                <p>{comment.text}</p>
                <button onClick={() => editComment(index)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteComment(index)} style={styles.deleteButton}>Delete</button>
              </div>
            )}
            <div style={styles.replySection}>
              <input
                type="text"
                placeholder="Reply..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addReply(index, e.target.value);
                }}
                style={styles.replyInput}
              />
              {comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} style={styles.replyContainer}>
                  <p>{reply}</p>
                  <button onClick={() => deleteReply(index, replyIndex)} style={styles.deleteButton}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  postContainer: {
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '20px 0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  profileImg: {
    borderRadius: '50%',
    marginRight: '10px',
    width: '48px',
  },
  name: {
    margin: 0,
  },
  title: {
    margin: 0,
    fontSize: '14px',
    color: '#555',
  },
  time: {
    fontSize: '12px',
    color: '#999',
  },
  pdfButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tagsContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '10px',
  },
  tag: {
    background: '#f1f1f1',
    padding: '5px 10px',
    borderRadius: '16px',
    fontSize: '12px',
    color: '#555',
  },
  postTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  links: {
    marginBottom: '10px',
  },
  link: {
    marginRight: '10px',
    color: '#007bff',
    textDecoration: 'none',
  },
  abstract: {
    marginBottom: '10px',
    color: '#333',
  },
  mediaSlider: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  mediaSlide: {
    flex: 1,
    height: '100px',
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  commentSection: {
    marginTop: '20px',
  },
  commentInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addCommentButton: {
    background: '#28a745',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  commentContainer: {
    background: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  editButton: {
    marginRight: '5px',
    background: '#ffc107',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#dc3545',
    border: 'none',
    borderRadius: '4px',
  },
}

export default ResearchPost;
