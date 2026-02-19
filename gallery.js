let mCurrentIndex = 0 // Tracks the current image index
let mArrayIndex = 0;
let max = 0;
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'myImages.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially
  console.log('hi')
  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details sectiosn
  $(".moreIndicator").on('click', event=>{
    console.log('indicated')
    $('.details').slideToggle(300)
    $(event.currentTarget).toggleClass('rot90');
    $(event.currentTarget).toggleClass('rot270');
  })
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").on('click', event=>{
    showNextPhoto()
  })
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
 $("#prevPhoto").on('click', event=>{
    showPrevPhoto()
  })
  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})
// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  // Use $.getJSON here to request the JSON data from mUrl

  $.getJSON('myImages.json', function(data){
    
    for(let i in data.glyphs){  
      mImages.push(data.glyphs[i])
    }
    console.log(mImages)
    swapPhoto();
  });
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
}
// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  $("#photo").attr("src",mImages[mArrayIndex][mCurrentIndex].img);
  $(".name").text(mImages[mArrayIndex][mCurrentIndex].name)
  $(".gods").text(mImages[mArrayIndex][mCurrentIndex].gods)
  $(".type").text(mImages[mArrayIndex][mCurrentIndex].type)
  $(".effect").text(mImages[mArrayIndex][mCurrentIndex].effect)
  $(".quote").text(mImages[mArrayIndex][mCurrentIndex].quote)
  $(".ability").text(mImages[mArrayIndex][mCurrentIndex].ability)
  // Access mImages[mCurrentIndex] to update the image source and details
  // Update the #photo element's src attribute with the current image's path
  // Update the .location, .description, and .date elements with the current image's details
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
 
  max++;
  mCurrentIndex++;
  if(max ===5){
    mArrayIndex++;
    mCurrentIndex= 0;
  }else if(max ===10){
    mArrayIndex = 0;
    mCurrentIndex= 0;
    max = 0;
  }
   console.log("index:" +mCurrentIndex + " Array:" + mArrayIndex + " Max:" + max)
  swapPhoto();
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  
  
  if(max===0){
    mCurrentIndex=5;
    mArrayIndex=1;
    max = 10;
  }else if(max === 5){
    mArrayIndex=0;
    mCurrentIndex=5;
  }
  max--;
  mCurrentIndex--;
  console.log("index:" +mCurrentIndex + " Array:" + mArrayIndex+ " Max:" + max)
  swapPhoto();
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer () {
  setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
