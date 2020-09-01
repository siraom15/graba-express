-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Sep 01, 2020 at 10:43 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `graba-express`
--

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

CREATE TABLE `work` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_of_announce` date NOT NULL,
  `location_start` varchar(255) NOT NULL,
  `location_destination` varchar(255) NOT NULL,
  `goods` varchar(255) DEFAULT NULL,
  `rateOfPrice` varchar(255) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `infomation` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `date_of_work` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `work`
--

INSERT INTO `work` (`id`, `user_id`, `date_of_announce`, `location_start`, `location_destination`, `goods`, `rateOfPrice`, `weight`, `infomation`, `status`, `date_of_work`) VALUES
(1, 1, '2020-09-16', 'prayathat', 'eieie', 'มะพร้าว', '100บาท ต่ตอ กิโล', 30, 'sdasdasdadsasdasd', 1, '2020-09-23'),
(2, 1, '2020-09-08', '123123123', 'asdasdasd1231231', ',trihl', '123123', 50, 'ฟหกฟหกฟหกฟหกฟหกฟหก\r\n', 0, '2020-09-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `work`
--
ALTER TABLE `work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
