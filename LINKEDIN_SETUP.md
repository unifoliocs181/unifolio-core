# LinkedIn OAuth Setup Guide

## Prerequisites
You need to create a LinkedIn App and get OAuth credentials.

## Steps to Enable LinkedIn Login

### 1. Create a LinkedIn App
1. Go to https://www.linkedin.com/developers/apps
2. Click **"Create app"**
3. Fill in the required information:
   - App name: `Unifolio`
   - LinkedIn Page: Select your company page or create one
   - App logo: Upload your logo
   - Legal agreement: Check the box
4. Click **"Create app"**

### 2. Configure OAuth Settings
1. In your LinkedIn app, go to the **"Auth"** tab
2. Add **Authorized redirect URLs**:
   - For development: `http://localhost:3000/api/auth/linkedin/callback`
   - For production: `https://yourdomain.com/api/auth/linkedin/callback`
3. Under **"OAuth 2.0 scopes"**, request:
   - `openid`
   - `profile`
   - `email`

### 3. Get Your Credentials
1. In the **"Auth"** tab, find:
   - **Client ID**
   - **Client Secret** (click "Show" to reveal it)

### 4. Add Environment Variables
1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Add your credentials:
```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
```

### 5. Test the Integration
1. Restart your development server: `npm run dev`
2. Go to login or signup page
3. Click "Login with LinkedIn" button
4. You should be redirected to LinkedIn for authorization

## Troubleshooting

### Common Issues:
- **"Redirect URI mismatch"**: Make sure the redirect URI in LinkedIn app matches exactly `http://localhost:3000/api/auth/linkedin/callback`
- **"Invalid credentials"**: Double-check your Client ID and Client Secret in `.env.local`
- **"Scope not authorized"**: Make sure you requested `openid`, `profile`, and `email` scopes in LinkedIn app settings

## Security Notes
- **Never commit** `.env.local` file to git
- Keep your Client Secret secure
- Use different credentials for development and production
- Regularly rotate your credentials

## Production Deployment
When deploying to production:
1. Add production redirect URL to LinkedIn app
2. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
3. Test the flow in production environment
