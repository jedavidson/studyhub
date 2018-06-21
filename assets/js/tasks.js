// JavaScript for the tasks feature.

// Function for interpreting data from the Google spreadsheet into a visual display.
function displayTasks(tasks_array /* This is an optional argument. */) {
  // If no parameter was passed in, perform a read from the Google spreadsheet.
  if (tasks_array == undefined) {
    var tasks_from_spreadsheet = new Array;
    // Array should be formatted as such: [{name:"taskname", subject:"tasksubject", date:"taskdate", parsed_date:"xyz"} ... ]
  }
  // If a parameter was passed in,
  else {

  }

}

// Function for creating a new task.
function createTask(new_task) {
  // Get the data from the HTML form.
  var name = document.getElementById("taskname").value;
  var subject = document.getElementById("tasksubject").value;
  var date = document.getElementById("taskdate").value;

  // If the task's name and subject are less than 30 characters and it has a valid due date, write the task to the spreadsheet.
  if (dateOK(date) && characterLimitOK(name, subject)) {
    // Write to spreadsheet - who knows how we're going to do this though?
  } else if (!(dateOK(date)) && characterLimitOK(name, subject)) {
    alert("Invalid date! Please try again.")
  } else if (dateOK(date) && !(characterLimitOK(name, subject))) {
    alert("Invalid fields length! Please try again.")
  } else {
    alert("Invalid date and fields length! Please try again.")
  }
}

// Function for checking that the entered date is valid. (ie. is not some date in the past or, trivially, the current date)
function dateOK(date) {
  // Get the current date and target date as parsed integers reflecting milliseconds since the epoch.
  var current_date = new Date();
  var target_date = parseDate(date);

  // If the date is in the past, then it will be less than the time passed from the epoch until now.
  if (target_date > current_date) {
    return true;
  } else {
    return false;
  }
}

// Function for parsing a given date string into an integer reflecting milliseconds since the epoch.
function parseDate(date) {
  // Get the individual day, month and year string slices from the given date.
  var date_day = Number(date.slice(0,2));
  var date_month = Number(date.slice(3,5));
  var date_year = Number(date.slice(6));

  // Convert this given date into milliseconds since the epoch.
  var date_unparsed = new Date(target_year, target_month, target_day);
  var date = Date.parse(target_date_unparsed);
  return date;
}

// Function for checking if the length of strings is under the character limit of 30.
function characterLimitOK(target_name, target_subject) {
  if (target_name.length =< 30 && target_subject.length =< 30) {
    return true;
  }
}

// Function for sorting tasks by name order (alphabetic), subject order (also alphabetic) or date order (closest dates to the current day)
function sortTasks(sort_method, tasks_array) {
  switch (sort_method) {
    case 'nameorder':
      // Sort the array alphabetically in terms of the task names.
      sorted_array = tasks_array.sort(function(a, b) { return a.name > b.name ? 1 : -1; });
      tasks_array = sorted_array;
      break;
    case 'subjectorder':
      // Sort the array alphabetically in terms of the task subjects.
      sorted_array = tasks_array.sort(function(a, b) { return a.subject > b.subject ? 1 : -1; });
      tasks_array = sorted_array;
      break;
    case 'dateorder':
      // Sort the array alphabetically in terms of the task subjects.
      sorted_array = tasks_array.sort(function(a, b) { return a.parsed_date > b.parsed_date ? 1 : -1; });
      tasks_array = sorted_array;
      break;
  }

  //  Display the newly sorted data.
  displayTasks(tasks_array);
}

// Auto-remove tasks if their date has expired.
function removePastTasks() {
  // Cycle through tasks dates
  // checkDateOK on each
}

// Function for modifying a task's details
function editTask(task) {
  // Open the editing modal
  //
}

// Function for deleting a task
function deleteTask(task) {
  // Delete the object from the tasks database (db)
}
