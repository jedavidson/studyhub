// JavaScript for the tasks feature.

// Function for interpreting data from the Google spreadsheet into a visual display.
function displayTasks(tasks_array /* This is an optional argument. */) {
  // If no parameter was passed in, perform a read from the Google spreadsheet.
  if (existing_array == undefined) {
    var tasks_from_spreadsheet = new Array;
    function loadData() {
      var spreadsheet_url = "https://docs.google.com/spreadsheets/d/1cfVN3E0zE5FY3hnP5ho-TayMBr76UYvytlfcJCSFfDU/edit#gid=0";
      xmlhttp = new XMLHttpRequest();
      xml.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          alert(xmlhttp.responseText);
        }
      };
      xmlhttp.open("GET", spreadsheet_url, true);
      xmlhttp.send(null);
    }
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
    // write to spreadsheet.
  }
}

// Function for checking that the entered date is valid. (ie. is not some date in the past or, trivially, the current date)
function dateOK(date) {
  // Get the individual day, month and year from the given date.
  var target_day = Number(date.slice(0,2));
  var target_month = Number(date.slice(3,5));
  var target_year = Number(date.slice(6));

  // Convert this given date into milliseconds since the epoch. (1/1/1970)
  var target_date_unparsed = new Date(target_year, target_month, target_day);
  var target_date = Date.parse(target_date_unparsed);
  var current_date = new Date();

  // If the date is in the past, then it will be less than the time passed from the epoch until now.
  if (target_date > current_date) {
    return true;
  } else {
    return false;
  }
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
      // Do an alphabetical sort.
      break;
    case 'subjectorder':
      // Do an alphabetical sort.
      break;
    case 'dateorder':
      // Do a value sort.
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
