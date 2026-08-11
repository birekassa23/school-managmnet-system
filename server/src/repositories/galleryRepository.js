import pool from '../config/db.js';

export async function getAllImages() {
  const [rows] = await pool.query(
    `SELECT g.id, g.title, g.description, g.file_name, g.file_path, g.created_at,
            CONCAT(u.first_name, ' ', u.last_name) AS uploader_name
     FROM gallery_images g
     JOIN users u ON g.uploaded_by_user_id = u.id
     ORDER BY g.created_at DESC`
  );
  return rows;
}

export async function getImageById(id) {
  const [rows] = await pool.query(`SELECT * FROM gallery_images WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createImage(title, description, fileName, filePath, uploaderUserId) {
  const [res] = await pool.query(
    `INSERT INTO gallery_images (title, description, file_name, file_path, uploaded_by_user_id)
     VALUES (?, ?, ?, ?, ?)`,
    [title.trim(), description?.trim() || null, fileName, filePath, uploaderUserId]
  );
  return res.insertId;
}

export async function deleteImage(id) {
  await pool.query(`DELETE FROM gallery_images WHERE id = ?`, [id]);
}
