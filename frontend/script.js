window.onload = function () {

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      $('#redirect').html("Logout");
      $('#redirect').attr('id', 'logout');
      $('#logout').on("click", handleLogoutBtnPress);
      $('#home').on("click", handleHomeBtnPress);
    } else {
      console.log("not logged in");
      $('#logout').html("Click here to Login or Sign Up");
      $('#logout').attr('id', 'redirect');
      $('#redirect').on("click", handleRedirectBtnPress);
      $('#home').on("click", handleRedirectBtnPress);  // if not signed in, trying to go home navigates to login
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

let handleHomeBtnPress = function () {
  location.href = 'home.html';
};