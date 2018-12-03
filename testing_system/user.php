<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('template');
$twig = new Twig_Environment($loader);

require_once '../lib/mysql.php';
$conn = new MySQL (SMG_DB);

include_once '../lib/sessions.php';

echo $twig->render('user.html');
?>
