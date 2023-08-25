"use strict";

// This is the global list of the stories, an instance of StoryList
let favorites;

/** Get and show stories when site first loads. */

async function getAndShowFavorites() {
    currentUser = await User.loginViaStoredCredentials(currentUser.loginToken, currentUser.username)
    favorites = currentUser.favorites;
  putFavoritesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateFavoriteMarkup(favorite) {
  // console.debug("generateStoryMarkup", story);

  const hostName = favorite.getHostName();

  return $(`
      <li id="${favorite.storyId}">
      <span class="fas fa-star favorites"></span>
        <a href="${favorite.url}" target="a_blank" class="story-link">
          ${favorite.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${favorite.author}</small>
        <small class="story-user">posted by ${favorite.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let favorite of favorites) {
    const $favorite = generateFavoriteMarkup(favorite);
    $allStoriesList.append($favorite);
  }

  $allStoriesList.show();
}