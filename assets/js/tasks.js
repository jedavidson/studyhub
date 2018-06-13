// Tasks-specific JavaScript resources

// Base class for a task object - required, since IndexedDB works on the principle of object stores + argument passing is easier this way
class Task {
  constructor(name, date, subject) {
    this.name = name;
    this.date = date; // This will be a date object
    this.subject = subject;
  }
}

// Retrieve interpreted task objects into an array
function createTaskArray() {
    tasks_array = new Array();
}

// Function for interpreting data in the tasksdata.txt flat file into a visual display
// Accepted inputs: array of tasks
function displayTasks(tasks_array) {
  // some code here
}

// Function for creating a new task
// Argument: a (new) task object
function createTask(new_task) {
  // some code here
}

// Function for modifying a task's details
// Argument: a task object
function editTask(task) {
  // some code here
}

// Function for deleting a task
// Argument: a task object
function deleteTask(task) {
  // some code here
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
  // yeah
}
