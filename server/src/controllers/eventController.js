import * as eventRepo from '../repositories/eventRepository.js';

export async function getEvents(req, res, next) {
  try {
    const events = await eventRepo.getAllEvents();
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const { title, description, eventDate, startTime, endTime, location, targetAudience } = req.body;

    if (!title?.trim() || !description?.trim() || !eventDate) {
      return res.status(400).json({ success: false, message: 'Title, description, and eventDate are required' });
    }

    const id = await eventRepo.createEvent(
      title,
      description,
      eventDate,
      startTime,
      endTime,
      location,
      targetAudience,
      req.user.id
    );

    res.status(201).json({ success: true, message: 'Event created successfully', data: { id } });
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID' });
    }
    await eventRepo.deleteEvent(id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
}
