<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Todo App</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style><?=include_once('./style/dist.css')?></style>
  </head>
  <body>
    <!-- Create Item Form -->
    <form action="?create" method="post" class="container form">
      <h2>Create Todo</h2>
      <?=Form::fields([
        'Todo Name'=>[
          'name'=>'data[name]',
          'type'=>'email'
        ],
        'Due Date'=>[
          'name'=>'data[date]',
          'type'=>'date',
          'min'=>date('Y-m-d')
        ],
        null=>[
          'value'=>'Create',
          'type'=>'submit'
        ]
      ])?>
      <?=Form::errorMsg(
        $_SESSION['error'],
        'h3'
      )?>
    </form>

    <!-- Items -->
    <div class="container list">
      <h2>Todos</h2>
      <!-- Get Items as Array -->
      <?php   
        $csv = new CSV('./data/items.csv'); 
        $items = $csv->read();
      ?>
      <!-- Each Item Loop -->
      <?php foreach($items as $item):?>
        <?php extract($item); ?>
        <?php $days = date_diff(date_create(),date_create($date))->d;?>
        <form action="?delete" method="post" class="">
          <span><?=$name?></span>
          <span class="flex-grow text-right">
            <?="Due in $days days"?>
          </span>
          <input type="checkbox" name="data[id]" value="<?=$id?>" onClick="this.form.submit()">
        </form>
      <?php endforeach?>
    </div>
  </body>
</html>
