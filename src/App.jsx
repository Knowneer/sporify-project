import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app'>

        <div>

          <aside className='sidebar'>
            <div className='logo'>
              Spotify
            </div>

            <nav className='menu'>
              <button className='menuItem'>Home</button>
              <button className='menuItem'>Search</button>
              <button className='menuItem'>Library</button>
            </nav>
          </aside>

          <main className='main'>
            <h1>Home</h1>

            <div className='tracks'>
              <div className='track'>Track 1</div>
              <div className='track'>Track 2</div>
              <div className='track'>Track 3</div>
            </div>
          </main>
        </div>

        <footer className='player'>
          <div className='playerInfo'>
            <div className='playerTitle'>Nothing`s play</div>
            <div className='playerArtist'>-</div>
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
