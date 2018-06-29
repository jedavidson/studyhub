// JavaScript for the tasks feature.

// Declare the identifier for the tasks array as a global.
var tasks;

// Base class for a Task object.
class Task {
  constructor(name, subject, date) {
    this.name = name;
    this.subject = subject;
    this.date = date;
  }
}

// Function to be run as soon as the page is loaded.
function initScript() {
  window.onload = function () {
    // Retrieve tasks from the browser's storage
    tasks = getTasksFromStorage();
    // Check the loaded tasks for any that may be out of date and delete them, before they are loaded.
    removePastTasks(tasks);
    // Render the tasks on the page.
    displayTasks(tasks);
  };
}

// Function for getting the tasks from the browser's storage.
function getTasksFromStorage() {
  var tasks_array = new Array;
  // Loop through the browser data store.
  for (var i = 0; i < localStorage.length; i++) {
    var key_name = localStorage.key(i);
    // If the object's key is a task (ie. starts with the characters 'task'), deserialize it and add it to the tasks array.
    if (key_name.slice(0,4) == 'task') {
      var deserialized_obj = JSON.parse(localStorage.getItem(key_name));
      tasks_array.push(deserialized_obj);
    }
  }
  return tasks_array;
}

// Remove tasks if their date has expired.
function removePastTasks(tasks_array) {
  // Flag for determining if any tasks were deleted.
  var changed = false;

  // Loop through all of the tasks currently stored in the array.
  for (i = 0; i < tasks_array.length; i++) {
    if (!(dateOK(tasks_array[i].date))) {
      // Remove the task from the browser's storage.
      localStorage.removeItem('task' + String(i + 1));
      changed = true;
    }
  }

  // If any tasks were deleted, reload the page.
  if (changed == true) {
    location.reload();
  }
}

// Function for interpreting raw task data into a visual display on the tasks page.
function displayTasks(tasks_array) {
  // If a sorted array exists in session storage, override the tasks array with the sorted array.
  if (sessionStorage.key(0) == 'tasks-sorted') {
    // Parse the stored array and override the passed in tasks array.
    tasks_array = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
    // Remove the array from sessionStorage after the override is complete.
    sessionStorage.removeItem(sessionStorage.key(0));
  }

  // Generate the HTML elements for each task object in the array.
  for (var i = 0; i < tasks_array.length; i++) {
    // For simplicity, define all of the element IDs that will be assigned/referenced here.
    var task_id = 'task' + String(i + 1);
    var task_header_id = 'task-header' + String(i + 1);
    var task_name_id = 'task-name' + String(i + 1);
    var task_subject_id = 'task-subject' + String(i + 1);
    var task_date_id = 'task-date' + String(i + 1);
    var task_options_id = 'task-options' + String(i + 1);
    var edit_button_id = 'edit-button' + String(i + 1);
    var delete_button_id = 'delete-button' + String(i + 1);

    // Task parent div.
    var task_div = document.createElement('div');
    task_div.id = task_id;
    task_div.className = 'task';
    document.getElementById('tasks-wrapper').appendChild(task_div);

    // If the task number is odd (ie. i + 1 is odd <=> i is even) add a 20px spacing to the right of this div.
    if (i % 2 == 0) {
      document.getElementById(task_id).style.marginRight = '20px';
    }

    // Task header div.
    var task_header = document.createElement('div');
    task_header.id = task_header_id;
    task_header.className = 'task-header';
    document.getElementById(task_id).appendChild(task_header);

    // Task name paragraph.
    var task_name = document.createElement('p');
    task_name.id = task_name_id;
    task_name.className = 'task-name';
    document.getElementById(task_header_id).appendChild(task_name);
    document.getElementById(task_name_id).innerHTML = tasks_array[i].name;

    // Task subject paragraph.
    var task_subject = document.createElement('p');
    task_subject.id = task_subject_id;
    task_subject.className = 'task-subject';
    document.getElementById(task_id).appendChild(task_subject);
    document.getElementById(task_subject_id).innerHTML = 'For ' + tasks_array[i].subject;

    // Task date paragraph.
    var task_date = document.createElement('p');
    task_date.id = task_date_id;
    task_date.className = 'task-date';
    document.getElementById(task_id).appendChild(task_date);
    document.getElementById(task_date_id).innerHTML = 'Due ' + tasks_array[i].date;

    // Task options div.
    var task_options = document.createElement('div');
    task_options.id = task_options_id;
    task_options.className = 'task-options';
    document.getElementById(task_id).appendChild(task_options);

    // Task options buttons.
    var edit_button = document.createElement('button');
    var delete_button = document.createElement('button');
    edit_button.id = edit_button_id;
    delete_button.id = delete_button_id;
    edit_button.className = 'edit-buttons';
    delete_button.className = 'delete-buttons';
    document.getElementById(task_options_id).appendChild(edit_button);
    document.getElementById(task_options_id).appendChild(delete_button);
    document.getElementById(edit_button_id).onclick = function () { editTask(task_id) };
    document.getElementById(edit_button_id).innerHTML = 'Edit ✐';
    document.getElementById(delete_button_id).onclick = function () { deleteTask(task_id) };
    document.getElementById(delete_button_id).innerHTML = 'Delete ✖';
  }
}

// Function for parsing a given date string into an integer reflecting milliseconds since the epoch.
function parseDate(date) {
  // Get the individual day, month and year string slices from the given date.
  var date_day = Number(date.slice(0,2));
  var date_month = Number(date.slice(3,5));
  var date_year = Number(date.slice(6));

  // Convert this given date into milliseconds since the epoch.
  var date_unparsed = new Date(date_year, date_month - 1, date_day);
  var date = Date.parse(date_unparsed);

  return date;
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

// Function for checking if the length of strings is under the character limit of 30.
function characterLimitOK(target_name, target_subject) {
  if ((target_name.length <= 30) && (target_subject.length <= 30)) {
    return true;
  } else {
    return false;
  }
}

// Function for sorting tasks by name order (alphabetic), subject order (also alphabetic) or date order (closest dates to the current day).
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
      sorted_array = tasks_array.sort(function(a, b) { return parseDate(a.date) > parseDate(b.date) ? 1 : -1; });
      tasks_array = sorted_array;
      break;
  }

  // Store the sorted array in session storage, and reload the page.
  sessionStorage.setItem('tasks-sorted', JSON.stringify(tasks_array));
  location.reload();
}

// Function for creating a new task.
function createTask(tasks_array) {
  // Get the data from the HTML form.
  desired_name = document.getElementById('task-name').value;
  desired_subject = document.getElementById('task-subject').value;
  desired_date = document.getElementById('task-date').value;

  // If the task's name and subject are less than 30 characters and it has a valid due date, write the task to the browser's storage.
  if (dateOK(desired_date) && characterLimitOK(desired_name, desired_subject)) {
    // Create a new task object.
    new_task = new Task(desired_name, desired_subject, desired_date);

    // Serialize the object, then write it to the browser's storage.
    task_key = 'task' + String(tasks_array.length);
    localStorage.setItem(task_key, JSON.stringify(new_task));

    // Reload the page.
    //location.reload();

  } else if (!(dateOK(desired_date)) && characterLimitOK(desired_name, desired_subject)) {
    alert("Invalid date! Please try again.");
  } else if (dateOK(desired_date) && !(characterLimitOK(desired_name, desired_subject))) {
    alert("Invalid fields length! Please try again.");
  } else {
    alert("Invalid date and fields length! Please try again.");
  }
}

// Function for modifying a task's details
function editTask() {
  // Unhide the edit modal.
  document.getElementById('edit-task-modal').style.display = 'block';

  // Get stuff.
}

// Function for deleting a task.
function deleteTask(task_key) {
  // Prompt the user to confirm that they did indeed want to delete the task.
  alert("Deleting a task removes it permanently from storage. Click OK if you wish to proceed.");

  // Delete the task and refresh the page.
  localStorage.removeItem(task_key);
  location.reload();
}

// Run the script to initialise the program.
initScript();
