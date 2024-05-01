<?php
function handlePOST(){
  if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    switch($_POST['event']){
      
    }
    
    /** Send Client Back To Origin Address */
    header("Location: {$_SERVER['REQUEST_URI']}");
  }
}