<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit("Access Denied");
}

$amount = $_POST['m_amount'];
$order_id = $_POST['m_orderid'];
$sign = $_POST['m_sign'];

$secret = '14773045';
$hash = strtoupper(hash('sha256', implode(":", [
    $_POST['m_operation_id'],
    $_POST['m_operation_ps'],
    $_POST['m_operation_date'],
    $_POST['m_operation_pay_date'],
    $_POST['m_shop'],
    $_POST['m_orderid'],
    $_POST['m_amount'],
    $_POST['m_curr'],
    $_POST['m_desc'],
    $_POST['m_status'],
    $secret
])));

if ($sign !== $hash || $_POST['m_status'] !== 'success') {
    file_put_contents("fail.log", json_encode($_POST));
    exit("error");
}

file_put_contents("success.log", json_encode($_POST));

echo "OK" . $_POST['m_orderid'];
?>
