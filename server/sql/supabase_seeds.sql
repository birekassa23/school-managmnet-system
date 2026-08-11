-- Supabase PostgreSQL Seed Script for Azene Wube Academy SMS

-- 1. Insert Roles
INSERT INTO roles (name, description) VALUES
('super_admin', 'System Super Administrator with full system control'),
('principal', 'School Principal with administrative and academic oversight'),
('administrator', 'Academic & Administrative Staff Manager'),
('teacher', 'Academic Teacher with class marking privileges'),
('student', 'Enrolled Student with academic portal access'),
('parent', 'Student Guardian with child progress tracking access')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Permissions
INSERT INTO permissions (code, module, description) VALUES
('users.manage', 'users', 'Create, update, and manage system user accounts'),
('students.read', 'students', 'View student directories and profiles'),
('students.create', 'students', 'Register new student profiles'),
('students.update', 'students', 'Update existing student profiles'),
('students.delete', 'students', 'Archive or delete student profiles'),
('teachers.manage', 'teachers', 'Register and assign teachers'),
('academic.manage', 'academic', 'Configure academic years, grades, classes, and subjects'),
('attendance.view', 'attendance', 'View student and teacher attendance records'),
('attendance.mark', 'attendance', 'Mark daily student attendance'),
('grades.view', 'grades', 'View assessment marks and student report cards'),
('grades.enter', 'grades', 'Enter and edit assessment marks'),
('reports.view', 'reports', 'Generate school academic and attendance reports'),
('events.manage', 'events', 'Create and edit school events'),
('notices.manage', 'notices', 'Publish and delete bulletin notices'),
('media.manage', 'media', 'Upload and delete gallery images and video lectures'),
('audit.view', 'audit', 'Inspect system security audit logs')
ON CONFLICT (code) DO NOTHING;

-- 3. Map Permissions to Roles
-- Super Admin (role_id 1 gets permissions 1..16)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, p.id FROM permissions p
ON CONFLICT DO NOTHING;

-- Principal (role_id 2 gets permissions 2..15)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, p.id FROM permissions p WHERE p.id BETWEEN 2 AND 15
ON CONFLICT DO NOTHING;

-- Teacher (role_id 4 gets permissions 2, 8, 9, 10, 11, 13, 14, 15)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 4, p.id FROM permissions p WHERE p.id IN (2, 8, 9, 10, 11, 13, 14, 15)
ON CONFLICT DO NOTHING;

-- Student (role_id 5 gets permissions 8, 10)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 5, p.id FROM permissions p WHERE p.id IN (8, 10)
ON CONFLICT DO NOTHING;

-- Parent (role_id 6 gets permissions 8, 10)
INSERT INTO role_permissions (role_id, permission_id)
SELECT 6, p.id FROM permissions p WHERE p.id IN (8, 10)
ON CONFLICT DO NOTHING;

-- 4. Default Super Admin User (username: superadmin, password: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, phone_number, status) VALUES
('superadmin', 'admin@azenewube.edu.et', '$2a$10$wT8KzLg59jE9M0P5a.J4o.kC2nS1W2G6h7X8Y9Z0a1b2c3d4e5f6g', 'Admin', 'User', '0911000000', 'active')
ON CONFLICT (username) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, 1 FROM users u WHERE u.username = 'superadmin'
ON CONFLICT DO NOTHING;

-- 5. Seed Assessment Types
INSERT INTO assessment_types (name, weight_percentage, max_marks) VALUES
('Quiz', 10.00, 100.00),
('Assignment', 10.00, 100.00),
('Midterm Exam', 30.00, 100.00),
('Final Exam', 50.00, 100.00)
ON CONFLICT (name) DO NOTHING;

-- 6. Seed Academic Years & Grades
INSERT INTO academic_years (name, start_date, end_date, is_current) VALUES
('2026 Academic Year', '2026-09-01', '2027-06-30', TRUE)
ON CONFLICT (name) DO NOTHING;

INSERT INTO grades (name, code, level_order) VALUES
('Grade 9', 'G9', 9),
('Grade 10', 'G10', 10),
('Grade 11', 'G11', 11),
('Grade 12', 'G12', 12)
ON CONFLICT (code) DO NOTHING;
