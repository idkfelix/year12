<?php

/** CSV Interface */
class CSV {
  /** @var string */
  private string $filePath;

  /** @param string $filePath */
  public function __construct(string $filePath) {
    $this->filePath = $filePath;
  }

  /** 
   * Append Record with UUID and Data to CSV file
   * Creates headers from keys if missing
   * @param array<string, mixed> $data Fields of the Record
   */
  public function append(array $data):void {
    $file = fopen($this->filePath, 'a');
    if(filesize($this->filePath) == 0) {
      fputcsv($file, array_keys($data));
    }
    fputcsv($file, $data);
    fclose($file);
  }

  /** 
   * Read Records from CSV optionally running Function on each Row
   * @param ?callable $rowFunc Function run on each row
   * @param boolean $useHead Append headers to start of buffer
   * @return array<array<string, mixed>> buffer of all rows
   */
  public function read(?callable $rowFunc=null, bool $useHead=false):array {
    $buffer = [];
    if(!is_file($this->filePath)){
      return $buffer;
    }
    $file = fopen($this->filePath, 'r');
    $headers = fgetcsv($file);
    $useHead && $buffer[] = $headers;
    while(($row = fgetcsv($file)) !== FALSE) {
      $aRow = array_combine($headers, $row);
      $rowFunc && $rowFunc($aRow);
      ($aRow !== null) && $buffer[] = $aRow;
    } fclose($file);
    return $buffer;
  }

  /** 
   * Find ID in CSV and mutate Record
   * @param string $id ID of the targeted Record
   * @param callable $mutate Function to mutate the Record
   */
  public function mutate(string $id, callable $mutate):void {    
    $buffer = $this->read(function(&$row) use($id, $mutate) {
      ($row["id"] == $id) && $mutate($row);
    },true);
    $file = fopen($this->filePath, 'w');
    foreach($buffer as $row) {
      fputcsv($file, $row); 
    } fclose($file);
  }

  /**
   * Find Record in CSV File
   * @param string $id ID Field of target Record
   * @return array<string, mixed> Target Record as Array
   */
  public function find(string $id):array {
    $this->read(function($row) use($id, &$record) {
      ($row['id'] == $id) && $record = $row;
    }); return $record;
  }

  /**
   * Remove Record matching ID in CSV
   * @param string $id ID of the targeted record
   */
  public function remove(string $id):void {
    $this->mutate($id, function(&$row) {
      $row = null;
    });
  }
}