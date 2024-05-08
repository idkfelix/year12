<?php
// Start PHP Session
session_start();
// Auto Load Classes from './lib'
spl_autoload_register(fn($class)=>include_once("./lib/$class.php"));

/** 
 * Create new Sample
 * @param string[] $data
 */
function handleCreate(array $data):void {
  $val = new Validate($data);
  $val->fieldRules([
    'type'=>'required|type:string|value:single,double',
    'number'=>'required|type:int',
    'weight'=>'required|type:float'
  ]);
  $val->dateRange('number',[010100,311223]);
  $fileName = "Trial{$data['number']}.csv";
  $csv = new CSV("./data/$fileName");
  unset($data['number']);
  $csv->append([
    'id'=>uniqid(),
    ...($data)
  ]);
  $_SESSION['status'] = "Sample saved to \"$fileName\"";
}

/**
 * Get Summary of a Trial
 * @param string[] $data
 */
function handleSummary(array $data):void {
  $val = new Validate($data);
  $val->fieldRules([
    'file'=>'required|type:string',
  ]);
  if(!in_array($data['file'],scandir('./data'))){
    throw new Exception("\"{$data['file']}\" does not exist");
  }
  $csv = new CSV("./data/{$data['file']}");
  $_SESSION['fileData'] = $val::sampleSummary($csv->read());
  $_SESSION['fileData']['file'] = $data['file'];
}

// Handle Request Methods
switch($_SERVER['REQUEST_METHOD']){
  case 'POST':
    try {
      // Match Request Query
      match($_SERVER['QUERY_STRING']){
        'create'=>handleCreate($_POST),
        'summary'=>handleSummary($_POST)
      };
    } catch(Exception $e){
      // Set Error Message on Faliure
      $_SESSION['status'] = "Error: {$e->getMessage()}";
    }  
    // Send Client back to App
    header("Location: {$_SERVER['PHP_SELF']}");
    break;
  // Default Show App
  default:
    include_once('app.php');
};