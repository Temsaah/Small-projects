let currentUser;
let comments;
let commentsContainer = document.querySelector(".comments-container");
let addCommentForm = document.querySelector(".add-comment-form");
const date = Date.now();

addCommentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let textArea = e.target[0];

  if (!textArea.value) return;

  addComment(textArea.value);
  textArea.value = "";
});

addCommentForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    let textArea = e.target;
    if (!textArea.value) return;
    addComment(textArea.value);
    textArea.value = "";
  }
});

async function fetchData() {
  const data = await fetch("data.json");
  const res = await data.json();

  ({ comments, currentUser } = res);
  console.log("🚀 ~ currentUser:", comments);

  createComments(comments);
}

async function addComment(content) {
  const lastComment = comments[comments.length - 1];
  const lastID =
    lastComment.replies.length > 0
      ? lastComment.replies[lastComment.replies.length - 1].id
      : lastComment.id;

  const comment = {
    id: lastID + 1,
    content,
    createdAt: "0 seconds ago",
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    replies: [],
  };

  comments.push(comment);
  createComments(comments);
}

function createComments(comments) {
  commentsContainer.textContent = "";
  let commentsHTML = "";

  for (let comment of comments) {
    const isCurrentUser = comment.user.username === currentUser.username;

    let commentHTML = `
      <div class="comment-container grid gap-5">
        <div class="comment grid grid-cols-comment-mobile-col grid-rows-comment-mobile-row gap-y-4 sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3">
          
          <div class="comment-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
            <img class="w-8" src="${comment.user.image.png}" alt="">
            <p class="text-neutral-dark-blue font-semibold">${
              comment.user.username
            } ${
      isCurrentUser
        ? `<span class="ml-1 text-sm py-[2px] px-2 rounded-sm text-white bg-primary-moderate-blue">you</span>`
        : ""
    }</p>
            <p class="text-neutral-grayish-blue">${comment.createdAt}</p>
          </div>

          <div class="comment-content row-start-2  col-span-2 self-center sm:col-start-2 ">
            <p class="text-primary-soft-red">${comment.content}</p>
          </div>

          <div class="comment-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2 ">
            <div class="comment-reaction flex gap-5 items-center p-3 sm:gap-3 sm:flex-col">
              <img src="images/icon-plus.svg" alt="">
              <p class="text-primary-moderate-blue font-medium">${
                comment.score
              }</p>
              <img src="images/icon-minus.svg" alt="">
            </div>
          </div>

          <div class="comment-reply-btn-container justify-self-end col-start-2 row-start-3 flex gap-2 items-center sm:row-start-1 sm:col-start-3">
            <img src="images/icon-reply.svg" alt="">
            <button class="text-primary-moderate-blue font-semibold">Reply</button>
          </div>

        </div>
      `;

    commentsHTML += createReplies(commentHTML, comment) + "</div>";
  }

  renderComments(commentsHTML);
}

function createReplies(commentHTML, comment) {
  if (comment.replies.length > 0) {
    let repliesHTML = `<div class="replies-container relative grid gap-10 pt-16 pl-4 sm:pl-12 before:absolute before:-ml-3 sm:before:ml-4 before:left-0 before:w-[2px] before:h-full before:bg-primary-soft-red/20  ">`;

    for (let reply of comment.replies) {
      const isCurrentUser = reply.user.username === currentUser.username;
      console.log(reply.user);

      repliesHTML += `<div class="reply-container grid gap-5  sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3 ">
        <div class="reply-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
          <img class="w-8" src="${reply.user.image.png}" alt="">
          <p class="text-neutral-dark-blue font-semibold">${
            reply.user.username
          } ${
        isCurrentUser
          ? `<span class="ml-1 text-sm py-[3px] px-2 rounded-sm text-white bg-primary-moderate-blue">you</span>`
          : ""
      }</p>
          <p class="text-neutral-grayish-blue">${reply.createdAt}</p>
        </div>
        <div class="reply-content row-start-2  col-span-2 self-center sm:col-start-2 ">
          <p class="text-primary-soft-red">${reply.content}</p>
        </div>
        <div class="reply-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2 ">
          <div class="reply-reaction flex gap-3 items-center p-3 sm:flex-col">
            <img src="images/icon-plus.svg" alt="">
            <p class="text-primary-moderate-blue font-medium">${reply.score}</p>
            <img src="images/icon-minus.svg" alt="">
          </div>
        </div>
        ${
          isCurrentUser
            ? `<div class="reply-action justify-self-end col-start-2 row-start-3 flex gap-5 items-center sm:row-start-1 sm:col-start-3">
              <button class="delete-btn flex gap-2 items-center text-primary-soft-red font-semibold"><img src="images/icon-delete.svg" alt="">Delete</button>
              <button class="edit-btn flex gap-2 items-center text-primary-moderate-blue font-semibold"><img src="images/icon-edit.svg" alt="">Edit</button>
            </div>`
            : `<div class="reply-action justify-self-end col-start-2 row-start-3 flex gap-2 items-center  sm:row-start-1 sm:col-start-3">
          <img src="images/icon-reply.svg" alt="">
          <button class="reply-btn text-primary-moderate-blue font-semibold">Reply</button>
        </div>`
        }
      </div>`;
    }

    repliesHTML += "</div>";
    commentHTML += repliesHTML;
  }

  return commentHTML;
}

function renderComments(commentsHTML) {
  commentsContainer.insertAdjacentHTML("beforeend", commentsHTML);
}

fetchData();
