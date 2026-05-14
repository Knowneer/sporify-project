import {useState, useEffect} from 'react'


export default function Search({ searchQuery,setCurrentTrack }) {
	const [results,setResults] = useState([])
	const [currentPage, setCurrentPage] = useState(1)



	useEffect(() => {
		if (!searchQuery.trim()){
			setResults([])
			setCurrentPage(1)
			return
		}

		fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&limit=40&media=music`)
		.then(response => response.json())
		.then(data => 
			setResults(data.results)
		)
		setCurrentPage(1)
	},[searchQuery])


	const tracksPerPage = 5
	const startIndex = (currentPage - 1) * tracksPerPage
	const endIndex = startIndex + tracksPerPage
	const visibleResults = results.slice(startIndex, endIndex)
	const totalPages = Math.ceil(results.length / tracksPerPage)

  return (
    <>
      {!searchQuery.trim() && <p>Type something...</p>}
			{searchQuery.trim() && results.length === 0 && <p>Nothing found</p>}
			<div className='tracks'>
				{visibleResults.map(track => (
					<div 
						key={track.trackId}
						className='track'
						onClick={() =>{setCurrentTrack(track)}}
					>
						<img
							className='trackCover'
							src={track.artworkUrl100}
							alt='cover'
						/>

						<div className='trackInfo'>
							<div className='trackTitle'>{track.trackName}</div>
							<div className='trackArtist'>{track.artistName}</div>
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