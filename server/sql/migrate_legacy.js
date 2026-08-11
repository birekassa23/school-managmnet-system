import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  console.log('🔄 Starting Legacy Data Migration to 3NF Schema...');

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  };

  const conn = await mysql.createConnection(dbConfig);

  try {
    // 1. Ensure new schema exists
    console.log('🛠️ Initializing target database schema & seed tables...');
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`azene_wube_school\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await conn.query(`USE \`azene_wube_school\`;`);

    // Check if legacy database 'school' exists
    const [dbs] = await conn.query(`SHOW DATABASES LIKE 'school';`);
    if (!dbs.length) {
      console.log('⚠️ Legacy database "school" not found on MySQL server. Skipping legacy data migration.');
      return;
    }

    console.log('📦 Migrating legacy teachers from `school`.`teachers.detail`...');
    const [teachers] = await conn.query(`SELECT * FROM \`school\`.\`teachers.detail\`;`);

    for (const t of teachers) {
      const phoneStr = String(t['phone.number'] || '').padStart(10, '0');
      // Insert user
      const [uRes] = await conn.query(
        `INSERT INTO \`users\` (username, email, password_hash, first_name, last_name, phone_number, status)
         VALUES (?, ?, ?, ?, ?, ?, 'active')
         ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name), phone_number=VALUES(phone_number)`,
        [t.username.trim(), t.email?.trim() || null, t.password, t.firstname, t.lastname, phoneStr]
      );

      const userId = uRes.insertId || (await getUserId(conn, t.username.trim()));

      // Assign teacher or principal role
      const isPrincipal = t.ID === 5 || t.username === 'principal12';
      const roleId = isPrincipal ? 2 : 4; // 2=principal, 4=teacher

      await conn.query(
        `INSERT IGNORE INTO \`user_roles\` (user_id, role_id) VALUES (?, ?)`,
        [userId, roleId]
      );

      // Create teacher record
      await conn.query(
        `INSERT INTO \`teachers\` (user_id, employee_id, qualification, specialization)
         VALUES (?, ?, 'Bachelor of Education', 'General Education')
         ON DUPLICATE KEY UPDATE user_id=user_id`,
        [userId, `EMP-${t.ID}`]
      );
    }

    console.log('📦 Migrating legacy students & guardians from `school`.`std.parent`...');
    const [stdParents] = await conn.query(`SELECT * FROM \`school\`.\`std.parent\`;`);

    for (const s of stdParents) {
      const phoneStr = String(s['phone.number'] || '').padStart(10, '0');
      const [uRes] = await conn.query(
        `INSERT INTO \`users\` (username, email, password_hash, first_name, last_name, phone_number, status)
         VALUES (?, ?, ?, ?, ?, ?, 'active')
         ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name)`,
        [s.username.trim(), `${s.username.trim()}@student.azenewube.edu.et`, s.password, s.firstname, s.lastname, phoneStr]
      );

      const userId = uRes.insertId || (await getUserId(conn, s.username.trim()));

      // Assign student role (5)
      await conn.query(`INSERT IGNORE INTO \`user_roles\` (user_id, role_id) VALUES (?, 5)`, [userId]);

      // Create student profile
      await conn.query(
        `INSERT INTO \`students\` (user_id, admission_number, emergency_contact_name, emergency_contact_phone)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE user_id=user_id`,
        [userId, `ADM-${s.sn}`, `${s.firstname} Guardian`, phoneStr]
      );
    }

    console.log('📦 Migrating legacy notices from `school`.`notices`...');
    const [notices] = await conn.query(`SELECT * FROM \`school\`.\`notices\`;`);
    const [adminUser] = await conn.query(`SELECT id FROM \`users\` LIMIT 1;`);
    const authorId = adminUser[0]?.id || 1;

    for (const n of notices) {
      await conn.query(
        `INSERT INTO \`notices\` (title, content, target_audience, is_published, author_user_id, created_at)
         VALUES (?, ?, 'all', 1, ?, ?)`,
        [n.user ? `Announcement by ${n.user}` : 'School Announcement', n.notice, authorId, n.insert_date]
      );
    }

    console.log('✅ Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration Error:', err);
  } finally {
    await conn.end();
  }
}

async function getUserId(conn, username) {
  const [rows] = await conn.query(`SELECT id FROM \`users\` WHERE username = ? LIMIT 1`, [username]);
  return rows[0]?.id;
}

migrate();
