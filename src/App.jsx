import { useState, useRef, useEffect} from 'react'
import './App.css'
import {Routes, Route, NavLink, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'

function formatTime (time){
    if (!time || isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
} 

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration ] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const audioRef = useRef(null) 
  const navigate = useNavigate()


  return (
    <>
      <div className='app'>

        <div className='sidemain'>

          <aside className='sidebar'>
            <div className='logo'>
              KNOWNEER`s music
            </div>

            <nav className='menu'>
              <NavLink to='/' className="menuItem">
                Home
              </NavLink>
              <NavLink to='/library' className="menuItem">
                Library
              </NavLink>
            </nav>
          </aside>  

          



            <main className="main">
              <header className='topBar'>
                {!isSearchOpen ? (
                  <div className='searchPill' onClick={() => {
                      setIsSearchOpen(true)
                      navigate('/search')
                    }}>
                    Search songs..
                  </div>
                ) : (
                  <input 
                    value={searchQuery}
                    onChange={(e)=>{ 
                      setSearchQuery(e.target.value)
                      navigate('/search')
                    }}
                    className='searchInput'
                    placeholder='SearchSongs'
                    autoFocus

                  />
                )}
              </header>
              <Routes>
                <Route 
                path='/'
                element= {<Home setCurrentTrack={setCurrentTrack} />}
                />
                {/* <Route path="/search" element={<Search />} /> */}
                <Route path="/library" element={<Library />} />
                <Route 
                  path='/search'
                  element={<Search searchQuery={searchQuery} setCurrentTrack={setCurrentTrack}/>}
                />
              </Routes>
            </main>
        </div>

        <footer className='player'>
          <div className='playerCenter'>

            <div className='playerInfo'>
              <div className='playerTitle'>
                {currentTrack ? currentTrack.trackName : "No track selected"}
              </div>
              <div className='playerArtist'>
                {currentTrack ? currentTrack.artistName : "-"}
              </div>
            </div>

            <div className='progressBar'>
              <span className='timeText'>{formatTime(currentTime)}</span>

              <input
                className='progressInput'
                type='range'
                min='0'
                max={duration || 0}
                value={currentTime}
                step='0.01'
                onChange={(e) => {
                  if (!audioRef.current) return

                  const newTime = Number(e.target.value)
                  audioRef.current.currentTime = newTime
                  setCurrentTime(newTime)
                }}
              />

              <span className='timeText'>{formatTime(duration)}</span>
            </div>

            <div className='playerControls'>
              <button>⏮</button>
              <button 
                onClick={() => {
                  if (!audioRef.current) return
                  if(isPlaying){
                    audioRef.current.pause()
                  } else {
                    audioRef.current.play()
                  }
                }}
              > 
              { isPlaying ? "⏸" : "▶️"}
              </button>
              <button>⏭</button>
            </div>
            {currentTrack && (
              <audio
                key={currentTrack.previewUrl}
                src={currentTrack.previewUrl}
                autoPlay
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={()=>{
                  setCurrentTime(audioRef.current.currentTime)
                }}
                onLoadedMetadata={()=>{
                  if (!audioRef.current) return
                  setDuration(audioRef.current.duration)
                  setCurrentTime(0)
                }}
              />
            )}
          </div>

        </footer>
      </div>
    </>
  )
}

export default App
