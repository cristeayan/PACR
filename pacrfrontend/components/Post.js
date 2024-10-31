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
    <div style={styles.postContainer}>
      <div style={styles.postHeaderWrap}>
        <div style={styles.postHeader}>
          <img src="/dummy-man.png" alt="User Profile" style={styles.profileImage} />
          <div style={styles.userDetailWrap}>
            <div style={styles.userName}
              onMouseOver={handleMouseEnter}
              onMouseOut={handleMouseLeave}><a style={{ textDecoration: isHovered ? "underline" : "none", color: '#313131' }} href='#'>Dr. Matthew Antony</a></div>
            <div style={styles.tagline}>
              Post Doctoral Research Fellow at Beth Israel Deaconess...
            </div>
            <div style={styles.postTime}>2 mins ago</div>
          </div>
        </div>
        <div style={styles.postFunctionsWrap}>
          <a style={styles.postFollowButton} href='#'>Boost Post</a>
          <div style={styles.postfunctions}>
            <img src='/Post Globe Icon.svg' alt='Globe Icon' />
            <img src='/Hamburger Icon.svg' alt='Menu Icon' />
          </div>
        </div>
      </div>

      <div style={styles.postContent}>
        <p style={styles.postText}>
          I had the honor of graduating from my medical school. It was a long journey and road of rocks. But all fun things must come to an end.<br /><br />Having my parents and grandparents at the event made it even more special, fulfilling a wish of my grandparents to see their grandchild graduate. My Dad was an alumni of KMC Mangalore and I was lucky to have done my undergraduate in the same place where he learnt to become the Doctor he is today.
        </p>
        <span style={styles.tagsMainSpan}>
          <span style={styles.tagStyle}>#️Gradutation</span>
          <span style={styles.tagStyle}>#️️MedicalSchool</span>
          <span style={styles.tagStyle}>#️2024</span>
        </span>
      </div>
      <div style={styles.postMediaWrapper}>
        <img src="Placeholder Cover.jpg" alt="Post" style={styles.postImage} />
      </div>

      <div style={styles.postActions}>
        <div style={styles.reactionDataWrap}>
          <div style={styles.awardsStyle}>29 Reactions/Awards</div>
          <div style={styles.postReactionsWrap}>
            <a style={styles.actionButton} href='#'>
              <span style={styles.reactionNumber}>22</span>
              <img src='/Thumbs Up.svg' alt='Thumbs Icon' />
            </a>
            <a style={styles.actionButton} href='#'>
              <span style={styles.reactionNumber}>13</span>
              <img src='/Chat.svg' alt='Chat Icon' />
            </a>
            <a style={styles.actionButton} href='#'>
              <span style={styles.reactionNumber}>28</span>
              <img src='/Paper_Plane.svg' alt='Paper Clip Icon' />
            </a>
          </div>
        </div>
        <div style={styles.postActionsDivider}></div>
        <div style={styles.reactionActionWrap}>
          <a href='#' style={styles.reactionAction}>
            <img src='/Thumbs Up.svg' alt='Thumbs Icon' />
            <span style={styles.actionText}>Like</span>
          </a>
          <a href='#' style={styles.reactionAction}>
            <img src='/Chat.svg' alt='Chat Icon' />
            <span style={styles.actionText}>Comment</span>
          </a>
          <a href='#' style={styles.reactionAction}>
            <img src='/Arrows_Reload_Icon.svg' alt='Chat Icon' />
            <span style={styles.actionText}>Repost</span>
          </a>
          <a href='#' style={styles.reactionAction}>
            <img src='/Paper_Plane.svg' alt='Paper Clip Icon' />
            <span style={styles.actionText}>Share</span>
          </a>
        </div>
      </div>

      <div style={styles.commentSection}>
        <img
          src="/dummy-man.png"
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
        {newComment.trim() && (
          <button style={styles.commentButton} onClick={handleAddComment}>
            Comment
          </button>
        )}
        {/* <button onClick={handleAddComment} style={styles.commentButton}>
          Post
        </button> */}
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
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
    maxWidth: '25.375rem',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
  },
  userDetailWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  userName: {
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#000',
    cursor: 'pointer',
  },
  hover: {
    textDecoration: 'underline',
  },
  tagline: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#ADADAD',
    marginBottom: '2px',
  },
  postTime: {
    color: '#313131',
    fontSize: '10px',
    lineHeight: '14px',
  },
  postContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '12px',
  },
  postText: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#313131',
    maxWidth: '48rem',
    textTransform: 'capitalize',
  },
  tagsMainSpan: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  tagStyle: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    color: '#4FCFF5',
  },
  postMediaWrapper: {
    width: 'auto',
  },
  postImage: {
    width: '100%',
    borderRadius: '10px',
  },
  postActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '18px',
  },
  reactionDataWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  postReactionsWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  reactionNumber: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#313131',
  },
  awardsStyle: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#313131',
  },
  postActionsDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ADADAD',
  },
  reactionActionWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionText: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: '400',
    color: '#ADADAD',
  },
  reactionAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
  },
  commentSection: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    columnGap: '18px',
    position: 'relative',
  },
  commentInput: {
    flex: 1,
    padding: '14px 24px',
    borderRadius: '200px',
    border: '1px solid #ADADAD',
    backgroundColor: '#F2F2F2',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
  },
  commentButton: {
    position: 'absolute',
    right: '6px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#70D4FC',
    border: 'none',
    borderRadius: '200px',
    padding: '8px 16px',
    color: '#fff',
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
    width: '40px',
    height: '40px',
    borderRadius: '6px',
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
  postHeaderWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  postFollowButton: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '500',
    color: '#4FCFF5',
    textDecoration: 'none',
    padding: '16px 30px',
    borderRadius: '200px',
    textAlign: 'center',
    border: '1px solid #4FCFF5',
  },
  postFunctionsWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
  },
  postfunctions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default Post;