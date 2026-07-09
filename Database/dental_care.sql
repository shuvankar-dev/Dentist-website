-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2026 at 08:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental_care`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', 'admin123', '2026-07-09 05:30:04');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `treatment` varchar(100) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` varchar(50) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `doctor_id`, `name`, `email`, `phone`, `treatment`, `preferred_date`, `preferred_time`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'James Anderson', 'james.anderson@email.com', '+44 7700 900001', 'General Check-up', '2026-07-12', '10:00 AM - 12:00 PM', 'Regular 6-month checkup', 'confirmed', '2026-07-08 03:45:00', '2026-07-09 06:12:42'),
(2, 1, 'Emma Wilson', 'emma.wilson@email.com', '+44 7700 900002', 'Hygiene Appointment', '2026-07-12', '12:00 PM - 2:00 PM', 'Teeth cleaning appointment', 'confirmed', '2026-07-08 05:00:00', '2026-07-09 06:12:42'),
(3, 1, 'Oliver Brown', 'oliver.brown@email.com', '+44 7700 900003', 'Emergency Appointment', '2026-07-10', '10:00 AM - 12:00 PM', 'Severe toothache, urgent', '', '2026-07-09 02:30:00', '2026-07-09 06:12:42'),
(4, 1, 'Sophie Taylor', 'sophie.taylor@email.com', '+44 7700 900004', 'General Check-up', '2026-07-15', '10:00 AM - 12:00 PM', 'First visit to the clinic', 'pending', '2026-07-09 05:50:00', '2026-07-09 06:12:42'),
(5, 1, 'Harry Davies', 'harry.davies@email.com', '+44 7700 900005', 'Hygiene Appointment', '2026-07-16', '12:00 PM - 2:00 PM', 'Routine cleaning', 'pending', '2026-07-09 08:15:00', '2026-07-09 06:12:42'),
(6, 1, 'Victoria Clark', 'victoria.clark@email.com', '+44 7700 900024', 'General Check-up', '2026-07-17', '10:00 AM - 12:00 PM', 'Annual checkup', 'pending', '2026-07-09 11:00:00', '2026-07-09 06:12:42'),
(7, 1, 'Benjamin Young', 'benjamin.young@email.com', '+44 7700 900029', 'General Check-up', '2026-07-05', '10:00 AM - 12:00 PM', 'Regular checkup', '', '2026-07-01 04:30:00', '2026-07-09 06:12:42'),
(8, 1, 'Emily Turner', 'emily.turner@email.com', '+44 7700 900034', 'General Check-up', '2026-07-13', '10:00 AM - 12:00 PM', 'Need to reschedule', 'cancelled', '2026-07-08 02:30:00', '2026-07-09 06:12:42'),
(9, 2, 'Isabella Evans', 'isabella.evans@email.com', '+44 7700 900006', 'Invisalign Consultation', '2026-07-11', '10:00 AM - 12:00 PM', 'Want to discuss clear aligners', 'confirmed', '2026-07-08 08:50:00', '2026-07-09 06:12:42'),
(10, 2, 'Jack Thomas', 'jack.thomas@email.com', '+44 7700 900007', 'Invisalign Consultation', '2026-07-14', '12:00 PM - 2:00 PM', 'Follow-up appointment for aligners', 'confirmed', '2026-07-08 10:00:00', '2026-07-09 06:12:42'),
(11, 2, 'Amelia Roberts', 'amelia.roberts@email.com', '+44 7700 900008', 'General Check-up', '2026-07-11', '12:00 PM - 2:00 PM', 'Checking progress of braces', '', '2026-07-09 03:30:00', '2026-07-09 06:12:42'),
(12, 2, 'George Walker', 'george.walker@email.com', '+44 7700 900009', 'Invisalign Consultation', '2026-07-15', '10:00 AM - 12:00 PM', 'Initial consultation', 'pending', '2026-07-09 10:40:00', '2026-07-09 06:12:42'),
(13, 2, 'Samuel Lewis', 'samuel.lewis@email.com', '+44 7700 900025', 'Invisalign Consultation', '2026-07-17', '10:00 AM - 12:00 PM', 'Want straighter teeth', 'pending', '2026-07-09 11:30:00', '2026-07-09 06:12:42'),
(14, 2, 'Hannah King', 'hannah.king@email.com', '+44 7700 900030', 'Invisalign Consultation', '2026-07-04', '10:00 AM - 12:00 PM', 'Aligner fitting', '', '2026-07-01 05:30:00', '2026-07-09 06:12:42'),
(15, 3, 'Charlotte White', 'charlotte.white@email.com', '+44 7700 900010', 'Teeth Whitening', '2026-07-12', '6:00 PM - 8:00 PM', 'Professional whitening treatment', 'confirmed', '2026-07-08 05:30:00', '2026-07-09 06:12:42'),
(16, 3, 'Thomas Harris', 'thomas.harris@email.com', '+44 7700 900011', 'Cosmetic Consultation', '2026-07-13', '10:00 AM - 12:00 PM', 'Interested in veneers', 'confirmed', '2026-07-08 06:45:00', '2026-07-09 06:12:42'),
(17, 3, 'Grace Martin', 'grace.martin@email.com', '+44 7700 900012', 'Teeth Whitening', '2026-07-10', '6:00 PM - 8:00 PM', 'Wedding in 2 months', '', '2026-07-09 05:00:00', '2026-07-09 06:12:42'),
(18, 3, 'Daniel Thompson', 'daniel.thompson@email.com', '+44 7700 900013', 'Cosmetic Consultation', '2026-07-16', '12:00 PM - 2:00 PM', 'Smile makeover consultation', 'pending', '2026-07-09 08:30:00', '2026-07-09 06:12:42'),
(19, 3, 'Lily Garcia', 'lily.garcia@email.com', '+44 7700 900014', 'Teeth Whitening', '2026-07-17', '6:00 PM - 8:00 PM', 'Want brighter smile', 'pending', '2026-07-09 09:50:00', '2026-07-09 06:12:42'),
(20, 3, 'Zoe Walker', 'zoe.walker@email.com', '+44 7700 900026', 'Cosmetic Consultation', '2026-07-18', '6:00 PM - 8:00 PM', 'Interested in full smile makeover', 'pending', '2026-07-09 12:00:00', '2026-07-09 06:12:42'),
(21, 3, 'Alexander Wright', 'alex.wright@email.com', '+44 7700 900031', 'Teeth Whitening', '2026-07-03', '6:00 PM - 8:00 PM', 'Professional whitening', '', '2026-07-01 06:30:00', '2026-07-09 06:12:42'),
(22, 3, 'William Hill', 'william.hill@email.com', '+44 7700 900035', 'Cosmetic Consultation', '2026-07-14', '6:00 PM - 8:00 PM', 'Changed mind', 'cancelled', '2026-07-08 03:30:00', '2026-07-09 06:12:42'),
(23, 4, 'Oscar Martinez', 'oscar.martinez@email.com', '+44 7700 900015', 'Dental Implants', '2026-07-11', '10:00 AM - 12:00 PM', 'Implant consultation for missing tooth', 'confirmed', '2026-07-08 08:00:00', '2026-07-09 06:12:42'),
(24, 4, 'Mia Rodriguez', 'mia.rodriguez@email.com', '+44 7700 900016', 'Dental Implants', '2026-07-14', '10:00 AM - 12:00 PM', 'Follow-up after implant surgery', 'confirmed', '2026-07-08 11:15:00', '2026-07-09 06:12:42'),
(25, 4, 'Lucas Lee', 'lucas.lee@email.com', '+44 7700 900017', 'Emergency Appointment', '2026-07-10', '10:00 AM - 12:00 PM', 'Wisdom tooth extraction needed', '', '2026-07-09 03:00:00', '2026-07-09 06:12:42'),
(26, 4, 'Ella Gonzalez', 'ella.gonzalez@email.com', '+44 7700 900018', 'Dental Implants', '2026-07-15', '12:00 PM - 2:00 PM', 'Second implant procedure', 'pending', '2026-07-09 06:20:00', '2026-07-09 06:12:42'),
(27, 4, 'Ryan Hall', 'ryan.hall@email.com', '+44 7700 900027', 'Dental Implants', '2026-07-17', '10:00 AM - 12:00 PM', 'Multiple implants needed', 'pending', '2026-07-09 12:30:00', '2026-07-09 06:12:42'),
(28, 4, 'Olivia Green', 'olivia.green@email.com', '+44 7700 900032', 'Dental Implants', '2026-07-02', '10:00 AM - 12:00 PM', 'Implant placement', '', '2026-07-01 07:30:00', '2026-07-09 06:12:42'),
(29, 5, 'Noah Wilson', 'sarah.wilson@email.com', '+44 7700 900019', 'General Check-up', '2026-07-12', '10:00 AM - 12:00 PM', 'First dental visit for 5-year-old', 'confirmed', '2026-07-08 04:15:00', '2026-07-09 06:12:42'),
(30, 5, 'Ava Johnson', 'mike.johnson@email.com', '+44 7700 900020', 'General Check-up', '2026-07-13', '10:00 AM - 12:00 PM', 'Regular checkup for 8-year-old', 'confirmed', '2026-07-08 08:30:00', '2026-07-09 06:12:42'),
(31, 5, 'Ethan Brown', 'linda.brown@email.com', '+44 7700 900021', 'Hygiene Appointment', '2026-07-10', '10:00 AM - 12:00 PM', 'Teeth cleaning for 10-year-old', '', '2026-07-09 04:00:00', '2026-07-09 06:12:42'),
(32, 5, 'Sophia Davis', 'mark.davis@email.com', '+44 7700 900022', 'Emergency Appointment', '2026-07-15', '10:00 AM - 12:00 PM', 'Child has toothache', 'pending', '2026-07-09 07:00:00', '2026-07-09 06:12:42'),
(33, 5, 'Mason Miller', 'anna.miller@email.com', '+44 7700 900023', 'General Check-up', '2026-07-16', '10:00 AM - 12:00 PM', '7-year-old needs checkup', 'pending', '2026-07-09 09:30:00', '2026-07-09 06:12:42'),
(34, 5, 'Chloe Allen', 'parent.allen@email.com', '+44 7700 900028', 'Hygiene Appointment', '2026-07-17', '10:00 AM - 12:00 PM', 'Cleaning for 9-year-old', 'confirmed', '2026-07-09 13:00:00', '2026-07-09 06:20:12'),
(35, 5, 'Jacob Adams', 'parent.adams@email.com', '+44 7700 900033', 'General Check-up', '2026-07-01', '10:00 AM - 12:00 PM', 'Child checkup', '', '2026-06-28 08:30:00', '2026-07-09 06:12:42');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `qualifications` text DEFAULT NULL,
  `experience_years` int(11) DEFAULT 0,
  `profile_image` varchar(500) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `username`, `password`, `full_name`, `email`, `phone`, `specialization`, `qualifications`, `experience_years`, `profile_image`, `bio`, `is_available`, `created_at`, `updated_at`) VALUES
(1, 'dr.smith', 'doctor123', 'Dr. Sarah Smith', 'sarah.smith@dentalcare.com', '+44 20 1234 5678', 'General Dentistry', 'BDS, MFDS RCS', 12, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 'Experienced general dentist specializing in preventive care and cosmetic dentistry', 1, '2026-07-09 05:59:35', '2026-07-09 05:59:35'),
(2, 'dr.johnson', 'doctor123', 'Dr. Michael Johnson', 'michael.johnson@dentalcare.com', '+44 20 1234 5679', 'Orthodontics', 'BDS, MOrth RCS', 15, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', 'Specialist in Invisalign and traditional braces with over 15 years experience', 1, '2026-07-09 05:59:35', '2026-07-09 05:59:35'),
(3, 'dr.patel', 'doctor123', 'Dr. Priya Patel', 'priya.patel@dentalcare.com', '+44 20 1234 5680', 'Cosmetic Dentistry', 'BDS, MSc Cosmetic Dentistry', 8, 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400', 'Expert in smile makeovers, veneers, and teeth whitening procedures', 1, '2026-07-09 05:59:35', '2026-07-09 05:59:35'),
(4, 'dr.chen', 'doctor123', 'Dr. David Chen', 'david.chen@dentalcare.com', '+44 20 1234 5681', 'Oral Surgery', 'BDS, FDS RCS, FFDRCSI', 20, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400', 'Consultant oral surgeon specializing in dental implants and complex extractions', 1, '2026-07-09 05:59:35', '2026-07-09 05:59:35'),
(5, 'dr.williams', 'doctor123', 'Dr. Emily Williams', 'emily.williams@dentalcare.com', '+44 20 1234 5682', 'Pediatric Dentistry', 'BDS, MSc Paediatric Dentistry', 10, 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400', 'Caring pediatric dentist making dental visits fun for children', 1, '2026-07-09 05:59:35', '2026-07-09 05:59:35');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE `doctor_availability` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_availability`
--

INSERT INTO `doctor_availability` (`id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `is_active`, `created_at`) VALUES
(2, 1, 'Tuesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(3, 1, 'Wednesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(4, 1, 'Thursday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(5, 1, 'Friday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(6, 2, 'Monday', '10:00:00', '18:00:00', 1, '2026-07-09 05:59:35'),
(7, 2, 'Wednesday', '10:00:00', '18:00:00', 1, '2026-07-09 05:59:35'),
(8, 2, 'Thursday', '10:00:00', '18:00:00', 1, '2026-07-09 05:59:35'),
(9, 2, 'Friday', '10:00:00', '18:00:00', 1, '2026-07-09 05:59:35'),
(10, 3, 'Tuesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(11, 3, 'Wednesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(12, 3, 'Thursday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(13, 3, 'Friday', '13:00:00', '20:00:00', 1, '2026-07-09 05:59:35'),
(14, 4, 'Monday', '08:00:00', '16:00:00', 1, '2026-07-09 05:59:35'),
(15, 4, 'Tuesday', '08:00:00', '16:00:00', 1, '2026-07-09 05:59:35'),
(16, 4, 'Thursday', '08:00:00', '16:00:00', 1, '2026-07-09 05:59:35'),
(17, 4, 'Friday', '08:00:00', '16:00:00', 1, '2026-07-09 05:59:35'),
(18, 5, 'Monday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(19, 5, 'Tuesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(20, 5, 'Wednesday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(21, 5, 'Thursday', '09:00:00', '17:00:00', 1, '2026-07-09 05:59:35'),
(22, 5, 'Friday', '09:00:00', '13:00:00', 1, '2026-07-09 05:59:35'),
(23, 1, 'Monday', '01:51:00', '05:51:00', 1, '2026-07-09 06:21:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_preferred_date` (`preferred_date`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_doctor_id` (`doctor_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_doctor_day` (`doctor_id`,`day_of_week`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
