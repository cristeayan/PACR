import React, { useState } from 'react';

const Post = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [optionsOpen, setOptionsOpen] = useState(null);
  const [replyOptionsOpen, setReplyOptionsOpen] = useState(null);

  // Temporary state to hold the current text while editing
  const [tempCommentText, setTempCommentText] = useState('');
  const [tempReplyText, setTempReplyText] = useState('');

  // Handle adding new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          username: 'Current User',
          tagline: 'User Tagline',
          text: newComment,
          replies: [],
        },
      ]);
      setNewComment('');
    }
  };

  // Handle edit comment
  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setTempCommentText(comments[index].text); // Set the temporary state with the current comment text
  };

  const saveEditedComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = tempCommentText; // Commit the temporary text to the actual comment
    setComments(updatedComments);
    setEditingCommentIndex(null); // Exit edit mode
  };

  // Handle delete comment
  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  // Handle replying to a comment
  const handleReply = (index) => {
    if (replyText.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].replies.push({
        username: 'Replier User',
        tagline: 'Replier Tagline',
        text: replyText,
      });
      setComments(updatedComments);
      setReplyingTo(null);
      setReplyText('');
    }
  };

  // Handle edit reply
  const handleEditReply = (commentIndex, replyIndex) => {
    setEditingReplyIndex({ commentIndex, replyIndex });
    setTempReplyText(comments[commentIndex].replies[replyIndex].text); // Set the temporary state with the current reply text
  };

  const saveEditedReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].text = tempReplyText; // Commit the temporary text to the actual reply
    setComments(updatedComments);
    setEditingReplyIndex(null); // Exit edit mode
  };

  // Handle delete reply
  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies = updatedComments[commentIndex].replies.filter(
      (_, i) => i !== replyIndex
    );
    setComments(updatedComments);
  };

  return (
    <div style={styles.postContainer}>
      <div style={styles.postHeader}>
        <img src="/Dummy_Profile.png" alt="User Profile" style={styles.profileImage} />
        <div>
          <div style={styles.userName}>Dr. Matthew Antony</div>
          <div style={styles.tagline}>
            Post Doctoral Research Fellow at Beth Israel Deaconess...
          </div>
          <div style={styles.postTime}>2 mins ago</div>
        </div>
      </div>

      <div style={styles.postContent}>
        <p style={styles.postText}>
          I had the honor of graduating from my medical school. It was a long
          journey...
        </p>
        <img src="Placeholder Post Image.jpeg" alt="Post" style={styles.postImage} />
      </div>

      <div style={styles.postActions}>
        <button style={styles.actionButton}>❤️ Like</button>
        <button style={styles.actionButton}>💬 Comment</button>
        <button style={styles.actionButton}>🔄 Share</button>
        <button style={styles.actionButton}>↻ Repost</button>
      </div>

      <div style={styles.commentSection}>
        <img
          src="/Dummy_Profile.png"
          alt="User Profile"
          style={styles.commentProfileImage}
        />
        <input
          type="text"
          placeholder="Say Congratulations..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={styles.commentInput}
        />
        <button onClick={handleAddComment} style={styles.commentButton}>
          Post
        </button>
      </div>

      <div style={styles.commentsList}>
        {comments.map((comment, index) => (
          <div key={index} style={styles.commentBox}>
            <div style={styles.commentHeader}>
              <div style={styles.commentInfo}>
                <img
                  src="/Dummy Profile.png"
                  alt="Commenter Profile"
                  style={styles.commentProfileImage}
                />
                <div>
                  <div style={styles.commentUsername}>{comment.username}</div>
                  <div style={styles.commentTagline}>{comment.tagline}</div>
                </div>
              </div>
              <div style={styles.commentOptions}>
                <button
                  style={styles.optionsButton}
                  onClick={() =>
                    setOptionsOpen(optionsOpen === index ? null : index)
                  }
                >
                  ...
                </button>
                {optionsOpen === index && (
                  <div style={styles.optionsDropdown}>
                    <button
                      onClick={() => handleEditComment(index)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(index)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {editingCommentIndex === index ? (
              <>
                <input
                  type="text"
                  value={tempCommentText}
                  onChange={(e) => setTempCommentText(e.target.value)}
                  style={styles.editCommentInput}
                />
                <button
                  onClick={() => saveEditedComment(index)}
                  style={styles.saveButton}
                >
                  Save
                </button>
              </>
            ) : (
              <div style={styles.commentContent}>{comment.text}</div>
            )}

            <div style={styles.commentActions}>
              <button style={styles.replyButton} onClick={() => setReplyingTo(index)}>
                Reply
              </button>
              <button style={styles.likeButton}>Like</button>
            </div>

            {replyingTo === index && (
              <div style={styles.replySection}>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={styles.replyInput}
                />
                <button onClick={() => handleReply(index)} style={styles.replyButton}>
                  Reply
                </button>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div style={styles.replies}>
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} style={styles.replyBox}>
                    <div style={styles.replyHeader}>
                      <img
                        src="/Dummy Profile.png"
                        alt="Replier Profile"
                        style={styles.commentProfileImage}
                      />
                      <div>
                        <div style={styles.commentUsername}>{reply.username}</div>
                        <div style={styles.commentTagline}>{reply.tagline}</div>
                      </div>
                      <div style={styles.commentOptions}>
                        <button
                          style={styles.optionsButton}
                          onClick={() =>
                            setReplyOptionsOpen(
                              replyOptionsOpen === replyIndex ? null : replyIndex
                            )
                          }
                        >
                          ...
                        </button>
                        {replyOptionsOpen === replyIndex && (
                          <div style={styles.optionsDropdown}>
                            <button
                              onClick={() =>
                                handleEditReply(index, replyIndex)
                              }
                              style={styles.editButton}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteReply(index, replyIndex)
                              }
                              style={styles.deleteButton}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingReplyIndex?.commentIndex === index &&
                    editingReplyIndex?.replyIndex === replyIndex ? (
                      <>
                        <input
                          type="text"
                          value={tempReplyText}
                          onChange={(e) => setTempReplyText(e.target.value)}
                          style={styles.editCommentInput}
                        />
                        <button
                          onClick={() =>
                            saveEditedReply(index, replyIndex)
                          }
                          style={styles.saveButton}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <div style={styles.commentContent}>{reply.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    postContainer: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
      maxWidth: '40rem',
    },
    postHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    profileImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '15px',
    },
    userName: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
    tagline: {
      color: '#555',
      fontSize: '14px',
    },
    postTime: {
      color: '#999',
      fontSize: '12px',
    },
    postContent: {
      marginBottom: '15px',
    },
    postText: {
      marginBottom: '10px',
      fontSize: '14px',
    },
    postImage: {
      width: '100%',
      borderRadius: '10px',
    },
    postActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
    },
    actionButton: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#007bff',
    },
    commentSection: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',
    },
    commentInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ddd',
      marginRight: '10px',
    },
    commentButton: {
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '8px 15px',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    commentsList: {
      marginTop: '15px',
    },
    commentBox: {
      backgroundColor: '#f9f9f9',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    commentInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    commentProfileImage: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    commentUsername: {
      fontWeight: 'bold',
      fontSize: '14px',
    },
    commentTagline: {
      fontSize: '12px',
      color: '#777',
    },
    commentContent: {
      marginTop: '10px',
      fontSize: '14px',
    },
    commentActions: {
      marginTop: '10px',
    },
    replyButton: {
      fontSize: '12px',
      color: '#007bff',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    likeButton: {
      fontSize: '12px',
      color: '#007bff',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    replySection: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    replyInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ddd',
      marginRight: '10px',
    },
    replies: {
      marginTop: '10px',
      paddingLeft: '20px',
    },
    replyBox: {
      backgroundColor: '#f1f1f1',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '5px',
    },
    replyHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    optionsButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#777',
    },
    optionsDropdown: {
      position: 'absolute',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      padding: '5px',
      zIndex: 1,
    },
    editButton: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      padding: '5px',
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      color: '#ff4d4f',
      cursor: 'pointer',
      padding: '5px',
    },
    editCommentInput: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    saveButton: {
      marginTop: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
  };

export default Post;
