<style>
  #error {
    width: 400px;
    margin: auto;
    margin-top: 10px;
    background: orange;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    color: white;
  }

  form {
    display:flex; 
    flex-direction: column;
    gap: 4px;
    width: 400px;
    margin: auto;
    margin-top: 40px;
    background: grey;
    padding: 20px;
    border-radius: 10px;
    color: white;
  }

  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 5px;
    text-align: center;
  }

  label {
    width: 100%;
    display: flex;
  }

  input {
    width: 300px;
    margin-left: auto;
  }

  button {
    width: 300px;
    margin: auto;
    margin-top: 10px;
  }
</style>

<form method="post">
  <h1>Register</h1>
  <label>
    <span>Email: </span>
    <input type="email" name="email">
  </label>
  <label>
    <span>Password: </span>
    <input type="password" name="pass">
  </label>  
  <label>
    <span>Re-Enter: </span>
    <input type="password" name="_pass">
  </label>
  <label>
    <span>Date of Birth: </span>
    <input type="date" name="dob">
  </label>
  <button type="submit">Submit</button>
</form>

<?php 
  if($_SERVER['REQUEST_METHOD'] === 'POST'){
    try{
      if(sizeof($_POST) != 4){
        throw new Exception('Wrong Number of fields');
      } 

      extract($_POST);
      if(!$email || !$pass || !$_pass || !$dob){
        throw new Exception('Field is Missing');
      } 

      if($pass != $_pass){
        throw new Exception('Passwords must match');
      }

      $date = new DateTime($dob);
      $now = new DateTime();
      $diff = $date->diff($now);
      if(($diff->d > $now) || ($diff->y > 120)){
        throw new Exception('Invalid Date of Birth');
      }

    } catch(Exception $e){
      $msg = $e->getMessage()
      ?>
        <div id='error'>
          <h1>Error: <?=$msg?></h1>
        </div>
      <?php
    }
  }
?>