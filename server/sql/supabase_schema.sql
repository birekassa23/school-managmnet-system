-- Azene Wube Academy - School Management System
-- Supabase PostgreSQL 3NF Schema DDL

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles & Permissions (RBAC)
CREATE TABLE IF NOT EXISTS roles (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code VARCHAR(100) NOT NULL UNIQUE,
  module VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- 2. System Users & User Roles
CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(191) UNIQUE,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- 3. Academic Structure
CREATE TABLE IF NOT EXISTS academic_years (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS terms (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  academic_year_id INT NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS grades (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  code VARCHAR(20) NOT NULL UNIQUE,
  level_order INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS classes (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  grade_id INT NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL DEFAULT 40
);

CREATE TABLE IF NOT EXISTS sections (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  room_number VARCHAR(50),
  UNIQUE (class_id, name)
);

CREATE TABLE IF NOT EXISTS subjects (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  description TEXT
);

-- 4. Teachers & Staff
CREATE TABLE IF NOT EXISTS teachers (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) NOT NULL UNIQUE,
  qualification VARCHAR(100),
  specialization VARCHAR(100),
  joining_date DATE
);

CREATE TABLE IF NOT EXISTS class_subjects (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section_id INT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL,
  academic_year_id INT NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  UNIQUE (section_id, subject_id, academic_year_id)
);

-- 5. Students & Guardians
CREATE TABLE IF NOT EXISTS students (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  admission_number VARCHAR(50) NOT NULL UNIQUE,
  dob DATE,
  gender VARCHAR(10),
  address TEXT,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS guardians (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  occupation VARCHAR(100),
  relationship VARCHAR(50) NOT NULL DEFAULT 'parent'
);

CREATE TABLE IF NOT EXISTS student_guardians (
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  guardian_id INT NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (student_id, guardian_id)
);

CREATE TABLE IF NOT EXISTS student_enrollments (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  section_id INT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  academic_year_id INT NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  roll_number INT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  UNIQUE (section_id, roll_number, academic_year_id)
);

-- 6. Attendance Management
CREATE TABLE IF NOT EXISTS student_attendance (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  section_id INT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'present',
  remarks TEXT,
  marked_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, attendance_date)
);

-- 7. Assessment & Grading
CREATE TABLE IF NOT EXISTS assessment_types (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  weight_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  max_marks NUMERIC(5,2) NOT NULL DEFAULT 100.00
);

CREATE TABLE IF NOT EXISTS assessments (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  class_subject_id INT NOT NULL REFERENCES class_subjects(id) ON DELETE CASCADE,
  term_id INT NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  assessment_type_id INT NOT NULL REFERENCES assessment_types(id) ON DELETE RESTRICT,
  title VARCHAR(150) NOT NULL,
  total_marks NUMERIC(5,2) NOT NULL DEFAULT 100.00,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_grades (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  assessment_id INT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  marks_obtained NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  remarks TEXT,
  graded_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (assessment_id, student_id)
);

-- 8. Behavior & Discipline
CREATE TABLE IF NOT EXISTS behavior_records (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  reported_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  category VARCHAR(30) NOT NULL DEFAULT 'warning',
  severity VARCHAR(20) NOT NULL DEFAULT 'low',
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  action_taken TEXT,
  incident_date DATE NOT NULL,
  parent_notified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Events, Notices & Media
CREATE TABLE IF NOT EXISTS events (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location VARCHAR(150),
  target_audience VARCHAR(20) NOT NULL DEFAULT 'all',
  created_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notices (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  target_audience VARCHAR(20) NOT NULL DEFAULT 'all',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  author_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(512) NOT NULL,
  uploaded_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS video_lectures (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(512) NOT NULL,
  grade_id INT REFERENCES grades(id) ON DELETE SET NULL,
  uploaded_by_user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Audit Logging
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_name VARCHAR(100) NOT NULL,
  entity_id INT,
  ip_address VARCHAR(45),
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
