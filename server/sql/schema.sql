-- Azene Wube Academy - School Management System
-- Normalized Database Schema (3NF)

CREATE DATABASE IF NOT EXISTS `azene_wube_school` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `azene_wube_school`;

-- 1. Roles & Permissions (RBAC)
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. System Users & User Roles
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(191) NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(20) NULL,
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Academic Structure
CREATE TABLE IF NOT EXISTS `academic_years` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_current` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `terms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_year_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_current` TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `grades` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `level_order` INT NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `classes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `grade_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL DEFAULT 40,
  FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `class_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `room_number` VARCHAR(50) NULL,
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_class_section` (`class_id`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `subjects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `description` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Teachers & Staff
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `employee_id` VARCHAR(50) NOT NULL UNIQUE,
  `qualification` VARCHAR(100) NULL,
  `specialization` VARCHAR(100) NULL,
  `joining_date` DATE NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `class_subjects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `section_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `teacher_id` INT NULL,
  `academic_year_id` INT NOT NULL,
  FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_section_subject_year` (`section_id`, `subject_id`, `academic_year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Students & Guardians
CREATE TABLE IF NOT EXISTS `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `admission_number` VARCHAR(50) NOT NULL UNIQUE,
  `dob` DATE NULL,
  `gender` ENUM('male', 'female', 'other') NULL,
  `address` TEXT NULL,
  `emergency_contact_name` VARCHAR(100) NULL,
  `emergency_contact_phone` VARCHAR(20) NULL,
  `status` ENUM('active', 'transferred', 'graduated', 'withdrawn') NOT NULL DEFAULT 'active',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `guardians` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `occupation` VARCHAR(100) NULL,
  `relationship` VARCHAR(50) NOT NULL DEFAULT 'parent',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_guardians` (
  `student_id` INT NOT NULL,
  `guardian_id` INT NOT NULL,
  `is_primary` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`student_id`, `guardian_id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`guardian_id`) REFERENCES `guardians`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_enrollments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `section_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `roll_number` INT NULL,
  `status` ENUM('active', 'completed', 'dropped') NOT NULL DEFAULT 'active',
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_section_roll_year` (`section_id`, `roll_number`, `academic_year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Attendance Management
CREATE TABLE IF NOT EXISTS `student_attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `section_id` INT NOT NULL,
  `attendance_date` DATE NOT NULL,
  `status` ENUM('present', 'absent', 'late', 'excused') NOT NULL DEFAULT 'present',
  `remarks` VARCHAR(255) NULL,
  `marked_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`marked_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
  UNIQUE KEY `idx_student_date` (`student_id`, `attendance_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Assessment & Grading
CREATE TABLE IF NOT EXISTS `assessment_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `weight_percentage` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `max_marks` DECIMAL(5,2) NOT NULL DEFAULT 100.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `assessments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `class_subject_id` INT NOT NULL,
  `term_id` INT NOT NULL,
  `assessment_type_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `total_marks` DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  `due_date` DATE NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`class_subject_id`) REFERENCES `class_subjects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`assessment_type_id`) REFERENCES `assessment_types`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_grades` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `assessment_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `marks_obtained` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `remarks` VARCHAR(255) NULL,
  `graded_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`graded_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
  UNIQUE KEY `idx_assessment_student` (`assessment_id`, `student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Behavior & Discipline
CREATE TABLE IF NOT EXISTS `behavior_records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `reported_by_user_id` INT NOT NULL,
  `category` ENUM('positive', 'warning', 'disciplinary') NOT NULL DEFAULT 'warning',
  `severity` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low',
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `action_taken` TEXT NULL,
  `incident_date` DATE NOT NULL,
  `parent_notified` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reported_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Events, Notices & Media
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `event_date` DATE NOT NULL,
  `start_time` TIME NULL,
  `end_time` TIME NULL,
  `location` VARCHAR(150) NULL,
  `target_audience` ENUM('all', 'teachers', 'students', 'parents', 'class') NOT NULL DEFAULT 'all',
  `created_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  `target_audience` ENUM('all', 'teachers', 'students', 'parents') NOT NULL DEFAULT 'all',
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `author_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(512) NOT NULL,
  `uploaded_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `video_lectures` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(512) NOT NULL,
  `grade_id` INT NULL,
  `uploaded_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Audit Logging
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_name` VARCHAR(100) NOT NULL,
  `entity_id` INT NULL,
  `ip_address` VARCHAR(45) NULL,
  `details` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
