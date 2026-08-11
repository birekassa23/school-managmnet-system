import { supabase } from '../config/supabase.js';

export async function getAllNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select(`
      id,
      title,
      content,
      target_audience,
      is_published,
      created_at,
      updated_at,
      users:author_user_id (first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((n) => ({
    id: n.id,
    title: n.title,
    content: n.content,
    target_audience: n.target_audience,
    is_published: n.is_published,
    created_at: n.created_at,
    updated_at: n.updated_at,
    author_name: n.users ? `${n.users.first_name} ${n.users.last_name}` : 'School Admin',
  }));
}

export async function createNotice(title, content, targetAudience, authorUserId) {
  const { data, error } = await supabase
    .from('notices')
    .insert({
      title: title.trim(),
      content: content.trim(),
      target_audience: targetAudience || 'all',
      is_published: true,
      author_user_id: authorUserId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteNotice(id) {
  const { error } = await supabase.from('notices').delete().eq('id', id);
  if (error) throw error;
}
