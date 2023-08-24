"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $loginNavBar.show();
  $navLogin.hide();
  $navLogOut.show();
  hidePageComponents();
  putStoriesOnPage();
  $navUserProfile.text(`${currentUser.username}`).show();

  
}

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$body.on("click", "#nav-submit", navSubmitClick);

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $showFavorites.show();
}

$body.on("click", "#nav-favorites", navFavoritesClick);


function goHome(evt) {
  console.debug("goHome", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all-stories", goHome);


function showMyStories(evt) {
  console.debug("showMyStories", evt);
  evt.preventDefault();
  hidePageComponents();
  $showUserStories.show();

}

$body.on("click", "#nav-my-stories", showMyStories);


function toggleFavoriteStory(evt){
  console.debug("toggleFavoriteStory", evt);
  evt.preventDefault();
  $favoriteStar.toggleClass();

}

$body.on("click", "#star", toggleFavoriteStory);


function showCurrentUser(evt){
  console.debug("showCurrentUser", evt);
  hidePageComponents();
  $userInfoSection.find("h2").text(`${currentUser.username}'s Profile`);
  $userInfoSection.show();
 
}

$body.on("click", "#nav-user-profile", showCurrentUser);

