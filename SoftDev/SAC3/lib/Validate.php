<?php

/** Form Validation */
class Validate {
  /** @var array<string, mixed> */
  private $data;

  /** @param array<string, mixed> $data Post Data ($_POST) */
  public function __construct($data) {
    $this->data = $data;
  }

  /**
   * Validate Fields Against a set of Rules in a Spec
   * @param array<string,string> $spec Array of Fields and Rules
   */
  public function fieldRules(array $spec):void {
    foreach($spec as $key=>$_value){
      $field = $this->data[$key];
      // Validate each rule of Field
      foreach(explode('|', $_value) as $rules){
        list($rule, $value) = explode(':', $rules);
        switch($rule){
          // Field is set
          case 'required':
            if(!isset($field) || empty($field)){
              throw new Exception("$key is Required");
            }; break;
          // Field is correct type
          case 'type':
            if(gettype($field) !== $value){
              throw new Exception("$key Expected Type $value");
            }; break;
          // Date field is valid
          case 'date':
            if(!date_create($field)){
              throw new Exception("'$field' Invalid Date Provided");
            }; break;
          // Valid email string
          case 'email':
            if(!filter_var($field, FILTER_VALIDATE_EMAIL)){
              throw new Exception("Invalid E-Mail Provided");
            }; break;
        }
      }
    }
  }

  /**
   * Check if a given `DateTime` is within a specified range
   * @param string $dateField `$this->data` Date string property
   * @param array<?string> $range Array of min and max dates
   */
  public function dateRange(string $dateField, ?array $range=[]):void {
    $date = date_create($this->data[$dateField]);
    if($range[0] && $date <= date_create($range[0])){
      throw new Exception("Date is less than '$range[0]'");
    } elseif($range[1] && $date >= date_create($range[1])){
      throw new Exception("Date is greater than '$range[1]'");
    }
  }
}