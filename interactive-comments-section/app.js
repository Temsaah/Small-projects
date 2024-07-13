let currentUser;
let commentsContainer = document.querySelector(".comments-container");

async function fetchData() {
  const data = await fetch("data.json");
  const res = await data.json();

  currentUser = res.currentUser;
  createComments(res.comments);
}

function createComments(comments) {
  let commentsHTML = "";

  for (let comment of comments) {
    commentsHTML += `<div class="comment-container grid gap-5">
        <div class="comment-user-info flex items-center gap-5">
          <img class="w-8" src="${comment.user.image.png}" alt="">
          <p class="text-neutral-dark-blue font-semibold">${comment.user.username}</p>
          <p class="text-neutral-grayish-blue">${comment.createdAt}</p>
        </div>
        <div class="comment">
          <p class="text-primary-soft-red">${comment.content}</p>
        </div>
        <div class="comment-stats flex justify-between">
          <div class="comment-reaction flex gap-5 items-center p-3">
            <img src="images/icon-plus.svg" alt="">
            <p class="text-primary-moderate-blue font-medium">${comment.score}</p>
            <img src="images/icon-minus.svg" alt="">
          </div>
          <div class="comment-reply flex gap-2 items-center">
            <img src="images/icon-reply.svg" alt="">
            <button class="text-primary-moderate-blue font-semibold">Reply</button>
          </div>
        </div>
      `;

    commentsHTML = createReplies(commentsHTML, comment);

    renderComments(commentsHTML);
  }
}

function createReplies(commentsHTML, comment) {
  if (comment.replies.length > 0) {
    const replyContainerHTML = `<div class="replies-container grid gap-10 px-5 pt-5 ">`;
    commentsHTML += replyContainerHTML;

    for (let reply of comment.replies) {
      commentsHTML += `<div class="reply-container grid gap-5 ">
        <div class="reply-user-info flex items-center gap-4">
          <img class="w-8" src="${reply.user.image.png}" alt="">
          <p class="text-neutral-dark-blue font-semibold">${reply.user.username}</p>
          <p class="text-neutral-grayish-blue">${reply.createdAt}</p>
        </div>
        <div class="reply">
          <p class="text-primary-soft-red">${reply.content}</p>
        </div>
        <div class="reply-stats flex justify-between">
          <div class="reply-reaction flex gap-5 items-center p-3">
            <img src="images/icon-plus.svg" alt="">
            <p class="text-primary-moderate-blue font-medium">${reply.score}</p>
            <img src="images/icon-minus.svg" alt="">
          </div>
          <div class="reply-reply flex gap-2 items-center">
            <img src="images/icon-reply.svg" alt="">
            <button class="text-primary-moderate-blue font-semibold">Reply</button>
          </div>
        </div>
      </div>`;
    }

    commentsHTML += `</div></div>`;
  } else {
    commentsHTML += `</div>`;
  }
  console.log(commentsHTML);
  return commentsHTML;
}

function renderComments(commentsHTML) {
  commentsContainer.insertAdjacentHTML("beforeend", commentsHTML);
}

fetchData();
