import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=linkedin_auth_failed`)
  }
  
  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
        redirect_uri: `${origin}/api/auth/linkedin/callback`,
      }),
    })
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token')
    }
    
    const { access_token } = await tokenResponse.json()
    
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!profileResponse.ok) {
      throw new Error('Failed to get user profile')
    }
    
    const profile = await profileResponse.json()
    
    const userData = encodeURIComponent(JSON.stringify({
      email: profile.email,
      fullName: profile.name,
      picture: profile.picture,
      sub: profile.sub,
    }))
    
    return NextResponse.redirect(`${origin}/auth/linkedin-callback?data=${userData}`)
  } catch (error) {
    console.error('LinkedIn auth error:', error)
    return NextResponse.redirect(`${origin}/login?error=linkedin_auth_failed`)
  }
}
