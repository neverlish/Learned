<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Loop</title>
</head>
<body>
  <h1>while</h1>
  <?php
    echo '1<br>';
    $i = 0;
    while ($i < 3) {
      echo '2<br>';
      $i = $i + 1;
    }
    echo '3<br>';
  ?>
</body>
</html>
