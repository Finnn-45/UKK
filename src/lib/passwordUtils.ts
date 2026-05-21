import bcrypt from 'bcryptjs'

const BCRYPT_ROUNDS = 8 // Reduced from 10 untuk faster verification

/**
 * Hash password dengan bcryptjs
 * Cost factor 8 = fast enough but still secure
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, BCRYPT_ROUNDS)
  } catch (error) {
    throw new Error('Failed to hash password')
  }
}

/**
 * Verify password terhadap hash
 * Dengan timeout untuk mencegah hanging
 */
export async function verifyPassword(
  password: string,
  hash: string,
  timeoutMs: number = 8000
): Promise<boolean> {
  try {
    // Race antara verify dan timeout
    const result = await Promise.race([
      bcrypt.compare(password, hash),
      new Promise<boolean>((_, reject) =>
        setTimeout(
          () => reject(new Error('Password verification timeout')),
          timeoutMs
        )
      )
    ])
    
    return result as boolean
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
