<?php 
  $csv = new CSV('./data/items.csv'); 
  $items = $csv->read(function(&$row){
    $date = date_create($row['date']);
    $row['days'] = ++date_diff(date_create(),$date)->d;
  });
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Todo App</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      body { @apply p-10 bg-zinc-800; }
      .item { @apply bg-zinc-600 py-1 px-2 rounded-md text-white font-semibold; }
      .container {
        @apply w-96 mx-auto p-4 bg-zinc-200 rounded-md flex flex-col outline outline-zinc-600 shadow-lg;
        h2 { @apply text-xl font-semibold; }
      }
      .form {
        label {
          @apply flex flex-col;
          input { @apply px-2 rounded-sm; }
          input[type=submit] { @apply item mt-3; }
        }
      }
    </style>
  </head>
  <body>
<!--=======================================================================================-->
    <!-- Create Item Form -->
    <form action="?create" method="post" class="container form">
      <h2 class="mb-2 text-center">
        Create Todo
      </h2>
      <!-- Form Fields -->
      <?=Form::fields([
        'Todo Name'=>[
          'name'=>'data[name]',
          'type'=>'text'
        ],
        'Due Date'=>[
          'name'=>'data[date]',
          'type'=>'date'
        ],
        null=>[
          'value'=>'Create',
          'type'=>'submit'
        ]
      ])?>
      <!-- Show Error -->
      <?php if(isset($_SESSION['error'])): ?>
        <h3 class="mt-2 font-semibold text-lg">
          Error: <?=$_SESSION['error']?>
        </h3>
      <?php unset($_SESSION['error']); endif ?>
    </form>

    <!-- Items -->
    <div class="container mt-5 text-center gap-2">
      <h2 class="mb-2">Todos</h2>
      <!-- Each Item Loop -->
      <?php foreach($items as $item):?>
        <?php extract($item); ?>
        <form action="?delete" method="post" class="flex gap-3 item">
          <span><?=$name?></span>
          <span class="flex-grow text-right">
            <?="Due in $days days"?>
          </span>
          <input type="checkbox" name="data[id]" value="<?=$id?>" onClick="this.form.submit()">
        </form>
      <?php endforeach?>
    </div>
<!--=======================================================================================-->
  </body>
</html>
