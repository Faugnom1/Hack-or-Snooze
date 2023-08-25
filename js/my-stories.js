"use strict";

// This is the global list of the stories, an instance of StoryList
let myStories;

/** Get and show stories when site first loads. */

async function getAndShowMyStories() {
  currentUser = await User.loginViaStoredCredentials(
    currentUser.loginToken,
    currentUser.username
  );
  myStories = currentUser.ownStories;
  putMyStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateMyStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const favorites = currentUser.favorites;
  const hasMatchingStoryId = favorites.some(
    (item) => item.storyId === story.storyId
  );
  const starClass = hasMatchingStoryId ? "fas" : "far";

  return $(`
      <li id="${story.storyId}">
      <span class="fas fa-trash trash"></span>
      <span class="${starClass} fa-star favorites"></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of myStories) {
    const $story = generateMyStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function deleteStory(evt) {
  const storyId = evt.currentTarget.parentElement.id;
  const response = await axios({
    url: `${BASE_URL}/stories/${storyId}`,
    method: "DELETE",
    data: {
      token: currentUser.loginToken,
    },
  });
  evt.currentTarget.parentElement.remove();
}

$body.on("click", ".trash", deleteStory);
