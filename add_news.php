<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('html');
$twig = new Twig_Environment($loader);

function encode (string $password)
{
	return hash("sha256", $password);
}

require_once 'lib/mysql.php';
$conn = new MySQL (SMG_DB);

$number_news = $conn->query ('SELECT COUNT(*) FROM `news`;')->fetch_assoc ()['COUNT(*)']+1;

if (isset ($_REQUEST['title']) && isset ($_REQUEST ['body']) && isset ($_REQUEST['passcode']))
{
	if (encode ($_REQUEST['passcode']) == '86b50ca1742d1de62598ec2a94f76133ce89e953c24456da4d9fe18cb4e492b1')
	{
		$conn2 = new MySQL (SMG_DB);
		$stm2 = $conn2->prepare ('INSERT INTO `news`(`id`, `text`, `accent`, `accents`) VALUES (NULL,?,?,?)');
		$title = /*htmlentities*/($_REQUEST['title']);
		$body =  /*htmlentities*/($_REQUEST['body']);
		$text = "<h2>{$title}</h2> <p></p> <div class=\"fb-like\" data-href=\"http://smg.bg/news.php?id={$number_rows}\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"false\" data-share=\"true\"></div><p></p><p></p> <p>{$body}</p> <p></p>";
		$accent = $_REQUEST['accent'];
		$stm2->bind_param ('sii', $text, $accent, $accent);
		$stm2->execute ();
		echo $twig->render('add_news.html', array('id' => $number_news));
	}
	else
	{
		echo $twig->render('add_news.html', array('error' => 'Грешен верификационен код.', 'id' => $number_news, 'title' => $_REQUEST['title'], 'body' => $_REQUEST['body']));
	}
}
else
{
	echo $twig->render('add_news.html', array('id' => $number_news, 'title' => '', 'body' => ''));
}

?>
