import React from "react"
import { useDatabase, useDatabaseObjectData } from "reactfire"
import "./NowPlaying.scss"

interface NowPlaying {
  artist: string
  track: string
  image: string
  displayName?: string
  playing: boolean
}

interface NowPlayingProps {
  theme?: string
}

function key(np: NowPlaying) {
  if (!np) return ""
  return np.artist + np.track + np.image
}

function NowPlaying(props: NowPlayingProps) {
  const ref = useDatabase().ref("nowPlaying")
  const { data } = useDatabaseObjectData<{ [room: string]: NowPlaying }>(ref)

  let content = Object.keys(data)
    .filter((key) => key !== "NO_ID_FIELD")
    .map((i) => ({ displayName: i, ...data[i] }))
    .filter((np) => np.playing)
    .map((np: NowPlaying) => (
      <div key={key(np)} className="sonos-entry">
        <div className="track-information">
          <img src={np.image} alt="album art" />
          <div className="data">
            <p>{np.track}</p>
            <p>{np.artist}</p>
          </div>
        </div>
        <div className="room-information">
          <p>{np.displayName}</p>
        </div>
      </div>
    ))

  return (
    <div>
      <div className={`now-playing ${props.theme === "light" && "light"}`}>{content}</div>
    </div>
  )
}

export default NowPlaying
