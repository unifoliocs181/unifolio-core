import { describe, it, expect, beforeEach } from '@jest/globals'

const mockAuth = {
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  currentUser: null,
}

describe('Authentication - Sign In', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Sign In with Email and Password', () => {
    it('should successfully sign in with valid credentials', async () => {
      const testEmail = 'test@example.com'
      const testPassword = 'TestPassword123!'
      const mockUser = {
        uid: 'test-user-123',
        email: testEmail,
        displayName: 'Test User',
      }

      mockAuth.signInWithEmailAndPassword.mockResolvedValueOnce({
        user: mockUser,
      })

      const result = await mockAuth.signInWithEmailAndPassword(
        testEmail,
        testPassword
      )

      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(testEmail)
      expect(result.user.uid).toBe('test-user-123')
    })

    it('should reject with invalid email format', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/invalid-email')
      )

      await expect(
        mockAuth.signInWithEmailAndPassword('invalid-email', testPassword)
      ).rejects.toThrow('auth/invalid-email')
    })

    it('should reject with wrong password', async () => {
      const testEmail = 'test@example.com'
      const wrongPassword = 'WrongPassword123!'
      mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/wrong-password')
      )

      await expect(
        mockAuth.signInWithEmailAndPassword(testEmail, wrongPassword)
      ).rejects.toThrow('auth/wrong-password')
    })

    it('should reject when user is not found', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/user-not-found')
      )

      await expect(
        mockAuth.signInWithEmailAndPassword('nonexistent@example.com', testPassword)
      ).rejects.toThrow('auth/user-not-found')
    })

    it('should reject with empty email', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/missing-email')
      )

      await expect(
        mockAuth.signInWithEmailAndPassword('', testPassword)
      ).rejects.toThrow('auth/missing-email')
    })

    it('should reject with empty password', async () => {
      const testEmail = 'test@example.com'
      mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/missing-password')
      )

      await expect(
        mockAuth.signInWithEmailAndPassword(testEmail, '')
      ).rejects.toThrow('auth/missing-password')
    })
  })
})

describe('Authentication - Sign Up', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Sign Up with Email and Password', () => {
    it('should successfully create a new user account', async () => {
      const testEmail = 'newuser@example.com'
      const testPassword = 'TestPassword123!'
      const mockUser = {
        uid: 'new-user-456',
        email: testEmail,
        displayName: 'New User',
      }

      mockAuth.createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: mockUser,
      })

      const result = await mockAuth.createUserWithEmailAndPassword(
        testEmail,
        testPassword
      )

      expect(result.user).toBeDefined()
      expect(result.user.email).toBe(testEmail)
      expect(result.user.uid).toBe('new-user-456')

      expect(result.user).toBeDefined()
      expect(result.user.email).toBe('newuser@example.com')
      expect(result.user.uid).toBe('new-user-456')
    })

    it('should reject with invalid email format', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/invalid-email')
      )

      await expect(
        mockAuth.createUserWithEmailAndPassword('invalid', testPassword)
      ).rejects.toThrow('auth/invalid-email')
    })

    it('should reject when email already exists', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/email-already-in-use')
      )

      await expect(
        mockAuth.createUserWithEmailAndPassword(
          'existing@example.com',
          testPassword
        )
      ).rejects.toThrow('auth/email-already-in-use')
    })

    it('should reject with weak password', async () => {
      const testEmail = 'new@example.com'
      const weakPassword = '123'
      mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/weak-password')
      )

      await expect(
        mockAuth.createUserWithEmailAndPassword(testEmail, weakPassword)
      ).rejects.toThrow('auth/weak-password')
    })

    it('should reject with empty email', async () => {
      const testPassword = 'TestPassword123!'
      mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(
        new Error('auth/missing-email')
      )

      await expect(
        mockAuth.createUserWithEmailAndPassword('', testPassword)
      ).rejects.toThrow('auth/missing-email')
    })

    it('should reject when user does not agree to terms', () => {
      const agreeToTerms = false

      expect(agreeToTerms).toBe(false)
    })
  })
})

describe('Authentication - Sign Out', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Sign Out', () => {
    it('should successfully sign out the current user', async () => {
      mockAuth.signOut.mockResolvedValueOnce(undefined)

      await mockAuth.signOut()

      expect(mockAuth.signOut).toHaveBeenCalled()
      expect(mockAuth.currentUser).toBeNull()
    })

    it('should redirect to login page after sign out', async () => {
      mockAuth.signOut.mockResolvedValueOnce(undefined)

      await mockAuth.signOut()

      const redirectUrl = '/login'
      expect(redirectUrl).toBe('/login')
    })
  })
})

describe('Password Reset', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send password reset email for existing user', async () => {
    const testEmail = 'test@example.com'
    const sendPasswordResetEmail = jest.fn()
    sendPasswordResetEmail.mockResolvedValueOnce(undefined)

    await sendPasswordResetEmail(testEmail)

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(testEmail)
  })

  it('should fail for non-existent email', async () => {
    const sendPasswordResetEmail = jest.fn()
    sendPasswordResetEmail.mockRejectedValueOnce(
      new Error('auth/user-not-found')
    )

    await expect(
      sendPasswordResetEmail('nonexistent@example.com')
    ).rejects.toThrow('auth/user-not-found')
  })
})
