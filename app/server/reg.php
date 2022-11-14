<?php

  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $nickname = mysqli_real_escape_string($connection, $_POST["nickname"]);
  $pass = mysqli_real_escape_string($connection, $_POST["pass"]);

  $querySelectBefore = "SELECT * FROM user WHERE (nickname = '$nickname')";
  $resultBefore = mysqli_query($connection, $querySelectBefore);

  if(mysqli_num_rows($resultBefore) != 0) {
    echo json_encode([
      'status' => 'Пользователь c таким ником уже существует']);
  } else {
    $queryInsert = "INSERT INTO user (nickname, pass) VALUES ('$nickname', '$pass')";
    $result = mysqli_query($connection, $queryInsert);

    if($result) {
      $querySelectAfter = "SELECT * FROM user WHERE (nickname = '$nickname') AND (pass = '$pass')";
      $result = mysqli_query($connection, $querySelectAfter);
      $record = mysqli_fetch_assoc($result);

      echo json_encode([
        'status' => 'ok',
        'id' => $record['id'],
        'nickname' => $record['nickname']
      ]);
    } else {
      echo json_encode(['status' => 'Ошибка сервера, попробуйте ещё раз.']);
    }
  }

  mysqli_close($connection);
?>