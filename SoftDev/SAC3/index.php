<?php 
  $filePath = 'todos.csv';
  include_once('csv.php');
  
  // Handle POST Requests
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csv = new CSV($filePath);
    switch ($_POST['event']) {
      // Create Todo
      case 'create':
        $csv->append(["name"=>$_POST['name']]);
        break;
      // Edit Todo
      case 'edit':
        $csv->mutate($_POST['id'], function(&$row) {
          $row["name"] = $_POST['newName'];
        });
        break;
      // Delete Todo
      case 'delete':
        $csv->remove($_POST['id']);
        break;
    }
    // Prevent Form Re-Submission
    header("Location: {$_SERVER['REQUEST_URI']}");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <!-- Tailwind Styles and Classes -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      .container {
        @apply w-96 p-4 my-3 flex flex-col;
        @apply bg-zinc-700 rounded-md shadow-lg outline outline-1 outline-white;
        h2 {
          @apply my-1 font-semibold text-2xl text-center;
        }
      }
      .btn {
        @apply w-full px-2 py-1 my-1 hover:scale-[1.005] transition-all;
        @apply bg-zinc-600 rounded-md shadow-sm outline outline-1 outline-white;
      }
      .textInput {
        @apply px-2 w-full outline-none text-black rounded-sm;
      }
    </style>
  </head>
  <body class="p-16 flex flex-col items-center bg-zinc-800 text-white">
    <!-- Main App -->
    <?php include('app.php');?>
  </body>
</html>