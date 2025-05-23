// Remix App:
import { useLocation, useNavigate, } from "@remix-run/react";
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Player } from './Player';
import { Connect } from './Connect';


const STATE = 'state';
const ACCESS_TOKEN = 'access_token';
const EXPIRES_IN = 'expires_in';
const EXPIRES_AT = 'expires_at';
const SCOPE = 'streaming user-read-email user-read-private';

export const AuthContext = createContext<string | undefined>(undefined);

interface Props {
  children: ReactNode;
  SPOTIFY_CLIENT_ID: string;
}
export const Auth = (props: Props) => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  const router = useNavigate();
  const [token, setToken] = useState('');
  const { SPOTIFY_CLIENT_ID } = props;

  useEffect(() => {
    const cb = async () => {
      const storedToken = localStorage.getItem(ACCESS_TOKEN);
      const storedState = localStorage.getItem(STATE);
      const expiresAt = localStorage.getItem(EXPIRES_AT);
      const expired = expiresAt ? new Date() >= new Date(expiresAt) : true;

      // found an implicit flow token
      if (storedToken && !expired && storedState) {
        setToken(storedToken);
        return;
      }

      try {
        const tokenResponse = await fetch('/api/auth/token');
        const { token: cookieToken }: { token: string } =
          await tokenResponse.json();
        console.log('Token from cookie:', cookieToken);
        // found an auth code flow token
        if (cookieToken) {
          setToken(cookieToken);
          return;
        }

        if (window.location.hash) {
          const params = new URLSearchParams(
            window.location.hash.replace('#', '?'),
          );
          const token = params.get(ACCESS_TOKEN);
          const expiresIn = parseInt(params.get(EXPIRES_IN) || '0', 10); // seconds
          const state = params.get(STATE);
          if (state !== localStorage.getItem(STATE)) {
            throw new Error('State mismatch');
          }
          const expiresAt = new Date(
            new Date().getTime() + expiresIn * 1000,
          ).toISOString();

          if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
          }
          localStorage.setItem(EXPIRES_AT, expiresAt);
          // cleanup url
          router('/');
        }

        if (window.location.search) {
          const params = new URLSearchParams(window.location.search);
          if (params.has('error')) {
            throw new Error(params.get('error') || 'Unknown error');
          }
        }
      } catch (err) {
        console.error(err);
        
      }
    };
    cb();
  }, [router]);

  const handleClick = async (flow: 'implicit' | 'code') => {
   
    let response_type = '';
    let redirect_uri = '';
    
    if (flow === 'implicit') {
      await fetch('/api/auth/deleteCookie');
      response_type = 'token';
      redirect_uri = 'http://127.0.0.1:3000';
    }

    if (flow === 'code') {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(EXPIRES_AT);
      response_type = 'code';
      redirect_uri = 'https://6fab-64-226-182-42.ngrok-free.app/api/auth/callback';
    }

    // generate random string
    const state = ((length: number) => {
      let text = '';
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    })(16);

    localStorage.setItem(STATE, state);

    if (!SPOTIFY_CLIENT_ID) {
      throw new Error('Spotify Client ID is not defined');
    }

    const params = new URLSearchParams({
      response_type,
      client_id: SPOTIFY_CLIENT_ID,
      scope: SCOPE,
      redirect_uri,
      state,
    });

    const url = `https://accounts.spotify.com/authorize/?${params.toString()}`;
    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(STATE);
    setToken('');
    router('/');
  };

  if (!token) {
    return (
      <div >
             <div className="static">
            <div className="absolute top-20 left-220">   </div>
            <div  style={{ display: isIndexPage ?  "flex" : "none"  }} className="button-container absolute top-6 left-18">
              <a href="./premium" className="text-blue-600 visited:text-purple-600">Premium</a>
              <span className="mx-2">&nbsp;</span>
              <a href="./support" className="text-blue-600 visited:text-purple-600">Support</a>
             </div>
            <span className="mx-2">&nbsp;</span>
            
              <div className="button-container absolute top-2 right-20">
                  <button onClick={() => handleClick('code')} className="transform motion-safe:hover:scale-110 ">
                   Login code
                </button>
                <span className="mx-2" >&nbsp;</span>
                <button onClick={() => handleClick('implicit')} className="transform hover:scale-110 motion-reduce:transform-none">
                   Login token
                </button>
           
              </div>
            
         </div>
   
      </div>
      
    );
  }

  return (
    <AuthContext.Provider value={token}>
      <button onClick={handleLogout} className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
      <Player token={token}>
                    <Connect />
                  </Player>
      {props.children}
    </AuthContext.Provider>
  );
};
