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

  updateComments(comments);
}

function addComment(content) {
  const comment = {
    id: Date.now(),
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
  updateComments(comments);
}

function addReply(contentID, content, commenter, replyingTo) {
  const reply = {
    id: Date.now(),
    content,
    createdAt: "0 seconds ago",
    score: 0,
    replyingTo,
    user: {
      image: {
        png: `./images/avatars/image-${commenter}.png`,
        webp: `./images/avatars/image-${commenter}.webp`,
      },
      username: `${commenter}`,
    },
    replies: [],
  };

  const parentComment = findCommentById(comments, +contentID);

  if (parentComment) parentComment.replies.push(reply);

  updateComments(comments);
}

function findCommentById(comments, id) {
  for (let comment of comments) {
    if (comment.id === id) return comment;

    if (comment.replies?.length > 0) {
      const found = findCommentById(comment.replies, id);
      if (found) return found;
    }
  }

  return null;
}

function deleteCommentById(comments, id) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      comments.splice(i, 1);
      return;
    }

    if (comments[i].replies?.length > 0) {
      deleteCommentById(comments[i].replies, id);
    }
  }

  return null;
}

function updateComments(comments) {
  commentsContainer.textContent = "";
  let commentsHTML = "";

  for (let comment of comments) {
    const isCurrentUser = comment.user.username === currentUser.username;

    const styledComment = styleComment(comment.content);

    let commentHTML = `
      <div class="comment-container grid gap-5">
        <div class="comment grid grid-cols-comment-mobile-col grid-rows-comment-mobile-row gap-y-4 sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3" data-id="${
          comment.id
        }">
          
          <div class="comment-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
            <img class="w-8" src="${comment.user.image.png}" alt="">
            <p class="comment-username text-neutral-dark-blue font-semibold sm:text-sm">${
              comment.user.username
            }${
      isCurrentUser
        ? `<span class="ml-1 text-sm py-[3px] px-2 rounded-sm text-white bg-primary-moderate-blue">you</span>`
        : ""
    }</p>
            <p class="text-neutral-grayish-blue sm:text-sm">${
              comment.createdAt
            }</p>
          </div>

          <div class="row-start-2  col-span-2 self-center sm:col-start-2 ">
            <p class="comment-content text-primary-soft-red sm:text-sm leading-6">${styledComment}</p>
          </div>

          <div class="comment-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2 ">
            <div class="comment-reaction flex gap-5 items-center p-3 sm:gap-3 sm:flex-col">
              <button class="like-btn ${
                currentUser.likes?.has(comment.id) ? "clicked" : ""
              } text-primary-light-grayish-blue hover:text-primary-moderate-blue"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg></button>
            <p class="text-primary-moderate-blue font-medium">${
              comment.score
            }</p>
              <button class="dislike-btn ${
                currentUser.dislikes?.has(comment.id) ? "clicked" : ""
              } text-primary-light-grayish-blue hover:text-primary-moderate-blue"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg></button>

            </div>
          </div>

          
          ${
            isCurrentUser
              ? `<div class="self-comment-reply-action cursor-pointer justify-self-end col-start-2 row-start-3 flex gap-5 items-center sm:row-start-1 sm:col-start-3">
                <button class="delete-btn flex gap-2 items-center text-primary-soft-red font-semibold hover:opacity-50"><img src="images/icon-delete.svg" alt="">Delete</button>
                <button class="edit-btn flex gap-2 items-center text-primary-moderate-blue font-semibold hover:opacity-50"><img src="images/icon-edit.svg" alt="">Edit</button>
              </div>`
              : `<div class="comment-reply-action cursor-pointer justify-self-end col-start-2 row-start-3 sm:row-start-1 sm:col-start-3">
            
            <button class="reply-reply-btn flex gap-2 items-center hover:opacity-40 text-primary-moderate-blue font-semibold"><img src="images/icon-reply.svg" alt=""> Reply</button>
          </div>`
          }

        </div>
      `;

    commentsHTML += createReplies(commentHTML, comment) + "</div>";
  }

  renderComments(commentsHTML);
}

function styleComment(comment) {
  const commentArr = comment.split(" ");

  const styledComment = commentArr.map((word) => {
    if (word.startsWith("@")) {
      return `<span class="text-primary-moderate-blue font-semibold">${word}</span>`;
    }
    return word;
  });

  return styledComment.join(" ");
}

function createReplies(parentHTML, comment) {
  if (!comment) return;

  if (comment.replies?.length > 0) {
    let repliesHTML = `<div class="replies-container relative grid gap-10 pt-12 pl-4 sm:pl-12 before:absolute before:-ml-3 sm:before:ml-4 before:left-0 before:w-[2px] before:h-full before:bg-primary-soft-red/20  ">`;

    for (let reply of comment.replies) {
      const isCurrentUser = reply.user.username === currentUser.username;
      const styledReply = styleComment(reply.content);

      let replyHTML = `<div class="reply grid gap-5  sm:grid-cols-comment-desktop-grid sm:grid-rows-comment-desktop-row sm:gap-x-5 sm:gap-y-3" data-id="${
        reply.id
      }">
        <div class="reply-user-info row-start-1 col-span-2 flex items-center gap-5 sm:col-start-2 sm:self-start">
          <img class="w-8" src="${reply.user.image.png}" alt="">
          <p class="reply-username text-neutral-dark-blue font-semibold sm:text-sm">${
            reply.user.username
          }${
        isCurrentUser
          ? `<span class="ml-1 text-sm py-[3px] px-2 rounded-sm text-white bg-primary-moderate-blue">you</span>`
          : ""
      }</p>
          <p class="text-neutral-grayish-blue text-sm">${reply.createdAt}</p>
        </div>
        <div class="row-start-2  col-span-2 self-center sm:col-start-2 ">
          <p class="reply-content sm:text-sm text-primary-soft-red"><span class="text-primary-moderate-blue font-medium">@${
            reply.replyingTo
          } </span>${styledReply}</p>
        </div>
        <div class="reply-stats col-start-1 row-start-3 flex justify-between sm:row-start-1 sm:row-span-2 ">
          <div class="reply-reaction flex gap-3 items-center p-3 sm:flex-col">
              <button class="like-btn ${
                currentUser.likes?.has(reply.id) ? "clicked" : ""
              } text-primary-light-grayish-blue hover:text-primary-moderate-blue"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg></button>
            <p class="text-primary-moderate-blue font-medium">${reply.score}</p>
              <button class="dislike-btn ${
                currentUser.dislikes?.has(reply.id) ? "clicked" : ""
              } text-primary-light-grayish-blue hover:text-primary-moderate-blue"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg></button>
          </div>
        </div>
        ${
          isCurrentUser
            ? `<div class="self-reply-reply-action cursor-pointer justify-self-end col-start-2 row-start-3 flex gap-5 items-center sm:row-start-1 sm:col-start-3">
              <button class="delete-btn hover:opacity-50 flex gap-2 items-center text-primary-soft-red font-semibold"><img src="images/icon-delete.svg" alt="">Delete</button>
              <button class="edit-btn flex gap-2 items-center text-primary-moderate-blue font-semibold hover:opacity-50"><img src="images/icon-edit.svg" alt="">Edit</button>
            </div>`
            : `<div class="reply-reply-action cursor-pointer justify-self-end col-start-2 row-start-3 flex gap-2 items-center  sm:row-start-1 sm:col-start-3">
          
          <button class="reply-reply-btn flex gap-2 items-center hover:opacity-50 text-primary-moderate-blue font-semibold"><img src="images/icon-reply.svg" alt=""> Reply</button>
        </div>`
        }
      </div>`;

      replyHTML = createReplies(replyHTML, reply);

      repliesHTML += replyHTML;
    }

    repliesHTML += "</div>";
    parentHTML += repliesHTML;
  }

  return parentHTML;
}

function renderComments(commentsHTML) {
  commentsContainer.insertAdjacentHTML("beforeend", commentsHTML);
}

commentsContainer.addEventListener("click", (e) => {
  const commentReplyBtn = e.target?.closest(".comment-reply-action");
  const replyReplyBtn = e.target?.closest(".reply-reply-action");

  if (commentReplyBtn || replyReplyBtn) {
    handleReplyAction(commentReplyBtn, replyReplyBtn);
    return;
  }

  let likeBtn = e.target.closest(".like-btn");
  let dislikeBtn = e.target.closest(".dislike-btn");

  if (likeBtn || dislikeBtn) {
    handleReactionsBtn(likeBtn, dislikeBtn);
    return;
  }

  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");

  if (editBtn || deleteBtn) {
    handleSelfComment(editBtn, deleteBtn);
    return;
  }
});

function handleReplyAction(commentReplyBtn, replyReplyBtn) {
  let commentContainer, userName, isReply;

  if (commentReplyBtn) {
    commentContainer = commentReplyBtn.closest(".comment");
    userName = commentContainer.querySelector(".comment-username").textContent;
    isReply = false;
  } else if (replyReplyBtn) {
    commentContainer = replyReplyBtn.closest(".reply");
    userName = commentContainer.querySelector(".reply-username").textContent;
    isReply = true;
  }

  const addReplyForm = commentContainer.querySelector(".add-reply-form");

  if (commentReplyBtn || replyReplyBtn) {
    if (addReplyForm) {
      addReplyForm.remove();
      return;
    }
  }

  const replyFormHTML = `<form class="add-reply-form col-span-3  mt-10 grid grid-cols-2 grid-rows-comment-desktop-row gap-5 w-full sm:grid-rows-1 sm:grid-cols-comment-desktop-grid sm:items-center" action="">
        <textarea
          class="reply-text border col-span-2 sm:row-start-1 sm:order-2 placeholder:text-neutral-grayish-blue w-full rounded-md px-6 py-4"
          placeholder="Add a comment..."
          rows="3"
        ></textarea>
        <div class="comment-user-img row-start-2 self-center sm:self-start sm:row-start-1 sm:order-1 ">
          <img class="w-8 sm:w-10" src="images/avatars/image-juliusomo.png" alt="" />
        </div>
        <div class="form-actions row-start-2 justify-self-end sm:self-start sm:row-start-1 sm:order-3">
          <button
            class="uppercase hover:opacity-50 bg-primary-moderate-blue text-white font-medium py-3 px-7 rounded-md"
          >
            Reply
          </button>
        </div>
      </form>`;

  commentContainer.insertAdjacentHTML("beforeend", replyFormHTML);

  const replyForm = commentContainer.querySelector(".add-reply-form");
  const replyTextArea = commentContainer.querySelector(".reply-text");
  console.log("🚀 ~ handleReplyAction ~ replyTextArea:", replyTextArea.value);

  replyTextArea.focus();

  replyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const contentID =
      commentReplyBtn?.closest(".comment").dataset.id ||
      replyReplyBtn?.closest(".reply").dataset.id;
    addReply(contentID, replyTextArea.value, currentUser.username, userName);
  });
}

function handleReactionsBtn(likeBtn, dislikeBtn) {
  if (likeBtn || dislikeBtn) {
    if (!currentUser["likes"]) {
      currentUser["likes"] = new Set();
    }

    if (!currentUser["dislikes"]) {
      currentUser["dislikes"] = new Set();
    }
  }

  if (likeBtn) {
    const commentID =
      +likeBtn.closest(".comment")?.dataset.id ||
      +likeBtn.closest(".reply")?.dataset.id;

    const comment = findCommentById(comments, +commentID);

    if (currentUser.dislikes?.has(commentID)) {
      currentUser.likes.add(commentID);
      comment.score += 2;
      currentUser.dislikes.delete(commentID);
    } else if (currentUser.likes.has(commentID)) {
      currentUser.likes.delete(commentID);
      comment.score--;
    } else {
      currentUser.likes.add(commentID);
      comment.score++;
    }

    updateComments(comments);
  }

  if (dislikeBtn) {
    const commentID =
      +dislikeBtn.closest(".comment")?.dataset.id ||
      +dislikeBtn.closest(".reply")?.dataset.id;

    const comment = findCommentById(comments, +commentID);

    if (currentUser.likes?.has(commentID)) {
      currentUser.likes.delete(commentID);
      comment.score -= 2;
      currentUser.dislikes.add(commentID);
    } else if (currentUser.dislikes.has(commentID)) {
      currentUser.dislikes.delete(commentID);
      comment.score++;
    } else {
      currentUser.dislikes.add(commentID);
      comment.score--;
    }
    updateComments(comments);
  }
}

function handleSelfComment(editBtn, deleteBtn) {
  if (deleteBtn) {
    const commentID =
      +deleteBtn.closest(".comment")?.dataset.id ||
      +deleteBtn.closest(".reply")?.dataset.id;
    handleDeleteBtn(commentID);
  }

  if (editBtn) {
    const parentContainer =
      editBtn.closest(".reply") || editBtn.closest(".comment");

    const content =
      parentContainer.querySelector(".reply-content") ||
      parentContainer.querySelector(".comment-content");

    const contentParent = content.parentElement;

    const text = content.textContent;

    const updateContainerHTML = `<div class="update-content grid gap-5">
                <textarea class="rounded-md update-text border border-red-700 w-full resize-none py-4 px-6 min-h-[100px]" name="" id=""></textarea>
                <button
            class="update-btn justify-self-end uppercase bg-primary-moderate-blue text-white font-medium py-3 px-7 rounded-md"
          >
            Update
          </button>
              </div>`;

    content.remove();

    contentParent.insertAdjacentHTML("beforeend", updateContainerHTML);

    const updateText = contentParent.querySelector(".update-text");
    updateText.focus();

    updateText.value = text
      .split(" ")
      .filter((word) => !word.startsWith("@"))
      .join(" ");

    const updateBtn = parentContainer.querySelector(".update-btn");

    updateBtn.addEventListener("click", () => {
      const comment = findCommentById(comments, +parentContainer.dataset.id);
      comment.content = updateText.value;
      updateComments(comments);
    });
  }
}

function handleDeleteBtn(commentID) {
  const overlay = document.querySelector(".overlay");

  overlay.classList.remove("hidden");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="delete-comment-container mx-4 p-7 bg-white absolute z-20 top-1/2 -translate-y-1/2 grid gap-5 rounded-lg max-w-[400px]">
      <h2 class="text-xl text-neutral-dark-blue font-medium">Delete comment</h2>
      <p class="text-base text-neutral-grayish-blue">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      <div class="delete-comment-action grid grid-cols-2 gap-5 font-medium">
        <button class="cancel-deletion-btn uppercase bg-neutral-grayish-blue hover:bg-neutral-grayish-blue/90 text-white p-3 rounded-xl">No, Cancel</button>
        <button class="confirm-delete-btn uppercase bg-primary-soft-red hover:bg-primary-soft-red/90 text-white p-3 rounded-xl">Yes, Delete</button>
      </div>
    </div>`
  );

  const deletionContainer = document.querySelector(".delete-comment-container");
  const cancelDeletionBtn = document.querySelector(".cancel-deletion-btn");
  const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");

  cancelDeletionBtn.focus();

  deletionContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      confirmDeleteBtn.click();
    }
  });

  cancelDeletionBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    document.querySelector(".delete-comment-container").remove();
    document.body.classList.remove("overflow-hidden");
  });

  confirmDeleteBtn.addEventListener("click", () => {
    deleteCommentById(comments, commentID);
    updateComments(comments);
    overlay.classList.add("hidden");
    document.querySelector(".delete-comment-container").remove();
    document.body.classList.remove("overflow-hidden");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList.add("overflow-hidden");
}

fetchData();
