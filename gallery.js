let mCurrentIndex = 0;
let mArrayIndex = 0;
let max = 0;
let mImages = [];
const mUrl = 'myImages.json'; 
const mWaitTime = 5000; 
let timer;

$(document).ready(() => {
  $('.details').hide();
  startTimer();
  $(".moreIndicator").on('click', event => {
    $('.details').slideToggle(300);
    $(event.currentTarget).toggleClass('rot90');
    $(event.currentTarget).toggleClass('rot270');
  })
  $("#nextPhoto").on('click', event => {
    showNextPhoto();
    resetTimer();
    showBackground();
  })
  $("#prevPhoto").on('click', event => {
    showPrevPhoto();
    resetTimer();
    showBackground();
  })
  fetchJSON();
})
function fetchJSON() {
  $.getJSON('myImages.json', function (data) {
    for (let i in data.glyphs) {
      mImages.push(data.glyphs[i]);
    }
    console.log(mImages);
    swapPhoto();
  });
}
function swapPhoto() {
  $("#photo").attr("src", mImages[mArrayIndex][mCurrentIndex].img);
  $(".name").text("[" + mImages[mArrayIndex][mCurrentIndex].name + "]");
  $(".gods").text("[" + mImages[mArrayIndex][mCurrentIndex].gods + "]");
  $(".type").text(mImages[mArrayIndex][mCurrentIndex].type);
  $(".effect").text(mImages[mArrayIndex][mCurrentIndex].effect);
  $(".quote").text(mImages[mArrayIndex][mCurrentIndex].quote);
  $(".ability").text(mImages[mArrayIndex][mCurrentIndex].ability);
}
function showNextPhoto() {
  max++;
  mCurrentIndex++;
  if (max === 5) {
    mArrayIndex++;
    mCurrentIndex = 0;
  } else if (max === 10) {
    mArrayIndex = 0;
    mCurrentIndex = 0;
    max = 0;
  }
  swapPhoto();
}
function showPrevPhoto() {
  if (max === 0) {
    mCurrentIndex = 5;
    mArrayIndex = 1;
    max = 10;
  } else if (max === 5) {
    mArrayIndex = 0;
    mCurrentIndex = 5;
  }
  max--;
  mCurrentIndex--;
  swapPhoto();
}
function startTimer() {
  timer = setInterval(() => {
    showNextPhoto();
    showBackground();
  }, mWaitTime);

}
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function showBackground(){
  $('#invis').fadeIn(500);
  $('#invis').fadeOut(500);
  $('#invis').css('background-image',"" + mImages[mArrayIndex][mCurrentIndex].animal + "");
}