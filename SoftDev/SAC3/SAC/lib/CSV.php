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
   * @param ?string[] $head User defined headers
   * @param boolean $useHead Append headers to start of buffer
   * @return array<array<string, mixed>> buffer of all rows
   */
  public function read(?callable $rowFunc=null, ?array $head=null, bool $useHead=false):array {
    $buffer = [];
    if(!is_file($this->filePath)){
      return $buffer;
    }
    $file = fopen($this->filePath, 'r');
    $headers = $head ?? fgetcsv($file);
    $useHead && $buffer[] = $headers;
    while(($row = fgetcsv($file)) !== FALSE) {
      $aRow = array_combine($headers, $row);
      $rowFunc && $rowFunc($aRow);
      ($aRow !== null) && $buffer[] = $aRow;
    } fclose($file);
    return $buffer;
  }
}