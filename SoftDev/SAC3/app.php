<!-- Item Component -->
<?php function Item($data){extract($data);?>
  <li class="btn flex">
    <!-- Delete BTN -->
    <form method="post">
      <input name="event" value="del" type="hidden">
      <input name="id" value="<?=$id?>" type="hidden">
      <input value="X" type="submit" class="btn2">
    </form>
    <!-- Details -->
    <p class="mx-2"><?=$quantity?></p>
    <p class="w-full"><?=$name?></p>
    <p class="mx-2">$<?=$price*$quantity?></p>
    <!-- Checkbox -->
    <form method="post">
      <input name="event" value="toggle" type="hidden">
      <input name="id" value="<?=$id?>" type="hidden">
      <input type="checkbox" <?=($checked=="yes")?"checked":""?> onChange="this.form.submit()">
    </form>
  </li>
<?php }?>

<!-- Create Form -->
<div class="container">
  <h2>Add Item To List</h2>
  <form method="post">
    <input name="event" value="add" type="hidden">
    <!-- Quantity And Product -->
    <fieldset class="flex gap-2 my-2">
      <input name="quantity" value="1" type="number" class="input w-12 !pr-0">
      <select name="id" class="input py-1 w-full">
      <!-- Product Options From CSV -->
      <?php
        $items = new CSV('items.csv');
        $items->read(function($row) {
          extract($row);?>
          <option value="<?=$id?>"><?=$name?></option>
          <?php
        })
      ?>
      </select>
    </fieldset>
    <!-- Submit -->
    <input type="submit" value="Add Item" class="btn">
  </form>
</div>

<!-- List Items -->
<ul class="container">
  <h2>Shopping List</h2>
  <?php 
    $list = new CSV('list.csv');
    $data = $list->read(function(&$row) {
      Item($row);
    });
  ?>
</ul>