<?php
  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_mywallet");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $name = mysqli_real_escape_string($connection, $_POST["newStorageName"]);
  $moneyType = mysqli_real_escape_string($connection, $_POST["moneyType"]);
  $lastModifiedDate = mysqli_real_escape_string($connection, $_POST["lastModifiedDate"]);
  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  if($_POST["baseStorage"]) {
    $baseStorage = mysqli_real_escape_string($connection, $_POST["baseStorage"]);
  } else {
    $baseStorage = mysqli_real_escape_string($connection, "0");
  }

  $queryInsert = "INSERT INTO storages (name, moneyType, lastModifiedDate, userId, baseStorage)
                    VALUES ('$name', '$moneyType', '$lastModifiedDate', '$userId', '$baseStorage')";

  $result = mysqli_query($connection, $queryInsert);

  if($result) {
    $querySelectAll = "SELECT * FROM storages WHERE (userId = '$userId')";
    $result = mysqli_query($connection, $querySelectAll);
    $record = mysqli_fetch_assoc($result);
  }


?>