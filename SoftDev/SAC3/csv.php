<?php
/** CSV File Interface */
class CSV {
  private $filePath;

  /** @param string $filePath */
  public function __construct($filePath) {
    $this->filePath = $filePath;
  }

  /** 
   * Read Records in CSV optionally running Function on each Row
   * @param callable(mixed[]):void $rowFunc Function run on each row
   * @return array{mixed} buffer of all rows
   */
  public function read($rowFunc = null){
    $file = fopen($this->filePath, 'r');
    $headers = fgetcsv($file);
    for($buffer = []; ($row = fgetcsv($file)) !== FALSE; null) {
      $aRow = array_combine($headers, $row);
      $rowFunc($aRow);
      $buffer[] = $aRow;
    } 
    return $buffer;
  }

  /** 
   * Append Record with UUID and Data to CSV file
   * Created headers from keys if missing
   * @param mixed[] $data Fields of the Record
   * @param string|float $uuid ID / Primary Key for Record
   * @return void
   */
  public function append($data) {
    $file = fopen($this->filePath, 'a');
    $data = ["id"=>uniqid(), ...$data];
    if (filesize($this->filePath) == 0) {
      fputcsv($file, array_keys($data));
    }
    fputcsv($file, $data);
    fclose($file);
  }

  /** 
   * Find ID in CSV and mutate Record with callable argument
   * @param string $id ID of the targeted Record
   * @param callable(mixed[]):void $mutate Function to mutate the Record
   * @return void
   */
  public function mutate($id, $mutate) {
    $file = fopen($this->filePath, 'r+');
    $headers = fgetcsv($file);
    for($buffer = []; ($row = fgetcsv($file)) !== FALSE; null) {
      $aRow = array_combine($headers, $row);
      ($aRow["id"] == $id) && $mutate($aRow);
      ($aRow !== null) && $buffer[] = $aRow;
    }
    rewind($file);
    ftruncate($file, 0);
    fputcsv($file, $headers);
    foreach($buffer as $row) {
      fputcsv($file, $row); 
    } fclose($file);
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