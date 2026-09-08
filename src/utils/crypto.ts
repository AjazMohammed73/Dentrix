/**
 * Utility to hash passwords using standard Web Cryptography API (SHA-256 with salt)
 */
export async function hashPassword(password: string, salt: string = 'dentrix_salt_2026'): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + ':' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, expectedHash?: string, salt: string = 'dentrix_salt_2026'): Promise<boolean> {
  if (!expectedHash) {
    // If user has no hash configured yet (demo fallback), allow default demo password
    return password === 'Password123!' || password === 'admin' || password === 'dentrix';
  }
  const computed = await hashPassword(password, salt);
  return computed === expectedHash;
}
