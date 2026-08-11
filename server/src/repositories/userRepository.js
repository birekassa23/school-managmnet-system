import pool from '../config/db.js';

export async function findUserByUsernameOrEmail(identifier) {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1`,
    [identifier.trim(), identifier.trim()]
  );
  return rows[0] || null;
}

export async function getUserRoles(userId) {
  const [rows] = await pool.query(
    `SELECT r.name FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  );
  return rows.map((r) => r.name);
}

export async function getUserPermissions(userId) {
  const [rows] = await pool.query(
    `SELECT DISTINCT p.code FROM permissions p
     JOIN role_permissions rp ON p.id = rp.permission_id
     JOIN user_roles ur ON rp.role_id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  );
  return rows.map((p) => p.code);
}

export async function createUser({ username, email, passwordHash, firstName, lastName, phoneNumber }) {
  const [res] = await pool.query(
    `INSERT INTO users (username, email, password_hash, first_name, last_name, phone_number, status)
     VALUES (?, ?, ?, ?, ?, ?, 'active')`,
    [username.trim(), email ? email.trim() : null, passwordHash, firstName.trim(), lastName.trim(), phoneNumber.trim()]
  );
  return res.insertId;
}

export async function assignUserRole(userId, roleName) {
  const [roleRows] = await pool.query(`SELECT id FROM roles WHERE name = ? LIMIT 1`, [roleName]);
  if (!roleRows.length) throw new Error(`Role '${roleName}' does not exist`);

  const roleId = roleRows[0].id;
  await pool.query(`INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)`, [userId, roleId]);
}

export async function createStudentProfile(userId, admissionNumber, emergencyName, emergencyPhone) {
  await pool.query(
    `INSERT INTO students (user_id, admission_number, emergency_contact_name, emergency_contact_phone, status)
     VALUES (?, ?, ?, ?, 'active')`,
    [userId, admissionNumber.trim(), emergencyName?.trim() || null, emergencyPhone?.trim() || null]
  );
}

export async function createTeacherProfile(userId, employeeId, qualification, specialization) {
  await pool.query(
    `INSERT INTO teachers (user_id, employee_id, qualification, specialization)
     VALUES (?, ?, ?, ?)`,
    [userId, employeeId.trim(), qualification?.trim() || 'B.Ed', specialization?.trim() || 'General']
  );
}
