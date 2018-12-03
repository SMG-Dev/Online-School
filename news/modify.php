<?php
require_once '../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('html');
$twig = new Twig_Environment($loader);

require_once '../lib/mysql.php';
$conn = new MySQL (SMG_DB);

$number_news = $conn->query ('SELECT COUNT(*) FROM `news`;')->fetch_assoc ()['COUNT(*)'];

// validate the query params
if (!isset ($_GET ['id']) || !is_numeric ($_GET ['id']))
	$id = $number_news;
else if (1 > intval ($_GET['id']) || intval ($_GET['id']) > $number_news)
		$id = $number_news;
else
	$id = intval($_GET ['id']);

if (!isset ($_GET ['page']) || !is_numeric ($_GET ['page']))
	$page = 1;
else
	$page = max (1, intval($_GET ['page']));

// get newest things
$res = $conn->query ('SELECT * FROM `news` WHERE `id`<=' . $id . ' ORDER BY `id` DESC LIMIT ' . (($page - 1)*ALL_NEWS_PAGE_SIZE) . ', ' . ALL_NEWS_PAGE_SIZE);

$newest = array ();
$last_newest_id = $id;
while ($row = $res->fetch_assoc ())
{
	$newest [] = $row;
	$last_newest_id = $row['id'];
}

// get accents 
$res = $conn->query ('SELECT * FROM `news` WHERE `id`<=' . $id . ' AND `accent`=1 ORDER BY `id` DESC LIMIT ' . (($page - 1)*ALL_ACCENTS_PAGE_SIZE) . ', ' . ALL_ACCENTS_PAGE_SIZE);

$accents = array ();

while ($row = $res->fetch_assoc ())
{
	$accents [] = $row;
}

// get the other things
$res = $conn->query ('SELECT * FROM `news` WHERE `id`<=' . $last_newest_id . ' AND `accent`=0 ORDER BY `id` DESC LIMIT ' . (($page - 1)*(ALL_AWARDS_PAGE_SIZE)) . ', ' . ALL_AWARDS_PAGE_SIZE);

$awards = array ();

while ($row = $res->fetch_assoc ())
{
	$awards [] = $row;
}

// create pagination labels
$pages = array ();

if (1 < $page - 3)
	$pages [] = 0; // label "..." to first page

for ($i = max (1, $page - 3) ; $i < $page + 5 && $i < $number_news / ALL_NEWS_PAGE_SIZE ; $i ++)
	$pages [] = $i;

if ($page + 5 < $number_news / ALL_NEWS_PAGE_SIZE)
	$pages [] = 0; // label "..." to last page

// render
echo $twig->render('modify_news.html', array("pages" => $pages, "page" => $page, "id" => $id, "newest" => $newest, "accents" => $accents, "awards" => $awards));
?>
