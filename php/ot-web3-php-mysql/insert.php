<?php
  $conn = mysqli_connect('localhost', 'root', 'asasas', 'opentutorials');
  $sql = "
    INSERT INTO topic 
      (title, description, created)
      VALUE (
        'MySQL',
        'MySQL is ...',
        NOW()
      )
  ";
  $result = mysqli_query($conn, $sql);
  if($result === false){
      echo mysqli_error($conn);
  }
?>
