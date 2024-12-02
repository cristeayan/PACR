import React, { useState } from "react";

const Postcopy = ({ post, token, onPostUpdate }) => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [tempCommentText, setTempCommentText] = useState("");
  const [tempReplyText, setTempReplyText] = useState("");

  // Like/Unlike Post
  const toggleLike = async (postId, isLiked) => {
    const endpoint = `http://127.0.0.1:8000/api/posts/${postId}/${isLiked ? "unlike" : "like"}/`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        onPostUpdate(); // Notify parent to update the post data
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Add Comment
  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/comments/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: post.id, content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Edit Comment
  const editComment = async () => {
    if (!tempCommentText.trim()) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comments/${editingCommentId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tempCommentText }),
      });
      if (response.ok) {
        setEditingCommentId(null);
        setTempCommentText("");
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Delete Comment
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Add Reply
  const addReply = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/comments/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parent: parentId, content: replyText }),
      });
      if (response.ok) {
        setReplyText("");
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Edit Reply
  const editReply = async () => {
    if (!tempReplyText.trim()) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comments/${editingReplyId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tempReplyText }),
      });
      if (response.ok) {
        setEditingReplyId(null);
        setTempReplyText("");
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  // Delete Reply
  const deleteReply = async (replyId) => {
    deleteComment(replyId); // Same logic as deleting a comment
  };

  return (
    <div style={styles.postContainer}>
      <div style={styles.postHeader}>
        <img
          src={post.author.profile_picture || "/dummy-man.png"}
          alt="Profile"
          style={styles.profileImage}
        />
        <div>
          <h3>
            {post.author.first_name} {post.author.last_name}
          </h3>
          <p>{new Date(post.created_at).toLocaleString()}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div>
        <button onClick={() => toggleLike(post.id, post.is_liked)}>
          {post.is_liked ? "Unlike" : "Like"}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          onKeyDown={(e) => e.key === "Enter" && addComment()}
        />
      </div>
      <div>
        {post.comments.map((comment) => (
          <div key={comment.id} style={styles.comment}>
            <p>{comment.content}</p>
            {editingCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={tempCommentText}
                  onChange={(e) => setTempCommentText(e.target.value)}
                />
                <button onClick={editComment}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setEditingCommentId(comment.id)}>
                  Edit
                </button>
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              </div>
            )}
            <input
              type="text"
              placeholder="Reply..."
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && addReply(comment.id, replyText)
              }
            />
            {comment.replies.map((reply) => (
              <div key={reply.id} style={styles.reply}>
                <p>{reply.content}</p>
                {editingReplyId === reply.id ? (
                  <div>
                    <input
                      type="text"
                      value={tempReplyText}
                      onChange={(e) => setTempReplyText(e.target.value)}
                    />
                    <button onClick={editReply}>Save</button>
                    <button onClick={() => setEditingReplyId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setEditingReplyId(reply.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteReply(reply.id)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  postContainer: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  comment: {
    margin: "10px 0",
    paddingLeft: "20px",
  },
  reply: {
    margin: "5px 0",
    paddingLeft: "40px",
  },
};

export default Postcopy;
