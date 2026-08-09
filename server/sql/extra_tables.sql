-- Run after importing school.sql (same `school` database)

CREATE TABLE IF NOT EXISTS `images` (
  `imageid` int(11) NOT NULL AUTO_INCREMENT,
  `imageevent` varchar(512) NOT NULL,
  `imagedesc` text NOT NULL,
  `uploader` varchar(256) NOT NULL,
  `orderid` int(11) NOT NULL,
  `imagename` varchar(512) NOT NULL,
  PRIMARY KEY (`imageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `videolect` (
  `videoid` int(11) NOT NULL AUTO_INCREMENT,
  `videotitle` varchar(512) NOT NULL,
  `description` text NOT NULL,
  `videofullname` varchar(512) NOT NULL,
  `ordervideo` varchar(32) NOT NULL,
  `recommended` varchar(64) NOT NULL,
  `uploadedby` varchar(256) NOT NULL,
  PRIMARY KEY (`videoid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
