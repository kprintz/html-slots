<?php

$randRequest = $_GET['randRequest'];
$jsonObject = [];
$randNumArray = [];

for ($i = 1; $i <= $randRequest; $i++) {
    $randNumber = rand(0, 3);
    $randNumArray[] = $randNumber;
}

$jsonObject['reelnumber'] = $randNumArray;

echo json_encode($randNumArray);
