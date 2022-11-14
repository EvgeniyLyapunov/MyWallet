<?php

  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $nick = mysqli_real_escape_string($connection, $_POST["nick"]);
  $pass = mysqli_real_escape_string($connection, $_POST["pass"]);

  $querySelect = "SELECT * FROM user WHERE (nickname = '$nick') AND (pass = '$pass')";
  $result = mysqli_query($connection, $querySelect);

  if(mysqli_num_rows($result) == 0) {
    echo json_encode([
      'status' => 'Пользователь c такими данными не существует, попробуйте зарегистрироваться']);
  } else {
    $record = mysqli_fetch_assoc($result);
    echo json_encode([
      'status' => 'ok',
      'id' => $record['id'],
      'nickname' => $record['nickname'],
    ]);
  }

  mysqli_close($connection);
?>