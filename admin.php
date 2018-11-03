<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('html');
$twig = new Twig_Environment($loader);

require_once 'lib/mysql.php';
$conn = new MySQL (SMG_DB);

$users = $conn->query ('SELECT * FROM `users`;');
$interface_users = array();
while ($row = $users->fetch_assoc ())
{
	$interface_users [] = $row;
}
echo $twig->render('admin.html', array('users' => $interface_users));
?>

