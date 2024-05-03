<?php
include_once('lib/csv.php');
include_once('lib/validate.php');
session_start();

switch($_SERVER['REQUEST_METHOD']){
  case 'POST':
    handlePOST();
    break;
    
  default:
    include('app.php');
};

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
        $val->dateRange(
          $val->strDate('date'),
          'now'
        );
        $csv->append([
          'id' => uniqid(),
          ...($data)
        ]);
        break;

      case '/delete':
        $val->fieldTypes([
          'id'=>'string'
        ]);
        $csv->remove($data['id']);
        break;
    }
  } catch(Exception $e){
    $_SESSION['error'] = $e->getMessage();
  }
  
  /** Send Client Back To App*/
  header("Location: /");
  exit;
}