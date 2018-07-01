// JavaScript for the tasks feature.

// Declare the identifier for the tasks array as a global.
var tasks;

// Global variable to store the ID of the task that needs editing.
var task_to_edit;

// Base class for a Task object.
class Task {
  constructor(name, subject, date) {
    this.name = name;
    this.subject = subject;
    this.date = date;
  }
}

// Function to be run as soon as the page is loaded, setting it up.
function pageSetup() {
  window.onload = function () {
    // Retrieve tasks from the browser's storage
    tasks = getTasksFromStorage();

    // Check the loaded tasks for any that may be out of date and delete them, before they are loaded.
    removePastTasks(tasks);

    // Render the tasks on the page.
    displayTasks(tasks);
  };
}

// Function for retrieving tasks from the browser's storage.
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

// Function for removing tasks if their date has expired.
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
    document.getElementById(edit_button_id).onclick = function () { editButtonOnClick(task_id) };
    document.getElementById(edit_button_id).innerHTML = 'Edit ✐';
    document.getElementById(delete_button_id).onclick = function () { deleteTask(task_id) };
    document.getElementById(delete_button_id).innerHTML = 'Delete ✖';
  }
}

// Function for parsing a given date string into an integer reflecting milliseconds since the epoch.
function parseDate(date) {
  // Get the individual day, month and year string slices from the given date.
  var date_day = Number(date.slice(0, 2));
  var date_month = Number(date.slice(3, 5));
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

  // Flag for determining if the date passes all of the checks.
  var valid = false;

  // Check if the date is in the past, since if it is less time will have passed from the epoch until now.
  if (target_date > current_date) {
    // Check to see if the month is less than or equal to 12.
    console.log(Number(date.slice(3, 5)) <= 11);
    if (Number(date.slice(3, 5)) <= 11) {
      // Check to see if the day entered is valid, depending on which month it is.
      switch (date.slice(3, 5)) {
        // Months with 31 days.
        case 1: // January
        case 3: // March
        case 5: // May
        case 7: // July
        case 8: // August
        case 10: // October
        case 12: // December
          if (Number(date.slice(0, 2)) <= 31) {
            valid = true;
          }
          break;
        // Months with 30 days.
        case 4: // April
        case 6: // June
        case 9: // September
        case 11: // November
          if (Number(date.slice(0, 2)) <= 30) {
            valid = true;
          }
          break;
        // The complex case of February.
        case 2:
          // Check if the year is a leap year. (ie. divisible by 4)
          if (Number(date.slice(6)) % 4 == 0) {
            // If so, the day can be, at most, 29.
            if (Number(date.slice(0, 2)) <= 29) {
              valid = true;
            }
          // If not, the day can be, at most, 28.
          } else {
            if (Number(date.slice(0, 2)) <= 28) {
              valid = true;
            }
          }
          break;
      }
    }
    return true;
  }
  return valid;
}

// Function for checking if the length of strings is under the character limit of 30.
function characterLimitOK(target_name, target_subject) {
  if (target_name.length <= 30 && target_subject.length <= 30) {
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

  // Check if the name, subject and date are valid. (name and subject need to be 30 characters or less, date needs to be in DD/MM/YYYY format)
  if (dateOK(desired_date) && characterLimitOK(desired_name, desired_subject)) {
    // Create a new task object.
    new_task = new Task(desired_name, desired_subject, desired_date);

    // Serialize the object, then write it to the browser's storage.
    task_key = 'task' + String(localStorage.length + 1);
    localStorage.setItem(task_key, JSON.stringify(new_task));

    // Reload the page.
    location.reload();

  } else if (!(dateOK(desired_date)) && characterLimitOK(desired_name, desired_subject)) {
    alert("Invalid date! Please try again.");
  } else if (dateOK(desired_date) && !(characterLimitOK(desired_name, desired_subject))) {
    alert("Invalid fields length! Please try again.");
  } else {
    alert("Invalid date and fields length! Please try again.");
  }
}

// Prerequisite function for consolidating the necessary JavaScript commands executed upon clicking the edit task button.
function editButtonOnClick(task_key) {
  // Return the task's key in localStorage (ie. the number portion of its assigned HTML ID) so that it can be edited.
  task_to_edit = task_key;

  // Unhide the editing modal.
  document.getElementById('edit-task-modal').style.display = 'block'
}

// Function for modifying a task's details.
function editTask(tasks_array, storage_key) {
  // Get the data from the HTML form.
  edited_name = document.getElementById('edit-task-name').value;
  edited_subject = document.getElementById('edit-task-subject').value;
  edited_date = document.getElementById('edit-task-date').value;

  // Flag to determine if the task needs to be updated/rewritten.
  var edited = true;

  // If these edited values are all the same as original (ie. unedited), then there is no need to rewrite the task.
  if (edited_name == localStorage.getItem(storage_key).name && edit_subject == localStorage.getItem(storage_key).subject && edited_date == localStorage.getItem(storage_key).date) {
    edited = false;
  }

  // If the task has been edited, perform the edit.
  if (edited == true) {
    // Check if the name, subject and date are valid. (name and subject need to be 30 characters or less, date needs to be in DD/MM/YYYY format)
    if (dateOK(edited_date) && characterLimitOK(edited_name, edited_subject)) {
      // Format the edited details into a new task object.
      var edited_task = new Task(edited_name, edited_subject, edited_date);

      // Serialize the object, and rewrite the task with the new details.
      localStorage.setItem(storage_key, JSON.stringify(edited_task));

      // Reload the page.
      location.reload();

    } else if (!(dateOK(edited_date)) && characterLimitOK(edited_name, edited_subject)) {
      alert("Invalid date! Please try again.");
    } else if (dateOK(edited_date) && !(characterLimitOK(edited_name, edited_subject))) {
      alert("Invalid fields length! Please try again.");
    } else {
      alert("Invalid date and fields length! Please try again.");
    }
  }
}

// Function for deleting a task.
function deleteTask(task_key) {
  console.log(task_key);
  // Prompt the user to confirm that they did indeed want to delete the task.
  alert("Deleting a task removes it permanently from storage. Click OK if you wish to proceed.");

  // Delete the task and refresh the page.
  localStorage.removeItem(task_key);
  location.reload();
}

// Run the setup script.
pageSetup();
