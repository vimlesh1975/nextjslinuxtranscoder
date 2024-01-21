-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2023 at 12:00 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ndmstest`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_NewSlug` (IN `UploadID` VARCHAR(20), IN `StateID` VARCHAR(4), IN `UserName` VARCHAR(100), IN `UserID` VARCHAR(5), IN `NewsSlug` VARCHAR(300))  NO SQL INSERT INTO upload
(upload.UploadID,upload.StateID,upload.UserName,upload.UserID,upload.NewsSlug)
VALUES
(UploadID,StateID,UserName,UserID,NewsSlug)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Show_Ind_Uploads` (IN `UserName` VARCHAR(100))  NO SQL SELECT *
FROM
upload
WHERE
upload.UserName=UserName
ORDER BY upload.CreatedTime DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Show_Media_Uploads` (IN `UploadID` VARCHAR(20))  NO SQL SELECT * FROM media$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Show_NewsSlugs` (IN `UserName` VARCHAR(100))  NO SQL SELECT *
FROM
newssluglist
WHERE
UploadID.UserName=UserName$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `MediaID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'EventID_NumberCount=filename in the media folder',
  `EventID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `StateID` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Index = States.StateID',
  `UserID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'INDEX = users.UserID',
  `FILENAMEASUPLOADED` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ORIGINAL FILENAME',
  `MediaType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'video/audio/pdf/txt/doc etc',
  `MediaExt` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '.mp4,.mp3,.mov,.pdf',
  `VidQuality` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'MQ',
  `UploadStatus` tinyint DEFAULT '0',
  `Meta1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Meta2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Meta3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Meta4` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Meta5` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `MetaData` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'for Meta Creaters',
  `Translation` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `MetaVerifier` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The Metadata update and verifier',
  `MediaFileTime` datetime DEFAULT NULL COMMENT 'Proxy module will determine the file created time from the media file',
  `ProxyReady` tinyint NOT NULL DEFAULT '0',
  `FilenameProxy1` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FilenameProxy2` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ThumbnailBig` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Big size for desktop',
  `ThumbnailSmall` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Small Size for  mobiles',
  `HouseFormat` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FreeDownload` tinyint NOT NULL DEFAULT '0' COMMENT 'If set to ''1'' it is free for everyone (free downloader) download',
  `Archive` tinyint NOT NULL DEFAULT '0' COMMENT 'Whether the media should be archived or not. 1 or 0',
  `MediaUploadedTime` datetime DEFAULT NULL COMMENT 'On upload success this field must be updated',
  `LastUpdateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `VerifyStatus` tinyint NOT NULL DEFAULT '0',
  `VerifiedBy` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'The user who archived and verified the media',
  `VerifiedTime` datetime DEFAULT NULL,
  `senttosocialmedia` tinyint DEFAULT NULL,
  `AAremarks` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Favourite` tinyint DEFAULT '0',
  `Deleted` tinyint DEFAULT '0' COMMENT 'Deletd 1 Hideen 2',
  `Duration` varchar(10) DEFAULT NULL,
  `DLCount` tinyint NOT NULL DEFAULT '0',
  `FileSize` varchar(10) DEFAULT NULL,
  `storageused` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`MediaID`, `EventID`, `StateID`, `UserID`, `FILENAMEASUPLOADED`, `MediaType`, `MediaExt`, `VidQuality`, `UploadStatus`, `Meta1`, `Meta2`, `Meta3`, `Meta4`, `Meta5`, `MetaData`, `Translation`, `MetaVerifier`, `MediaFileTime`, `ProxyReady`, `FilenameProxy1`, `FilenameProxy2`, `ThumbnailBig`, `ThumbnailSmall`, `HouseFormat`, `FreeDownload`, `Archive`, `MediaUploadedTime`, `LastUpdateTime`, `VerifyStatus`, `VerifiedBy`, `VerifiedTime`, `senttosocialmedia`, `AAremarks`, `Favourite`, `Deleted`, `Duration`, `DLCount`, `FileSize`, `storageused`) VALUES
('apple1_20231019181142', 'apple1', 'ap', 'apple1', 'go1080p25.mp4', 'VIDEO', '.MP4', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'apple1_20231019181142_proxy1', NULL, 'apple1_20231019181142_th1', 'apple1_20231019181142_th2', NULL, 0, 0, '2023-10-19 18:12:51', '2023-12-07 10:42:18', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, NULL),
('DLP021862_20221214131532_001', 'DLP021862_20221214131532', 'DL', 'DLP021862', 'AMB.mp4', 'VIDEO', '.MP4', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'DLP021862_20221214131532_001_proxy1', NULL, 'DLP021862_20221214131532_001_th1', 'DLP021862_20221214131532_001_th2', NULL, 0, 0, '2022-12-14 13:16:08', '2023-12-07 10:42:21', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('GJA01020_20221213163255_001', 'GJA01020_20221213163255', 'GJ', 'GJA01020', 'CG1080i50.mp4', 'VIDEO', '.MP4', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'GJA01020_20221213163255_001_proxy1', NULL, 'GJA01020_20221213163255_001_th1', 'GJA01020_20221213163255_001_th2', NULL, 0, 0, '2022-12-13 16:33:04', '2023-12-07 10:42:23', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('KLA02022_20210210142713_20230301181652', 'KLA02022_20210210142713', 'XX', 'XXA02012', 'CG1080i50_A.mp4', 'VIDEO', '.MP4', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'KLA02022_20210210142713_20230301181652_proxy1', NULL, 'KLA02022_20210210142713_20230301181652_th1', 'KLA02022_20210210142713_20230301181652_th2', NULL, 0, 0, '2023-03-01 18:17:03', '2023-12-07 10:42:26', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, NULL),
('XXA02002_20220901131011_001', 'XXA02002_20220901131011', 'XX', 'XXA02002', 'color_bar.png', 'IMAGE', '.PNG', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', NULL, 'XXA02002_20220901131011_001_th1', 'XXA02002_20220901131011_001_th2', NULL, 0, 0, '2022-09-01 13:10:14', '2023-12-07 08:24:32', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('XXA02002_20220901131012_001', 'XXA02002_20220901131012', 'XX', 'XXA02002', 'hd_frame.png', 'IMAGE', '.PNG', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', NULL, 'XXA02002_20220901131012_001_th1', 'XXA02002_20220901131012_001_th2', NULL, 0, 0, '2022-09-01 13:10:14', '2023-12-07 08:24:33', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('XXA02002_20220901131012_002', 'XXA02002_20220901131012', 'XX', 'XXA02002', 'Tone.mp4', 'VIDEO', '.MP4', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'XXA02002_20220901131012_002_proxy1', NULL, 'XXA02002_20220901131012_002_th1', 'XXA02002_20220901131012_002_th2', NULL, 0, 0, '2022-09-01 13:10:15', '2023-12-07 10:42:29', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('XXA02002_20220901131013_001', 'XXA02002_20220901131013', 'XX', 'XXA02002', 'decklink_card.jpg', 'IMAGE', '.JPG', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', NULL, 'XXA02002_20220901131013_001_th1', 'XXA02002_20220901131013_001_th2', NULL, 0, 0, '2022-09-01 13:10:14', '2023-12-07 08:24:33', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3'),
('XXA02002_20220901131018_001', 'XXA02002_20220901131018', 'XX', 'XXA02002', 'sd_frame.png', 'IMAGE', '.PNG', 'MQ', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', NULL, 'XXA02002_20220901131018_001_th1', 'XXA02002_20220901131018_001_th2', NULL, 0, 0, '2022-09-01 13:10:14', '2023-12-07 08:24:34', 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, NULL, 'S3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`MediaID`),
  ADD UNIQUE KEY `MediaID` (`MediaID`,`EventID`,`StateID`,`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
