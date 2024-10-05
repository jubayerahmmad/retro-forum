const loadAllPosts = async (category) => {
  document.getElementById("post-container").innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await response.json();
  displayAllPost(data.posts);
};

const displayAllPost = (posts) => {
  const postContainer = document.getElementById("post-container");
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div
              class="post flex justify-around items-center gap-10 border-2 border-gray-300 rounded-2xl p-6"
            >
              <!-- avatar -->
              <div class="avatars w-1/6">
              <div class="indicator">
                 <span class="indicator-item badge badge-${
                   post.isActive === true ? "success" : "secondary"
                 }"></span>
                   <div id="avatar" class="avatar flex justify-center items-center">
                  <div class="w-24 rounded-full">
                    <img src="${post.image}" />
                   </div>
                 </div>
                </div>
              </div>
              <!-- text-content -->
              <div class="content w-5/6">
                <div class="hashtag flex gap-6">
                  <p># Music</p>
                  <p>Author: <span>${post.author.name}</span></p>
                </div>
                <div
                  class="border-b-2 border-dashed border-gray-200 py-2 space-y-2"
                >
                  <h3 class="text-3xl font-bold">${post.title}</h3>
                  <p class="text-gray-600">
                    ${post.description}
                  </p>
                </div>
                <!-- icons -->
                <div class="last-row flex justify-between items-center">
                  <div class="icons flex gap-6 mt-4">
                    <p>
                      <i class="fa-regular fa-comment-dots"></i>
                      <span>${post.comment_count}</span>
                    </p>
                    <p>
                      <i class="fa-regular fa-eye"></i>
                      <span>${post.view_count}</span>
                    </p>
                    <p>
                      <i class="fa-regular fa-clock"></i>
                      <span>${post.posted_time}</span>
                    </p>
                  </div>
                  <button id="addToList" onclick ="markAsRead('${
                    post.description
                  }', '${
      post.view_count
    }')" class="btn btn-outline btn-circle btn-sm mt-2">
                    <i
                      class="fa-regular fa-envelope-open text-green-700"
                    ></i>
                  </button>
                </div>
              </div>
            </div>   
    `;
    postContainer.appendChild(div);
  });
};

const markAsRead = (description, viewCount) => {
  const markAsReadContainer = document.getElementById("markAsReadContainer");

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex justify-between items-center bg-white p-4 rounded-xl">
            <div class="desc text-xl font-bold">${description}</div>
                  <div>
                    <p class="flex items-center">
                      <i class="fa-regular fa-eye"></i>
                      ${viewCount}
                    </p>
                  </div>
       </div>
  `;
  markAsReadContainer.appendChild(div);

  let markAsReadCounter = parseFloat(
    document.getElementById("markAsReadCounter").innerText
  );
  document.getElementById("markAsReadCounter").innerText =
    markAsReadCounter + 1;
};

const loadLatestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPost(data);
};

const displayLatestPost = (latest) => {
  const latestPostContainer = document.getElementById("latest-post-container");

  latest.forEach((latestPost) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
              <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                <img src="${
                  latestPost.cover_image
                }" alt="Shoes" class="rounded-xl" />
              </figure>
              <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i
                  >${latestPost.author?.posted_date || "No Publish Date"}
                </p>
                <h2 class="card-title text-start">${latestPost.title}</h2>
                <p class="text-start">${latestPost.description}</p>
                <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                    <div
                      class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <img src="${latestPost.profile_image}" />
                    </div>
                  </div>
                  <div>
                    <h3 class="text-start font-extrabold">${
                      latestPost.author.name
                    }</h3>
                    <p class="text-start opacity-60">
                    ${
                      latestPost.author?.designation
                        ? latestPost.author?.designation
                        : "Unknown"
                    }
                     
                    </p>
                  </div>
                </div>
  
                <span
                  id="latestPostLoader"
                  class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
                >
                </span>
                <!-- dynamic content -->
              </div>
            </div>`;

    latestPostContainer.appendChild(div);
  });
};

loadAllPosts();
loadLatestPosts();
const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value;
  loadAllPosts(searchText);
};
