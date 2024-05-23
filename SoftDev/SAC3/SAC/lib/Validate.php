<?php

/** Form Validation */
class Validate {
  /** @var array<string, mixed> */
  private $data;

  /** @param array<string, mixed> $data Post Data ($_POST) */
  public function __construct(&$data) {
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
            if(match($value){
              'string'=>is_string($field),
              'float'=>is_numeric($field),
              'int'=>is_numeric($field),
            } == false){
              throw new Exception("$key expected type $value");
            }; break;
          // Date field is valid
          case 'value':
            if(!in_array($field,explode(',',$value))){
              throw new Exception("$key Should only be one of \"$value\"");
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
    if(($date = DateTime::createFromFormat('dmH',$this->data[$dateField])) == false){
      throw new Exception("'{$this->data[$dateField]}' Invalid Date/Time Provided");
    };
    if($range[0] && $date <= DateTime::createFromFormat('dmH',$range[0])){
      throw new Exception("Date/Time is less than '$range[0]'");
    } elseif($range[1] && $date >= DateTime::createFromFormat('dmH',$range[1])){
      throw new Exception("Date/Time is greater than '$range[1]'");
    }
  }


  /** 
   * Get Summary Data of A Trial
   * @param array $records Trial coffee data from `CSV::read()`
   * @return array Associative array of key summary points
   */
  public static function sampleSummary(array $records):array {
    $d = [
      'total'=>0, 
      'valid'=>0,
      'min'=>99, 
      'max'=>0
    ];
    $sum = 0;
    foreach($records as $coffee){
      extract($coffee);
      if(!isset($type) || ($type == 'single')){
        $d['total']++;
        if(($weight >= 6) && ($weight <= 8)){
          $d['valid']++;
          $sum += $weight;
        }
        if($weight < $d['min']){ $d['min'] = $weight; }
        if($weight > $d['max']){ $d['max'] = $weight; }
      } 
    }
    $d['mean'] = $sum / $d['valid'];
    return $d;
  }
}