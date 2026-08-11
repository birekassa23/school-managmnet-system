import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedStoreKeeper() {
  console.log('Seeding Store Keeper account (store / store123)...');

  const hashedPassword = await bcrypt.hash('store123', 10);

  const { data: storeUser, error: uErr } = await supabase
    .from('users')
    .upsert(
      {
        username: 'store',
        email: 'store@azenewube.edu.et',
        password_hash: hashedPassword,
        first_name: 'Almaz',
        last_name: 'Worku',
        phone_number: '+251911990011',
        status: 'active',
      },
      { onConflict: 'username' }
    )
    .select('id')
    .single();

  if (uErr) {
    console.error('Failed to upsert store user:', uErr.message);
    process.exit(1);
  }

  // Ensure role 'store' exists or associate role
  const { data: roleData } = await supabase.from('roles').select('id').eq('name', 'store').maybeSingle();

  let roleId = roleData?.id;

  if (!roleId) {
    const { data: newRole } = await supabase
      .from('roles')
      .insert([{ name: 'store', description: 'Store Keeper & Inventory Manager' }])
      .select('id')
      .single();
    roleId = newRole?.id;
  }

  if (roleId && storeUser) {
    await supabase
      .from('user_roles')
      .upsert({ user_id: storeUser.id, role_id: roleId }, { onConflict: 'user_id,role_id' });
  }

  console.log('✅ STORE KEEPER ACCOUNT CREATED: username: store | password: store123');
}

seedStoreKeeper();
