<?php
  unlink('data/'.basename($_POST['id']));
  header('Location: /index.php');
?>
