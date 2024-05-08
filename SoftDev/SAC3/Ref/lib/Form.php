<?php

/** Form Builder */
class Form {
  /** @var DOMDocument $dom */
  public static DOMDocument $dom;

  /**
   * Create a DOMElement with attributes
   * @param string $tag HTML Tag of the Element
   * @param ?string $value InnerHTML String of the Element
   * @param ?string[] $attributes Associative array of element attributes
   * @return DOMElement New HTML Element that can be appended to `self::$dom`
   */
  public static function newElement(string $tag, ?string $value='', ?array $attributes=[]):DOMElement {
    $e = self::$dom->createElement($tag, $value);
    foreach($attributes as $attr=>$value){
      $e->setAttribute($attr,$value);
    } return $e;
  }

  /**
   * Generate Form Fields from an Array
   * @param string[][] $fields Array of Field Labels and Attributes
   * @param ?string[] $attr Attributes for each Field Label
   * @return string Generated HTML Fields
   */
  public static function fields(array $fields):string {
    self::$dom = new DOMDocument;
    foreach($fields as $name=>$attr){
      $label = self::newElement('label');
      self::$dom->append($label);
      $label->append(
        self::newElement('span',$name),
        self::newElement('input',null,$attr)
      );
    } return self::$dom->saveHTML();
  }

  /**
   * Shows and Resets Error Message Variable
   * @param ?string $error Error Message Variable
   * @param string $tag HTML Tag to Wrap Message
   * @return string Error Message HTML
   */
  public static function errorMsg(?string &$error, string $tag):string {
    self::$dom = new DOMDocument;
    if(isset($error) && !empty($error)){
      $msg = self::newElement($tag,"Error: $error");
      self::$dom->append($msg);
      $error = null;
    } return self::$dom->saveHTML();
  }
}