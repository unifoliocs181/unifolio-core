# Unifolio Test Suite Documentation

## Overview

This document provides comprehensive information about the test suite for the Unifolio project. The test suite covers all major features including authentication, OAuth integration, AI-powered resume generation, and end-to-end workflows.

## Test Structure

```
__tests__/
├── auth.test.ts           # Authentication tests (Sign In, Sign Up, Sign Out)
├── oauth.test.ts          # OAuth integration tests (GitHub, LinkedIn)
├── openai.test.ts         # OpenAI API integration tests
├── e2e.test.ts            # End-to-end integration tests
├── setup.ts               # Jest configuration and global utilities
└── fixtures/              # Test data and mocks
```

## Running Tests

### Install Dependencies

First, install Jest and required dependencies:

```bash
npm install --save-dev jest ts-jest @types/jest
```

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test auth.test.ts
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

## Feature Test Coverage

### 1. Authentication Tests (`auth.test.ts`)

#### Sign In Tests
- ✅ Successfully sign in with valid credentials
- ✅ Reject invalid email format
- ✅ Reject wrong password
- ✅ Reject when user not found
- ✅ Reject empty email/password
- ✅ Remember user when "Remember me" is checked

#### Sign Up Tests
- ✅ Create new user account successfully
- ✅ Reject invalid email format
- ✅ Reject when email already exists
- ✅ Reject weak password
- ✅ Reject when user doesn't agree to terms

#### Sign Out Tests
- ✅ Successfully sign out current user
- ✅ Clear stored user data
- ✅ Redirect to login page

#### Password Reset Tests
- ✅ Send password reset email
- ✅ Fail for non-existent email

### 2. OAuth Integration Tests (`oauth.test.ts`)

#### GitHub OAuth
- ✅ Initiate GitHub OAuth login
- ✅ Handle successful authentication callback
- ✅ Exchange authorization code for access token
- ✅ Reject invalid auth code
- ✅ Handle GitHub API errors gracefully
- ✅ Save GitHub user data to database
- ✅ Update last sign in timestamp

#### LinkedIn OAuth
- ✅ Initiate LinkedIn OAuth login
- ✅ Handle successful authentication callback
- ✅ Exchange authorization code for access token
- ✅ Fetch LinkedIn profile data
- ✅ Handle LinkedIn API errors gracefully
- ✅ Save LinkedIn user data to database
- ✅ Populate resume from LinkedIn profile

#### OAuth Common Flows
- ✅ Link multiple OAuth providers to same account
- ✅ Handle email mismatch between providers
- ✅ Revoke OAuth access on sign out

### 3. OpenAI API Integration Tests (`openai.test.ts`)

#### API Initialization
- ✅ Initialize OpenAI client with valid API key
- ✅ Reject missing API key
- ✅ Validate API key format

#### Resume Generation
- ✅ Generate resume content from LinkedIn data
- ✅ Generate professional summary
- ✅ Enhance bullet points with AI
- ✅ Suggest resume improvements
- ✅ Handle rate limiting
- ✅ Handle token limit exceeded
- ✅ Retry failed API calls
- ✅ Validate generated content

#### Content Enhancement
- ✅ Improve writing quality
- ✅ Generate multiple variations
- ✅ Maintain consistency in tone
- ✅ Handle special characters and formatting

#### Error Handling
- ✅ Handle network errors
- ✅ Handle authentication errors
- ✅ Handle timeout errors
- ✅ Provide user-friendly error messages
- ✅ Log errors for debugging

#### Performance & Optimization
- ✅ Cache generation results
- ✅ Handle concurrent requests
- ✅ Track API usage
- ✅ Implement client-side rate limiting

### 4. End-to-End Integration Tests (`e2e.test.ts`)

#### User Registration & Resume Generation
- ✅ Complete signup to resume generation flow
- ✅ Handle user preferences and settings

#### Resume Management
- ✅ Create multiple resumes
- ✅ Persist resume changes to database
- ✅ Generate PDF from resume data

#### Error Recovery
- ✅ Handle session timeout
- ✅ Recover from failed API calls
- ✅ Preserve user data on errors

#### LinkedIn Integration
- ✅ Sync LinkedIn profile data
- ✅ Customize synced data
- ✅ Maintain data consistency

#### GitHub Integration
- ✅ Populate profile from GitHub data
- ✅ Include GitHub projects in portfolio

#### AI-Powered Content
- ✅ Generate professional bullet points
- ✅ Suggest ATS optimization keywords
- ✅ Validate resume completeness

#### Download & Export
- ✅ Generate downloadable PDF
- ✅ Handle large PDF generation
- ✅ Preserve formatting in PDF

#### Account Management
- ✅ Allow profile editing
- ✅ Handle account deletion
- ✅ Maintain audit log of changes

## Test Utilities

### Global Mock Functions

The test suite provides global utilities for creating mock objects:

```typescript
// Create mock user
const mockUser = global.createMockUser({
  email: 'custom@example.com',
  displayName: 'Custom User',
})

// Create mock resume
const mockResume = global.createMockResume({
  title: 'Custom Resume',
  template: 'classic',
})
```

### Environment Variables

The test suite automatically sets these environment variables:

```
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET
OPENAI_API_KEY
NEXTAUTH_URL
FIREBASE_API_KEY
FIREBASE_PROJECT_ID
FIREBASE_AUTH_DOMAIN
```

## Best Practices

### Writing Tests

1. **Use Descriptive Names**: Test names should clearly describe what is being tested
   ```typescript
   it('should successfully sign in with valid credentials', async () => {
     // test code
   })
   ```

2. **Follow AAA Pattern**: Arrange, Act, Assert
   ```typescript
   it('should test something', () => {
     // Arrange
     const input = 'test'
     
     // Act
     const result = processInput(input)
     
     // Assert
     expect(result).toBe('expected')
   })
   ```

3. **Use beforeEach/afterEach**: Clean up test state
   ```typescript
   beforeEach(() => {
     jest.clearAllMocks()
   })
   ```

4. **Mock External Dependencies**: Don't make real API calls
   ```typescript
   const mockApiCall = jest.fn().mockResolvedValue({ data: 'test' })
   ```

### Running Tests in CI/CD

Add to your CI/CD pipeline:

```bash
# Run tests with coverage
npm test -- --coverage --ci --maxWorkers=2

# Upload coverage to code coverage service
# Example for codecov
bash <(curl -s https://codecov.io/bash) -f ./coverage/coverage-final.json
```

## Coverage Goals

The test suite aims for:
- **Line Coverage**: 70%+
- **Branch Coverage**: 70%+
- **Function Coverage**: 70%+
- **Statement Coverage**: 70%+

Current coverage can be viewed by running:

```bash
npm test -- --coverage
```

## Troubleshooting

### Tests Not Running

1. Ensure Jest is installed: `npm install --save-dev jest ts-jest`
2. Check jest.config.js exists and is properly configured
3. Verify TypeScript configuration in tsconfig.json

### Timeout Errors

Increase test timeout in jest.config.js:
```javascript
testTimeout: 30000, // 30 seconds
```

### Mock Issues

Clear mocks between tests:
```typescript
afterEach(() => {
  jest.clearAllMocks()
})
```

## Continuous Integration

The test suite is designed to run in CI environments. Add this to your CI configuration:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: npm test -- --coverage --ci
  
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Test Maintenance

- Update tests when features change
- Add tests for bug fixes
- Remove deprecated test cases
- Review coverage reports regularly
- Keep mocks up-to-date with API changes

## Related Documentation

- [Jest Documentation](https://jestjs.io/)
- [Firebase Testing Guide](https://firebase.google.com/docs/testing)
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass locally
3. Maintain or improve code coverage
4. Document any new test patterns or utilities
5. Submit tests with your PR

## Contact

For questions about the test suite, please contact the development team or open an issue in the repository.
