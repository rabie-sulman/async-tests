<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

$key = json_decode(file_get_contents(__DIR__ . '/../data/key.json'), true)['key'];

$json = file_get_contents(__DIR__ . '/../data/data.json');

$json_data = json_decode($json,true);

foreach ($json_data as &$item) {
    $itemReference = $item['itemReference']['reference'];
    $item['itemReference']['reference'] = JWT::encode($itemReference, $key);
}
file_put_contents(__DIR__ . '/../data/php/result.json', json_encode($json_data));