<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('html');
$twig = new Twig_Environment($loader);

require_once 'lib/mysql.php';
$conn = new MySQL (SMG_DB);
$res = $conn->query ('SELECT * FROM `news` ORDER BY `id` DESC LIMIT 0,1')->fetch_assoc ();

echo $twig->render('index.html', array('last_news_id' => $res ['id']));
?>
