/* TODO
Manipulate the score property in comments object for liking and disliking instead of copying and manipulating the state
*/

import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { CommentProvider, useCommentContext } from "./CommentsContext";
/* eslint-disable react/prop-types */

function App() {
  return (
    <CommentProvider>
      <Main>
        <Overlay />
        <CommentsContainer />
        <AddCommentForm />
      </Main>
    </CommentProvider>
  );
}

function Overlay() {
  return (
    <div className="hidden overlay absolute top-0 w-screen h-screen bg-black opacity-60 z-10"></div>
  );
}

function Main({ children }) {
  return <main className="my-10 mx-6 max-w-[700px]">{children}</main>;
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

  return (
    <div className="comment-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
      <img className="w-8" src={comment.user.image.png}></img>
      <div className="comment-username text-neutral-dark-blue font-semibold sm:text-sm">
        {comment.user.username} {isCurrentUser ? <CurrentUserBadge /> : null}
      </div>
      <p className="text-neutral-grayish-blue sm:text-sm">
        {comment.createdAt}
      </p>
    </div>
  );
}

function CommentBody({ comment }) {
  return (
    <div className="row-start-2  col-span-2 self-center sm:col-start-2">
      <p className="text-primary-soft-red sm:text-sm leading-6">
        {comment.content}
      </p>
    </div>
  );
}

function CommentReactions({ comment }) {
  return (
    <div className="comment-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2">
      <div className="comment-reaction flex gap-5 items-center p-3 sm:gap-3 sm:flex-col">
        <LikeButton comment={comment} />
        <p className="text-primary-moderate-blue font-medium">
          {comment.score}
        </p>
        <DislikeButton comment={comment} />
      </div>
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
    <div className="relative grid gap-10 pt-12 pl-4 sm:pl-12 before:absolute before:-ml-3 sm:before:ml-4 before:left-0 before:w-[2px] before:h-full before:bg-primary-soft-red/20">
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
        className="grid gap-5  sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3"
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

function SelfCommentActions() {
  return (
    <>
      <div className="cursor-pointer justify-self-end col-start-2 row-start-3 flex gap-5 items-center sm:row-start-1 sm:col-start-3">
        <button className="delete-btn flex gap-2 items-center text-primary-soft-red font-semibold hover:opacity-50">
          <img src="images/icon-delete.svg" alt=""></img>Delete
        </button>
        <button className="flex gap-2 items-center text-primary-moderate-blue font-semibold hover:opacity-50">
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
      <div className="cursor-pointer justify-self-end self-center col-start-2 row-start-3 sm:row-start-1 sm:col-start-3">
        <button
          className="flex gap-2 items-center hover:opacity-40 text-primary-moderate-blue font-semibold"
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
  return (
    <div className="delete-comment-container mx-4 p-7 bg-white absolute z-20 top-1/2 -translate-y-1/2 grid gap-5 rounded-lg max-w-[400px]">
      <h2 className="text-xl text-neutral-dark-blue font-medium">
        Delete comment
      </h2>
      <p className="text-base text-neutral-grayish-blue">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="delete-comment-action grid grid-cols-2 gap-5 font-medium">
        <button className="cancel-deletion-btn uppercase bg-neutral-grayish-blue hover:bg-neutral-grayish-blue/90 text-white p-3 rounded-xl">
          No, Cancel
        </button>
        <button className="confirm-delete-btn uppercase bg-primary-soft-red hover:bg-primary-soft-red/90 text-white p-3 rounded-xl">
          Yes, Delete
        </button>
      </div>
    </div>
  );
}

function CurrentUserBadge() {
  return (
    <span className="ml-1 text-sm py-[3px] px-2 rounded-sm text-white bg-primary-moderate-blue">
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
      createdAt: "0 seconds ago",
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
    <form className="mt-10 grid grid-cols-2 grid-rows-comment-desktop-row gap-5 w-full sm:grid-rows-1 sm:grid-cols-comment-desktop-grid sm:items-center">
      <textarea
        className="border col-span-2 sm:row-start-1 sm:order-2 placeholder:text-neutral-grayish-blue w-full rounded-md px-6 py-4 resize-none"
        placeholder="Add a comment..."
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="row-start-2 self-center sm:self-start sm:row-start-1 sm:order-1 ">
        <img
          className="w-8 sm:w-10"
          src="./images/avatars/image-juliusomo.png"
          alt="Your image"
        />
      </div>
      <div className="row-start-2 justify-self-end sm:self-start sm:row-start-1 sm:order-3">
        <button
          className="uppercase bg-primary-moderate-blue hover:bg-primary-moderate-blue/50 text-white font-medium py-3 px-7 rounded-md"
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
      className="add-reply-form col-span-3  mt-10 grid grid-cols-2 grid-rows-comment-desktop-row gap-5 w-full sm:grid-rows-1 sm:grid-cols-comment-desktop-grid sm:items-center "
      onSubmit={handleAddReplyForm}
    >
      <textarea
        className="reply-text border col-span-2 sm:row-start-1 sm:order-2 placeholder:text-neutral-grayish-blue w-full rounded-md px-6 py-4 resize-none"
        placeholder="Add a Reply..."
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="comment-user-img row-start-2 self-center sm:self-start sm:row-start-1 sm:order-1 ">
        <img
          className="w-8 sm:w-10"
          src="images/avatars/image-juliusomo.png"
          alt=""
        />
      </div>
      <div className="form-actions row-start-2 justify-self-end sm:self-start sm:row-start-1 sm:order-3">
        <button className="uppercase hover:opacity-50 bg-primary-moderate-blue text-white font-medium py-3 px-7 rounded-md">
          Reply
        </button>
      </div>
    </form>
  );
}

export default App;
