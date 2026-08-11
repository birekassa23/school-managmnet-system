import { supabase } from '../config/supabase.js';

export async function getAllImages() {
  const { data, error } = await supabase
    .from('gallery_images')
    .select(`
      id,
      title,
      description,
      file_name,
      file_path,
      created_at,
      users:uploaded_by_user_id (first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    file_name: g.file_name,
    file_path: g.file_path,
    created_at: g.created_at,
    uploader_name: g.users ? `${g.users.first_name} ${g.users.last_name}` : 'Staff',
  }));
}

export async function getImageById(id) {
  const { data, error } = await supabase.from('gallery_images').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function createImage(title, description, fileName, filePath, uploaderUserId) {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert({
      title: title.trim(),
      description: description?.trim() || null,
      file_name: fileName,
      file_path: filePath,
      uploaded_by_user_id: uploaderUserId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteImage(id) {
  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  if (error) throw error;
}
