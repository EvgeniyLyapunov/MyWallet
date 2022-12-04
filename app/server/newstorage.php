<?php
  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $name = mysqli_real_escape_string($connection, $_POST["newStorageName"]);
  $moneyType = mysqli_real_escape_string($connection, $_POST["money"]);
  $lastModifiedDate = mysqli_real_escape_string($connection, $_POST["lastModifiedDate"]);
  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  $newStorageSum = mysqli_real_escape_string($connection, $_POST["newStorageSum"]);
  if($_POST["select"]) {
    $baseStorage = mysqli_real_escape_string($connection, $_POST["select"]);
  } else {
    $baseStorage = mysqli_real_escape_string($connection, "0");
  }

  $queryInsert = "INSERT INTO `storages`(`name`, `moneyType`, `balance`, `lastModifiedDate`, `userId`, `baseStorageId`)
                    VALUES ('$name', '$moneyType', '$newStorageSum', '$lastModifiedDate', '$userId', '$baseStorage')";

  $result = mysqli_query($connection, $queryInsert);

  if($result) {
    $querySelectAll = "SELECT * FROM `storages` WHERE (`userId` = '$userId')";
    $result = mysqli_query($connection, $querySelectAll);

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

