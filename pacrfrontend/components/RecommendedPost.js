import React, { useState } from 'react';

const RecommendedPost = () => {
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
            <div style={styles.recommendTextWrap}>
                <p style={styles.recommendText}>Recommended for you because you follow <span style={styles.recommendBoldText}>medicine</span></p>
            </div>
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
                                <a href='#' style={styles.postTags}>#Toxicology</a>
                                <a href='#' style={styles.postTags}>#Case - Report</a>
                                <a href='#' style={styles.postTags}>#Anatomy</a>
                                <a href='#' style={styles.postTags}>#Complication</a>
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
                                <div style={styles.commentInfoMainWrapper}>
                                    <div style={styles.commentInfo}>
                                        <div style={styles.commentUserDetails}>
                                            <div style={styles.commentUsername}>{comment.username}</div>
                                            <div style={styles.commentTagline}>{comment.tagline}</div>
                                        </div>
                                        <div style={styles.commentOptionsWrapper}>
                                            <span style={styles.commentPostTiming}>30 mins. ago</span>
                                            <div style={styles.commentOptions}>
                                                <button
                                                    style={styles.optionsButton}
                                                    onClick={() =>
                                                        setOptionsOpen(optionsOpen === index ? null : index)
                                                    }
                                                >
                                                    <img src='/More_Vertical.svg' alt='Options Icon' />
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
                                    </div>

                                    {editingCommentIndex === index ? (
                                        <>
                                            <div style={styles.commentInputEditWrap}>
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
                                                    Save Changes
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div style={styles.commentContent}>{comment.text}</div>
                                    )}

                                    <div style={styles.commentActions}>
                                        <button style={styles.likeButton}><img src='/Thumbs Up.svg' alt='Thumbs Icon' />Like</button>
                                        <div style={styles.commentActionsDivider}></div>
                                        <button style={styles.replyButton} onClick={() => setReplyingTo(index)}>
                                            <img src='/Arrow_Reply.svg' alt='Reply Icon' />Reply
                                        </button>
                                    </div>
                                </div>
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
    recommendTextWrap: {
        width: '100%',
        paddingBottom: '12px',
        borderBottom: '1px solid #ADADAD',
        marginBottom: '24px',
    },
    recommendText: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#ADADAD',
        textTransform: 'capitalize',
    },
    recommendBoldText: {
        fontWeight: '700',
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
        alignItems: 'center',
        gap: '4px',
        width: '100%',
        marginTop: '10px',
    },
    researchTags: {
        backgroundColor: '#fff',
        borderRadius: '200px',
        border: '1px solid #4FCFF5',
        padding: '8px 20px',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#4FCFF5',
        textAlign: 'center',
        textDecoration: 'none',
    },
    researchHeadingWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '28px',
    },
    researchHeading: {
        fontSize: '24px',
        lineHeight: '30px',
        fontWeight: '400',
        color: '#000000',
    },
    researchLinksWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    researchLinkHeading: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#313131',
    },
    researchLink: {
        fontWeight: '600',
        color: '#4FCFF5',
    },
    postTagsWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    postTags: {
        backgroundColor: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#ADADAD',
    },
    postContentRight: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '14rem',
    },
    researchButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
    },
    researchButton: {
        backgroundColor: '#fff',
        borderRadius: '200px',
        border: '1px solid #313131',
        padding: '16px 48px',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
        textAlign: 'center',
        cursor: 'pointer',
    },
    abstractTextWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    abstractInner: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    abstractHeading: {
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '600',
        color: '#313131',
    },
    abstractText: {
        fontSize: '14px',
        lineHeight: '20px',
        color: '#313131',
        maxWidth: '48rem',
        textTransform: 'capitalize',
    },
    moreText: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '500',
        color: '#4FCFF5',
        textAlign: 'end',
    },
    postMediaWrapper: {
        width: 'auto',
    },
    postImage: {
        width: '100%',
        borderRadius: '10px',
    },
    researchPostInsights: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        width: '100%',
        maxWidth: '30.5rem',
        borderRadius: '200px',
        border: '1px solid #313131',
        padding: '8px 36px',
        margin: '20px 0 14px',
    },
    postSingleInsight: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    insightText: {
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
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
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
    },
    awardsStyle: {
        fontSize: '14px',
        lineHeight: '18px',
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
    commentSectionMainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
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
        fontSize: '14px',
        lineHeight: '18px',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    commentBox: {
        backgroundColor: '#fff',
    },
    singleCommentWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
    },
    commentImageWrapper: {
        width: 'auto',
    },
    commentProfileImage: {
        width: '40px',
        height: '40px',
        borderRadius: '6px',
    },
    commentInfoMainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: '#F0F0F0',
        borderRadius: '10px',
        padding: '16px',
        width: '100%',
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    commentInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
    },
    commentUserDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    commentUsername: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '20px',
        color: '#000000',
    },
    commentTagline: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#ADADAD',
    },
    commentOptionsWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    commentPostTiming: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#ADADAD',
    },
    commentOptions: {
        position: 'relative',
    },
    commentContent: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '400',
        color: '#313131',
        letterSpacing: '0.4px',
    },
    commentActions: {
        display: 'flex',
        alignItems: 'stretch',
        gap: '12px',
    },
    commentActionsDivider: {
        width: '1px',
        height: 'auto',
        backgroundColor: '#ADADAD',
    },
    replyButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#ADADAD',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    likeButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#ADADAD',
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
        right: '8px',
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
    commentInputEditWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
    },
    editCommentInput: {
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: '400',
        color: '#313131',
        width: '100%',
        padding: '14px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'rgb(255 255 255 / 0%)'
    },
    saveButton: {
        fontSize: '16px',
        lineHeight: '18px',
        backgroundColor: '#70D4FC',
        color: '#fff',
        border: 'none',
        borderRadius: '200px',
        padding: '8px 20px',
        cursor: 'pointer',
    },
    postHeaderWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
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

export default RecommendedPost;