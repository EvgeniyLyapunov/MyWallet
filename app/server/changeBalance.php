<?php 
  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $id = mysqli_real_escape_string($connection, $_POST["id"]);
  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  $lastModifiedDate = mysqli_real_escape_string($connection, $_POST["lastModifiedDate"]);
  $balance = mysqli_real_escape_string($connection, $_POST["balance"]);

  if($_POST["idBaseCard"]) {
    $idBaseCard = mysqli_real_escape_string($connection, $_POST["idBaseCard"]);
    $baseCardBalance = mysqli_real_escape_string($connection, $_POST["baseCardBalance"]);
    $baseCardLastModifiedDate = mysqli_real_escape_string($connection, $_POST["baseCardLastModifiedDate"]);
  } else {
    $idBaseCard = mysqli_real_escape_string($connection, "0");
  }

  $queryUpdate = "UPDATE `storages` SET `balance`='$balance',`lastModifiedDate`='$lastModifiedDate'
                    WHERE `id` = '$id'";
  $result = mysqli_query($connection, $queryUpdate);

  $statusBaseCard = '';
  if($idBaseCard) {
    $queryUpdateBaseCard = "UPDATE `storages` SET `balance`='$baseCardBalance',`lastModifiedDate`='$baseCardLastModifiedDate'
                      WHERE `id` = '$idBaseCard'";
    $resultBaseCard = mysqli_query($connection, $queryUpdateBaseCard);
    if($resultBaseCard) {
      $statusBaseCard = 'ok';
    } else {
      $statusBaseCard = 'error';
    }
  } else {
    $statusBaseCard = 'empty';
  }


  if($result && ($statusBaseCard == 'ok' || $statusBaseCard == 'empty')) {
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
    echo json_encode(['status' => 'Ошибка сервера, попробуйте ещё раз.',
                      'result' => $result,
                      'resultBaseCard' => $statusBaseCard]);
  }

  mysqli_close($connection);
?>