<?php
require_once '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('../template');
$twig = new Twig_Environment($loader);

require_once '../lib/mysql.php';
$conn = new MySQL (SMG_DB);

date_default_timezone_set('Europe/Sofia');
$now = date ("Y-m-d H:i:s");

$stm = $conn->prepare ('SELECT * FROM `Contest` WHERE `id`=?');
$stm->bind_param ('i', $_REQUEST ['id']);
$stm->execute ();
$res = $stm->get_result ();

$contest = array ();
while ($row = $res->fetch_assoc ())
{
	$contest [] = $row;
}
echo "dump:";
var_dump ($contest);
if (count ($contest) != 1)
{
	echo $twig->render('404.html');
}

$task_ids = json_decode ($contest [0]['Tasks']);
$ans = array ();

for ($i = 0 ; $i < count ($task_ids) ; $i ++)
{
	$stm = $conn->prepare ('SELECT * FROM `Task` WHERE `id`=?');
	$stm->bind_param ('i', $task_ids [$i]);
	$stm->execute ();
	$res = $stm->get_result ();
	if (isset ($_POST[$task_ids [$i]]))
		$ans [$task_ids [$i]] = $_POST[$task_ids [$i]];
	else
		$ans [$task_ids [$i]] = "";
}
//var_dump ($tasks);

$stm = $conn->prepare ("INSERT INTO `Results` (`ID`, `UserId`, `ContestId`, `AnswerSet`) VALUES (NULL, ?, ?, ?);");
$userid = 4; $contestid = intval ($_REQUEST ['id']); $answerset = json_encode ($ans); 
$stm->bind_param ('iis', $userid, $contestid, $answerset);
$stm->execute ();
$res = $stm->get_result ();

echo $twig->render('submit.html', array('id' => $conn->insert_id ()));
?>

