/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

//----------------------------------------------------------------------------
//RENDER TWEETS
//----------------------------------------------------------------------------

  function renderTweets(tweets) {
    var tweetContainer = $('.tweets-container')
    tweetContainer.empty();

    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      tweetContainer.prepend($tweet);
        // console.log(tweet);
    }
  }
  
//-----------------------------------------------------------------------------
//CREATE NEW TWEETS
//-----------------------------------------------------------------------------
// loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    function createTweetElement(tweet) {
      let {user, content, created_at} = tweet;
      let {name, avatars, handle} = user;
      let {text} = content;
      let src = avatars.regular;
  
      $tweet = $('<article>').addClass('tweet');

      $header = $('<header>');
      $img = $('<img>').addClass('tweet-image').attr("src", src);
      $h3 = $('<h3>').text(name);
      $p = $('<p>').text(handle);

      $div = $('<div>');
      $span = $('<span>').addClass('tweet-body').text(text);

      $footer = $('<footer>');
      $spanMonth = $('<span>').addClass('months').text(created_at);
      $section = $('<section>').addClass('icons');
      $iconFlag = $(`<i class='fa fa-flag'></i>`);
      $iconRetweet = $(`<i class='fa fa-retweet'></i>`);
      $iconHeart = $(`<i class='fa fa-heart'></i>`);
  
  //appending elements
      $header.append($img);
      $header.append($h3);
      $header.append($p);

      $section.append($span);
  
      $footer.append($spanMonth);
      $div.append($iconFlag);
      $div.append($iconRetweet);
      $div.append($iconHeart);
      $footer.append($div);
  
      $tweet.append($header);
      $tweet.append($section);
      $tweet.append($footer);
  
    return $tweet;
  }
  
  
//-----------------------------------------------------------------------------
//Create an AJAX POST request that sends the form data to the server
//------------------------------------------------------------------------------
$(function() {
  //event.preventDefault() prevents form to submit through HTTP upon click
  //need information from the tweet
  //.seralize() to turn form data into query string
  //send to server
  let $newTweetForm = $(".new-tweet form");
  
  console.log('First run')

  $newTweetForm.on('submit', function (event) {
      event.preventDefault();
      console.log( $( this ).serialize() );
      //get the value of text-area and seralize form data into query string before sending to server
      let $newTweetText = $(".tweet-input").val();
      
      if ($newTweetText.length === 0) {
        alert("Error: Your tweet content is not present");
      } else if ($newTweetText.length > 140) {
        alert("Error: Your tweet content is too long");
      } else {

      $.ajax({
          type: 'POST',
          url: '/tweets',
          data: $( this ).serialize(),
          success: function() {
              loadTweets()
              //renderTweets(data);
          }
      })
    }
   });
  });

   //----------------------------------------------------------------
   //Fetch (GET) tweets from the server with Ajax
   //----------------------------------------------------------------
      function loadTweets() {
        $.ajax( { 
            method: 'GET',
            url: '/tweets',
            success: function(tweets){
              (renderTweets(tweets))
            }
        });
      }
      loadTweets()
});