import pool from '../config/db.js';

export async function getAllVideos() {
  const [rows] = await pool.query(
    `SELECT v.id, v.title, v.description, v.file_name, v.file_path, v.created_at,
            g.name AS grade_name, CONCAT(u.first_name, ' ', u.last_name) AS uploader_name
     FROM video_lectures v
     LEFT JOIN grades g ON v.grade_id = g.id
     JOIN users u ON v.uploaded_by_user_id = u.id
     ORDER BY v.created_at DESC`
  );
  return rows;
}

export async function getVideoById(id) {
  const [rows] = await pool.query(`SELECT * FROM video_lectures WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createVideo(title, description, fileName, filePath, gradeId, uploaderUserId) {
  const [res] = await pool.query(
    `INSERT INTO video_lectures (title, description, file_name, file_path, grade_id, uploaded_by_user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title.trim(), description?.trim() || null, fileName, filePath, gradeId || null, uploaderUserId]
  );
  return res.insertId;
}

export async function deleteVideo(id) {
  await pool.query(`DELETE FROM video_lectures WHERE id = ?`, [id]);
}
