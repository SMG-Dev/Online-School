<?php
require_once '../../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('../template');
$twig = new Twig_Environment($loader);

require_once '../../lib/mysql.php';
$conn = new MySQL (SMG_DB);

date_default_timezone_set('Europe/Sofia');
$now = date ("Y-m-d H:i:s");

$stm = $conn->prepare ('SELECT * FROM `Contest` WHERE `id`=?');
$stm->bind_param ('i', $_GET ['id']);
$stm->execute ();
$res = $stm->get_result ();

$contest = array ();
while ($row = $res->fetch_assoc ())
{
	$contest [] = $row;
}

if (count ($contest) != 1)
{
	echo $twig->render('404.html');
}

$task_ids = json_decode ($contest [0]['Tasks']);
$tasks = array ();

for ($i = 0 ; $i < count ($task_ids) ; $i ++)
{
	$stm = $conn->prepare ('SELECT * FROM `Task` WHERE `id`=?');
	$stm->bind_param ('i', $task_ids [$i]);
	$stm->execute ();
	$res = $stm->get_result ();
	$tasks [] = $row = $res->fetch_assoc ();
	if ($row ['AnswerType'][0] == 'c')
	{
		$options = array_slice (explode ("\r\n", $row ['Description']), -intval(substr($row ['AnswerType'], 1)));
		shuffle ($options);
		
		$tasks [$i]['Description'] = implode (array_slice (explode ("\n", $row ['Description']), 0, -intval(substr($row ['AnswerType'], 1)))+ [''], "\n");
		if ($tasks [$i]['Description'] != '') $tasks [$i]['Description'] .= '<br>'; 
		for ($j = 0 ; $j < count ($options) ; $j ++)
			$tasks [$i]['Description'] = $tasks [$i]['Description'] . "<input type=\"radio\" id=\"{$task_ids [$i]}{$options [$j]}\" name=\"{$task_ids [$i]}\" value=\"{$options [$j]}\"><label for=\"{$task_ids [$i]}{$options [$j]}\">&nbsp;{$options [$j]}</label></input><br>";
	}
	else if ($row ['AnswerType'][0] == 'm')
	{
		$options = array_slice (explode ("\r\n", $row ['Description']), -intval(substr($row ['AnswerType'], 1)));
		shuffle ($options);
		
		$tasks [$i]['Description'] = implode (array_slice (explode ("\n", $row ['Description']), 0, -intval(substr($row ['AnswerType'], 1)))+ [''], "\n");
		if ($tasks [$i]['Description'] != '') $tasks [$i]['Description'] .= '<br>'; 
		for ($j = 0 ; $j < count ($options) ; $j ++)
			$tasks [$i]['Description'] = $tasks [$i]['Description'] . "<input type=\"checkbox\" id=\"{$task_ids [$i]}{$options [$j]}\" name=\"{$task_ids [$i]}\" value=\"{$options [$j]}\"><label for=\"{$task_ids [$i]}{$options [$j]}\">&nbsp;{$options [$j]}</label></input><br>";
	}
	else if ($row ['AnswerType'] == 'os')
	{
		$tasks [$i]['Description'] = $tasks [$i]['Description'] . "<br><br><input type=\"text\" name=\"{$task_ids [$i]}\">";
	}
	else if ($row ['AnswerType'] == 'ol')
	{
		$tasks [$i]['Description'] = $tasks [$i]['Description'] . "<br><br><textarea name=\"{$task_ids [$i]}\"></textarea>";
	}
	else if ($row ['AnswerType'] == 'informatics')
	{
		$tasks [$i]['Description'] = $tasks [$i]['Description'] . "<br><br><textarea name=\"{$task_ids [$i]}\"></textarea>";
	}
}
//var_dump ($tasks);

echo $twig->render('contest.html', array('id' => $contest[0]['ID'],
										 'name' => $contest[0]['Name'],
										 'description' => $contest[0]['Description'], 
										 'tasks' => $tasks,
										 'end' => $contest [0]['end']));
?>

