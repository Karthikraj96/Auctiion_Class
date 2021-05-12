-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2021 at 01:31 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `passport`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` bigint(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `payment_type` varchar(50) NOT NULL,
  `payment_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_id`, `user_id`, `payment_status`, `payment_type`, `payment_date`, `created_date`, `modified_date`) VALUES
(1, 58, 'completed', 'Paypal', '2021-04-28 11:44:52', '2021-04-23 15:55:39', '2021-04-28 11:44:52'),
(2, 58, 'refunded', 'stripe', '2021-04-23 16:48:45', '2021-04-21 04:37:15', '2021-04-23 16:48:45'),
(3, 58, 'cancelled', 'Paypal', '2021-04-23 16:48:41', '2021-04-23 15:55:22', '2021-04-23 16:48:41'),
(4, 16, 'completed', 'stripe', '2021-04-28 11:44:59', '2021-04-21 04:36:06', '2021-04-28 11:44:59');

-- --------------------------------------------------------

--
-- Table structure for table `bill_items`
--

CREATE TABLE `bill_items` (
  `bill_item_id` bigint(200) NOT NULL,
  `test_id` varchar(200) NOT NULL,
  `bill_id` varchar(200) NOT NULL,
  `item_name` longtext NOT NULL,
  `quantity` varchar(200) NOT NULL,
  `amount` varchar(200) NOT NULL,
  `user_id` mediumtext NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill_items`
--

INSERT INTO `bill_items` (`bill_item_id`, `test_id`, `bill_id`, `item_name`, `quantity`, `amount`, `user_id`, `created_date`, `modified_date`) VALUES
(1, '3', '4', 'item_name', '2', '5000', '16', '2021-04-21 04:43:28', '2021-04-28 11:44:35'),
(2, '1', '2', 'item_name,item_name', '2,3', '5000,4000', '58', '2021-04-21 04:43:55', '2021-04-24 15:30:42'),
(4, '2', '3', 'ptpc-15,covid-test', '2,3', '2000,500', '58', '2021-04-23 16:06:20', '2021-04-24 15:30:30'),
(5, '4', '1', 'ptpc-15', '2', '2500', '58', '2021-04-23 16:07:00', '2021-04-28 11:44:29');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hospital_id` int(11) NOT NULL,
  `vaccine_id` longtext NOT NULL,
  `hospital_name` varchar(250) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `product_id` longtext NOT NULL,
  `count` bigint(255) NOT NULL DEFAULT 0,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hospital_id`, `vaccine_id`, `hospital_name`, `state`, `city`, `status`, `product_id`, `count`, `create_date`, `modified_date`) VALUES
(3, '2,3', 'srm', 'tamilnadu', 'chennai', 1, '121,124,123,125', 3, '2021-04-21 03:11:52', '2021-04-27 07:36:58'),
(4, '2,3', 'Ramachandra', 'karnataka', 'bangalore', 1, '121,122,123,125', 1, '2021-04-21 03:12:11', '2021-04-27 07:37:03'),
(5, '2,3', 'billroth', 'Andhra', 'tirumalai', 1, '121,124,125', 0, '2021-04-23 17:16:18', '2021-04-23 17:18:12'),
(6, '2,3', 'billroth', 'maharahstra', 'mumbai', 1, '121,124,125', 0, '2021-04-23 17:16:39', '2021-04-23 17:16:39'),
(7, '2,3', 'billroth2', 'maharahstra', 'mumbai', 1, '121,124,125', 0, '2021-04-23 17:20:38', '2021-04-23 17:20:38'),
(8, '2,3', 'billroth3', 'maharahstra', 'mumbai', 1, '121,124,125', 0, '2021-04-23 17:20:48', '2021-04-23 17:20:48'),
(9, '2,3', 'billroth3', 'tamilnadu', 'madurai', 1, '121,124,125', 0, '2021-04-23 17:21:08', '2021-04-23 17:21:08'),
(10, '2,3', 'billroth', 'tamilnadu', 'kanchipuram', 1, '121,124,125', 0, '2021-04-23 17:21:28', '2021-04-23 17:21:28');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(200) NOT NULL,
  `hospital_id` longtext NOT NULL,
  `count` bigint(255) NOT NULL DEFAULT 0,
  `test_name` varchar(250) NOT NULL,
  `test_description` longtext NOT NULL,
  `actual_price` int(11) NOT NULL,
  `offer_price` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `test_type` varchar(250) NOT NULL,
  `offer_text` text DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `hospital_id`, `count`, `test_name`, `test_description`, `actual_price`, `offer_price`, `status`, `test_type`, `offer_text`, `created_date`, `modified_date`) VALUES
(121, '3,4,5,6,7,8,9,10', 2, 'test_name 2', 'test_description', 1000, 700, 1, 'test_type', 'offer_text', '2021-04-20 02:34:02', '2021-04-27 07:38:55'),
(122, '4', 1, 'test_name 2', 'test_description', 1000, 700, 1, 'test_type', 'offer_text', '2021-04-20 02:34:06', '2021-04-27 07:39:02'),
(123, '3,4', 2, 'test_name 2', 'test_description', 1000, 700, 1, 'test_type', 'offer_text', '2021-04-20 02:34:14', '2021-04-27 07:39:07'),
(124, '3,5,6,7,8,9,10', 1, 'test_name 2', 'test_description', 1000, 700, 1, 'test_type', 'offer_text', '2021-04-20 02:34:19', '2021-04-27 07:39:12');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `test_id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `covid_status` tinyint(4) NOT NULL DEFAULT 0,
  `test_status` varchar(50) NOT NULL,
  `test_datetime` datetime NOT NULL,
  `cmt_title` text NOT NULL,
  `cmt_description` longtext NOT NULL,
  `cmt_datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`test_id`, `hospital_id`, `product_id`, `user_id`, `covid_status`, `test_status`, `test_datetime`, `cmt_title`, `cmt_description`, `cmt_datetime`, `modified_date`, `created_date`) VALUES
(1, 3, '121,122', 58, 0, 'Pending', '2021-04-20 17:42:17', 'hi_comment', 'comment_body', '2021-04-21 03:55:49', '2021-04-27 05:40:53', '2021-04-21 03:04:09'),
(2, 4, '123,124', 58, 0, 'InProgress', '2021-04-20 17:42:17', 'hi_comment2', 'comment_body2', '2021-04-21 03:55:54', '2021-04-27 13:04:43', '2021-04-21 03:05:25'),
(3, 3, '121', 58, 1, 'Scheduled', '2021-04-20 17:42:17', 'cmt_title', 'commentDescription', '2021-04-21 05:03:29', '2021-04-27 07:43:37', '2021-04-21 03:05:39'),
(4, 3, '123', 16, 0, 'Completed', '2021-04-20 17:42:17', 'cmt_title', 'commentDescription', '2021-04-21 05:03:04', '2021-04-23 16:50:53', '2021-04-21 05:03:04');

-- --------------------------------------------------------

--
-- Table structure for table `session_mgmt`
--

CREATE TABLE `session_mgmt` (
  `session_state` longtext NOT NULL,
  `email_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session_mgmt`
--

INSERT INTO `session_mgmt` (`session_state`, `email_id`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6ImthcnRoaWtyYWoxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2MTkwODU3NTJ9.-FqDUPiZqRq9YDE3pvMPBTGz8QspbMHm7BZTE3iY9XY', 'karthikraj1@gmail.com'),
('loggedin', 'karthikraj@digispoc.com'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6ImthcnRoaWtyYWpAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxiV0ZwYkY5cFpDSTZJbXRoY25Sb2FXdHlZV3BBWkdsbmFYTndiMk11WTI5dElpd2ljR0Z6YzNkdmNtUWlPaUp3WVhOemQyOXlaQ0lzSW1saGRDSTZNVFl4T1RRMU1UQXpPSDAucncxcUVYa1IxOFFPR25sUUxtT283ekRJWGZaNklmQkZrOHVKWDBxQjJ1ayIsInRlc3RfaWQiOjEsImJpbGxfaWQiOjIsInN0YXRlIjoidGFtaWxuYWR1IiwiY2l0eSI6ImNoZW5uYWkiLCJob3NwaXRhbF9uYW1lIjoic3JtIiwiaWF0IjoxNjE5NTA4MTczfQ.27LRAioDdYogDoIARaYX0WM_sFObw2-vDHC-3_WqvSE', 'karthikraj@gmail.com'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InBrYXJ0aGlrcmFqMjAxMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwib3RwIjo5MDU0ODgsImlhdCI6MTYxOTE1NzcxMX0.OO9rHvwdt9vDWfBFdAUYGCtR7cYmdPjDQJ2KtSaxZP8', 'pkarthikraj2012@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `password` varchar(80) NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 0,
  `user_mode` varchar(100) CHARACTER SET utf32 DEFAULT NULL,
  `admin_user` int(11) NOT NULL DEFAULT 0,
  `email_verify_status` int(11) NOT NULL DEFAULT 0,
  `password_reset_status` int(11) NOT NULL DEFAULT 0,
  `verification_code` varchar(8) DEFAULT NULL,
  `verification_time` datetime NOT NULL DEFAULT current_timestamp(),
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_history` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email_id`, `password`, `user_status`, `user_mode`, `admin_user`, `email_verify_status`, `password_reset_status`, `verification_code`, `verification_time`, `created_date`, `modified_history`, `modified_by`) VALUES
(16, 'karthikraj@digispoc.com', '$2b$10$AdajOie54U51yP9YGINU0.e7MtQn2lwIcsB.bfegUfmresHpa9Avq', 1, 'admin', 1, 1, 0, '547263', '2021-04-20 00:58:31', '2021-04-20 00:58:31', '2021-04-24 16:24:32', 'karthikraj@digispoc.com'),
(58, 'dhanapalr10@gmail.com', '$2b$10$BpJnCVfujW7Zq1hlAEHV1OXAceM0yvUWB0efHnFnE3T/.hZRNVxyy', 1, 'active', 0, 1, 0, '705087', '2021-04-23 15:16:33', '2021-04-23 15:16:33', '2021-04-23 15:16:48', 'dhanapalr10@gmail.com'),
(59, 'dhanapalr3519@gmail.com', '$2b$10$kLV8669/WyBqiAeH.wBGquzygqtKvV/o0FCfutENq3388e0SNhVYu', 1, 'active', 0, 1, 0, '175640', '2021-04-23 18:11:13', '2021-04-23 18:11:13', '2021-04-23 18:11:51', 'dhanapalr3519@gmail.com'),
(60, 'karthikraj@gmail.com', '$2b$10$3y5m5o.nWF4Oq8Ol2GfVROvv3c9ib7kdHYgDJJhFE1a9BN1XthhBm', 1, 'active', 0, 1, 0, '148915', '2021-04-24 11:00:23', '2021-04-24 11:00:23', '2021-04-24 11:26:54', 'karthikraj@gmail.com'),
(61, 'dhanapal@digispoc.com', '$2b$10$odHiTSxi.a8rauTBOjMqVeMcpo7J5ONYUigTx0GAuUQDOJsx4nY.W', 0, NULL, 0, 0, 0, '519980', '2021-04-27 13:05:19', '2021-04-27 13:05:19', '2021-04-27 13:05:19', NULL),
(62, 'vasanth@doodlecreativemedia.com', '$2b$10$EvJSjbmBlZCdJXQ.qW8VWuq6zwShuiUm1Xq.elsej/7YambWg3cBi', 1, 'active', 0, 1, 0, '348724', '2021-04-27 14:17:39', '2021-04-27 14:17:39', '2021-04-27 14:20:47', 'vasanth@doodlecreativemedia.com'),
(63, 'murali@digispoc.com', '$2b$10$hxJlT2anGAWv4YboePWMmef4N.ZwnlRelch2nfE0oghKhGsIaA5DO', 1, 'active', 0, 1, 0, '958572', '2021-04-27 15:02:47', '2021-04-27 15:02:47', '2021-04-27 15:07:56', 'murali@digispoc.com'),
(65, 'karthikraj125@digispoc.com', '$2b$10$PWaLuxD5R7.VA47o3f4D5elPOxxE2wk8GuzD1CegQoX8iDiB17wRi', 0, NULL, 0, 0, 0, '700708', '2021-04-28 14:32:44', '2021-04-28 14:32:44', '2021-04-28 14:32:44', NULL),
(66, 'karthikraj15@digispoc.com', '$2b$10$jJBwydSxCFMbUlRrxz8KDukQlO30mpR77KjAN.V.A2VGF61msqS66', 0, NULL, 0, 0, 0, '304360', '2021-04-28 14:34:20', '2021-04-28 14:34:20', '2021-04-28 14:34:20', NULL),
(67, 'karthikraj1n5@digispoc.com', '$2b$10$CTyvYfUFdXpKnjomGJKZRO7NeQTfsTyhWq0LopZutuem.rCqUc1gm', 0, NULL, 0, 0, 0, '348578', '2021-04-28 14:36:04', '2021-04-28 14:36:04', '2021-04-28 14:36:04', NULL),
(68, 'karthikraj245@digispoc.com', '$2b$10$jIkpArfb8Y67B0ouk1fTM.WEkwN8pk8hNE3RRDIenUJTe9NRSqgOi', 0, NULL, 0, 0, 0, '595211', '2021-04-28 14:36:47', '2021-04-28 14:36:47', '2021-04-28 14:36:47', NULL),
(69, 'karthikraj45@digispoc.com', '$2b$10$2Th6d1mvivjQOELsfRJM/OGpIuDse1tBZN3brX9rG6W7nmIdu2EyS', 0, NULL, 0, 0, 0, '930479', '2021-04-28 14:50:59', '2021-04-28 14:50:59', '2021-04-28 14:50:59', NULL),
(70, 'karthikraj342@digispoc.com', '$2b$10$RhGna56fa0ZVUM/eLYdbVubfwAp.s/wTTrNrfMDg7hAsvtrcHZ9pu', 0, NULL, 0, 0, 0, '187126', '2021-04-28 14:55:39', '2021-04-28 14:55:39', '2021-04-28 14:55:39', NULL),
(71, 'karthikraj3462@digispoc.com', '$2b$10$I23UEnN2fz/3AXMt.eOJpueR7lQGylIjacI3BJ4MOvDQSV1p1CpZm', 0, NULL, 0, 0, 0, NULL, '2021-04-28 14:56:42', '2021-04-28 14:56:42', '2021-04-28 14:56:42', NULL),
(72, 'karthikraj34@digispoc.com', '$2b$10$GGNFyDZUxFBBs8MCkMWrQOqI7YpSw5.2yf4MlQuxLtEkmXCAq/qOa', 0, NULL, 0, 0, 0, NULL, '2021-04-28 14:57:33', '2021-04-28 14:57:33', '2021-04-28 14:57:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_image_src`
--

CREATE TABLE `user_image_src` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `path` varchar(100) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_history` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_image_src`
--

INSERT INTO `user_image_src` (`id`, `user_id`, `path`, `created_date`, `modified_history`, `modified_by`) VALUES
(6, 18, 'C:\\Karthik\\New folder\\p2i-backend\\routes\\dashboard\\user\\public\\imageuploads\\passport2immunity-user_i', '2021-04-22 17:48:16', '2021-04-22 17:48:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_no` bigint(20) NOT NULL,
  `address_line1` text NOT NULL,
  `address_line2` text NOT NULL,
  `district` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `modified_history` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `create_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `user_id`, `first_name`, `last_name`, `phone_no`, `address_line1`, `address_line2`, `district`, `state`, `country`, `pincode`, `modified_history`, `create_date`) VALUES
(6, 16, 'karthik', 'raj', 988875520, '1st street', 'virugambakkam', 'madurai', 'tamilnadu', 'india', '600092', '2021-04-24 10:58:25', '2021-04-20 01:03:13'),
(15, 58, 'dhanapal', 'r', 7401163167, '14 street', 'chennai', 'Burnaby', 'British Columbia', 'Canada', '11545', '2021-04-23 15:17:33', '2021-04-23 15:17:33'),
(16, 59, 'dhanapal', 'r', 7401163167, '14 streer', 'alwarpet', 'Chennai', 'Tamil Nadu', 'India', '74011', '2021-04-23 18:12:33', '2021-04-23 18:12:33'),
(17, 60, 'king', 'p', 9854678956, '3th street', 'gangi street', 'Abudhabi', 'abu dhabi', 'Uae', '546782', '2021-04-24 11:26:54', '2021-04-24 11:26:54'),
(18, 62, 'vasanth', 'r', 7411635785, '123', 'asddd', 'Chiayi County', 'Chiayi City', 'South Africa', '45678', '2021-04-27 14:20:47', '2021-04-27 14:20:47'),
(19, 63, 'murali', 'm', 7899974231, '14 street', 'alwarpet', 'Chennai', 'Tamil Nadu', 'India', '784556', '2021-04-27 15:07:56', '2021-04-27 15:07:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_report_src`
--

CREATE TABLE `user_report_src` (
  `id` bigint(20) NOT NULL,
  `test_id` bigint(20) NOT NULL,
  `path` mediumtext NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_history` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_report_src`
--

INSERT INTO `user_report_src` (`id`, `test_id`, `path`, `created_date`, `modified_history`, `modified_by`) VALUES
(1, 3, 'C:\\Karthik\\New folder\\p2i-backend\\public\\filesuploads\\1618961806629-user_report-report.docx', '2021-04-21 05:06:46', '2021-04-21 05:06:46', NULL),
(2, 1, 'C:\\Karthik\\New folder\\p2i-backend\\routes\\dashboard\\admin\\report\\public\\filesuploads\\passport2immunity-user_report-download.jpg', '2021-04-24 13:48:49', '2021-04-24 13:48:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `vaccine_id` int(11) NOT NULL,
  `vaccine_name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `vaccine_description` mediumtext NOT NULL,
  `dose1_product_id` longtext NOT NULL,
  `dose2_product_id` longtext NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccine`
--

INSERT INTO `vaccine` (`vaccine_id`, `vaccine_name`, `status`, `vaccine_description`, `dose1_product_id`, `dose2_product_id`, `created_date`, `modified_date`) VALUES
(2, 'covaxin', 1, 'COVAXIN®, India\'s indigenous COVID-19 vaccine by Bharat Biotech is developed in collaboration with the Indian Council of Medical Research (ICMR) - National Institute of Virology (NIV)', '121,122,123', '123,124,125', '2021-04-20 12:26:41', '2021-04-27 14:09:07'),
(3, 'covishield ', 1, 'Serum Institute of India (SII), which manufactures AstraZeneca\'s vaccine Covishield at its Pune facility', '121,122,123', '123,124,125', '2021-04-20 12:27:28', '2021-04-27 14:10:10');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_info`
--

CREATE TABLE `vaccine_info` (
  `id` int(11) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `onbehalf` varchar(200) NOT NULL,
  `vaccine_name` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `aadhar_no` bigint(20) NOT NULL,
  `passport_no` mediumtext NOT NULL,
  `dose_date` datetime NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaccine_info`
--

INSERT INTO `vaccine_info` (`id`, `user_id`, `onbehalf`, `vaccine_name`, `first_name`, `last_name`, `aadhar_no`, `passport_no`, `dose_date`, `created_date`, `modified_date`) VALUES
(1, '16', 'myself', 'covaxin', 'karthik', 'raj', 904575846985, 'pass45158', '2021-04-27 14:09:07', '2021-04-27 14:24:45', '2021-04-27 14:24:45'),
(2, '16', 'myself', 'covaxin', 'karthik', 'raj', 904575846985, 'pass45158', '2021-04-27 14:09:07', '2021-04-27 14:26:44', '2021-04-27 14:26:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `bill_items`
--
ALTER TABLE `bill_items`
  ADD PRIMARY KEY (`bill_item_id`),
  ADD UNIQUE KEY `bill_id` (`test_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`hospital_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`test_id`);

--
-- Indexes for table `session_mgmt`
--
ALTER TABLE `session_mgmt`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `user_image_src`
--
ALTER TABLE `user_image_src`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_report_src`
--
ALTER TABLE `user_report_src`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `test_id` (`test_id`);

--
-- Indexes for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD PRIMARY KEY (`vaccine_id`),
  ADD UNIQUE KEY `vaccine_name` (`vaccine_name`);

--
-- Indexes for table `vaccine_info`
--
ALTER TABLE `vaccine_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` bigint(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bill_items`
--
ALTER TABLE `bill_items`
  MODIFY `bill_item_id` bigint(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `hospital_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `user_image_src`
--
ALTER TABLE `user_image_src`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_report_src`
--
ALTER TABLE `user_report_src`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vaccine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vaccine_info`
--
ALTER TABLE `vaccine_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
