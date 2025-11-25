/**
 * Jest Test Setup
 * Global test configuration and utilities
 */

// Mock environment variables
process.env.GITHUB_CLIENT_ID = 'test-github-client-id'
process.env.GITHUB_CLIENT_SECRET = 'test-github-secret'
process.env.LINKEDIN_CLIENT_ID = 'test-linkedin-client-id'
process.env.LINKEDIN_CLIENT_SECRET = 'test-linkedin-secret'
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.FIREBASE_API_KEY = 'test-firebase-key'
process.env.FIREBASE_PROJECT_ID = 'test-project'
process.env.FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com'

// Global test utilities
global.createMockUser = (overrides = {}) => ({
  uid: 'test-uid',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
  ...overrides,
})

global.createMockResume = (overrides = {}) => ({
  id: 'resume-123',
  userId: 'test-uid',
  title: 'Test Resume',
  content: 'Test content',
  template: 'modern',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

global.localStorage = localStorageMock as any

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

global.sessionStorage = sessionStorageMock as any
