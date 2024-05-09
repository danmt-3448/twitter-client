import 'vidstack/styles/community-skin/video.css'
import 'vidstack/styles/defaults.css'
import './App.css'
import { Link } from 'react-router-dom'
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster
} from '@vidstack/react'
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' '),
    prompt: 'consent',
    access_type: 'offline'
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}
const googleOAuthUrl = getGoogleAuthUrl()


export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  const profile = JSON.parse(localStorage.getItem('profile')) || {}
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }
  return (
    <>

      {/*<div>Static video</div>
     <video controls width={500} height={500}>
        <source src="http://localhost:4000/static/video/6eea9d07febd73ce648b19200.mp4" ></source>
      </video> */}

      {/* <div>Static stream</div>
      <video controls width={500} height={500}>
        <source src="http://localhost:4000/static/video/da80932b9fed97c564f288c00.mp4" ></source>
      </video> */}

      {/* <div>
        HLS streaming
      </div>
      <MediaPlayer
        title='Sprite Fight'
        // src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
        src={"http://localhost:4000/static/video-hls/B_6Ztg_hRv_2LD-PvIUxQ/master.m3u8"}
        // poster='https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980'
        // thumbnails='https://media-files.vidstack.io/sprite-fight/thumbnails.vtt'
        aspectRatio={16 / 9}
        crossorigin=''
      >
        <MediaOutlet>
          <MediaPoster alt='Girl walks into sprite gnomes around her friend on a campfire in danger!' />
          <track
            src='https://media-files.vidstack.io/sprite-fight/subs/english.vtt'
            label='English'
            srcLang='en-US'
            kind='subtitles'
            default
          />
          <track
            src='https://media-files.vidstack.io/sprite-fight/chapters.vtt'
            srcLang='en-US'
            kind='chapters'
            default
          />
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer> */}

      <p className='read-the-docs'>
        {isAuthenticated ? (
          <>
            <span>
              Hello my <strong>{profile.email}</strong>, you are logged in.
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with Google</Link>
        )}
      </p>
    </>
  )
}
