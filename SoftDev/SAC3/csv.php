<?php
/** CSV File Interface */
class CSV {
  private $filePath;

  /** @param string $filePath */
  public function __construct($filePath) {
    $this->filePath = $filePath;
  }

  /** 
   * Append Record with UUID and Data to CSV file
   * Created headers from keys if missing
   * @param mixed[] $data Fields of the Record
   * @return void
   */
  public function append($data) {
    $file = fopen($this->filePath, 'a');
    if (filesize($this->filePath) == 0) {
      fputcsv($file, array_keys($data));
    }
    fputcsv($file, $data);
    fclose($file);
  }

  /** 
   * Read Records from CSV optionally running Function on each Row
   * @param callable(mixed[]):void $rowFunc Function run on each row
   * @param boolean $useHead Append headers to start of buffer
   * @return array{mixed} buffer of all rows
   */
  public function read($rowFunc = null, $useHead = false){
    $file = fopen($this->filePath, 'r');
    $buffer = [];
    $headers = fgetcsv($file);
    $useHead && $buffer[] = $headers;
    while(($row = fgetcsv($file)) !== FALSE) {
      $aRow = array_combine($headers, $row);
      $rowFunc($aRow);
      ($aRow !== null) && $buffer[] = $aRow;
    } fclose($file);
    return $buffer;
  }

  /** 
   * Find ID in CSV and mutate Record with callable argument
   * @param string $id ID of the targeted Record
   * @param callable(mixed[]):void $mutate Function to mutate the Record
   * @return void
   */
  public function mutate($id, $mutate) {    
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
   * @return mixed[] Target Record as Array
   */
  public function find($id) {
    $this->read(function($row) use($id, &$record) {
      ($row['id'] == $id) && $record = $row;
    }); return $record;
  }

  /**
   * Remove Record matching ID from CSV
   * @param string $id ID of the targeted record
   * @return void
   */
  public function remove($id) {
    $this->mutate($id, function(&$row) {
      $row = null;
    });
  }
}