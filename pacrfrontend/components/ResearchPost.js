import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const UploadResearchPost = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [optionsOpen, setOptionsOpen] = useState(null);
  const [replyOptionsOpen, setReplyOptionsOpen] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Temporary state to hold the current text while editing
  const [tempCommentText, setTempCommentText] = useState('');
  const [tempReplyText, setTempReplyText] = useState('');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
    <div style={styles.container}>
      {/* Header with profile and actions */}
      <div style={styles.header}>
        <div style={styles.profileSection}>
          <img src="/Dummy Profile.png" alt="Dr. Max" style={styles.profileImage} />
          <div>
            <div
              style={styles.userName}
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              <a href="#" style={{ textDecoration: isHovered ? "underline" : "none", color: '#313131' }}>
                Dr. Max O' Brian | MPH, PhD
              </a>
            </div>
            <div style={styles.userTitle}>Research analyst at University de Sociedad</div>
            <div style={styles.timestamp}>26 mins ago</div>
          </div>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.downloadButton}>Download PDF</button>
          {/* <button style={styles.summarizeButton}>Summarize Research Article</button> */}
        </div>
      </div>

      {/* Tags */}
      <div style={styles.tags}>
        <span style={styles.tag}>Original Article</span>
        <span style={styles.tag}>Journal of Primary Care</span>
        <span style={styles.tag}>PDF Available</span>
      </div>

      {/* Post Content */}
      <div style={styles.content}>
        <h2 style={styles.title}>Systemic Meta-analysis of the socioeconomic determinants of health-related behavior and perceptions of primary care treatment</h2>
        <div style={styles.links}>
          <a href="#" style={styles.link}>Link To Article</a> | 
          <a href="#" style={styles.link}>Scopus</a> | 
          <a href="#" style={styles.link}>PMID</a>
        </div>
        <p style={styles.description}>
          I am happy to share my latest publication about socioeconomic determinants of primary care health. If you do enjoy reading, please share this post with your network.
        </p>
        <div style={styles.tagList}>
          <span style={styles.tag}>health-care</span>
          <span style={styles.tag}>meta-analysis</span>
          <span style={styles.tag}>treatment</span>
          <span style={styles.tag}>public health</span>
        </div>
        <div style={styles.abstract}>
          <h3>Abstract</h3>
          <p>
            Understanding the interplay between socioeconomic factors and health-related behaviors, along with perceptions of primary care treatment, is essential for effective public health strategies. This meta-analysis synthesizes...
          </p>
        </div>
      </div>

      {/* Image Preview */}
      {/* <div style={styles.pdfPreview} onClick={toggleModal}>
        <Document file="/path/to/your/pdf-file.pdf">
          <Page pageNumber={1} width={150} />
        </Document>
        <p style={styles.previewText}>Click to view PDF</p>
      </div> */}

      {/* PDF Modal */}
      {/* {showModal && (
        <div style={styles.modalOverlay} onClick={toggleModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={toggleModal}>
              Close
            </button>
            <Document file="/ExaminingGenderDisparitiesWhenSampleSizesDiffer.pdf">
              <Page pageNumber={1} width={600} />
            </Document>
          </div>
        </div>
      )}  */}

      {/* Meta data */}
      <div style={styles.metadata}>
        <span>April 2024</span> | <span>534 Reads</span> | <span>8 Citations</span> | <span>42 Downloads</span>
        {/* <div style={styles.authors}>
          <span>Journal of Primary Care</span> |
          <span>Dr. Alba Risdi</span> |
          <span>Dr. Narayan Chowka</span>
        </div> */}
        <a href="#" style={styles.viewStats}>View Article Statistics</a>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.actionButton}>👍 Like</button>
        <button style={styles.actionButton}>💬 Comment</button>
        <button style={styles.actionButton}>🔄 Repost</button>
        <button style={styles.actionButton}>↻ Share</button>
      </div>

      {/* Like, Comment, and Share Count */}
      <div style={styles.socialCount}>
        <span>88 Likes</span>
        <span>3 Comments</span>
        <span>12 Shares</span>
      </div>

      {/* Comment Section */}
      <div style={styles.commentSection}>
        <img src="/Dummy Profile.png" alt="User Profile" style={styles.commentProfileImage} />
        <input
          type="text"
          placeholder="Say Congratulations..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={styles.commentInput}
          />
        <button onClick={handleAddComment} style={styles.postButton}>Post</button>
      </div>

      {/* Display Comments */}
      <div style={styles.commentsList}>
        {comments.map((comment, index) => (
          <div key={index} style={styles.commentBox}>
            <div style={styles.commentHeader}>
              <img src="/Dummy Profile.png" alt="Commenter" style={styles.commentProfileImage} />
              <div>
                <div style={styles.commentUsername}>Dr. Blake Peck</div>
                <div style={styles.commentTagline}>{comment.tagline}</div>
                <div style={styles.commentTimestamp}>10 mins ago</div>
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
              <button style={styles.likeButton}>👍 Like | </button>
              <button style={styles.commentAction} onClick={() => setReplyingTo(index)}>
              💬 Reply
              </button>
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
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '700px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  profileSection: {
    display: 'flex',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '12px',
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  userTitle: {
    fontSize: '14px',
    color: '#555',
  },
  timestamp: {
    fontSize: '12px',
    color: '#888',
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#70D4FC',
    color: '#fff',
    border: 'none',
    borderRadius: '40px',
    padding: '14px 20px',
    cursor: 'pointer',
  },
  summarizeButton: {
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  tags: {
    display: 'flex',
    gap: '10px',
    fontSize: '12px',
    color: '#007bff',
    marginBottom: '16px',
  },
  tag: {
    background: '#e0f7fa',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  links: {
    fontSize: '12px',
    color: '#007bff',
    marginBottom: '8px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
  },
  tagList: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  abstract: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '16px',
  },
  imagePreview: {
    marginBottom: '16px',
  },
  previewImage: {
    width: '100%',
    borderRadius: '8px',
  },
  metadata: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '16px',
  },
  viewStats: {
    color: '#007bff',
    fontSize: '12px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '16px',
  },
  actionButton: {
    border: 'none',
    background: 'none',
    fontSize: '14px',
    color: '#007bff',
    cursor: 'pointer',
  },
  socialCount: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '16px',
  },
  commentSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  commentProfileImage: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
  },
  commentInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '20px',
    border: '1px solid #ddd',
  },
  postButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  commentsList: {
    marginTop: '16px',
  },
  commentBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '8px',
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  commentUsername: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  commentTimestamp: {
    fontSize: '12px',
    color: '#888',
  },
  commentText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
  },
  commentActions: {
    fontSize: '12px',
    color: '#007bff',
  },
  commentAction: {
    marginRight: '8px',
    cursor: 'pointer',
  },
  commentTagline: {
    fontSize: '12px',
    color: '#777',
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
  commentContent: {
    marginTop: '10px',
    fontSize: '14px',
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
  replyButton: {
    fontSize: '12px',
    color: '#007bff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  // PDF Styling
  pdfPreview: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
  },
  previewText: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#888',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  },
};

export default UploadResearchPost;