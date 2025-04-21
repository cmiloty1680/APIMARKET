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
  `Id_Responsible` int NOT NULL,
  `Id_Hive` int NOT NULL,
  PRIMARY KEY (`Id_CollecDrone`),
  KEY `Id_Respon_idx` (`Id_Responsible`),
  KEY `Id_Hiv_idx` (`Id_Hive`),
  CONSTRAINT `Id_Hiv` FOREIGN KEY (`Id_Hive`) REFERENCES `hive` (`Id_Hive`),
  CONSTRAINT `Id_Respon` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Id_Responsible` int NOT NULL,
  `Id_CollecDrone` int NOT NULL,
  PRIMARY KEY (`Id_Extraction`),
  UNIQUE KEY `Id_CollecDrone_UNIQUE` (`Id_CollecDrone`),
  KEY `Id_collecdro_idx` (`Id_CollecDrone`),
  KEY `Id_responsas_idx` (`Id_Responsible`),
  CONSTRAINT `Id_collecdro` FOREIGN KEY (`Id_CollecDrone`) REFERENCES `collecdrone` (`Id_CollecDrone`),
  CONSTRAINT `Id_responsas` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
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
  `Can_Feeding` int NOT NULL,
  `Vlr_Feeding` int DEFAULT NULL,
  `Id_Hive` int NOT NULL,
  `Id_Responsible` int NOT NULL,
  PRIMARY KEY (`Id_Feeding`),
  UNIQUE KEY `Id_Feeding_UNIQUE` (`Id_Feeding`),
  KEY `Id_hives_idx` (`Id_Hive`),
  KEY `Id_res_idx` (`Id_Responsible`),
  KEY `Id_respiles_idx` (`Id_Responsible`),
  CONSTRAINT `Id_hives` FOREIGN KEY (`Id_Hive`) REFERENCES `hive` (`Id_Hive`),
  CONSTRAINT `Id_responsiles` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Id_Responsible` int NOT NULL,
  `Id_Extraction` int NOT NULL,
  PRIMARY KEY (`Id_Fertilization`),
  UNIQUE KEY `Id_Extraction_UNIQUE` (`Id_Extraction`),
  KEY `Id_responsabl_idx` (`Id_Responsible`),
  CONSTRAINT `Id_Extraction` FOREIGN KEY (`Id_Extraction`) REFERENCES `extraction` (`Id_Extraction`),
  CONSTRAINT `Id_responsabl` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
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
  `Des_Hive` varchar(100) NOT NULL,
  `Est_Hive` enum('activo','inactivo') NOT NULL,
  `NumCua_Hive` int NOT NULL,
  `NumAlz_Hive` int NOT NULL,
  PRIMARY KEY (`Id_Hive`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `honeycollection`
--

DROP TABLE IF EXISTS `honeycollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `honeycollection` (
  `Id_HoneyCollection` int NOT NULL AUTO_INCREMENT,
  `CanFra125_HoneyCollection` int NOT NULL,
  `CanFra250_HoneyCollection` int NOT NULL,
  `UniMed_HoneyCollection` enum('ml') NOT NULL,
  `Des_HoneyCollection` varchar(250) NOT NULL,
  `Fec_HoneyCollection` datetime NOT NULL,
  `Id_Responsible` int NOT NULL,
  `Id_Production` int NOT NULL,
  PRIMARY KEY (`Id_HoneyCollection`),
  KEY `Id_Responsible_idx` (`Id_Responsible`),
  KEY `Id_productiones_idx` (`Id_Production`),
  CONSTRAINT `Id_productions` FOREIGN KEY (`Id_Production`) REFERENCES `production` (`Id_Production`),
  CONSTRAINT `Id_Responsibles` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `FecFin_Production` datetime NOT NULL,
  `TotColm_Hive` int NOT NULL,
  `Id_Race` int NOT NULL,
  `SubCen_Production` enum('Apicultura') DEFAULT 'Apicultura',
  `CenCos_Production` enum('Pecuaria') DEFAULT 'Pecuaria',
  `Nom_Production` enum('Miel de Abeja','Propoleo','Jalea Real','Veneno','Cera') DEFAULT 'Miel de Abeja',
  `Tot_Production` int NOT NULL,
  `CanCua_Production` int NOT NULL,
  PRIMARY KEY (`Id_Production`),
  KEY `Id_Race_idx` (`Id_Race`),
  CONSTRAINT `Id_Race` FOREIGN KEY (`Id_Race`) REFERENCES `race` (`Id_Race`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Archivo_Protocol` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_Protocol`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `ResetToken` varchar(250) DEFAULT NULL,
  `ResetTokenExpiration` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Responsible`),
  UNIQUE KEY `Emai_Responsible_UNIQUE` (`Emai_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Id_Responsible` int NOT NULL,
  `Id_Hive` int NOT NULL,
  PRIMARY KEY (`Id_Review`),
  KEY `Id_Responsibles_idx` (`Id_Responsible`),
  KEY `Id_Hives_idx` (`Id_Hive`),
  CONSTRAINT `Id_colmena` FOREIGN KEY (`Id_Hive`) REFERENCES `hive` (`Id_Hive`),
  CONSTRAINT `Id_Responsible` FOREIGN KEY (`Id_Responsible`) REFERENCES `responsible` (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-19 23:27:33
