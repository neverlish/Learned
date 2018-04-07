<?php
  unlink('data/'.$_POST['id']);
  header('Location: /index.php');
?>
