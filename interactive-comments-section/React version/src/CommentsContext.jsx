import { createContext, useContext, useEffect, useState } from "react";
/* eslint-disable react/prop-types */

const CommentContext = createContext();

export function CommentProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCommentID, setCurrentCommentID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("data.json");
      const res = await data.json();

      setCurrentUser(res.currentUser);
      setComments(res.comments);
    }

    fetchData();
  }, []);

  function handleReactions(commentID, type) {
    function updateReactions(comments) {
      return comments.map((comment) => {
        if (comment.id === commentID) {
          let newScore = comment.score;

          if (comment.currentReaction === type) {
            newScore = type === "like" ? newScore - 1 : newScore + 1;
            return {
              ...comment,
              score: newScore,
              currentReaction: null,
            };
          }

          if (type === "like") {
            newScore =
              comment.currentReaction === "dislike"
                ? newScore + 2
                : newScore + 1;
          } else if (type === "dislike") {
            newScore =
              comment.currentReaction === "like" ? newScore - 2 : newScore - 1;
          }

          return {
            ...comment,
            score: newScore,
            currentReaction: type,
          };
        }

        if (comment.replies?.length > 0) {
          const updatedReplies = updateReactions(comment.replies);

          if (
            JSON.stringify(updatedReplies) !== JSON.stringify(comment.replies)
          ) {
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
        }

        return comment;
      });
    }

    setComments((prevComments) => {
      const updatedComments = updateReactions(prevComments);

      return updatedComments !== prevComments ? updatedComments : prevComments;
    });
  }

  function handleAddReply(commentID, text) {
    const newReply = {
      id: Date.now(),
      content: text,
      createdAt: Date.now(),
      score: 0,
      replyingTo: "test",
      user: {
        image: {
          png: `./images/avatars/image-${currentUser.username}.png`,
          webp: `./images/avatars/image-${currentUser.username}.webp`,
        },
        username: `${currentUser.username}`,
      },
      replies: [],
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              replies: [...comment.replies, newReply],
            }
          : {
              ...comment,
              replies: updateReplies(comment.replies, commentID, newReply),
            },
      ),
    );

    function updateReplies(replies, commentID, newReply) {
      if (!replies) return [];
      return replies.map((reply) =>
        reply.id === commentID
          ? {
              ...reply,
              replies: [...reply.replies, newReply],
            }
          : {
              ...reply,
              replies: updateReplies(reply.replies, commentID, newReply),
            },
      );
    }
  }

  function handleDeleteComment(commentID) {
    function deleteComment(comments) {
      return comments
        .map((comment) => {
          if (comment.id === commentID) return null;

          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: deleteComment(comment.replies),
            };
          }

          return comment;
        })
        .filter((comment) => comment !== null);
    }

    setComments((prevComments) => deleteComment(prevComments));
  }

  function handleUpdateComment(commentID, newContent) {
    function updateComment(comments) {
      return comments.map((comment) => {
        if (comment.id === commentID) {
          return {
            ...comment,
            content: newContent,
          };
        }

        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateComment(comment.replies),
          };
        }

        return comment;
      });
    }

    setComments((prevComments) => updateComment(prevComments));
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        currentUser,
        setCurrentUser,
        handleReactions,
        handleAddReply,
        handleDeleteComment,
        showDeleteModal,
        setShowDeleteModal,
        currentCommentID,
        setCurrentCommentID,
        isEditing,
        setIsEditing,
        handleUpdateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useCommentContext() {
  return useContext(CommentContext);
}
