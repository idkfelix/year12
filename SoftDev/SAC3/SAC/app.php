<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Coffee Samples</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/style/dist.css">
  </head>
  <body>
    
    <!-- Add Sample Form -->
    <form action="?create" method="post" class="section form mx-auto">
      <h2>Record Trial Sample</h2>
      <!-- Type Select -->
      <label>
        <span>Coffee Shot Type</span>
        <select name="type">
          <option value="single">Single Shot</option>
          <option value="double">Double Shot</option>
        </select>
      </label>
      <!-- Form Fields -->
      <?=Form::fields([
        'Trial Sample #'=>[
          'name'=>'number'
        ],
        'Ground Coffee Dispensed (grams)'=>[
          'name'=>'weight'
        ],
        null=>[
          'value'=>'Submit Sample',
          'type'=>'submit'
        ]
      ])?>
      <!-- Status Message -->
      <?=Form::statusMsg(
        $_SESSION['status'],
        'h3'
      )?>
    </form>

    <!-- Select Data to Analyse -->
    <form action="?summary" method="post" class="section form mx-auto mt-5">
      <h2>Trial Single Shot Summary</h2>
      <label>
        <span>Select Trial</span>
        <!-- file options -->
        <select name="file">
          <?php foreach(array_diff(scandir('./data'),['.','..']) as $fileName): ?>
            <option value="<?=$fileName?>">
              <?=$fileName?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>
      <!-- Submit btn -->
      <?=Form::fields([
        null=>[
          'value'=>'Get Summary',
          'type'=>'submit'
          ]
      ])?>
    </form>

    <!-- Show Summary if Selected -->
    <?php if(!empty($_SESSION['fileData'])): ?>
      <?php extract($_SESSION['fileData']);?>
      <div class="section summary mx-auto mt-5">
        <h2><?=$file?></h2>
        <span><?="Total Single Shots: $total"?></span>
        <span><?="Valid Single Shots: $valid"?></span>
        <span><?="Min Weight: $min"?></span>
        <span><?="Max Weight: $max"?></span>
        <span><?="Mean Weight of Valid Samples: $mean"?></span>
      </div>
      <!-- Reset summary for page reload -->
      <?php $_SESSION['fileData'] = null;?>
    <?php endif; ?>

  </body>
</html>