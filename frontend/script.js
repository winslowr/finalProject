import { createNavbar } from './navbar.js';

window.onload = function () {

  $('#navbar').append(createNavbar);
  // $('#about').on("click", handleAboutBtnPress);

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      $('#userEmail').append(`<p>${firebaseUser.email}</p>`);
      $('#redirect').html("Logout");
      $('#redirect').attr('id', 'logout');
      $('#logout').on("click", handleLogoutBtnPress);
      $('#dashboard').on("click", handleDashboardBtnPress);
    } else {
      $('#logout').html("Login or Sign Up");
      $('#logout').attr('id', 'redirect');
      $('#redirect').on("click", handleRedirectBtnPress);
      $('#dashboard').on("click", handleRedirectBtnPress);  // if not signed in, trying to go home navigates to login
    }
  });

}

let handleLogoutBtnPress = function () {
  firebase.auth().signOut();
  $('#userEmail').empty();
};

let handleRedirectBtnPress = function () {
  location.href = 'login.html';
};

let handleDashboardBtnPress = function () {
  location.href = 'dashboard.html';
};