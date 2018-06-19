// JavaScript for the tasks feature

// Base class for a task object - required, since IndexedDB works on the principle of object stores + argument passing is easier this way
class Task {
  constructor(name, date, subject) {
    this.name = name; // String
    this.date = date; // Date object
    this.subject = subject; // String
  }
}

// Function for interpreting data in the tasksdata.txt flat file into a visual display
// Accepted inputs: array of tasks
function displayTasks(tasks_array) {
  // Perhaps this is just going to run the getAll function from IDBPromised?
}

// Function for creating a new task
// Argument: a (new) task object
function createTask(new_task) {
  // Open the creation modal
  // Get data from the forms (this is going to be hard) and create a new task object
  // Add the formatted object store to the database
}

// Function for modifying a task's details
// Argument: a task object
function editTask(task) {
  // Open the editing modal
  // Change the task object, and somehow push the changes to the object store
  // Update the db
}

// Function for deleting a task
// Argument: a task object
function deleteTask(task) {
  // Delete the object from the tasks database (db)
}

// Function for checking that the entered date is valid (ie. is not some date in the past or, trivially, the current date)
// Argument: a date object
function checkDateOK(target_date) {
  var current_date = new Date();
  if (current_date >= target_date) {
    return false;
  } else {
    return true;
  }
}

// Function for sorting tasks by name order (alphabetic), subject order (also alphabetic) or date order (closest dates to the current day)
// Sorting is, by default, done in terms of which task(s) were most recently added (as far as IndexedDB is concerned)
// Argument: 'nameorder' | 'subjectorder' | 'dateorder'
function sortTasks(by) {
  return false;
  /* For when this actually does something.
  switch (by) {
    case 'nameorder':
      // ???
      break;
    case 'subjectorder':
      // ???
      break;
    case 'dateorder':
      // ???
      break;
  }*/
}

// Auto removes tasks if their date has expired
function removePastTasks() {
  // Cycle through tasks object store array
  // Run the checkDateOK function on their date value
  // If false, delete from the IndexedDB database.
}
