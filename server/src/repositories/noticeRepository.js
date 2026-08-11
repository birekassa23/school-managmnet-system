import pool from '../config/db.js';

export async function getAllNotices() {
  const [rows] = await pool.query(
    `SELECT n.id, n.title, n.content, n.target_audience, n.is_published, n.created_at, n.updated_at,
            CONCAT(u.first_name, ' ', u.last_name) AS author_name
     FROM notices n
     JOIN users u ON n.author_user_id = u.id
     ORDER BY n.created_at DESC`
  );
  return rows;
}

export async function createNotice(title, content, targetAudience, authorUserId) {
  const [res] = await pool.query(
    `INSERT INTO notices (title, content, target_audience, is_published, author_user_id)
     VALUES (?, ?, ?, 1, ?)`,
    [title.trim(), content.trim(), targetAudience || 'all', authorUserId]
  );
  return res.insertId;
}

export async function deleteNotice(id) {
  await pool.query(`DELETE FROM notices WHERE id = ?`, [id]);
}
