import * as noticeRepo from '../repositories/noticeRepository.js';

export async function getNotices(req, res, next) {
  try {
    const notices = await noticeRepo.getAllNotices();
    res.json({ success: true, data: notices });
  } catch (err) {
    next(err);
  }
}

export async function createNotice(req, res, next) {
  try {
    const { title, notice, content, targetAudience } = req.body;
    const finalTitle = title?.trim() || 'Notice';
    const finalContent = (content || notice)?.trim();

    if (!finalContent) {
      return res.status(400).json({ success: false, message: 'Notice content is required' });
    }

    const id = await noticeRepo.createNotice(finalTitle, finalContent, targetAudience, req.user.id);
    res.status(201).json({ success: true, message: 'Notice created successfully', data: { id } });
  } catch (err) {
    next(err);
  }
}

export async function deleteNotice(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid notice ID' });
    }
    await noticeRepo.deleteNotice(id);
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (err) {
    next(err);
  }
}
