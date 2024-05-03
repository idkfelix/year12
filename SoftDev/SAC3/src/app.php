<?php 
  $csv = new CSV('data.csv'); 
  $items = $csv->read(function(&$row){
    $date = date_create($row['date']);
    $row['days'] = date_diff(date_create(),$date)->d;
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
    body { @apply p-10 bg-zinc-800 }
    h2 { @apply text-xl font-semibold }
    input { @apply px-2 rounded-sm }

    .btn { @apply bg-zinc-600 py-1 px-2 rounded-sm text-white font-semibold }
    .container { @apply w-96 mx-auto p-4 bg-zinc-200 rounded-md flex flex-col outline outline-zinc-600 shadow-lg }
  </style>
</head>
<body>
  <!-- Render Content -->
  <?=content($items)?>
</body>
</html>


<!-- Page Content -->
<?php function content($items) { ?>
  <!-- Create Item Form -->
  <form action="/create" method="post" class="container">
    <h2 class="mb-2 text-center">Create Todo</h2>
    <span>Todo Name</span>
    <input type="text" name="data[name]" placeholder="New Todo Name...">
    <span>Due Date</span>
    <input type="date" name="data[date]">
    <input type="submit" value="Create" class="btn mt-3">
    <!-- Render Error -->
    <?php if(isset($_SESSION['error'])): ?>
        <h2 class="mt-2 !text-lg">
          Error: <?=$_SESSION['error']?>
        </h2>
    <?php unset($_SESSION['error']); endif ?>
  </form>

  <!-- Items -->
  <div class="container mt-5 text-center">
    <h2 class="mb-2">Todos</h2>
    <!-- Each Item Loop -->
    <?php foreach($items as $item):?>
      <?php extract($item); ?>
      <form action="/delete" method="post" class="flex gap-3 btn">
        <span><?=$name?></span>
        <span class="flex-grow text-right">
          <?="Due in $days days"?>
        </span>
        <input type="checkbox" name="data[id]" value="<?=$id?>" onClick="this.form.submit()">
      </form>
    <?php endforeach?>
  </div>
<?php } ?>