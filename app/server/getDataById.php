<?php
  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $id = $_GET['id'];

  $querySelect = "SELECT * FROM `storages` WHERE (`userId` = $id)";
  $result = mysqli_query($connection, $querySelect);

  if($result) {
    $data = array();
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
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

  mysqli_close($connection);
?>