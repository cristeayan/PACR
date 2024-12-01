import React, { useState, useEffect } from "react";
import { useUser } from '../context/UserContext';


const Postcopy = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [tempCommentText, setTempCommentText] = useState("");
  const { user ,token , setUserAndToken } = useUser();

  

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      const data = await response.json();
      setPosts(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Handle like/unlike
  const toggleLike = async (postId, isLiked) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/likes/", {
        method: isLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId }),
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes_count: isLiked
                    ? post.likes_count - 1
                    : post.likes_count + 1,
                  is_liked: !isLiked,
                }
              : post
          )
        );
      } else {
        console.error("Error toggling like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Add a comment
  const addComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/comments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId, content: newComment }),
      });

      if (response.ok) {
        const comment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          )
        );
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Edit a comment
  const editComment = async (commentId, postId) => {
    if (!tempCommentText.trim()) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comments/${commentId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: tempCommentText }),
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === commentId
                      ? { ...comment, content: tempCommentText }
                      : comment
                  ),
                }
              : post
          )
        );
        setEditingCommentIndex(null);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Delete a comment
  const deleteComment = async (commentId, postId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comments/${commentId}/`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment.id !== commentId
                  ),
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={styles.postContainer}>
          {/* Post Header */}
          <div style={styles.postHeader}>
            <img
              src={post.author.profile_picture || "/dummy-man.png"}
              alt="User Profile"
              style={styles.profileImage}
            />
            <div>
              <h4>{`${post.author.first_name} ${post.author.last_name}`}</h4>
              <p>{new Date(post.created_at).toLocaleString()}</p>
            </div>
          </div>

          {/* Post Content */}
          <p>{post.content}</p>
          {post.media.map((media) => (
            <img
              key={media.id}
              src={media.file}
              alt="Post Media"
              style={styles.postImage}
            />
          ))}

          {/* Post Actions */}
          <div style={styles.actions}>
            <button
              onClick={() => toggleLike(post.id, post.is_liked)}
              style={styles.likeButton}
            >
              {post.is_liked ? "Unlike" : "Like"} ({post.likes_count})
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <h5>Comments:</h5>
            {post.comments.map((comment) => (
              <div key={comment.id} style={styles.comment}>
                {editingCommentIndex === comment.id ? (
                  <>
                    <input
                      type="text"
                      value={tempCommentText}
                      onChange={(e) => setTempCommentText(e.target.value)}
                      style={styles.editCommentInput}
                    />
                    <button
                      onClick={() => editComment(comment.id, post.id)}
                      style={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentIndex(null)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <button
                      onClick={() => {
                        setEditingCommentIndex(comment.id);
                        setTempCommentText(comment.content);
                      }}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id, post.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Add Comment */}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={styles.commentInput}
            />
            <button onClick={() => addComment(post.id)} style={styles.addButton}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  postContainer: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  postImage: {
    maxWidth: "100%",
    borderRadius: "10px",
    marginTop: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  likeButton: {
    background: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  comment: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "5px",
  },
  commentInput: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "5px",
  },
  editCommentInput: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  addButton: {
    background: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    background: "#ffc107",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    background: "#28a745",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "#6c757d",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Postcopy;


// {
//   "id": 1,
//   "author": {
//     "id": 1,
//     "first_name": "admin",
//     "last_name": "raj",
//     "profile_picture": null
//   },
//   "content": "this is my first post",
//   "disciplines": [],
//   "created_at": "2024-10-05T10:34:56.431559Z",
//   "likes_count": 2,
//   "comments_count": 2,
//   "likes": [
//     {
//       "id": 1,
//       "post": 1,
//       "user": {
//         "id": 3,
//         "first_name": "Chris",
//         "last_name": "Raj",
//         "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/chris_profile_photo.jpg"
//       }
//     },
//     {
//       "id": 5,
//       "post": 1,
//       "user": {
//         "id": 6,
//         "first_name": "Moiz",
//         "last_name": "Aslam",
//         "profile_picture": null
//       }
//     }
//   ],
//   "comments": [
//     {
//       "id": 1,
//       "post": 1,
//       "author": {
//         "id": 3,
//         "first_name": "Chris",
//         "last_name": "Raj",
//         "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/chris_profile_photo.jpg"
//       },
//       "content": "This is a comment on the post.",
//       "created_at": "2024-10-05T10:53:54.741642Z",
//       "parent": null,
//       "replies": [
//         {
//           "id": 2,
//           "post": 1,
//           "author": {
//             "id": 3,
//             "first_name": "Chris",
//             "last_name": "Raj",
//             "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/chris_profile_photo.jpg"
//           },
//           "content": "testing reply",
//           "created_at": "2024-10-07T20:13:55.217793Z",
//           "parent": 1,
//           "replies": []
//         }
//       ]
//     }
//   ],
//   "repost_of": null,
//   "media": [],
//   "post_type": "post",
//   "journal": null
// }