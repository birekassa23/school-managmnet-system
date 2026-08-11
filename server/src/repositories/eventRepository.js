import { supabase } from '../config/supabase.js';

export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_date,
      start_time,
      end_time,
      location,
      target_audience,
      created_at,
      users:created_by_user_id (first_name, last_name)
    `)
    .order('event_date', { ascending: true });

  if (error) throw error;

  return (data || []).map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    event_date: e.event_date,
    start_time: e.start_time,
    end_time: e.end_time,
    location: e.location,
    target_audience: e.target_audience,
    created_at: e.created_at,
    organizer_name: e.users ? `${e.users.first_name} ${e.users.last_name}` : 'School Admin',
  }));
}

export async function createEvent(title, description, eventDate, startTime, endTime, location, targetAudience, createdByUserId) {
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: title.trim(),
      description: description.trim(),
      event_date: eventDate,
      start_time: startTime || null,
      end_time: endTime || null,
      location: location || null,
      target_audience: targetAudience || 'all',
      created_by_user_id: createdByUserId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}
