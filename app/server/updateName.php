<?php
  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $id = mysqli_real_escape_string($connection, $_POST["id"]);
  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  $name = mysqli_real_escape_string($connection, $_POST["name"]);

  $queryUpdate = "UPDATE `storages` SET `name`='$name' WHERE `id` = '$id'";
  $result = mysqli_query($connection, $queryUpdate);

  if($result) {
    $querySelectAll = "SELECT * FROM `storages` WHERE (`userId` = '$userId')";
    $resultAll = mysqli_query($connection, $querySelectAll);

    if($resultAll) {
      $data = array();
      $i = 0;
      while($row = mysqli_fetch_assoc($resultAll)) {
        $data[$i] = $row;
        $i++;
      }
      echo json_encode([
        'status' => 'ok',
        'data' => $data
      ]);
    } else {
      echo json_encode(['status' => 'Ошибка сервера, попробуйте ещё раз.']);
    }
    
  } else {
    echo json_encode(['status' => 'Ошибка сервера, попробуйте ещё раз.']);
  }

  mysqli_close($connection);
?>