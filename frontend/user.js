window.onload = function() {
 
  $('#login').on("click", handleLoginBtnPress);
  $('#signup').on("click", handleSignupBtnPress);

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    location.href = 'index.html';
  } else {
    console.log("not logged in");
  }
});


};

let handleLoginBtnPress = function() {
  console.log("login");
  let email = $('#txtEmail').val();
  console.log(email);
  let pass = $('#txtPassword').val();
  console.log(pass);
  const auth = firebase.auth();
  // Sign In
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
};

let handleSignupBtnPress = function() {
  console.log("sign up");
  let email = $('#txtEmail').val();
  console.log(email);
  let pass = $('#txtPassword').val();
  console.log(pass);
  const auth = firebase.auth();
  // Sign In
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
      .catch(e => console.log(e.message));
};