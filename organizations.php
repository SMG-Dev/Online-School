<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('html');
$twig = new Twig_Environment($loader);

echo $twig->render('organizations.html', array('name' => 'Fabien'));
?>
