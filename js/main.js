const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missies = 0;
let firstHitTime = 0;

function round() {

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).html(hits+1);

  firstHitTime = getTimestamp();
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.page-wrapper').hide()
  $("#button-start").hide()
  $("#button-reload").show()
    // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $('#missies').text(missies);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");
    $(event.target).html("");
    $('.miss').removeClass('miss');
    hits = hits + 1;
    if (hits >= maxHits) {
      endGame();
    }
    else {
      round();
    }
  }
  else {
    $(event.target).addClass("miss");
    missies++;
  }
}

function init() {
   $('.page-wrapper').hide()
   $("#button-start").click(function() {
   $('.page-wrapper').show("slow");
   });
  
  round();

  $(".grid-item").click(handleClick);
  $("#button-reload").click(function() {
  location.reload();
  $('.page-wrapper').show("slow");
  });

}

$(document).ready(init);
