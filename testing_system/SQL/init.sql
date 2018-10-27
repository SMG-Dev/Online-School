use `smg`;
DROP TABLE IF EXISTS `Task`;
DROP TABLE IF EXISTS `Contest`;
CREATE TABLE `smg`.`Task` ( `ID`          BIGINT  NOT NULL AUTO_INCREMENT ,
		                    `Name`        TEXT    NOT NULL ,
							`Description` TEXT    NOT NULL ,
							`IsLink`      BOOLEAN NOT NULL DEFAULT FALSE ,
							`AnswerType`  INT     NOT NULL ,
							`AnswerHash`  TEXT    NOT NULL ,
							`TestsIDs`    INT     NOT NULL ,
							`Checker`     BIT     NOT NULL ,
							PRIMARY KEY (`ID`)) ENGINE = InnoDB;

CREATE TABLE `smg`.`Contest` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tasks` blob NOT NULL,
  `AccessToken` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `live` BOOLEAN NOT NULL,
  `start` text NOT NULL,
  `end` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Contest`(`ID`, `Name`, `Tasks`, `AccessToken`, `live`, `start`, `end`) VALUES
					(NULL, 'Future contest in Bulgarian', "[]", "", "1", '2018-10-26 19:50:21', '2018-10-26 19:50:21'),
					(NULL, 'Live contest in Bulgarian', "[]", "", "1", '2018-10-26 18:50:21', '2018-10-26 19:50:21'),
					(NULL, 'Homework in Informatics', "[]", "", "0", '2018-10-26 17:50:21', '2018-10-26 20:50:21'),
					(NULL, 'Archive homework in Informatics', "[]", "", "0", '2018-10-26 17:50:21', '2018-10-26 18:50:21');


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
