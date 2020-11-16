/**
 * Course: COMP 426
 * Assignment: a09
 * Author: Kyle Maatallah
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */
import {fetchMoviesJSON} from "./data.js";

export const renderMovie = function(movie) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<div data-col-id=${movie.imbdid} data-id=${movie.ibmdid} class="column is-half is-offset-one-quarter">
    <div data-box-id=${movie.imbdid} class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p data-body=${movie.imbdid}>
            <strong>${movie.title}</strong>${movie.released} <small>@</small> <small>5m</small>
            <br>
            ${movie.synopsis}
          </p>
        </div>
          <div class="level-left">
          ${movie.runtime} mins 
          </div>
          <br>
          <div class="buttons">
                <button id=${movie.imbdid} data-type="like" data-liked="0" data-isLiked="true" class="button is-rounded">Like</button>
                <button id="retweet" data-id=${movie.imbdid} data-type="retweet" class="button is-rounded">Retweet</button>
                <button id="reply" data-id=${movie.imbdid} data-type="reply" class="button is-rounded">Reply</button>
          </div>
      </div>
    </article>
  </div>
  </div>`;
};


/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderCreateTweetForm = function() {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    $(`<textarea id="textarea" class="textarea" placeholder="What's happening?"></textarea>
    <div id="form_container" class="field is-grouped">
        <div class="control">
            <button id="submit" class="button is-link">Submit</button>
        </div>
        <div class="control">
            <button id="cancel" class="button is-link is-light">Cancel</button>
        </div>
    </div>`).insertBefore($('#container'));
};

export const renderRetweetForm = function(id) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    $('[data-col-id='+id+']').append($(`<textarea id="textarea" class="textarea" placeholder="What's happening?"></textarea>
    <div id="form_container" class="field is-grouped">
        <div class="control">
            <button id="second_retweet" data-id=${id} class="button is-link">Retweet</button>
        </div>
        <div class="control">
            <button id="cancel" class="button is-link is-light">Cancel</button>
        </div>
    </div>`));
};

export const renderReplyForm = function(id) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    $('[data-col-id='+id+']').append($(`<textarea id="textarea" class="textarea" placeholder="Reply here"></textarea>
    <div id="form_container" class="field is-grouped">
        <div class="control">
            <button id="second_reply" data-id=${id} class="button is-link">Reply</button>
        </div>
        <div class="control">
            <button id="cancel" class="button is-link is-light">Cancel</button>
        </div>
    </div>`));
};

export async function renderEditForm(id) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    $('[data-col-id='+id+']').append($(`<textarea id="textarea" class="textarea" placeholder="reply"></textarea>
    <div id="form_container" class="field is-grouped">
        <div class="control">
            <button id="second_edit" data-id=${id} class="button is-link">Edit</button>
        </div>
        <div class="control">
            <button id="cancel" class="button is-link is-light">Cancel</button>
        </div>
    </div>`));
};

export const handleCreateButtonPress = function(event) {
    let form = renderCreateTweetForm();
    $('#submit').one("click", handleSubmitButtonPress);
    $('#cancel').one("click", handleCancelButtonPress);
    $('#tweets').append(form);
}

export async function handleSubmitButtonPress(event) {
    let text = $('#textarea').val();
    $('#textarea').remove();
    $('#form_container').remove();
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: text
        },
      });
    const result_2 = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
     });
     let obj = result_2.data[0];
     let tweet = renderTweet(obj);
     $('#tweets').prepend(tweet);
     let id = obj.id;
     console.log(id);    
    $('[data-col-id='+id+']').prepend($(`<button id="edit" data-type="edit" class="button is-link is-outlined">Edit</button>`));
    $('[data-col-id='+id+']').prepend($(`<button id="delete" data-type="delete" class="button is-danger is-outlined">Delete</button>`));
    $('[data-type="edit"]').on("click", handleEditButtonPress);
    $('[data-type="delete"]').on("click", handleDeleteButtonPress);
     console.log("new tweet appended"); 
}

export async function handleSecondRetweetButtonPress(event) {
    let text = $('#textarea').val();
    let id = event.target.dataset.id;
    let body_text = $('[data-body='+id+']').html();
    $('#textarea').remove();
    $('#form_container').remove();
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": id,
          "body": `${text} Original Tweet: ${body_text}`
        },
      });
      const result_2 = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
     });
     let obj = result_2.data[0];
     let tweet = renderTweet(obj);
     $('#tweets').prepend(tweet);
     id = obj.id;
     console.log(id);    
    $('[data-col-id='+id+']').prepend($(`<button id="edit" data-type="edit" class="button is-link is-outlined">Edit</button>`));
    $('[data-col-id='+id+']').prepend($(`<button id="delete" data-type="delete" class="button is-danger is-outlined">Delete</button>`));
    $('[data-type="edit"]').on("click", handleEditButtonPress);
    $('[data-type="delete"]').on("click", handleDeleteButtonPress);
     console.log("new tweet appended"); 
}

export async function handleSecondReplyButtonPress(event) {
    let text = $('#textarea').val();
    let id = event.target.dataset.id;
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": text
        },
      });
    $('#textarea').remove();
    $('#form_container').remove();
  //  $('#tweets').append(renderTweet(result));
}

export async function handleSecondEditButtonPress(event) {
    console.log("second edit");
    let text = $('#textarea').val();
    let id = event.target.dataset.id;
    $('#textarea').remove();
    $('#form_container').remove();
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
        data: {
          "body": text
        },
      });
    const result_2 = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
     });
     let tweet = renderTweet(result_2.data);
    $('[data-col-id='+id+']').replaceWith(tweet);
    $('[data-col-id='+id+']').prepend($(`<button id="edit" data-type="edit" class="button is-link is-outlined">Edit</button>`));
    $('[data-col-id='+id+']').prepend($(`<button id="delete" data-type="delete" class="button is-danger is-outlined">Delete</button>`));
    $('[data-type="edit"]').on("click", handleEditButtonPress);
    $('[data-type="delete"]').on("click", handleDeleteButtonPress);
}

export function handleCancelButtonPress(event) {
    $('#textarea').remove();
    $('#form_container').remove();
}

export async function handleLikeButtonPress(event) {
    if(event.target.dataset.isliked == "false") {
        console.log("like");
        event.target.dataset.liked = "1";
        let id = event.target.id;
        $('#'+id).attr('class', 'button is-rounded is-link');
        const result = await axios({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id + '/like',
            withCredentials: true,
          });
          // make get request to update like count
         const result_2 = await axios({
             method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
            withCredentials: true,
          });
          let tweet = renderTweet(result_2.data);
          $('[data-col-id='+id+']').replaceWith(tweet);
          $('#'+id).attr('class', 'button is-rounded is-link');
          $('[data-type="like"]').on("click", handleLikeButtonPress);
          console.log("new tweet appended");
    } else {
        console.log("unlike");
        event.target.dataset.id = "0";
        let id = event.target.id;
        $('#'+id).attr('class', 'button is-rounded');
        const result = await axios({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id + '/unlike',
            withCredentials: true,
          });
          const result_2 = await axios({
            method: 'get',
           url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
           withCredentials: true,
         });
         let tweet = renderTweet(result_2.data);
         $('[data-col-id='+id+']').replaceWith(tweet);
         $('[data-type="like"]').on("click", handleLikeButtonPress);
         console.log("new tweet appended");
    }
    
}

export async function handleDeleteButtonPress(event) {
    console.log("delete");
    let id = event.target.parentNode.dataset.id;
    const result = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
      }).then($('[data-col-id='+id+']').remove());
}

export async function handleRetweetButtonPress(event) {
    console.log("retweet");
    let id = event.target.dataset.id;
    let form = renderRetweetForm(id);
    $('#second_retweet').one("click", handleSecondRetweetButtonPress);
    $('#cancel').one("click", handleCancelButtonPress);
}

export async function handleReplyButtonPress(event) {
    console.log("reply");
    let id = event.target.dataset.id;
    let form = renderReplyForm(id);
    $('#second_reply').one("click", handleSecondReplyButtonPress);
    $('#cancel').one("click", handleCancelButtonPress);
}

export async function handleEditButtonPress(event) {
    console.log("edit");
    let id = event.target.parentNode.dataset.id;
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
     });
    let text = result.data.body;
    let form = renderEditForm(id);
    $('#textarea').attr('placeholder', text);
    $('#second_edit').one("click", handleSecondEditButtonPress);
    $('#cancel').one("click", handleCancelButtonPress);
}

/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export async function loadMoviesIntoDOM() {
    // Grab a jQuery reference to the root HTML element
    const $banner = $('#tweets');

    // $banner.append(`<div id="container" class="container">
    // <button id="create" class="button is-info is-medium">Create New Tweet</button>
    // </div>`);
    $('#create').on("click", handleCreateButtonPress);
    // Grab first 50 tweets
    
    // const result = await axios({
    //     method: 'get',
    //     url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    //     withCredentials: true,
    //   });
    //   console.log(result);
    let obj = await fetchMoviesJSON();
    console.log(obj);
    // TODO: Generate the first 50 tweets using renderTweet()
    for(let i = 0; i < 20; i++) {
        let movie = renderMovie(obj.ITEMS[i]);
        $banner.append(movie);
    }

    // // add class to like button to show whether user has liked the tweet
    // $('[data-isLiked="true"]').attr('class', 'button is-rounded is-link');

    // // add edit/delete buttons to logged-in user's tweets
    // addDeleteBtn();

    // // add like button event listener
    // $('[data-type="like"]').on("click", handleLikeButtonPress);

    // // add retweet button event listener
    // $('[data-type="retweet"]').on("click", handleRetweetButtonPress);

    // // add reply button event listener
    // $('[data-type="reply"]').on("click", handleReplyButtonPress);

};

// export function addDeleteBtn() {
//     $(`<button id="delete" data-type="delete" class="button is-danger is-outlined">Delete</button>`).insertBefore($('[data-mine="true"]'));
//     $(`<button id="edit" data-type="edit" class="button is-link is-outlined">Edit</button>`).insertBefore($('[data-mine="true"]'));
//    // add edit button listener
//     $('[data-type="edit"]').on("click", handleEditButtonPress);

//     // add delete button event listener
//     $('[data-type="delete"]').on("click", handleDeleteButtonPress);
// }

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadMoviesIntoDOM();
});
