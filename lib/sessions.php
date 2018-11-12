<?php 
if (!isset ($_SESSION)) session_start ();
if (!isset ($_SESSION['access_token'])) $_SESSION['access_token'] = 0;
?>
