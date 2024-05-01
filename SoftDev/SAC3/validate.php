<?php
/** HTML Form Validation */
class Validate {
  private $data;

  /** @param mixed[] $_POST */
  public function __construct($_POST) {
    $this->data = $_POST;
  }

  /**
   * Compare Form Data to Referance Fields and Types
   * @param string[] $fields Array of Field => Expected Type
   * @return void
   */
  public function fieldTypes($fields) {
    foreach($fields as $field => $type){
      if(!isset($this->data[$field])){
        throw new Exception("$field is not set");
      } elseif(gettype($this->data[$field]) !== $type){
        throw new Exception("$field expected type $type");
      }
    }
  }

  /**
   * Validate Date String
   * @param string $dateStr
   * @return object Date if Valid String
   */
  public function strDate($dateStr) {
    if(!($date = date_create($dateStr))){
      throw new Exception("\"$dateStr\" not a valid date");
    }; return $date;
  }
}