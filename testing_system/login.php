<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('template');
$twig = new Twig_Environment($loader);

date_default_timezone_set('Europe/Sofia');
$now = date ("Y-m-d H:i:s");

include_once '../lib/sessions.php';

require_once 'lib/mysql.php';

function encode (string $password)
{
	return hash("sha256", $password);
}

function check (string $password, string $hash)
{
	return strcmp(encode ($password), $hash) == 0;
}

if (isset($_POST ['type']))
{
	if ($_POST ['type'] == 'login')
	{
		$conn = new MySQL (SMG_DB);
		$stm = $conn->prepare ('SELECT * FROM `users` WHERE `email` = ?');

		$email = $_POST ['email'];
		$stm->bind_param ('s', $email);
		$stm->execute ();
		$res = $stm->get_result ();

		$users = array ();
		while ($row = $res->fetch_assoc ())
		{
			$users [] = $row;
		}

		if (count ($users) == 0)
		{
			echo $twig->render('login.html', array ('error' => 'Account not found.'));
		}
		else if (count ($users) == 1)
		{
			if (check ($_POST ['password'], $users [0]['password']))
			{
				echo $twig->render('login.html', array ('success' => 'Влязохте успешно.'));
			}
			else
			{
				echo $twig->render('login.html', array ('error' => 'Грешна парола.'));
			}
		}
		else
		{
			echo $twig->render('internal_server_error.html', array ('error' => 'Повече от 1 акаунти са регистрирани с този имейл.'));
		}
	}
	else if ($_POST ['type'] == 'register')
	{
		//reCAPTCHA v2
		$post = array('secret' => '6LcFN3kUAAAAAAP1dYevtJcXYqKPWgcBL6YdWbtl', 'response' => $_POST['g-recaptcha-response']);

		$ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

		try {
			$str = curl_exec($ch);
			curl_close($ch);
			$response = (array)json_decode ($str);
			if ($response ['success'] == true)
			{
				if ($_POST ['regpassword'] == $_POST ['regconfirm'])
				{
					$conn = new MySQL (SMG_DB);
					$stm = $conn->prepare ('SELECT * FROM `users` WHERE `email` = ?');
					$email = $_POST ['regemail'];
					$stm->bind_param ('s', $email);
					$stm->execute ();
					$res = $stm->get_result ();

					$users = array ();
					while ($row = $res->fetch_assoc ())
					{
						$users [] = $row;
					}
					
					if (count ($users) == 1)
					{
						echo $twig->render('login.html', array ('error' => 'Вече сте регистрирани с този имейл.'));
					}
					else if (count ($users) > 1)
					{
						echo $twig->render('login.html', array ('error' => 'Internal server error: имейл: Имейлът вече се ползва от повече от един потребители.'));
					}
					else 
					{
						$conn2 = new MySQL (SMG_DB);
						$stm2 = $conn2->prepare ('INSERT INTO users (email, password, accessToken) VALUES (?, ?, ?)');
						$email = $_POST ['regemail'];
						$password = encode ($_POST['regpassword']);
						$token = 0;
						$stm2->bind_param ('ssi', $email, $password, $token);
						$stm2->execute ();
//						var_dump ($stm2);
//						var_dump ($stm2->get_result ());
						echo $twig->render('login.html', array ('success' => 'Успешно се регистрирахте с имейл ' . $_POST['email'] . '.'));
					}
				}
				else
				{
					echo $twig->render('login.html', array ('error' => 'Паролите не съвпадат.'));
				}
			}
			else
			{
				echo $twig->render('login.html', array ('error' => 'Internal server error: reCAPTCHA: ' . $str));
			}
		} catch (Exception $ex) {
			echo $twig->render('login.html', array ('error' => $ex));
		}
	}
	else
	{
		echo $twig->render ('invalid_request.html', array ('error' => 'Login/register form type is not a valid one.'));
	}
}
else
{
	echo $twig->render('login.html');
}
?>
