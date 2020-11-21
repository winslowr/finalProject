window.onload = function () {

    let userID;
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
            location.href = 'login.html';
        } else {
            $('#redirect').html("Logout");
            $('#redirect').attr('id', 'logout');
            $('#logout').on("click", handleLogoutBtnPress);
        }
    });
};

let handleLogoutBtnPress = function () {
    console.log("logout");
    firebase.auth().signOut();
};

const app = firebase.app();
const db = firebase.firestore();
const tests = db.collection('matchTest').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().userID}`);
    });
});;

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        let uid = firebaseUser.uid;
        db.collection("matchTest").add({
            userID: uid,
            netflixIDs: [1, 2]
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
    } else {
    }
});
