<?php
	class MySQL
	{
		public  $servername = "localhost";
		private $username = "root";
		private $password = "tts2002";
		
		public $dbname;
		public $conn;
		
		function __construct (string $dbname_param)
		{
			$this->dbname = $dbname_param;
			$this->conn = new mysqli ($this->servername, $this->username, $this->password, $this->dbname);
			if ($this->conn->connect_error) 
			{
				die("Connection failed: " . $this->conn->connect_error);
			}
		}
		
		function __destruct ()
		{
			$this->conn->close ();
		}

		function prepare (string $command)
		{
			return ($this->conn->prepare($command));
		}
		
		function query (string $command)
		{
			return ($this->conn->query ($command));
		}
	}
	define ('SMG_DB', 'smg');
	define ('ALL_NEWS_PAGE_SIZE', '6');
	define ('ALL_ACCENTS_PAGE_SIZE', '4');
	define ('ALL_AWARDS_PAGE_SIZE', '4');
?>

