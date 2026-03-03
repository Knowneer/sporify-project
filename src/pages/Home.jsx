import Search from '../pages/Search'

export default function Home({ tracks, setCurrentTrack }) {
  return (
    <>
      <h1>Home</h1>
      <div className="tracks">
        {tracks.map(track => (
          <div
            key={track.id}
            className="track"
            onClick={() => setCurrentTrack(track)}
          >
						<div className="trackTitle">{track.title}</div>
						<div className="trackArtist">{track.artist}</div>
          </div>
        ))}
      </div>
    </>
  )
}
