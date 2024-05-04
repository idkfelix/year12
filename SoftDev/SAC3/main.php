<?php
require_once('lib/csv.php');
require_once('lib/validate.php');
session_start();

// Classify Request Method
switch($_SERVER['REQUEST_METHOD']){
  case 'POST':
    try {
      $data = $_POST['data'];
      $val = new Validate($data);
      $csv = new CSV('./data/items.csv');
      // Classify Request Query
      match($_SERVER['QUERY_STRING']){
        'create'=>handleCreate(),
        'delete'=>handleDelete(),
      };
    } catch(Exception $e){
      // Set session error to display
      $_SESSION['error'] = $e->getMessage();
    }  
    // Send Client back to App
    header("Location: {$_SERVER['PHP_SELF']}");
    break;
  // Route other Methods to App
  default:
    include('app.php');
};

/** Create New Item */
function handleCreate(){
  global $data, $csv, $val;
  $val->fieldRules([
    'name'=>'required|type:string',
    'date'=>'required|type:string|date',
  ]);
  $val::dateRange($data['date'],['now',null]);
  $csv->append([
    'id'=>uniqid(),
    ...($data)
  ]); 
}

/** Delete Item with Id */
function handleDelete(){
  global $data, $csv, $val;
  $val->fieldRules(['id'=>'required|type:string']);
  $csv->remove($data['id']);
}