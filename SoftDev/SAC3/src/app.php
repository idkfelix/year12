<?php 
  $csv = new CSV('data.csv'); 
  $items = $csv->read(function(&$row){
    $date = date_create($row['date']);
    $row['days'] = date_diff(date_create(),$date)->d;
  });
?>

<!-- Page Boilerplate -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
</head>
<body>
  <!-- Render Main -->
  <?=content($items)?>
</body>
</html>

<!-- Main Page Content -->
<?php function content($items) { ?>
  <form action="/create" method="post" style="display:grid; width:300px;">
    <input type="text" name="data[name]">
    <input type="date" name="data[date]">
    <input type="submit" value="Create">
  </form>
  <ul>
    <!-- Each Item Loop -->
    <?php foreach($items as $item):?>
      <?php extract($item); ?>
      <form action="/delete" method="post" style="display:list-item">
        <span><?="$name ($days)"?></span>
        <input type="checkbox" name="data[id]" value="<?=$id?>" onChange="this.form.submit()">
      </form>
    <?php endforeach?>
  </ul>
<?php } ?>