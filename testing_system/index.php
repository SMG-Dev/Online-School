<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('template');
$twig = new Twig_Environment($loader);

require_once '../lib/mysql.php';
$conn = new MySQL (SMG_DB);

date_default_timezone_set('Europe/Sofia');
$now = date ("Y-m-d H:i:s");

$stm = $conn->prepare ('SELECT * FROM `Contest` WHERE `start` >= ?');
$stm->bind_param ('s', $now);
$stm->execute ();
$res = $stm->get_result ();

$future = array ();
while ($row = $res->fetch_assoc ())
{
	$future [] = $row;
}

$stm = $conn->prepare ('SELECT * FROM `Contest` WHERE `live`=? AND `start` <= ? AND ? <= `end`');

$live = 1;
$stm->bind_param ('iss', $live, $now, $now);
$stm->execute ();
$res = $stm->get_result ();

$contests = array ();
while ($row = $res->fetch_assoc ())
{
	$contests [] = $row;
}

$live = 0;
$stm->execute ();
$res = $stm->get_result ();

$homework = array ();
while ($row = $res->fetch_assoc ())
{
	$homework [] = $row;
}

echo $twig->render('index.html', array('future' => $future, 'contests' => $contests, 'homework' => $homework));
?>
