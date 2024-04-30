<?php
function handleAdd($data){
  $items = new CSV('items.csv');
  $list = new CSV('list.csv');
  
  if($list->find($data['id'])){
    $list->mutate($data['id'], function(&$row) use($data){
      $row['quantity'] += $data['quantity'];
      ($row['quantity'] <= 0) && $row = null;
    });
  } else {
    $list->append([
      ...($items->find($data['id'])),
      'quantity'=> $data['quantity'],
      'checked'=> 'no',
    ]);
  }
}

function handlePOST(){
  if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    switch($_POST['event']){
      case 'add':
        handleAdd($_POST);
        break;

      case 'toggle':
        $list = new CSV('list.csv');
        $list->mutate($_POST['id'], function(&$row) {
          $row['checked'] = ($row['checked']=="yes") ? "no":"yes";
        });
        break;

      case 'del':
        $list = new CSV('list.csv');
        $list->remove($_POST['id']);
        break;
    }
    
    /** Send Client Back To Origin Address */
    header("Location: {$_SERVER['REQUEST_URI']}");
  }
}