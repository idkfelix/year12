<?php

/** Form Builder */
class Form {
  /** @var DOMDocument $dom */
  protected static DOMDocument $dom;

  /**
   * Create a DOMElement with attributes
   * @param string $tag HTML Tag of the Element
   * @param ?string $value InnerHTML String of the Element
   * @param ?string[] $attributes Associative array of element attributes
   * @return DOMElement New HTML Element that can be appended to `self::$dom`
   */
  private static function newElement(string $tag, ?string $value='', ?array $attributes=[]
  ):DOMElement {
    $e = self::$dom->createElement($tag, $value);
    foreach($attributes as $attr=>$value){
      $e->setAttribute($attr,$value);
    } return $e;
  }

  /**
   * Generate Form Fields from an Array
   * @param string[][] $fields Array of Field Labels and Attributes
   * @return string Generated HTML Fields
   */
  public static function fields(array $fields):string {
    self::$dom = self::$dom ?? new DOMDocument;
    foreach($fields as $name=>$attr){
      $label = self::newElement('label');
      self::$dom->append($label);
      $label->append(
        self::newElement('span',$name),
        self::newElement('input',null,$attr)
      );
    } return self::$dom->saveHTML();
  }
}