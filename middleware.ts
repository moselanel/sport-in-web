import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const authorization = req.headers.get('authorization')

  if (authorization?.startsWith('Basic ')) {
    try {
      const encodedCredentials = authorization.slice('Basic '.length)
      const decodedCredentials = atob(encodedCredentials)
      const separatorIndex = decodedCredentials.indexOf(':')

      if (separatorIndex !== -1) {
        const user = decodedCredentials.slice(0, separatorIndex)
        const password = decodedCredentials.slice(separatorIndex + 1)

        if (user === process.env.SITE_USER && password === process.env.SITE_PASSWORD) {
          return NextResponse.next()
        }
      }
    } catch {
      // Treat malformed authorization headers as unauthenticated requests.
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
