<?php
  include_once('csv.php');
  include_once('handler.php');
  handlePOST();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
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
      .btn2 {
        @apply px-2 rounded-md shadow-sm outline outline-1 outline-white;
        @apply bg-zinc-600 hover:bg-zinc-900 transition-all;
      }
      .input {
        @apply px-2 outline-none text-black rounded-sm;
      }
    </style>
  </head>
  <body class="p-16 flex flex-col items-center bg-zinc-800 text-white">
    <?php include('app.php');?>
  </body>
</html>