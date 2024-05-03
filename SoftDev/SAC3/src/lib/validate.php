<?php
/** HTML Form Validation */
class Validate {
  private $data;

  /** @param mixed[] $data Post Data ($_POST) */
  public function __construct($data) {
    $this->data = $data;
  }

  /**
   * Compare Form Data to Referance Fields and Types
   * @param string[] $fields [Field => Expected Type]
   * @return bool `true` if successful
   */
  public function fieldTypes($fields) {
    foreach($fields as $field => $type){
      if(!isset($this->data[$field])){
        throw new Exception("$field is not set");
      } elseif(empty($this->data[$field])){
        throw new Exception("$field is required");
      }elseif(gettype($this->data[$field]) !== $type){
        throw new Exception("$field expected type $type");
      }
    } return true;
  }

  /**
   * Validate Date String
   * @param string $dateField Date String to verify
   * @return DateTime Date Object
   */
  public function strDate($dateField) {
    if(!($date = date_create($this->data[$dateField]))){
      throw new Exception("\"{$this->data[$dateField]}\" Invalid date provided");
    }; return $date;
  }

  /**
   * Check if a given `DateTime` is within a specified range
   * @param DateTime $date Date to check
   * @param string $min Minimum date
   * @param string $max Maximum date
   * @return bool `true` if successful
   */
  public function dateRange($date, $min = null, $max = null) {
    if(!$date instanceof DateTime){
      throw new Exception("Invalid date provided.");
    } elseif($min && $date <= date_create($min)){
      throw new Exception("Date is less than \"$min\".");
    } elseif($max && $date >= date_create($max)){
      throw new Exception("Date is greater than \"$max\".");
    } return true;
  }
}