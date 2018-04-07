<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>WEB</h1>
    <ol>
      <li><a href="index.php?id=HTML">HTML</a></li>
      <li><a href="index.php?id=CSS">CSS</a></li>
      <li><a href="index.php?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>
      <?php
        if (isset($_GET['id'])) {
          echo $_GET['id'];  
        } else {
          echo 'Welcome';
        }
      ?>
    </h2>
    <?php
      if (isset($_GET['id'])) {
        echo file_get_contents('data/'.$_GET['id']);
      } else {
        echo 'Hello, PHP';
      }
    ?>
  </body>
</html>
