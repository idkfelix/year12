<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Todo App</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style/dist.css">
  </head>
  <body>
    
    <!-- Create Item Form -->
    <form action="?create" method="post" class="mx-auto section form">
      <h2>Create Todo</h2>
      <!-- Form Fields -->
      <?=Form::fields([
        'Todo Name'=>[
          'name'=>'name',
          'type'=>'text'
        ],
        'Due Date'=>[
          'name'=>'date',
          'type'=>'date',
          'min'=>date('Y-m-d')
        ],
        null=>[
          'value'=>'Create',
          'type'=>'submit'
        ]
      ])?>
      <!-- Error Message -->
      <?=Form::errorMsg(
        $_SESSION['error'],
        'h3'
      )?>
    </form>
    
    <!-- Items List -->
    <div class="mx-auto my-5 section list">
      <h2>Todos</h2>
      <?php foreach($csv->read() as $item):?>
        <?php extract($item); ?>
        <?php $days = date_diff(new DateTime, date_create($date))->d;?>
        <!-- Item -->
        <form action="?delete" method="post">
          <span><?=$name?></span>
          <span class="flex-grow text-right">
            <?="Due in $days days"?>
          </span>
          <input type="checkbox" name="id" value="<?=$id?>" onClick="this.form.submit()">
        </form>
        <!-- /Item -->
      <?php endforeach?>
    </div>

  </body>
</html>