import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
/* eslint-disable react/prop-types */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("data.json");
      const res = await data.json();

      setCurrentUser(res.currentUser);
      setComments(res.comments);
    }

    fetchData();
    console.log("DATA FETCHED");
  }, []);

  return (
    <Main>
      <Overlay />
      <CommentsContainer currentUser={currentUser} comments={comments} />
      <AddCommentForm />
    </Main>
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

function CommentsContainer({ currentUser, comments }) {
  console.log(comments);
  return (
    <div className="grid gap-10">
      {comments.map((comment) => (
        <CommentContainer
          key={comment.id}
          isCurrentUser={comment.user.username === currentUser.username}
          comment={comment}
        />
      ))}
    </div>
  );
}

function CommentContainer({ isCurrentUser, comment }) {
  return (
    <div className="comment-container grid gap-5">
      <div className="comment grid grid-cols-comment-mobile-col grid-rows-comment-mobile-row gap-y-4 sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3">
        <div className="comment-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
          <img className="w-8" src={comment.user.image.png}></img>
          <div className="comment-username text-neutral-dark-blue font-semibold sm:text-sm">
            {comment.user.username}{" "}
            {isCurrentUser ? <CurrentUserBadge /> : null}
          </div>
          <p className="text-neutral-grayish-blue sm:text-sm">
            {comment.createdAt}
          </p>
        </div>
        <div className="row-start-2  col-span-2 self-center sm:col-start-2">
          <p className="text-primary-soft-red sm:text-sm leading-6">
            {comment.content}
          </p>
        </div>
        <div className="comment-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2">
          <div className="comment-reaction flex gap-5 items-center p-3 sm:gap-3 sm:flex-col">
            <LikeButton />
            <DislikeButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function LikeButton() {}

function DislikeButton() {}

function CurrentUserBadge() {
  return (
    <span className="ml-1 text-sm py-[3px] px-2 rounded-sm text-white bg-primary-moderate-blue">
      you
    </span>
  );
}

function AddCommentForm() {
  return (
    <form className="mt-10 grid grid-cols-2 grid-rows-comment-desktop-row gap-5 w-full sm:grid-rows-1 sm:grid-cols-comment-desktop-grid sm:items-center">
      <textarea
        className="border col-span-2 sm:row-start-1 sm:order-2 placeholder:text-neutral-grayish-blue w-full rounded-md px-6 py-4 resize-none"
        placeholder="Add a comment..."
        rows={3}
      ></textarea>
      <div className="row-start-2 self-center sm:self-start sm:row-start-1 sm:order-1 ">
        <img
          className="w-8 sm:w-10"
          src="./images/avatars/image-juliusomo.png"
          alt="Your image"
        />
      </div>
      <div className="row-start-2 justify-self-end sm:self-start sm:row-start-1 sm:order-3">
        <button className="uppercase bg-primary-moderate-blue hover:bg-primary-moderate-blue/50 text-white font-medium py-3 px-7 rounded-md">
          Send
        </button>
      </div>
    </form>
  );
}

export default App;
