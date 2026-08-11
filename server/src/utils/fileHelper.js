import fs from 'fs/promises';
import path from 'path';

/**
 * Safely deletes a file from the filesystem if it exists.
 * Does not throw if file is already deleted or missing.
 */
export async function safeUnlink(filePath) {
  if (!filePath) return;
  try {
    const resolved = path.resolve(filePath);
    await fs.unlink(resolved);
    console.log(`🗑️ Deleted file from disk: ${resolved}`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`⚠️ Error deleting file ${filePath}:`, err.message);
    }
  }
}
