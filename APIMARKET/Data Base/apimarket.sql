CREATE DATABASE  IF NOT EXISTS `apimarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `apimarket`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: apimarket
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collecdrone`
--

DROP TABLE IF EXISTS `collecdrone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collecdrone` (
  `Id_CollecDrone` int NOT NULL AUTO_INCREMENT,
  `Fec_CollecDrone` date NOT NULL,
  `Can_CollecDrone` int NOT NULL,
  `Id_Responsible` int DEFAULT NULL,
  `Id_Production` int DEFAULT NULL,
  PRIMARY KEY (`Id_CollecDrone`),
  UNIQUE KEY `Id_Production_UNIQUE` (`Id_Production`),
  UNIQUE KEY `Id_Responsible_UNIQUE` (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `extraction`
--

DROP TABLE IF EXISTS `extraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extraction` (
  `Id_Extraction` int NOT NULL AUTO_INCREMENT,
  `Fec_Extraction` date NOT NULL,
  `Can_Extraction` int NOT NULL,
  `Id_Collecdrone` int DEFAULT NULL,
  `Id_Responsible` int DEFAULT NULL,
  `Id_ProtocolImplement` int DEFAULT NULL,
  PRIMARY KEY (`Id_Extraction`),
  UNIQUE KEY `Id_Collecdrone_UNIQUE` (`Id_Collecdrone`),
  UNIQUE KEY `Id_Responsible_UNIQUE` (`Id_Responsible`),
  UNIQUE KEY `Id_ProtocolImplement_UNIQUE` (`Id_ProtocolImplement`),
  CONSTRAINT `Id_Collecdrone` FOREIGN KEY (`Id_Collecdrone`) REFERENCES `collecdrone` (`Id_CollecDrone`),
  CONSTRAINT `Id_ProtocolImplement` FOREIGN KEY (`Id_ProtocolImplement`) REFERENCES `protocolimplement` (`Id_ProtocolImplement`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feeding`
--

DROP TABLE IF EXISTS `feeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding` (
  `Id_Feeding` int NOT NULL AUTO_INCREMENT,
  `Tip_Feeding` varchar(10) NOT NULL,
  `Fec_Feeding` datetime NOT NULL,
  `Can_Feeding` varchar(255) NOT NULL,
  `Vlr_Feeding` int DEFAULT NULL,
  PRIMARY KEY (`Id_Feeding`),
  UNIQUE KEY `Id_Feeding_UNIQUE` (`Id_Feeding`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fertilization`
--

DROP TABLE IF EXISTS `fertilization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilization` (
  `Id_Fertilization` int NOT NULL AUTO_INCREMENT,
  `Fec_Fertilization` date NOT NULL,
  `Can_Fertilization` int DEFAULT NULL,
  `Id_Responsible` int DEFAULT NULL,
  `Id_Extraction` int DEFAULT NULL,
  PRIMARY KEY (`Id_Fertilization`),
  UNIQUE KEY `Id_Responsible_UNIQUE` (`Id_Responsible`),
  UNIQUE KEY `Id_Extraction_UNIQUE` (`Id_Extraction`),
  CONSTRAINT `Id_Extraction` FOREIGN KEY (`Id_Extraction`) REFERENCES `extraction` (`Id_Extraction`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hive`
--

DROP TABLE IF EXISTS `hive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hive` (
  `Id_Hive` int NOT NULL AUTO_INCREMENT,
  `Des_Hive` varchar(50) NOT NULL,
  `Est_Hive` enum('activo','inactivo') DEFAULT NULL,
  `NumCua_Hive` int DEFAULT NULL,
  `NumAlz_Hive` int DEFAULT NULL,
  PRIMARY KEY (`Id_Hive`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `honeycollection`
--

DROP TABLE IF EXISTS `honeycollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `honeycollection` (
  `Id_HoneyCollection` int NOT NULL AUTO_INCREMENT,
  `Fec_HoneyCollection` datetime NOT NULL,
  `Can_HoneyCollection` int NOT NULL,
  PRIMARY KEY (`Id_HoneyCollection`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `implement`
--

DROP TABLE IF EXISTS `implement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `implement` (
  `Id_Implement` int NOT NULL AUTO_INCREMENT,
  `Nom_Implement` varchar(25) NOT NULL,
  `Tip_Implement` varchar(25) DEFAULT NULL,
  `FechIng_Implement` date NOT NULL,
  `Vlr_Implement` int DEFAULT NULL,
  `Exi_Implement` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Id_Implement`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production` (
  `Id_Production` int NOT NULL AUTO_INCREMENT,
  `FecIni_Production` datetime NOT NULL,
  `FecFin_Production` datetime DEFAULT NULL,
  `Can_Production` int DEFAULT NULL,
  `Cant_Abejas` int DEFAULT NULL,
  `Tot_Colmen` int DEFAULT NULL,
  `Id_Race` int NOT NULL,
  PRIMARY KEY (`Id_Production`),
  KEY `Id_Race_idx` (`Id_Race`),
  CONSTRAINT `Id_Race` FOREIGN KEY (`Id_Race`) REFERENCES `race` (`Id_Race`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productionhive`
--

DROP TABLE IF EXISTS `productionhive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productionhive` (
  `Id_ProductionHive` int NOT NULL AUTO_INCREMENT,
  `Id_Production` int DEFAULT NULL,
  `Id_Hive` int DEFAULT NULL,
  `Can_Colmen` int DEFAULT NULL,
  PRIMARY KEY (`Id_ProductionHive`),
  UNIQUE KEY `Id_Hive_UNIQUE` (`Id_Hive`),
  UNIQUE KEY `Id_Production_UNIQUE` (`Id_Production`),
  CONSTRAINT `productionhive_ibfk_1` FOREIGN KEY (`Id_Production`) REFERENCES `production` (`Id_Production`),
  CONSTRAINT `productionhive_ibfk_2` FOREIGN KEY (`Id_Hive`) REFERENCES `hive` (`Id_Hive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `protocol`
--

DROP TABLE IF EXISTS `protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol` (
  `Id_Protocol` int NOT NULL AUTO_INCREMENT,
  `Tip_Protocol` varchar(20) NOT NULL,
  `FecCre_Protocol` datetime NOT NULL,
  `FecAct_Protocol` datetime NOT NULL,
  `Nom_Protocol` varchar(20) NOT NULL,
  PRIMARY KEY (`Id_Protocol`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `protocolimplement`
--

DROP TABLE IF EXISTS `protocolimplement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocolimplement` (
  `Id_ProtocolImplement` int NOT NULL AUTO_INCREMENT,
  `Id_Protocol` int DEFAULT NULL,
  `Id_Implement` int DEFAULT NULL,
  PRIMARY KEY (`Id_ProtocolImplement`),
  UNIQUE KEY `Id_Protocol_UNIQUE` (`Id_Protocol`),
  UNIQUE KEY `Id_Implement_UNIQUE` (`Id_Implement`),
  CONSTRAINT `protocolimplement_ibfk_1` FOREIGN KEY (`Id_Protocol`) REFERENCES `protocol` (`Id_Protocol`),
  CONSTRAINT `protocolimplement_ibfk_2` FOREIGN KEY (`Id_Implement`) REFERENCES `implement` (`Id_Implement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race` (
  `Id_Race` int NOT NULL AUTO_INCREMENT,
  `Nom_Race` varchar(25) NOT NULL,
  `Des_Race` text NOT NULL,
  PRIMARY KEY (`Id_Race`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `responsible`
--

DROP TABLE IF EXISTS `responsible`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsible` (
  `Id_Responsible` int NOT NULL AUTO_INCREMENT,
  `Nam_Responsible` varchar(20) NOT NULL,
  `LasNam_Responsible` varchar(20) NOT NULL,
  `NumDoc_Responsible` int NOT NULL,
  `Tip_Responsible` enum('instructor','gestor','pasante','investigadora') DEFAULT 'pasante',
  `Pho_Responsible` bigint DEFAULT NULL,
  `Emai_Responsible` varchar(40) NOT NULL,
  `Tok_Responsible` varchar(255) DEFAULT NULL,
  `Blockad` tinyint DEFAULT NULL,
  `Hashed_Password` varchar(255) DEFAULT NULL,
  `Salt` varchar(250) DEFAULT NULL,
  `Int_Responsible` int DEFAULT NULL,
  PRIMARY KEY (`Id_Responsible`),
  UNIQUE KEY `Emai_Responsible_UNIQUE` (`Emai_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `Id_Review` int NOT NULL AUTO_INCREMENT,
  `Fec_Review` date NOT NULL,
  `Des_Review` text NOT NULL,
  `Id_Responsible` int DEFAULT NULL,
  `Id_Protocol` int DEFAULT NULL,
  `Id_ProductionHive` int DEFAULT NULL,
  PRIMARY KEY (`Id_Review`),
  UNIQUE KEY `Id_Protocolo_UNIQUE` (`Id_Protocol`),
  UNIQUE KEY `Id_ProduccionColmena_UNIQUE` (`Id_ProductionHive`),
  UNIQUE KEY `Id_Responsible_UNIQUE` (`Id_Responsible`),
  CONSTRAINT `Id_ProductionHive` FOREIGN KEY (`Id_ProductionHive`) REFERENCES `productionhive` (`Id_ProductionHive`),
  CONSTRAINT `Id_Protocol` FOREIGN KEY (`Id_Protocol`) REFERENCES `protocol` (`Id_Protocol`),
  CONSTRAINT `Id_Responsible` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-12 17:15:25
