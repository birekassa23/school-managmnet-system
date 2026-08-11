import { supabase } from '../config/supabase.js';

export async function findUserByUsernameOrEmail(identifier) {
  const cleanId = identifier.trim();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${cleanId},email.eq.${cleanId}`)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function getUserRoles(userId) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', userId);

  if (error) throw error;
  return (data || []).map((r) => r.roles?.name).filter(Boolean);
}

export async function getUserPermissions(userId) {
  const { data: userRoles, error: urErr } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId);

  if (urErr) throw urErr;
  const roleIds = (userRoles || []).map((ur) => ur.role_id);
  if (!roleIds.length) return [];

  const { data: rolePerms, error: rpErr } = await supabase
    .from('role_permissions')
    .select('permissions(code)')
    .in('role_id', roleIds);

  if (rpErr) throw rpErr;
  const codes = (rolePerms || []).map((rp) => rp.permissions?.code).filter(Boolean);
  return Array.from(new Set(codes));
}

export async function createUser({ username, email, passwordHash, firstName, lastName, phoneNumber }) {
  const { data, error } = await supabase
    .from('users')
    .insert({
      username: username.trim(),
      email: email ? email.trim() : null,
      password_hash: passwordHash,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone_number: phoneNumber.trim(),
      status: 'active',
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function assignUserRole(userId, roleName) {
  const { data: roleData, error: roleErr } = await supabase
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .single();

  if (roleErr || !roleData) throw new Error(`Role '${roleName}' does not exist`);

  const { error } = await supabase
    .from('user_roles')
    .upsert({ user_id: userId, role_id: roleData.id }, { onConflict: 'user_id,role_id' });

  if (error) throw error;
}

export async function createStudentProfile(userId, admissionNumber, emergencyName, emergencyPhone) {
  const { error } = await supabase.from('students').insert({
    user_id: userId,
    admission_number: admissionNumber.trim(),
    emergency_contact_name: emergencyName?.trim() || null,
    emergency_contact_phone: emergencyPhone?.trim() || null,
    status: 'active',
  });

  if (error) throw error;
}

export async function createTeacherProfile(userId, employeeId, qualification, specialization) {
  const { error } = await supabase.from('teachers').insert({
    user_id: userId,
    employee_id: employeeId.trim(),
    qualification: qualification?.trim() || 'B.Ed',
    specialization: specialization?.trim() || 'General',
  });

  if (error) throw error;
}
