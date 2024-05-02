<?php
include_once('lib/csv.php');
include_once('lib/validate.php');

function handleReq() {
  switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
      handlePOST();
      break;
    default:
      include('app.php');
  };
}

function handlePOST() {
  try{
    $data = $_POST['data'];
    $csv = new CSV('data.csv');
    $val = new Validate($data);

    switch($_SERVER['REQUEST_URI']){
      case '/create':
        $val->fieldTypes([
          'name'=>'string',
          'date'=>'string'
        ]);
        $val->strDate($data['date']);
        $csv->append([
          'id' => uniqid(),
          ...($data)
        ]);
        
      case '/delete':
        $val->fieldTypes([
          'id'=>'string'
        ]);
        $csv->remove($data['id']);
    }
  } catch(Exception $e){
    echo $e->getMessage();
  }
  
  /** Send Client Back To App*/
  header("Location: /");
}

handleReq();