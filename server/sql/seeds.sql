-- Seed data for Azene Wube Academy SMS

USE `azene_wube_school`;

-- 1. Insert System Roles
INSERT IGNORE INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'super_admin', 'System Super Administrator with full system control'),
(2, 'principal', 'School Principal with administrative and academic oversight'),
(3, 'administrator', 'Academic & Administrative Staff Manager'),
(4, 'teacher', 'Academic Teacher with class marking privileges'),
(5, 'student', 'Enrolled Student with academic portal access'),
(6, 'parent', 'Student Guardian with child progress tracking access');

-- 2. Insert Granular Permissions
INSERT IGNORE INTO `permissions` (`id`, `code`, `module`, `description`) VALUES
(1, 'users.manage', 'users', 'Create, update, and manage system user accounts'),
(2, 'students.read', 'students', 'View student directories and profiles'),
(3, 'students.create', 'students', 'Register new student profiles'),
(4, 'students.update', 'students', 'Update existing student profiles'),
(5, 'students.delete', 'students', 'Archive or delete student profiles'),
(6, 'teachers.manage', 'teachers', 'Register and assign teachers'),
(7, 'academic.manage', 'academic', 'Configure academic years, grades, classes, and subjects'),
(8, 'attendance.view', 'attendance', 'View student and teacher attendance records'),
(9, 'attendance.mark', 'attendance', 'Mark daily student attendance'),
(10, 'grades.view', 'grades', 'View assessment marks and student report cards'),
(11, 'grades.enter', 'grades', 'Enter and edit assessment marks'),
(12, 'reports.view', 'reports', 'Generate school academic and attendance reports'),
(13, 'events.manage', 'events', 'Create and edit school events'),
(14, 'notices.manage', 'notices', 'Publish and delete bulletin notices'),
(15, 'media.manage', 'media', 'Upload and delete gallery images and video lectures'),
(16, 'audit.view', 'audit', 'Inspect system security audit logs');

-- 3. Map Role Permissions
-- Super Admin: All permissions (1..16)
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16);

-- Principal: Permissions 2..15
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(2, 2), (2, 3), (2, 4), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15);

-- Administrator: Permissions 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(3, 2), (3, 3), (3, 4), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 12), (3, 13), (3, 14), (3, 15);

-- Teacher: Permissions 2, 8, 9, 10, 11, 13, 14, 15
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(4, 2), (4, 8), (4, 9), (4, 10), (4, 11), (4, 13), (4, 14), (4, 15);

-- Student: Permissions 8, 10
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(5, 8), (5, 10);

-- Parent: Permissions 8, 10
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(6, 8), (6, 10);

-- 4. Create Default Super Admin Account (password: admin123)
-- bcrypt hash for 'admin123'
INSERT IGNORE INTO `users` (`id`, `username`, `email`, `password_hash`, `first_name`, `last_name`, `phone_number`, `status`) VALUES
(1, 'superadmin', 'admin@azenewube.edu.et', '$2b$10$KxbH2N8f3.pcPtuMM4eveOYQE5rFssmnf9S0TY/nrxhz7kxXXtbwi', 'Admin', 'User', '0911000000', 'active');

INSERT IGNORE INTO `user_roles` (`user_id`, `role_id`) VALUES (1, 1);

-- 5. Seed Assessment Types
INSERT IGNORE INTO `assessment_types` (`id`, `name`, `weight_percentage`, `max_marks`) VALUES
(1, 'Quiz', 10.00, 100.00),
(2, 'Assignment', 10.00, 100.00),
(3, 'Midterm Exam', 30.00, 100.00),
(4, 'Final Exam', 50.00, 100.00);

-- 6. Seed Academic Years & Grades
INSERT IGNORE INTO `academic_years` (`id`, `name`, `start_date`, `end_date`, `is_current`) VALUES
(1, '2026 Academic Year', '2026-09-01', '2027-06-30', 1);

INSERT IGNORE INTO `grades` (`id`, `name`, `code`, `level_order`) VALUES
(1, 'Grade 9', 'G9', 9),
(2, 'Grade 10', 'G10', 10),
(3, 'Grade 11', 'G11', 11),
(4, 'Grade 12', 'G12', 12);
