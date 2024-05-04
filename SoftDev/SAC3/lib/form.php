<?php

/** Form Builder */
class Form {
  public static function fields(array $fields):void {
    foreach($fields as $label=>$a){ ?>
      <label>
        <span><?=$label?></span>
        <input 
        <?php 
          foreach($a as $attr=>$value){
            if(!empty($value)){
              echo "$attr=\"$value\"";
            }
          }
        ?>>
      </label>
    <?php }
  }
}