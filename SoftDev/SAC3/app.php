<?php 
  function todoItem($id, $name){
    ?>
      <li id="<?=$id?>" class="btn">
        <!-- Delete Form -->
        <form method="post" class="gap-2" style="display:flex;">
          <input name="id" type="hidden" value="<?=$id?>">
          <input name="event" type="hidden" value="delete">
          <input type="checkbox" onChange="this.form.submit()">
          <p class="w-full mx-1"><?=$name?></p>
          <button type="button" onClick="toggle('<?=$id?>')">Edit</button>
        </form>
        <!-- Edit Form -->
        <form method="post" class="gap-2" style="display:none;">
          <input name="id" type="hidden" value="<?=$id?>">
          <input name="event" type="hidden" value="edit">
          <input name="newName" type="text" value="<?=$name?>" class="textInput">
          <input type="submit" value="Save Name">
        </form>
      </li>
    <?php
  }
?>

<main>
  <!-- Create Form -->
  <div class="container">
    <h2>Create Todo</h2>
    <form method="post">
      <input name="event" type="hidden" value="create">
      <input name="name" type="text" placeholder="Todo Name" class="textInput py-1 my-2">
      <input type="submit" value="Create" class="btn">
    </form>
  </div>
  <!-- Todo List -->
  <ul class="container">
    <h2>Todos</h2>
    <?php
      $csv = new CSV($filePath);
      $csv->read(function(&$row) {
        todoItem($row['id'], $row['name']);
      });
    ?>
  </ul>
</main>

<script>
  // Toggle Todo Item to Edit
  function toggle(id) {
    let item = document.getElementById(id)
    if(item){
      let forms = item.getElementsByTagName("form")
      Array.from(forms).forEach(e => {
        let d = e.style.display
        e.style.display = ((d=="none")?"flex":"none")
      })
    }
  }
</script>