<ul>
  <?php
    $file = fopen('names.txt','r');
    $head = ['first','last','email','mobile'];
    for($i=0; ($row = fgetcsv($file,null,' '))!==FALSE; $i++){
      $row = array_combine($head,$row);
      extract($row);?>
  <li>
    <b>Person <?=$i?></b>
    <p>First Name: <?=$first?></p>
    <p>Last Name: <?=$last?></p>
    <p>Email: <?=$email?></p>
    <p>Mobile: <?=$mobile?></p>
  </li>
      <?php
    }
  ?>
</ul>