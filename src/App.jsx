import { useState } from 'react'
import './App.css'
import {Routes, Route, NavLink} from 'react-router-dom'
import Home from './pages/Home'
// import Search from './pages/Search'
import Library from './pages/Library'


function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)



  const tracks =[
    {id:1, title: 'NEW SONG', artist:'KNOWNEER' },
    {id:2, title: 'ДОМ', artist:'MORGENSHTERN' },
    {id:3, title: 'Track 3', artist:'Unknown' },
  ]



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
              {/* <NavLink to='/search' className="menuItem">
                Search
              </NavLink> */}
            </nav>
          </aside>  

          



            <main className="main">
              <header className='topBar'>
                {!isSearchOpen ? (
                  <div className='searchPill' onClick={() => {setIsSearchOpen(true)}}>
                    Search songs..
                  </div>
                ) : (
                  <input 
                    className='searchInput'
                    placeholder='SearchSongs'
                    autoFocus
                    onBlur={() => {setIsSearchOpen(false)}}
                  />
                )}
              </header>
              <Routes>
                <Route 
                path='/'
                element= {<Home tracks={tracks} setCurrentTrack={setCurrentTrack} />}
                />
                {/* <Route path="/search" element={<Search />} /> */}
                <Route path="/library" element={<Library />} />
              </Routes>
            </main>
        </div>

        <footer className='player'>
          <div className='playerInfo'>
            <div className='playerTitle'>
              {currentTrack ? currentTrack.title : "Nothing`s play"}
            </div>
            <div className='playerArtist'>
              {currentTrack ? currentTrack.artist : "-"}
            </div>
          </div>

          <div className='playerControls'>
            <button>⏮</button>
            <button>▶️</button>
            <button>⏭</button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
