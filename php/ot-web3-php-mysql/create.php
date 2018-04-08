<?php
  $conn = mysqli_connect(
    'localhost',
    'root',
    'asasas',
    'opentutorials');

  $sql = "SELECT * FROM topic";
  $result = mysqli_query($conn, $sql);
  $list = '';
  while ($row = mysqli_fetch_array($result)) {
    $escaped_title = htmlspecialchars($row['title']);
    $list = $list."<li><a href=\"index.php?id={$row['id']}\">{$escaped_title}</a></li>";
  }

  $article = array(
    'title' => 'Welcome',
    'description' => 'Hello, Web'
  );
?>
<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>WEB</title>
</head>
<body>
  <h1><a href='index.php'>WEB</a></h1>
  <ol>
    <?= $list ?>
  </ol>
  <form action='process_create.php' method='POST'>
    <p><input type='text' name='title' placeholder='title'></p>
    <p><textarea name='description' placeholder='description'></textarea></p>
    <p><input type='submit'></p>
  </form>
</body>
</html>
