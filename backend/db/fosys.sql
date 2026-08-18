-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: food_delivery_system
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `img_url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'burgers','vector_icons/burger.png'),(2,'desserts','vector_icons/dessert.png'),(3,'drinks','vector_icons/drink.png'),(4,'pizzas','vector_icons/pizza.png'),(5,'sides','vector_icons/side.png'),(6,'specials','vector_icons/special.png');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_zones`
--

DROP TABLE IF EXISTS `delivery_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_zones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL,
  `estimated_time_minutes` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_zones`
--

LOCK TABLES `delivery_zones` WRITE;
/*!40000 ALTER TABLE `delivery_zones` DISABLE KEYS */;
INSERT INTO `delivery_zones` VALUES (1,'Ingombota',700.00,20,0,'2026-07-17 04:11:42','2026-07-17 04:11:42'),(2,'Maianga',900.00,25,0,'2026-07-17 04:11:42','2026-07-17 04:11:42'),(3,'Kilamba',1300.00,35,0,'2026-07-17 04:11:42','2026-07-17 04:11:42'),(4,'Talatona',1500.00,40,0,'2026-07-17 04:11:42','2026-07-17 04:11:42'),(5,'Benfica',1600.00,45,0,'2026-07-17 04:11:42','2026-07-17 04:11:42'),(6,'Viana',1800.00,50,0,'2026-07-17 04:11:42','2026-07-17 04:11:42');
/*!40000 ALTER TABLE `delivery_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `delivery_zone` int(11) NOT NULL,
  `estimated_delivery_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('ON_THE_WAY','DELIVERED','CONFIRMED') DEFAULT 'ON_THE_WAY',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `delivery_zone` (`delivery_zone`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`delivery_zone`) REFERENCES `delivery_zones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `img_url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_category` (`category_id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (59,'Classic hamburger',2800.00,1,'burgers/hamburguer_classic.jpg'),(60,'Cheeseburger',3000.00,1,'burgers/cheeseburger.jpg'),(61,'Double Cheeseburger',4500.00,1,'burgers/doublecheeseburg.jpg'),(62,'Bacon Burger',4200.00,1,'burgers/baconburger.jpg'),(63,'Chicken Burger',3600.00,1,'burgers/chickenburger.jpg'),(64,'Mega Dona Ana',5500.00,1,'burgers/specialdonaana.jpg'),(65,'Veggie Burger',3800.00,1,'burgers/veggieburger.jpg'),(66,'Margherita Pizza',6000.00,4,'pizzas/pizzamargherita.jpg'),(67,'Pepperoni Pizza',7200.00,4,'pizzas/pizzacalabresa.jpg'),(68,'Chicken Pizza',7500.00,4,'pizzas/chickenpizza.jpg'),(69,'Four-Cheese Pizza',8000.00,4,'pizzas/fourcheesepizza.jpg'),(70,'Tuna Pizza',7800.00,4,'pizzas/tunapizza.jpg'),(71,'Dona Ana Special Pizza',9500.00,4,'pizzas/donaanaspecialpizza.jpg'),(72,'Small Fries',1500.00,5,'sides/small_fries.jpg'),(73,'Large Fries',2300.00,5,'sides/large_fries.jpg'),(74,'Onion Rings',2500.00,5,'sides/onion_rings.jpg'),(75,'Chicken Nuggets (6 pcs)',3000.00,5,'sides/nuggets_6pc.jpg'),(76,'Chicken Wings',4500.00,5,'sides/chicken_wings.jpg'),(77,'Coca-Cola',900.00,3,'drinks/cocacola.jpg'),(78,'Orange Fanta',900.00,3,'drinks/fanta_orange.jpg'),(79,'Sprite',900.00,3,'drinks/sprite.jpg'),(80,'Mineral Water',600.00,3,'drinks/mineral_water.jpg'),(81,'Natural Juice',1500.00,3,'drinks/natural_juice.jpg'),(82,'Vanilla Cone',1000.00,2,'desserts/vanilla_cone.jpg'),(83,'Chocolate Sundae',2200.00,2,'desserts/chocolate_sundae.jpg'),(84,'Brownie',2500.00,2,'desserts/brownie.jpg'),(85,'Cheesecake',3000.00,2,'desserts/cheesecake.png'),(86,'Chicken Wrap',4000.00,6,'special/chicken_wrap.jpg'),(87,'Special Hot Dog',3200.00,6,'special/special_hot_dog.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `whatsapp_phone_number` varchar(50) NOT NULL,
  `password_hash` varchar(250) NOT NULL,
  `country` varchar(150) NOT NULL DEFAULT 'Angola',
  `delivery_zone` int(11) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`),
  KEY `fk_delivery_zone_user` (`delivery_zone`),
  CONSTRAINT `fk_delivery_zone_user` FOREIGN KEY (`delivery_zone`) REFERENCES `delivery_zones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'Costa Chilala','costachilaladev@gmail.com','956 678 638','956 678 638','$2b$10$zwubzAh6tRXCqSo/MHDl5e4uUTIzI6HzF69cEIQfus/a5l8s.t6.C','Angola',5,'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-18 11:39:17
