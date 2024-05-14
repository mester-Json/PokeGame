-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2024 at 09:14 AM
-- Server version: 10.5.23-MariaDB-0+deb11u1
-- PHP Version: 8.3.6
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `My-bot`
--

-- --------------------------------------------------------
--
-- Table structure for table `pokemon`
--

CREATE TABLE `pokemon` (
  `Id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `NamePokemon` varchar(255) NOT NULL,
  `NumberPokemon` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
--
-- Dumping data for table `pokemon`
--

INSERT INTO `pokemon` (`Id`, `user`, `NamePokemon`, `NumberPokemon`)
VALUES --
-- Indexes for dumped tables
  --

  --
-- Indexes for table `pokemon`
  --
ALTER TABLE `pokemon`
ADD PRIMARY KEY (`Id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pokemon`
--
ALTER TABLE `pokemon`
MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 10;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;