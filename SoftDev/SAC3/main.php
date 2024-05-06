<?php
// Start PHP Session
session_start();
// Auto Load Classes from './lib'
spl_autoload_register(fn($class)=>include_once("./lib/$class.php"));
// Initialise Classes
$csv = new CSV('items.csv');
$val = new Validate($_POST);


/** 
 * Create New Item 
 * @param string[] $data
 */
function handleCreate(array $data):void {
  global $csv, $val;
  // Verify Fields
  $val->fieldRules([
    'name'=>'required|type:string',
    'date'=>'required|type:string|date',
  ]);
  // Verify Date Range
  $val->dateRange('date',['now',null]);
  // Create Item
  $csv->append([
    'id'=>uniqid(),
    ...($data)
  ]); 
}

/** 
 * Delete Item with ID
 * @param string[] $data
 */
function handleDelete(array $data):void {
  global $csv, $val;
  // Verify Fields
  $val->fieldRules([
    'id'=>'required|type:string'
  ]);
  // Delete Item
  $csv->remove($data['id']);
}


// Handle Request Methods
switch($_SERVER['REQUEST_METHOD']){
  case 'POST':
    try {
      // Match Request Query
      match($_SERVER['QUERY_STRING']){
        'create'=>handleCreate($_POST),
        'delete'=>handleDelete($_POST),
      };
    } catch(Exception $e){
      // Set Error Message on Faliure
      $_SESSION['error'] = $e->getMessage();
    }  
    // Send Client back to App
    header("Location: {$_SERVER['PHP_SELF']}");
    break;
  // Default Show App
  default:
    include_once('app.php');
};