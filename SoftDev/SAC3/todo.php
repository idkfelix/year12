<?php 
  include_once('handler.php');
  formHandler();

  function todoItem($id,$name){
    ob_start(); ?>
    <!-- Begin Todo Item HTML -->
    <li 
      id="<?=$id?>"
      class="my-1 py-1 px-2 bg-zinc-600 rounded-md hover:scale-[1.005] transition-all shadow-sm"
    >
      <!-- Delete Mode (Default) -->
      <form action="/" method="post" class="flex gap-2">
        <input type="hidden" name="event" value="delete">
        <input type="hidden" name="id" value="<?=$id?>">
        <input type="checkbox" onChange="this.form.submit()">
        <p class="w-full mx-1"><?=$name?></p>
        <button type="button" onClick="toggle('<?=$id?>')">Edit</button>
      </form>
      <!-- Edit Mode -->
      <form action="/" method="post" class="hidden gap-2">
        <input type="hidden" name="event" value="edit">
        <input type="hidden" name="id" value="<?=$id?>">
        <input name="newName" type="text" placeholder="Re-Name Todo"
          class="px-2 !outline-none !text-black rounded-xl w-full"
        >
        <input type="submit" value="Save Name">
      </form>
    </li>
    <!-- End Todo Item HTML -->
    <?php return ob_get_clean();
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Todo App </title>

  <script>
    function toggle(id) {
      let item = document.getElementById(id)
      if(item){
        Array.from(todo.getElementsByTagName('form')).map(form => {
          let mode = form.style.display
          mode = ((mode === "none") ? "block" : "none" )
        })
      }
    }
  </script>
</head>

<body class="p-16 flex flex-col items-center bg-zinc-800 text-white">
  <form method="post" action="/" 
    class="p-4 flex flex-col w-96 mb-4 bg-zinc-700 rounded-md shadow-lg outline outline-1 outline-white"
  >
    <input type="hidden" name="event" value="create">
    <h2 class="my-1 font-semibold text-2xl text-center">
      Create Todo
    </h2>
    <input name="name" type="text" placeholder="Todo Name" required
      class="my-2 px-2 py-1 !outline-none !text-black rounded-sm"
    >
    <input type="submit" value="Create"
      class="my-1 px-2 py-1 bg-zinc-600 rounded-md hover:scale-[1.01] transition-all shadow-sm outline outline-1 outline-white"
    >
  </form>

  <ul class="p-4 flex flex-col w-96 mb-4 bg-zinc-700 rounded-md shadow-lg outline outline-1 outline-white">
    <h2 class="font-semibold text-2xl text-center">
      Todos
    </h2>
    <?php 
      global $filePath;
      if(filesize($filePath) == 0){
        echo '<p class="text-center py-2 text-zinc-500">No Todos Found</p>';
      } else {
        $csv = new CSV($filePath);
        $csv->read(function(&$row) {
          echo todoItem($row["id"],$row["name"]);
        });
      }
    ?>
  </ul>
</body>
</html>