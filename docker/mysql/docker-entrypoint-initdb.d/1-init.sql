-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `teamhub`;
CREATE DATABASE `teamhub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teamhub`;

DROP TABLE IF EXISTS `interest`;
CREATE TABLE `interest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(2083) NOT NULL,
  `link_type_id` int DEFAULT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_type_id` (`link_type_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `link_ibfk_1` FOREIGN KEY (`link_type_id`) REFERENCES `link_type` (`id`) ON DELETE SET NULL,
  CONSTRAINT `link_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `link_type`;
CREATE TABLE `link_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `display_name` varchar(64) DEFAULT NULL,
  `program` varchar(64) DEFAULT NULL,
  `bio` text,
  `joined_year` int DEFAULT NULL,
  `joined_season` enum('Winter','Spring','Fall') DEFAULT NULL,
  `member_type` int DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `onStream` tinyint(1) DEFAULT NULL,
  `coopStream` json DEFAULT NULL,
  `current_term` varchar(2) DEFAULT NULL,
  `image_url` varchar(2083) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `member_type` (`member_type`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`member_type`) REFERENCES `member_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member_interest`;
CREATE TABLE `member_interest` (
  `member_id` int NOT NULL,
  `interest_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `interest_id` (`interest_id`),
  CONSTRAINT `member_interest_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `member_interest_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interest` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member_project`;
CREATE TABLE `member_project` (
  `member_id` int NOT NULL,
  `project_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `member_project_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `member_project_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member_skill`;
CREATE TABLE `member_skill` (
  `member_id` int NOT NULL,
  `skill_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `member_skill_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `member_skill_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member_subteam`;
CREATE TABLE `member_subteam` (
  `member_id` int NOT NULL,
  `subteam_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `subteam_id` (`subteam_id`),
  CONSTRAINT `member_subteam_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `member_subteam_ibfk_2` FOREIGN KEY (`subteam_id`) REFERENCES `subteam` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `member_type`;
CREATE TABLE `member_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` text,
  `subteam` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subteam` (`subteam`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`subteam`) REFERENCES `subteam` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `subteam`;
CREATE TABLE `subteam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
  `token` varchar(32) NOT NULL,
  `member_id` int NOT NULL,
  `expiry` timestamp NOT NULL,
  `created` timestamp NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `token` (`token`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2020-05-04 04:08:24