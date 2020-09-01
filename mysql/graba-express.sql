-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Sep 01, 2020 at 08:54 PM
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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `random_id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `id_card` varchar(13) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `random_id`, `firstname`, `lastname`, `age`, `phone_number`, `picture_path`, `id_card`, `password`) VALUES
(1, '123asdas123123asd', '<script>alert(1);</script>', 'hahaha', 19, 1234567899, '/image/haha.jpg', '123', '0790e56fa6c93715ce0c960f1dbe4c65a439b34be35daa1a75c7f875810cd041'),
(2, '23ase123231', 'nekl', 'eieie', 12, 1, '/i/', '1234567809123', '0790e56fa6c93715ce0c960f1dbe4c65a439b34be35daa1a75c7f875810cd041');

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
(1, 1, '2020-09-16', 'chainat', 'nakhon ปฐม', NULL, '100บาท ต่ตอ กิโล', 30, 'sdasdasdadsasdasd', 1, '2020-09-23'),
(2, 1, '2020-09-08', '123123123', 'asdasdasd1231231', 'อิอิ', '123123', 50, 'ฟหกฟหกฟหกฟหกฟหกฟหก\r\n', 0, '2020-09-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `id_card` (`id_card`);

--
-- Indexes for table `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `work`
--
ALTER TABLE `work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `work`
--
ALTER TABLE `work`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
