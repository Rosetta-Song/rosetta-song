import { json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Token API route called');
  
  // Parse cookies from request
  const cookieHeader = request.headers.get('Cookie');
  const cookies = cookieHeader ? Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return [name, decodeURIComponent(value || '')];
    })
  ) : {};
  
  // Get token from cookie
  const token = cookies['spotify-access-token'] || '';
  
  return json(
    { token }, 
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// No default export needed for API routes in Remix
