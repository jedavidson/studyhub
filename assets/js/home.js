// Javascript for the home page.

// Function to check if the browser supports localStorage. (most do, but it's a fairly painless check)
function checkStorageCompatibility() {
  if (typeof(Storage) == undefined) {
    alert("Your browser does not support localStorage, so you won't be able to use this website's features.")
    // Forcibly stop the page from loading further.
    window.stop();
  }
}

// jQuery script for fading in the page elements.
function fadeInElements() {
  // Some jQuery here...
}
