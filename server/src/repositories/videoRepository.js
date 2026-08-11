import { supabase } from '../config/supabase.js';

export async function getAllVideos() {
  const { data, error } = await supabase
    .from('video_lectures')
    .select(`
      id,
      title,
      description,
      file_name,
      file_path,
      created_at,
      grades:grade_id (name),
      users:uploaded_by_user_id (first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((v) => ({
    id: v.id,
    title: v.title,
    description: v.description,
    file_name: v.file_name,
    file_path: v.file_path,
    created_at: v.created_at,
    grade_name: v.grades?.name || null,
    uploader_name: v.users ? `${v.users.first_name} ${v.users.last_name}` : 'Teacher',
  }));
}

export async function getVideoById(id) {
  const { data, error } = await supabase.from('video_lectures').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function createVideo(title, description, fileName, filePath, gradeId, uploaderUserId) {
  const { data, error } = await supabase
    .from('video_lectures')
    .insert({
      title: title.trim(),
      description: description?.trim() || null,
      file_name: fileName,
      file_path: filePath,
      grade_id: gradeId || null,
      uploaded_by_user_id: uploaderUserId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteVideo(id) {
  const { error } = await supabase.from('video_lectures').delete().eq('id', id);
  if (error) throw error;
}
