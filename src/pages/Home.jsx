import {useState, useEffect} from "react"


export default function Home({ setCurrentTrack }) {
  const [tracks,setTracks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  function loadRandomTracks (){
  const randomTerms = [
  "rock", "pop", "hiphop", "indie", "jazz",
  "drake", "eminem", "weeknd", "kendrick", "rihanna",
  "love", "night", "summer", "dream", "dance"
  ]
    const randomIndex = Math.floor(Math.random() * randomTerms.length)
    const randomTerm = randomTerms[randomIndex]
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomTerm)}&limit=40&media=music`)
    .then(response => response.json())
    .then(data =>{
      setTracks(data.results)
      setCurrentPage(1)
      console.log(data);
    })
}

  useEffect(()=>{
    loadRandomTracks()
  },[])

  const tracksPerPage = 5
  const startIndex = (currentPage - 1) * tracksPerPage
  const endIndex = startIndex + tracksPerPage
  const visibleTracks = tracks.slice(startIndex, endIndex)
  const totalPages = Math.ceil(tracks.length / tracksPerPage)


  return (
    <>
      <div className="homeHeader">
        <h1>Home</h1>
        <button className="refreshButton" onClick={loadRandomTracks}>
          Refresh
        </button>
      </div>

      <div className="tracks">
        {visibleTracks.map(track => (
          <div
            key={track.trackId}
            className="track"
            onClick={() => setCurrentTrack(track)}
          >
            <img
              className='trackCover'
              src={track.artworkUrl100}
              alt='cover'
            />
            <div className='  trackInfo'>
						  <div className="trackTitle">{track.trackName}</div>
						  <div className="trackArtist">{track.artistName}</div>
            </div>
          </div>
        ))}
      </div>

			{totalPages > 1 &&(
			<div className='pagination'>
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled = {currentPage === 1}
				>
					Prev
				</button>

				<span>
					Page {currentPage} of {totalPages || 1}
				</span>

				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled = {currentPage === totalPages || totalPages === 0}
				>
					Next
				</button>
			</div>
			)}

    </>
  )
}
