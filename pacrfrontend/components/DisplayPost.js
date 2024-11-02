import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

// MediaSlider Component
const MediaSlider = ({ media }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === media.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? media.length - 1 : prevIndex - 1
        );
    };

    return (
        <div style={styles.sliderContainer}>
            <div style={styles.sliderWrapper}>
                {media.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.slide,
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        <img
                            src={item.file}
                            alt={`Post Media ${index + 1}`}
                            style={styles.postImage}
                        />
                    </div>
                ))}
            </div>

            {media.length > 1 && (
                <>
                    <button style={styles.prevButton} onClick={handlePrev}>
                        &#8249;
                    </button>
                    <button style={styles.nextButton} onClick={handleNext}>
                        &#8250;
                    </button>

                    <div style={styles.dotsContainer}>
                        {media.map((_, index) => (
                            <span
                                key={index}
                                style={{
                                    ...styles.dot,
                                    backgroundColor:
                                        index === currentIndex ? '#007bff' : '#ccc',
                                }}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// DisplayPost Component
const DisplayPost = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [newReply, setNewReply] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const { user, token } = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [token]);

    const handleLikePost = async (postId) => {
        try {
            await axios.post(
                `http://localhost:8000/api/likes/`,
                { post: postId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedPosts = posts.map((post) =>
                post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleAddComment = async (postId) => {
        if (newComment[postId]?.trim()) {
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/comments/`,
                    { post: postId, content: newComment[postId] },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const updatedPosts = posts.map((post) =>
                    post.id === postId
                        ? { ...post, comments: [...post.comments, response.data], comments_count: post.comments_count + 1 }
                        : post
                );
                setPosts(updatedPosts);
                setNewComment({ ...newComment, [postId]: '' });
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleAddReply = async (commentId, postId) => {
        if (newReply[commentId]?.trim()) {
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/comments/`,
                    { post: postId, content: newReply[commentId], parent: commentId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const updatedPosts = posts.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            comments: post.comments.map((comment) =>
                                comment.id === commentId
                                    ? { ...comment, replies: [...comment.replies, response.data] }
                                    : comment
                            ),
                        }
                        : post
                );
                setPosts(updatedPosts);
                setNewReply({ ...newReply, [commentId]: '' });
                setReplyingTo(null); // Reset replyingTo after reply is added
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    };

    return (
        <div style={styles.postContainer}>
            {posts.map((post) => (
                <div key={post.id} style={styles.postBox}>
                    <div style={styles.postHeaderWrap}>
                        <div style={styles.postHeader}>
                            <img
                                src={post.author.profile_picture || "/dummy-man.png"}
                                alt="User Profile"
                                style={styles.profileImage}
                            />
                            <div>
                                <div style={styles.userName}>
                                    {post.author.first_name} {post.author.last_name}
                                </div>
                                <div style={styles.tagline}>Post Tagline</div>
                                <div style={styles.postTime}>2 mins ago</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.postContent}>
                        <p style={styles.postText}>{post.content}</p>
                        {post.media && post.media.length > 0 && (
                            <MediaSlider media={post.media} />
                        )}
                    </div>

                    <div style={styles.postActions}>
                        <button style={styles.actionButton} onClick={() => handleLikePost(post.id)}>
                            ❤️ Like ({post.likes_count})
                        </button>
                        <button style={styles.actionButton}>💬 Comment ({post.comments_count})</button>
                        <button style={styles.actionButton}>🔄 Share</button>
                        <button style={styles.actionButton}>↻ Repost</button>
                    </div>

                    {/* Comment Section */}
                    <div style={styles.commentSection}>
                        <img src={user ? user.profile_picture : '/dummy-man.png'} alt="User Profile" style={styles.commentProfileImage} />
                        <input
                            type="text"
                            placeholder="Say Congratulations..."
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            style={styles.commentInput}
                        />
                        <button onClick={() => handleAddComment(post.id)} style={styles.commentButton}>
                            Post
                        </button>
                    </div>

                    {/* Comments */}
                    <div style={styles.commentsList}>
                        {post.comments.map((comment) => (
                            <div key={comment.id} style={styles.commentBox}>
                                <div style={styles.commentHeader}>
                                    <div style={styles.commentInfo}>
                                        <img
                                            src={comment.author.profile_picture || "/dummy-man.png"}
                                            alt="Commenter Profile"
                                            style={styles.commentProfileImage}
                                        />
                                        <div style={styles.commentUserWrap}>
                                            <div>
                                                <div style={styles.commentUsername}>
                                                    {comment.author.first_name} {comment.author.last_name}
                                                </div>
                                                <div style={styles.commentTagline}>{comment.author.tagline}</div>
                                            </div>
                                            <div style={styles.commentContent}>{comment.content}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Reply Section */}
                                <div style={styles.replySection}>
                                    <input
                                        type="text"
                                        placeholder="Reply to this comment..."
                                        value={newReply[comment.id] || ''}
                                        onChange={(e) => setNewReply({ ...newReply, [comment.id]: e.target.value })}
                                        style={styles.replyInput}
                                    />
                                    <button onClick={() => handleAddReply(comment.id, post.id)} style={styles.replyButton}>
                                        Reply
                                    </button>
                                </div>

                                {/* Reply Section: Show reply input only for the current comment */}
                                {replyingTo === comment.id && (
                                    <div style={styles.replySection}>
                                        <input
                                            type="text"
                                            placeholder="Reply to this comment..."
                                            value={newReply[comment.id] || ''}
                                            onChange={(e) => setNewReply({ ...newReply, [comment.id]: e.target.value })}
                                            style={styles.replyInput}
                                        />
                                        <button onClick={() => handleAddReply(comment.id, post.id)} style={styles.replyButton}>
                                            Post
                                        </button>
                                        <button
                                            style={styles.cancelButton}
                                            onClick={() => setReplyingTo(null)} // Close the reply input
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                {/* Display replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div style={styles.replies}>
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} style={styles.replyBox}>
                                                <div style={styles.commentUsername}>
                                                    {reply.author.first_name} {reply.author.last_name}
                                                </div>
                                                <div style={styles.commentContent}>{reply.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    postBox: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
    },
    postHeaderWrap: {
        display: 'flex',
        justifyContent: 'space-between',
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
        alignItems: 'flex-start',
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
    replyButton: {
        fontSize: '12px',
        color: '#007bff',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    cancelButton: {
        fontSize: '12px',
        color: '#ff4d4f',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
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
    commentUserWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    sliderContainer: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',  // Hides the overflow (images that go beyond one view)
        height: '400px',     // Adjust this based on your image height requirement
    },
    sliderWrapper: {
        display: 'flex',  // Aligns the images in a horizontal line
        transition: 'transform 0.5s ease-in-out',  // Smooth sliding transition
        width: '100%',
    },
    slide: {
        minWidth: '100%',    // Each image takes the full width of the container
        transition: 'transform 0.5s ease',  // Smooth sliding effect
    },
    postImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',  // Ensures image covers the entire slide area
    },
    prevButton: {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        paddingBottom: '4px',
        cursor: 'pointer',
        zIndex: 1,
    },
    nextButton: {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        paddingBottom: '4px',
        cursor: 'pointer',
        zIndex: 1,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '5px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
    },
};

export default DisplayPost;