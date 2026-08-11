import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parseCorsOrigin = (originEnv) => {
  if (!originEnv || originEnv === '*') return '*';
  if (originEnv.includes(',')) {
    return originEnv.split(',').map((o) => o.trim());
  }
  return originEnv;
};

export const config = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: process.env.SUPABASE_URL || 'https://your-supabase-project.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  db: {
    connectionString: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'azene_wube_academy_super_secret_jwt_key_2026!',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origin: parseCorsOrigin(process.env.CLIENT_ORIGIN || '*'),
  },
  uploads: {
    imageDir: path.join(__dirname, '../../uploads/images'),
    videoDir: path.join(__dirname, '../../uploads/videos'),
    documentDir: path.join(__dirname, '../../uploads/documents'),
  },
};
