import React, { useState } from 'react';

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
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              <a href="#" style={{ textDecoration: isHovered ? "underline" : "none", color: '#313131' }}>
                Dr. Max O' Brian | MPH, PhD
              </a>
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

      <div style={styles.researchPostMainWrap}>
      <div style={styles.postContent}>
        <div style={styles.postContentleft}>
          <div style={styles.researchTagsWrapper}>
            <a href='#' style={styles.researchTags}>Case Report</a>
            <a href='#' style={styles.researchTags}>Open Medical Case Reports</a>
            <a href='#' style={styles.researchTags}>PDF Available</a>
          </div>
          <div style={styles.researchHeadingWrap}>
            <span style={styles.researchHeading}>An unusual case report of bee sting toxicity as a result of 500 bee stings</span>
            <div style={styles.researchLinksWrap}>
              <span style={styles.researchLinkHeading}>Link To Article : <a href='https://medicolegaljournal.com/issue23/volue124' target='_blank' style={styles.researchLink}>https://medicolegaljournal.com/issue23/volue124</a></span>
              <span style={styles.researchLinkHeading}>Scopus : <a href='https://scopus.com/article328396' target='_blank' style={styles.researchLink}>https://scopus.com/article328396</a></span>
              <span style={styles.researchLinkHeading}>PMID : <span style={styles.researchLink}>32476</span></span>
            </div>
            <div style={styles.postTagsWrapper}>
              <a href='#' style={styles.postTags}>Toxicology</a>
              <a href='#' style={styles.postTags}>Case - Report</a>
              <a href='#' style={styles.postTags}>Anatomy</a>
              <a href='#' style={styles.postTags}>Complication</a>
            </div>
          </div>
        </div>
        <div style={styles.postContentRight}>
          <div style={styles.researchButtonWrapper}>
            <button style={styles.researchButton}>Download PDF</button>
            <button style={styles.researchButton}>Summarize</button>
          </div>
        </div>
      </div>
      <div style={styles.abstractTextWrap}>
        <div style={styles.abstractInner}>
        <span style={styles.abstractHeading}>Abstract</span>
        <p style={styles.abstractText}>
        Bee stings are reported all over the world but bee sting attacks approximatey being reported with a prevelance of 54% in tropical countries. Toxicity can therefore lead to a variety of issues such as contact dermatitis, asphyix..
        </p>
        </div>
        <span style={styles.moreText}>...See More</span>
        </div>
      </div>

      <div style={styles.postMediaWrapper}>
        <img src="Placeholder Cover.jpg" alt="Post" style={styles.postImage} />
      </div>

      <div style={styles.researchPostInsights}>
        <div style={styles.postSingleInsight}>
          <img src='/Calendar_Icon.svg' alt='Calender Icon' />
          <span style={styles.insightText}>12th Jan 2024; <span>12:40 PM</span></span>
        </div>
        <div style={styles.postSingleInsight}>
          <img src='/Book_Open.svg' alt='Book Open Icon' />
          <span style={styles.insightText}>627</span>
        </div>
        <div style={styles.postSingleInsight}>
          <img src='/Double_Quotes_Icon.svg' alt='Book Open Icon' />
          <span style={styles.insightText}>627</span>
        </div>
        <div style={styles.postSingleInsight}>
          <img src='Arrow_Circle_Down.svg' alt='Book Open Icon' />
          <span style={styles.insightText}>627</span>
        </div>
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

      <div style={styles.commentSectionMainWrapper}>
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
            <div style={styles.singleCommentWrapper}>
              <div style={styles.commentImageWrapper}>
                <img
                  src="/dummy-man.png"
                  alt="Commenter Profile"
                  style={styles.commentProfileImage}
                />
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

                    {editingReplyIndex?.commentIndex === index &&
                    editingReplyIndex?.replyIndex === replyIndex ? (
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
  postHeader: {
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
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#000',
    cursor: 'pointer',
  },
  userTitle: {
    fontSize: '14px',
    color: '#555',
  },
  tagline: {
    fontSize: '12px',
    color: '#888',
  },
  postTime: {
    color: '#313131',
    fontSize: '10px',
    lineHeight: '14px',
  },
  researchPostMainWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
  },
  postContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
  },
  postContentleft: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '33rem',
  },
  researchTagsWrapper: {
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
  postReactionsWrap: {
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
    justifyContent: 'space-between',
  },
  commentInfo: {
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
    marginRight: '5px',
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
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
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