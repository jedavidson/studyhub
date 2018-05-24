<html>
<body>
  <?php
  $myfile = fopen("content/db/tasksdata.txt", "w") or die("Error whilst opening file."); /* Prime flat file for read */
  /* Fetch task name, subject and due date from HTML form and write them to the flat file */
  $txt = echo $_POST["taskname"];
  fwrite($myfile, $txt);
  $txt = echo $_POST["tasksubject"];
  fwrite($myfile, $txt);
  $txt = echo $_POST["duedate"];
  fwrite($myfile, $txt)
  fclose($myfile); /* Close file when done*/
  ?>
</body>
</html>
