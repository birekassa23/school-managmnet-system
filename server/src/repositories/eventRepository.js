import pool from '../config/db.js';

export async function getAllEvents() {
  const [rows] = await pool.query(
    `SELECT e.id, e.title, e.description, e.event_date, e.start_time, e.end_time, e.location, e.target_audience, e.created_at,
            CONCAT(u.first_name, ' ', u.last_name) AS organizer_name
     FROM events e
     JOIN users u ON e.created_by_user_id = u.id
     ORDER BY e.event_date ASC`
  );
  return rows;
}

export async function createEvent(title, description, eventDate, startTime, endTime, location, targetAudience, createdByUserId) {
  const [res] = await pool.query(
    `INSERT INTO events (title, description, event_date, start_time, end_time, location, target_audience, created_by_user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [title.trim(), description.trim(), eventDate, startTime || null, endTime || null, location || null, targetAudience || 'all', createdByUserId]
  );
  return res.insertId;
}

export async function deleteEvent(id) {
  await pool.query(`DELETE FROM events WHERE id = ?`, [id]);
}
