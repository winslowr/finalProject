import { createNavbar } from './navbar.js';
import { movieObjects } from './data.js';

window.onload = function () {

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
            location.href = 'login.html';
        } else {
            // login button configuration
            $('#navbar').append(createNavbar);
            $('#redirect').html("Logout");
            $('#redirect').attr('id', 'logout');
            $('#logout').on("click", handleLogoutBtnPress);
            // friend finder setup
            renderDashboardView(firebaseUser.uid);
            $('body').on('click', '#addFriend', handleAddFriendBtnPress);
            $('body').on('click', '#takeMatchTest', handleMatchTestBtnPress);
        }
    });
};

let renderDashboardView = function (uid) {
    $('#root').append(renderTopSection(uid)); // have to pass user info in this way since it cant be done through handler
    $('#root').append(renderBottomSection(uid));
}

let renderFormView = function () {
    const columns = $('<div class="columns"></div>');
    columns.append(renderSelectionPanel());
    return columns;
}

let renderSelectionPanel = function () {
    const column = $('<div class="column is-one-third"></div>');
    const div = $('<div class="select is-multiple"></div>');
    column.append(div);
    div.append($(`<section class="hero is-danger is-bold">
				    <div hero-body>
					    <h1 class="title is-3 has-text-centered"> Select a movie you would watch with a friend! </h1>
				    </div>
			    </section>)`));
    const select = $('<select class="is-hovered" multiple size="20"></select>');
    div.append(select);
    movieObjects.forEach(movie => select.append(`<option value=${movie.title}>${movie.title}</option>`));
    return column;
}

let renderTopSection = function (uid) { // render area for adding new freinds
    const section = $('<div id="topSection" class="section has-background-netflix"></div>');
    const columns = $('<div class="columns"></div>');
    const findFriendsBox = renderFindFriendsBox(uid);
    const takeMatchTest = renderMatchTestBox(uid);
    columns.append(findFriendsBox);
    columns.append(takeMatchTest);
    section.append(columns);
    return section;
}

let renderBottomSection = function (uid) {
    const section = $('<div id="bottomSection" class="section has-background-light"></div>');
    section.append($('<h1 class="title">Your Watchlist</h1>'));
    const box = $('<div class="box"></div>');
    section.append(box);
    box.append('<h1>My Movies</h1>');
    return section;

}

function renderFindFriendsBox(uid) {
    const column = $('<div class="column"></div>');
    const box = $('<div class="box"></box>');
    column.append(box);
    const container = $('<div class="container"></div>');
    box.append(container);
    container.append('<h1 class=title>Find Your Friends</h1>');
    container.append(`
        <div class="field">
            <div class="control">
                <input id="enterEmail" class="input" type="email" placeholder="Enter your friend's email">
            </div>
        </div>`);
    container.append(`
        <div class="field">
            <div class="control">
                <button id="addFriend" data-uid="${uid}" class="button is-link">Add Friend</button>
            </div>
        </div>`);
    return column;
}

function renderMatchTestBox(uid) {
    const column = $('<div class="column"></div>');
    const box = $('<div class="box"></box>');
    column.append(box);
    const container = $('<div class="container"></div>');
    box.append(container);
    container.append('<h1 class=title>Pick Your Movies</h1>');
    container.append(`
        <div class="field">
            <div class="control">
                <button id="takeMatchTest" data-uid="${uid}" class="button is-link">Take the Quiz</button>
            </div>
        </div>`);
    return column;
}

let handleLogoutBtnPress = function () {
    firebase.auth().signOut();
}

let handleAddFriendBtnPress = async function (e) {

    const uid = e.target.getAttribute('data-uid');
    const friendEmail = $('#enterEmail').val();

    const app = firebase.app();
    const db = firebase.firestore();
    const users = db.collection("users");

    const snapshot = await users.where('email', '==', friendEmail).get()
    if (snapshot.empty) { // handling invalid email
        console.log('here');
        $('#enterEmail').attr('class', 'input is-danger');  // change text field color to red
        $('#enterEmail').val('');  // clear input 
        $('#enterEmail').attr('placeholder', 'Entered email was invalid');
        return;
    }
    let newFriend;
    snapshot.forEach(doc => { newFriend = doc.data(); newFriend.uid = doc.id });  // should only have one result in query 
    if (newFriend.uid == uid) {  // handling adding your own email
        $('#enterEmail').attr('class', 'input is-danger');
        $('#enterEmail').val('');
        $('#enterEmail').attr('placeholder', 'Entered email was your own');
        return;
    }
    users.doc(uid).update({ friends: firebase.firestore.FieldValue.arrayUnion(friendEmail) });
    $('#enterEmail').attr('class', 'input is-success');
    $('#enterEmail').val('');
    $('#enterEmail').attr('placeholder', 'Success! Add another?');
}

let handleMatchTestBtnPress = async function (e) {
    $('#root').replaceWith(renderFormView());
}
