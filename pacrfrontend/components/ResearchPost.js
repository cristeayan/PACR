import React, { useState } from 'react';

const ResearchPost = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [optionsOpen, setOptionsOpen] = useState(null);
  const [replyOptionsOpen, setReplyOptionsOpen] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
  };

  const saveEditedComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newComment; // Commit the temporary text to the actual comment
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
  };

  const saveEditedReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].text = replyText; // Commit the temporary text to the actual reply
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
              onMouseOver={handleMouseEnter}
              onMouseOut={handleMouseLeave}
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

      {/* Meta data */}
      <div style={styles.metadata}>
        <span>April 2024</span> | <span>534 Reads</span> | <span>8 Citations</span> | <span>42 Downloads</span>
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
                  onClick={() => setOptionsOpen(optionsOpen === index ? null : index)}
                >
                  ...
                </button>
                {optionsOpen === index && (
                  <div style={styles.optionsDropdown}>
                    <button onClick={() => handleEditComment(index)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDeleteComment(index)} style={styles.deleteButton}>Delete</button>
                  </div>
                )}
              </div>
            </div>

            {editingCommentIndex === index ? (
              <>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={styles.editCommentInput}
                />
                <button onClick={() => saveEditedComment(index)} style={styles.saveButton}>Save</button>
              </>
            ) : (
              <div style={styles.commentContent}>{comment.text}</div>
            )}
            
            <div style={styles.commentActions}>
              <button style={styles.likeButton}>👍 Like | </button>
              <button style={styles.commentAction} onClick={() => setReplyingTo(index)}>💬 Reply</button>
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
                <button onClick={() => handleReply(index)} style={styles.replyButton}>Reply</button>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div style={styles.repliesList}>
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} style={styles.replyBox}>
                    <div style={styles.replyHeader}>
                      <img src="/Dummy Profile.png" alt="Replier" style={styles.replyProfileImage} />
                      <div>
                        <div style={styles.replyUsername}>Dr. Blake Peck</div>
                        <div style={styles.replyTagline}>{reply.tagline}</div>
                      </div>
                      <div style={styles.replyOptions}>
                        <button
                          style={styles.optionsButton}
                          onClick={() => setReplyOptionsOpen(replyOptionsOpen === replyIndex ? null : replyIndex)}
                        >
                          ...
                        </button>
                        {replyOptionsOpen === replyIndex && (
                          <div style={styles.replyOptionsDropdown}>
                            <button onClick={() => handleEditReply(index, replyIndex)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDeleteReply(index, replyIndex)} style={styles.deleteButton}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingReplyIndex?.commentIndex === index && editingReplyIndex.replyIndex === replyIndex ? (
                      <>
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          style={styles.editReplyInput}
                        />
                        <button onClick={() => saveEditedReply(index, replyIndex)} style={styles.saveButton}>Save</button>
                      </>
                    ) : (
                      <div style={styles.replyContent}>{reply.text}</div>
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
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  userTitle: {
    fontSize: '14px',
    color: '#777',
  },
  timestamp: {
    fontSize: '12px',
    color: '#999',
  },
  headerActions: {
    display: 'flex',
  },
  downloadButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  tags: {
    margin: '10px 0',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    padding: '5px 10px',
    marginRight: '5px',
    fontSize: '12px',
  },
  content: {
    margin: '10px 0',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    margin: '5px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  description: {
    margin: '10px 0',
    fontSize: '14px',
  },
  tagList: {
    margin: '10px 0',
  },
  abstract: {
    margin: '10px 0',
  },
  metadata: {
    margin: '10px 0',
    fontSize: '12px',
    color: '#999',
  },
  actions: {
    display: 'flex',
    margin: '10px 0',
  },
  actionButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    marginRight: '5px',
    cursor: 'pointer',
  },
  socialCount: {
    margin: '5px 0',
    fontSize: '12px',
    color: '#999',
  },
  commentSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  commentProfileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  commentInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  postButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  commentsList: {
    marginTop: '20px',
  },
  commentBox: {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  commentTagline: {
    fontSize: '12px',
    color: '#777',
  },
  commentTimestamp: {
    fontSize: '12px',
    color: '#999',
  },
  commentOptions: {
    position: 'relative',
  },
  optionsButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
  },
  optionsDropdown: {
    position: 'absolute',
    right: '0',
    top: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1,
  },
  editButton: {
    padding: '8px',
    border: 'none',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  deleteButton: {
    padding: '8px',
    border: 'none',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  commentContent: {
    margin: '10px 0',
    fontSize: '14px',
  },
  commentActions: {
    margin: '10px 0',
  },
  likeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  commentAction: {
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
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  replyButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  repliesList: {
    marginLeft: '40px',
    marginTop: '10px',
    borderLeft: '1px solid #ccc',
    paddingLeft: '10px',
  },
  replyBox: {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
  },
  replyHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  replyProfileImage: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  replyUsername: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  replyTagline: {
    fontSize: '12px',
    color: '#777',
  },
  replyOptions: {
    position: 'relative',
  },
  replyOptionsDropdown: {
    position: 'absolute',
    right: '0',
    top: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1,
  },
  editReplyInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ResearchPost; 
