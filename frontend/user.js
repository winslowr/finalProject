window.onload = function () {

  $('#login').on("click", handleLoginBtnPress);
  $('#signup').on("click", handleSignupBtnPress);

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      const db = firebase.firestore();
      const users = db.collection("users");
      users.doc(firebaseUser.uid).get().then(function (doc) {
        if (!doc.exists) {
          users.doc(firebaseUser.uid).set({ email: firebaseUser.email, friends: [] })
            .then(function () { location.href = 'index.html'; });
        } else {
          location.href = 'index.html';
        }
      });
    }
  });


};

let handleLoginBtnPress = function () {
  let email = $('#txtEmail').val();
  let pass = $('#txtPassword').val();
  const auth = firebase.auth();
  // Sign In
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
};

let handleSignupBtnPress = function () {
  let email = $('#txtEmail').val();
  let pass = $('#txtPassword').val();
  const auth = firebase.auth();
  // Sign In
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
    .catch(e => console.log(e.message));
};