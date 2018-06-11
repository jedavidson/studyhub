// Methods for interacting with IndexedDB, using the Dexie wrapper

// Check browser compatibility with IndexedDB
function checkIndexedDBCompatibility() {
  if (!('indexedDB') in window) {
    alert("This website will not work as your browser does not support IndexedDB.");
    window.stop(); // Quit loading the page, since if they don't have IndexedDB compatibility, they can't use the site
  }
}

// Database initialisation
function initDB() {
  // Create the indexedDB object
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  var open = window.IndexedDB.open("StudyHubDB", 1);

  open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};
}

// Reading data from IndexedDB
function readData() {
  // reading
}

// Writing data from IndexedDB
function writeData() {
  // writing
}

// Deleting data from IndexedDB
function deleteData() {
  // deleting/overriding
}
