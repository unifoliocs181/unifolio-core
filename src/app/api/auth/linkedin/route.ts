import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const redirectUri = `${request.nextUrl.origin}/api/auth/linkedin/callback`
  
  if (!clientId) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login?error=linkedin_not_configured`)
  }
  
  const scope = 'openid profile email'
  const state = Math.random().toString(36).substring(7)
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`
  
  return NextResponse.redirect(authUrl)
}
