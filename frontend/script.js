window.onload = function () {

  $('#about').on("click", handleAboutBtnPress);

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      $('#redirect').html("Logout");
      $('#redirect').attr('id', 'logout');
      $('#logout').on("click", handleLogoutBtnPress);
      $('#findFriends').on("click", handleFindFriendsBtnPress);
    } else {
      console.log("not logged in");
      $('#logout').html("Click here to Login or Sign Up");
      $('#logout').attr('id', 'redirect');
      $('#redirect').on("click", handleRedirectBtnPress);
      $('#findFriends').on("click", handleRedirectBtnPress);  // if not signed in, trying to go home navigates to login
    }
  });

}

let handleLogoutBtnPress = function () {
  console.log("logout");
  firebase.auth().signOut();
};

let handleRedirectBtnPress = function () {
  console.log("redirecting...");
  location.href = 'login.html';
};

let handleFindFriendsBtnPress = function () {
  location.href = 'findFriends.html';
};

let handleAboutBtnPress = function () {
  location.href = 'about.html';
}