/* TODO
Manipulate the score property in comments object for liking and disliking instead of copying and manipulating the state
*/

import "./App.css";
import { useEffect, useState } from "react";
import { CommentProvider, useCommentContext } from "./CommentsContext";

/* eslint-disable react/prop-types */

function App() {
  const { showDeleteModal } = useCommentContext();

  return (
    <>
      {showDeleteModal && <ConfirmDeleteModal />}
      <Main>
        <Overlay />
        <CommentsContainer />
        <AddCommentForm />
      </Main>
    </>
  );
}

function Overlay() {
  return (
    <div className="overlay absolute top-0 z-10 hidden h-screen w-screen bg-black opacity-60"></div>
  );
}

function Main({ children }) {
  return <main className="mx-6 my-10 max-w-[700px]">{children}</main>;
}

function CommentsContainer() {
  const { comments, currentUser } = useCommentContext();

  return (
    <div className="grid gap-10">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function Comment({ comment }) {
  const { currentUser } = useCommentContext();
  const isCurrentUser = currentUser.username === comment.user.username;

  return (
    <div className="comment-container grid gap-5" data-id={comment.id}>
      <div className="comment grid grid-cols-comment-mobile-col grid-rows-comment-mobile-row gap-y-4 sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3">
        <CommentHeader comment={comment} />
        <CommentBody comment={comment} />
        <CommentReactions comment={comment} />
        {isCurrentUser ? (
          <SelfCommentActions commentID={comment.id} />
        ) : (
          <CommentActions commentID={comment.id} />
        )}
      </div>
      {comment.replies?.length > 0 && (
        <RepliesContainer replies={comment.replies} />
      )}
    </div>
  );
}

function CommentHeader({ comment }) {
  const { currentUser } = useCommentContext();
  const isCurrentUser = currentUser.username === comment.user.username;
  const [originalComment] = useState(comment.content);
  const isEdited = originalComment !== comment.content;

  return (
    <div className="comment-user-info col-span-2 row-start-1 flex items-center gap-5 sm:col-start-2 sm:self-start">
      <img className="w-8" src={comment.user.image.png}></img>
      <div className="comment-username font-semibold text-neutral-dark-blue sm:text-sm">
        {comment.user.username} {isCurrentUser ? <CurrentUserBadge /> : null}
      </div>
      <p className="text-neutral-grayish-blue sm:text-sm">
        <CommentTimer createdAt={comment.createdAt} />
        <span className="ml-2 font-semibold">{isEdited && "(Edited)"}</span>
      </p>
    </div>
  );
}

function CommentTimer({ createdAt }) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (typeof createdAt === "string") return <span>{createdAt}</span>;

  const elapsedTime = Math.floor((currentTime - createdAt) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <span>
      {minutes > 0
        ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
        : `${seconds} second${seconds > 1 ? "s" : ""} ago`}
    </span>
  );
}

function CommentBody({ comment }) {
  const { isEditing, currentCommentID } = useCommentContext();

  return (
    <div className="col-span-2 row-start-2 self-center sm:col-start-2">
      {isEditing && currentCommentID === comment.id ? (
        <UpdateComment commentID={comment.id} />
      ) : (
        <p className="leading-6 text-primary-soft-red sm:text-sm">
          {comment.content}
        </p>
      )}
    </div>
  );
}

function CommentReactions({ comment }) {
  return (
    <div className="comment-stats col-start-1 row-start-3 flex justify-between sm:row-span-2 sm:row-start-1">
      <div className="comment-reaction flex items-center gap-5 p-3 sm:flex-col sm:gap-3">
        <LikeButton comment={comment} />
        <p className="font-medium text-primary-moderate-blue">
          {comment.score}
        </p>
        <DislikeButton comment={comment} />
      </div>
    </div>
  );
}

function UpdateComment({ commentID }) {
  const { handleUpdateComment, setIsEditing } = useCommentContext();
  const [text, setText] = useState("");
  function handleUpdateBtn() {
    handleUpdateComment(commentID, text);
    setIsEditing(false);
  }
  return (
    <div className="update-content grid gap-5">
      <textarea
        className="update-text min-h-[100px] w-full resize-none rounded-md border border-red-700 px-6 py-4"
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="update-btn justify-self-end rounded-md bg-primary-moderate-blue px-7 py-3 font-medium uppercase text-white"
        onClick={handleUpdateBtn}
      >
        Update
      </button>
    </div>
  );
}

function LikeButton({ comment }) {
  const { handleReactions } = useCommentContext();

  return (
    <button
      className={`${
        comment.currentReaction === "like"
          ? "text-primary-moderate-blue"
          : "text-primary-light-grayish-blue"
      } hover:text-primary-moderate-blue`}
      onClick={() => handleReactions(comment.id, "like")}
    >
      <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

function DislikeButton({ comment }) {
  const { handleReactions } = useCommentContext();

  return (
    <button
      className={`${
        comment.currentReaction === "dislike"
          ? "text-primary-moderate-blue"
          : "text-primary-light-grayish-blue"
      } hover:text-primary-moderate-blue`}
      onClick={() => handleReactions(comment.id, "dislike")}
    >
      <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

function RepliesContainer({ replies }) {
  return (
    <div className="relative grid gap-10 pl-4 pt-12 before:absolute before:left-0 before:-ml-3 before:h-full before:w-[2px] before:bg-primary-soft-red/20 sm:pl-12 sm:before:ml-4">
      {replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
}

function Reply({ reply }) {
  const { currentUser } = useCommentContext();
  const isCurrentUser = currentUser.username === reply.user.username;
  return (
    <>
      <div
        className="grid gap-5 sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3"
        data-id={reply.id}
      >
        <CommentHeader comment={reply} />
        <CommentBody comment={reply} />
        <CommentReactions comment={reply} />
        {isCurrentUser ? (
          <SelfCommentActions commentID={reply.id} />
        ) : (
          <CommentActions commentID={reply.id} />
        )}
      </div>
      {reply.replies?.length > 0 && (
        <RepliesContainer replies={reply.replies} />
      )}
    </>
  );
}

function SelfCommentActions({ commentID }) {
  const { setShowDeleteModal, setCurrentCommentID, setIsEditing } =
    useCommentContext();

  function handleDeleteBtn() {
    setShowDeleteModal(true);
    setCurrentCommentID(commentID);
  }

  function handleEditBtn() {
    setCurrentCommentID(commentID);
    setIsEditing(true);
  }

  return (
    <>
      <div className="col-start-2 row-start-3 flex cursor-pointer items-center gap-5 justify-self-end sm:col-start-3 sm:row-start-1">
        <button
          className="delete-btn flex items-center gap-2 font-semibold text-primary-soft-red hover:opacity-50"
          onClick={handleDeleteBtn}
        >
          <img src="images/icon-delete.svg" alt=""></img>Delete
        </button>
        <button
          className="flex items-center gap-2 font-semibold text-primary-moderate-blue hover:opacity-50"
          onClick={handleEditBtn}
        >
          <img src="images/icon-edit.svg" alt=""></img>Edit
        </button>
      </div>
    </>
  );
}

function CommentActions({ commentID }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  function handleAddReply() {
    setShowReplyForm((show) => !show);
  }

  return (
    <>
      <div className="col-start-2 row-start-3 cursor-pointer self-center justify-self-end sm:col-start-3 sm:row-start-1">
        <button
          className="flex items-center gap-2 font-semibold text-primary-moderate-blue hover:opacity-40"
          onClick={handleAddReply}
        >
          <img src="images/icon-reply.svg" alt=""></img> Reply
        </button>
      </div>
      {showReplyForm && (
        <AddReplyForm
          setShowReplyForm={setShowReplyForm}
          commentID={commentID}
        />
      )}
    </>
  );
}

function ConfirmDeleteModal() {
  const { currentCommentID, handleDeleteComment, setShowDeleteModal } =
    useCommentContext();

  function handleConfirmDelete() {
    handleDeleteComment(currentCommentID);
    setShowDeleteModal(false);
  }

  return (
    <>
      <div className="absolute z-10 h-full w-full bg-black/80"></div>
      <div className="delete-comment-container absolute top-1/2 z-20 mx-4 grid max-w-[400px] -translate-y-1/2 gap-5 rounded-lg bg-white p-7">
        <h2 className="text-xl font-medium text-neutral-dark-blue">
          Delete comment
        </h2>
        <p className="text-base text-neutral-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="delete-comment-action grid grid-cols-2 gap-5 font-medium">
          <button
            className="cancel-deletion-btn rounded-xl bg-neutral-grayish-blue p-3 uppercase text-white hover:bg-neutral-grayish-blue/90"
            onClick={() => setShowDeleteModal(false)}
          >
            No, Cancel
          </button>
          <button
            className="confirm-delete-btn rounded-xl bg-primary-soft-red p-3 uppercase text-white hover:bg-primary-soft-red/90"
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </>
  );
}

function CurrentUserBadge() {
  return (
    <span className="ml-1 rounded-sm bg-primary-moderate-blue px-2 py-[3px] text-sm text-white">
      you
    </span>
  );
}

function AddCommentForm() {
  const [text, setText] = useState("");
  const { setComments } = useCommentContext();

  function handleAddComment(e) {
    e.preventDefault();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      content: text,
      createdAt: Date.now(),
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    setComments((comments) => [...comments, newComment]);
    setText("");
  }

  return (
    <form className="mt-10 grid w-full grid-cols-2 grid-rows-comment-desktop-row gap-5 sm:grid-cols-comment-desktop-grid sm:grid-rows-1 sm:items-center">
      <textarea
        className="col-span-2 w-full resize-none rounded-md border px-6 py-4 placeholder:text-neutral-grayish-blue sm:order-2 sm:row-start-1"
        placeholder="Add a comment..."
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="row-start-2 self-center sm:order-1 sm:row-start-1 sm:self-start">
        <img
          className="w-8 sm:w-10"
          src="./images/avatars/image-juliusomo.png"
          alt="Your image"
        />
      </div>
      <div className="row-start-2 justify-self-end sm:order-3 sm:row-start-1 sm:self-start">
        <button
          className="rounded-md bg-primary-moderate-blue px-7 py-3 font-medium uppercase text-white hover:bg-primary-moderate-blue/50"
          onClick={handleAddComment}
        >
          Send
        </button>
      </div>
    </form>
  );
}

function AddReplyForm({ commentID, setShowReplyForm }) {
  const [text, setText] = useState("");
  const { handleAddReply } = useCommentContext();

  function handleAddReplyForm(e) {
    e.preventDefault();
    handleAddReply(commentID, text);
    setShowReplyForm(false);
  }

  return (
    <form
      className="add-reply-form col-span-3 mt-10 grid w-full grid-cols-2 grid-rows-comment-desktop-row gap-5 sm:grid-cols-comment-desktop-grid sm:grid-rows-1 sm:items-center"
      onSubmit={handleAddReplyForm}
    >
      <textarea
        className="reply-text col-span-2 w-full resize-none rounded-md border px-6 py-4 placeholder:text-neutral-grayish-blue sm:order-2 sm:row-start-1"
        placeholder="Add a Reply..."
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="comment-user-img row-start-2 self-center sm:order-1 sm:row-start-1 sm:self-start">
        <img
          className="w-8 sm:w-10"
          src="images/avatars/image-juliusomo.png"
          alt=""
        />
      </div>
      <div className="form-actions row-start-2 justify-self-end sm:order-3 sm:row-start-1 sm:self-start">
        <button className="rounded-md bg-primary-moderate-blue px-7 py-3 font-medium uppercase text-white hover:opacity-50">
          Reply
        </button>
      </div>
    </form>
  );
}

export default App;
