"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const favorites = currentUser.favorites;

  const hasMatchingStoryId = favorites.some(
    (item) => item.storyId === story.storyId
  );
  const starClass = hasMatchingStoryId ? "fas" : "far";

  return $(`
      <li id="${story.storyId}">
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

function putStoriesOnPage() {
  // console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function handleFormSubmission(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior

  // Get data from the form
  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const username = currentUser.username;
  const storyData = { title, url, author, username };

  // Hide the submit form
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");

  // Call the .addStory method to add a new story
  const newStory = await storyList.addStory(currentUser, {
    author,
    title,
    url,
  });

  // Add the new story to the page
  const $newStory = generateStoryMarkup(newStory);
  $allStoriesList.prepend($newStory);

  // Reset the form fields
  $("#create-author").val("");
  $("#create-title").val("");
  $("#create-url").val("");

  window.location.reload();
  hidePageComponents();
  putStoriesOnPage();
}
// Attach the submit event handler to the form
$submitForm.on("submit", handleFormSubmission);
