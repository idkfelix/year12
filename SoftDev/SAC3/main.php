<?php
session_start();
spl_autoload_register(fn($class)=>include_once("./lib/$class.php"));
$csv = new CSV('./data/items.csv');
$val = new Validate($_POST);

// Classify Request Method
switch($_SERVER['REQUEST_METHOD']){
  case 'POST':
    try {
      match($_SERVER['QUERY_STRING']){
        'create'=>handleCreate(),
        'delete'=>handleDelete(),
      };
    } catch(Exception $e){
      $_SESSION['error'] = $e->getMessage();
    }  
    // Send Client back to App
    header("Location: {$_SERVER['PHP_SELF']}");
    break;
  default:
    include_once('app.php');
};

/** Create New Item */
function handleCreate(){
  global $_POST, $csv, $val;
  $val->fieldRules([
    'name'=>'required|type:string',
    'date'=>'required|type:string|date',
  ]);
  $val->dateRange('date',['now',null]);
  $csv->append([
    'id'=>uniqid(),
    ...($_POST)
  ]); 
}

/** Delete Item with Id */
function handleDelete(){
  global $_POST, $csv, $val;
  $val->fieldRules(['id'=>'required|type:string']);
  $csv->remove($_POST['id']);
}