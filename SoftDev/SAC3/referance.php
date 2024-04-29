<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['todo'])) {
        $task = $_POST['todo'] . PHP_EOL;
        file_put_contents('todo.csv', $task, FILE_APPEND);
    }
    if (isset($_POST['delete'])) {
        $tasks = file('todo.csv');
        $updatedTasks = array_filter($tasks, function($task) {
            return trim($task) !== $_POST['delete'];
        });
        file_put_contents('todo.csv', implode('', $updatedTasks));
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo Referance</title>
</head>
<body>
  <form method="post" action="/">
    <input name="todo" type="text">
    <input type="button" value="Create">
  </form>
</body>
</html>