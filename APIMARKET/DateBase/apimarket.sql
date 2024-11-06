-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: apimarket
-- ------------------------------------------------------
-- Server version	8.0.39

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
  `Id_ColleDrone` int NOT NULL,
  `Fec_CollerDrone` date NOT NULL,
  `Can_Drone` int NOT NULL,
  PRIMARY KEY (`Id_ColleDrone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collecdrone`
--

LOCK TABLES `collecdrone` WRITE;
/*!40000 ALTER TABLE `collecdrone` DISABLE KEYS */;
INSERT INTO `collecdrone` VALUES (1,'2024-10-16',30);
/*!40000 ALTER TABLE `collecdrone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extraction`
--

DROP TABLE IF EXISTS `extraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extraction` (
  `Id_Extraction` int NOT NULL,
  `Fec_Extraction` date NOT NULL,
  `Can_Extraction` int NOT NULL,
  PRIMARY KEY (`Id_Extraction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extraction`
--

LOCK TABLES `extraction` WRITE;
/*!40000 ALTER TABLE `extraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `extraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeding`
--

DROP TABLE IF EXISTS `feeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding` (
  `Id_Feeding` int NOT NULL AUTO_INCREMENT,
  `Tip_Feeding` varchar(255) NOT NULL,
  `Fec_Feeding` datetime NOT NULL,
  `Can_Feeding` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_Feeding`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeding`
--

LOCK TABLES `feeding` WRITE;
/*!40000 ALTER TABLE `feeding` DISABLE KEYS */;
INSERT INTO `feeding` VALUES (1,'string','2024-10-16 17:34:13','string'),(2,'perro','2024-10-16 00:00:00','string'),(9,'string','2024-10-16 16:44:28','string'),(13,'string','2024-10-16 16:54:41','string'),(14,'string','2024-10-17 13:24:39','string');
/*!40000 ALTER TABLE `feeding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilization`
--

DROP TABLE IF EXISTS `fertilization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilization` (
  `Id_Fertilization` int NOT NULL,
  `Fec_Fertilization` date NOT NULL,
  PRIMARY KEY (`Id_Fertilization`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilization`
--

LOCK TABLES `fertilization` WRITE;
/*!40000 ALTER TABLE `fertilization` DISABLE KEYS */;
/*!40000 ALTER TABLE `fertilization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hive`
--

DROP TABLE IF EXISTS `hive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hive` (
  `Id_Hive` int NOT NULL,
  `FecIni_Hive` date DEFAULT NULL,
  `Est_Hive` varchar(1) DEFAULT NULL,
  `NumCua_Hive` int DEFAULT NULL,
  `NumAlz_Hive` int DEFAULT NULL,
  `Can_Hive` int DEFAULT NULL,
  PRIMARY KEY (`Id_Hive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hive`
--

LOCK TABLES `hive` WRITE;
/*!40000 ALTER TABLE `hive` DISABLE KEYS */;
INSERT INTO `hive` VALUES (2,'2024-10-22','s',15,15,100),(3,'2024-10-22','s',15,15,100),(4,'2024-10-16','8',1,69,3),(5,'2024-10-16','8',7,69,2),(6,'2024-10-16','8',7,69,2),(7,'2024-10-17','1',15,15,100),(8,'2024-10-22','s',15,15,100),(9,'2024-10-22','s',15,15,100),(10,'2024-10-27','s',15,15,100);
/*!40000 ALTER TABLE `hive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `implement`
--

DROP TABLE IF EXISTS `implement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `implement` (
  `Id_Implement` varchar(25) NOT NULL,
  `Nom_Implement` varchar(25) NOT NULL,
  `Tip_Implement` varchar(25) NOT NULL,
  `FechIng_Implement` datetime NOT NULL,
  `Vlr_Implement` int NOT NULL,
  `Exi_Implement` varchar(25) NOT NULL,
  PRIMARY KEY (`Id_Implement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `implement`
--

LOCK TABLES `implement` WRITE;
/*!40000 ALTER TABLE `implement` DISABLE KEYS */;
INSERT INTO `implement` VALUES ('','string','string','2024-10-17 12:10:15',0,'string'),('7','nicolas','string','2024-10-16 00:00:00',0,'string'),('string','string','string','2024-10-17 12:10:15',0,'string');
/*!40000 ALTER TABLE `implement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production` (
  `Id_Produccion` int NOT NULL AUTO_INCREMENT,
  `Fec_Production` datetime NOT NULL,
  `Can_Production` int NOT NULL,
  PRIMARY KEY (`Id_Produccion`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
INSERT INTO `production` VALUES (1,'2024-10-16 00:00:00',20),(2,'2024-10-12 00:00:00',3),(3,'2024-10-12 00:00:00',4),(4,'2024-10-12 00:00:00',5),(5,'2024-10-12 00:00:00',6),(7,'2024-10-22 00:00:00',100),(8,'2024-10-22 00:00:00',100),(9,'2024-10-22 00:00:00',100),(10,'2024-10-27 00:00:00',10),(15,'2024-10-28 00:00:00',14);
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol`
--

DROP TABLE IF EXISTS `protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `protocol` (
  `Id_Protocol` int NOT NULL AUTO_INCREMENT,
  `Tip_Protocol` varchar(255) NOT NULL,
  `FecCre_Protocol` datetime NOT NULL,
  `FecAct_Protocol` datetime NOT NULL,
  PRIMARY KEY (`Id_Protocol`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol`
--

LOCK TABLES `protocol` WRITE;
/*!40000 ALTER TABLE `protocol` DISABLE KEYS */;
INSERT INTO `protocol` VALUES (1,'indicador','2021-09-10 00:00:00','2021-09-10 00:00:00'),(6,'feo','2024-10-16 20:19:21','2024-10-16 20:19:21'),(8,'string','2024-10-16 16:49:28','2024-10-16 16:49:28');
/*!40000 ALTER TABLE `protocol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race` (
  `Id_Race` int NOT NULL,
  `Nom_Race` varchar(25) NOT NULL,
  `Des_Race` text NOT NULL,
  PRIMARY KEY (`Id_Race`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race`
--

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;
INSERT INTO `race` VALUES (1,'Vespa mandarinia','Avispa gigante asiática, conocida por su tamaño y poderosa picadura.'),(2,'Polistes dominula','Avispa europea, caracterizada por su color amarillo brillante y hábitos sociales.');
/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Pho_Responsible` bigint DEFAULT NULL,
  `Emai_Responsible` varchar(40) NOT NULL,
  `Tok_Responsible` varchar(255) DEFAULT NULL,
  `Blockad` tinyint DEFAULT NULL,
  `Hashed_password` varchar(255) DEFAULT NULL,
  `Salt` varchar(250) DEFAULT NULL,
  `Int_Responsible` int DEFAULT NULL,
  PRIMARY KEY (`Id_Responsible`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsible`
--

LOCK TABLES `responsible` WRITE;
/*!40000 ALTER TABLE `responsible` DISABLE KEYS */;
INSERT INTO `responsible` VALUES (1,'juan','tique',1478967,9999999999,'cmiloty1680@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZXNwb25zaWJsZSI6ImNtaWxvdHkxNjgwQGdtYWlsLmNvbSIsIm5iZiI6MTcyOTg2MDI5OSwiZXhwIjoxNzI5ODYzODk5LCJpYXQiOjE3Mjk4NjAyOTl9.zaudt6vxv7TIbaKXdpY2dtbrgVDAM6EaaxogX8N2yzo',0,'$2a$11$rS3Jr8BZ0/qrWDbYY2Gq6O0RnReYw4.oCZ8KG0i15hOr1yj5Px55O','$2a$11$vFA.g0c8hfjqtMCtpkLCFO',0),(2,'pedro','tique',1478967,9999999999,'cmiloty1690@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zaWJsZSI6ImNtaWxvdHkxNjkwQGdtYWlsLmNvbSIsIm5iZiI6MTcyOTg2MDI3NCwiZXhwIjoxNzI5ODYzODc0LCJpYXQiOjE3Mjk4NjAyNzR9.mCgRDiJAxRrFlMVsN0xCMzhc4QEyVTr3iLttlJTHGF8',0,'$2a$11$8pudnkJsxkdlrP.FUYHcv.zi1RuUe4QOUPPDrp58kPMvNU0zWXYEu','$2a$11$GSw6N3jx2WGoFwDkqZ5bpe',0),(4,'kevin','lopez',1105056011,3148978532,'kevin@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZXNwb25zaWJsZSI6ImtldmluQGdtYWlsLmNvbSIsIm5iZiI6MTczMDAzOTQwMiwiZXhwIjoxNzMwMDQzMDAyLCJpYXQiOjE3MzAwMzk0MDJ9._7Aa_83aUBFf3fL5zdp6cMwuTKhbs0lbHJ_pbjn3Ig8',0,'$2a$11$9mhCIztzvCKMcVYXt3QnCOiOjfe7fuB60g4UGEe5gazE8/XEdtEM6','$2a$11$lByS39JReG6fBYVsFhy3KO',0),(5,'anderson','tique',1105058011,9999999999,'andersonestebantique@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zaWJsZSI6ImFuZGVyc29uZXN0ZWJhbnRpcXVlQGdtYWlsLmNvbSIsIm5iZiI6MTczMDA2OTg3OSwiZXhwIjoxNzMwMDczNDc5LCJpYXQiOjE3MzAwNjk4Nzl9.MhRg79IBWKIWRcwPe5gqfX8p_h0sgpoVFZ33mcHaK9M',0,'$2a$11$gkc.aXRRKUPWpqwnLf.MgufXQl21OM0/O0cwXsgeEcF2keRr7WeZe','$2a$11$xh5/J7LES9qloxZlITP83u',0);
/*!40000 ALTER TABLE `responsible` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `Id_Reviews` int NOT NULL,
  `Fec_Review` date NOT NULL,
  `Des_Review` text NOT NULL,
  PRIMARY KEY (`Id_Reviews`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'2024-10-09','Revisión de rutina'),(2,'2024-10-08','Revisión de alimentación');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 17:09:30
