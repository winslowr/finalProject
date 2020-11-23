import { createNavbar } from './navbar.js';
import { movieObjects } from './data.js';

window.onload = function () {

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
            location.href = 'login.html';
        } else {
            $('body').append(`<div id="uid" data-uid=${firebaseUser.uid}></div>`)  // empty div for accessing uid
            // login button configuration
            $('#navbar').append(createNavbar);
            $('#redirect').html("Logout");
            $('#redirect').attr('id', 'logout');
            $('#logout').on("click", handleLogoutBtnPress);
            // friend finder setup
            $('#root').append(renderDashboardView(firebaseUser.uid));
            $('body').on('click', '#addFriend', handleAddFriendBtnPress);
            $('body').on('click', '#takeMatchTest', handleMatchTestBtnPress);
            $('body').on('change', '#movieSelection', handleMovieSelectionChange);
            $('body').on('click', '#addMovie', handleAddToWatchlistBtnPress);
            $('body').on('click', '#submitMovies', handleSaveWatchlistBtnPress);
            $('body').on('click', '#cancel', handleCancelBtnPress);
            $('body').on('click', '.removeMovie', handleRemoveMovieBtnPress);
        }
    });

};

let renderDashboardView = function (uid) {
    const dashboard = $('<div id="dashboard"></div>');
    const section = $('<div id="topSection" class="section has-background-netflix"></div>');
    dashboard.append(section);
    section.append(renderTopSection(uid)); // have to pass user info in this way since it cant be done through handler
    section.append(renderWatchlist(uid));
    return dashboard;
}

let renderFormView = function () {
    const section = $('<div id="formView" class="section has-background-netflix"></div>');
    const columns = $('<div class="columns is-centered"></div>');
    section.append(columns);
    columns.append(renderSelectionPanel());
    columns.append(renderSelectionDetailPanel());
    columns.append(renderSelectionControlPanel());
    return section;
}

let renderSelectionPanel = function () {
    const column = $('<div class="column is-one-third"></div>');
    const div = $('<div class="select is-multiple"></div>');
    column.append(div);
    const select = $(`<select id="movieSelection" class="is-hovered" multiple size=${movieObjects.length}></select>`);
    div.append(select);
    movieObjects.forEach(movie => select.append(`<option value=${movie.netflixid}>${movie.title}</option>`));
    return column;
}

let renderSelectionDetailPanel = function () {
    const column = $('<div class="column is-one-third"></div>');
    movieObjects.forEach(movie => column.append($(
        `<div id=${movie.netflixid} class="movies">
            <div class="card" id="test">
                <div class="container has-text-centered">
                    <div class="card-image">
                        <figure>
                            <img src="${movie.image}" alt="Placeholder image">
                        </figure>
                    </div>
                </div>
                 <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${movie.title}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p> ${movie.synopsis}</p>
                    </div>   
                    <div>
                        <p> <strong> Rating: </strong> ${movie.rating}</p> 
                    </div>
                    <div>
                        <p> <strong> Runtime: </strong> ${movie.runtime}</p> 
                    </div>
                </div>
            </div>
        </div>`)));
    return column;
}

let renderSelectionControlPanel = function () {
    const column = $('<div class="column is-one-third"></div>');
    const box = $('<div class="box"></div>');
    column.append(box);
    const columns = $('<div class="columns is-centered"></div>');
    box.append(columns);
    const column2 = $('<div class="column has-text-centered"></div>');
    columns.append(column2);
    column2.append($(
        `<div class="field">
             <div class="control">
                <button id="addMovie" class="button is-link">Add Movie to Watchlist</button>
            </div>
        </div>`));
    column2.append($(
        `<div class="field">
                 <div class="control">
                    <button id="submitMovies" class="button is-link">Save Watchlist</button>
                </div>
            </div>`));
    column2.append($(
        `<div class="field">
                         <div class="control">
                            <button id="cancel" class="button is-link">Cancel</button>
                        </div>
                    </div>`));
    column.append($('<div id="selections" class="box has-text-centered"><h1 class="subtitle">Watchlist</h1></div>'))
    return column;
}

let renderTopSection = function (uid) { // render area for adding new freinds
    const columns = $('<div class="columns"></div>');
    const findFriendsBox = renderFindFriendsBox(uid);
    const takeMatchTest = renderMatchTestBox(uid);
    columns.append(findFriendsBox);
    columns.append(takeMatchTest);
    return columns;
}

let renderWatchlist = function (uid) {
    const columns = $('<div class="columns is-centered"></div>');
    const column = $('<div class="column is-two-thirds"></div>');
    columns.append(column);
    const box = $('<div id="watchlist" class="box"></div>');
    column.append(box);
    const container = $('<div class="container"></div>');
    box.append(container);
    container.append($('<h1 class="title">Your Watchlist</h1>'));
    // const uid = $('#uid').data('uid');
    const db = firebase.firestore();
    const users = db.collection("users");
    users.doc(uid).get().then(function (snapshot) {
        const watchlist = snapshot.data().watchlist;
        watchlist.forEach(function (movie) {
            const movieName = movie.replace(/\W/g, '');
            const article = $(`<article name=${movieName} class="media"></media>`);
            container.append(article);
            const div = $('<div class="media-content"></div>');
            article.append(div);
            const content = $('<div class="content"></div>');
            div.append(content);
            article.append(`<div class="media-right"><button class="button is-link removeMovie" data-name=${movieName}>Remove</button></div>`)
            content.append($(`<p>${movie}</p>`));
        });
    });
    return columns;
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
    $('#dashboard').replaceWith(renderFormView());
    $('.movies').hide();
}

let handleMovieSelectionChange = function (e) {
    const movieID = $('#movieSelection').val()[0];
    $('.movies').hide();
    $(`#${movieID}`).show();
}

let handleAddToWatchlistBtnPress = function (e) {
    const movieID = $('#movieSelection').val()[0];
    const movieObj = movieObjects.find(movie => movie.netflixid == movieID);
    const selection = $(`<p class="movie-selection">${movieObj.title}</p>`);
    selection.data('object', movieObj);
    const selections = $('#selections');
    if (!selections.text().includes(movieObj.title)) {
        selections.append(selection);
    }
}

let handleSaveWatchlistBtnPress = function (e) {
    const selections = $('.movie-selection');
    if (selections.length == 0) {  // if no movies have been added, do nothing
        return;
    }
    const uid = $('#uid').data('uid');
    let watchlist = [];
    selections.each(function () {
        const data = $(this).data('object');
        watchlist.push(data.title);
    });
    const db = firebase.firestore();
    const users = db.collection("users");
    watchlist.forEach(movie => users.doc(uid).update({ "watchlist": firebase.firestore.FieldValue.arrayUnion(movie) }));
    $('#formView').replaceWith(renderDashboardView(uid));
}

let handleCancelBtnPress = function (e) {
    const uid = $('#uid').data('uid');
    $('#formView').replaceWith(renderDashboardView(uid));
}

let handleRemoveMovieBtnPress = function (e) {
    const uid = $('#uid').data('uid');
    const movieName = $(e.target).data('name');
    const movieTitle = $(`[name=${movieName}]`).text().split('Remove')[0];
    const db = firebase.firestore();
    const users = db.collection("users");
    users.doc(uid).update({
        watchlist: firebase.firestore.FieldValue.arrayRemove(movieTitle)
    }).then(function () { $(`[name=${movieName}]`).remove() });

}