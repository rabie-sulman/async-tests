<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

$key = json_decode(file_get_contents(__DIR__ . '/../data/key.json'), true)['key'];

$json = file_get_contents(__DIR__ . '/../data/php/result.json');

$json_data = json_decode($json,true);

try {
    foreach ($json_data as $item) {
        $itemReference = $item['itemReference']['reference'];
        $decoded = JWT::decode($itemReference, $key, array('HS256'));
    }
    print_r('all OK!');
} catch (\Exception $e) {
    print_r('NOT ok!');
}

