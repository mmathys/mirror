import React, { useState, useEffect } from "react"
import { useDatabase, useDatabaseObjectData } from "reactfire"
import "./NowPlaying.scss"

interface NowPlaying {
  artist: string
  track: string
  image: string
}

interface NowPlayingProps {
  theme?: string
}

function NowPlaying(props: NowPlayingProps) {
  const ref = useDatabase().ref("nowPlaying")
  const { status, data } = useDatabaseObjectData<NowPlaying>(ref)

  //const { status, data } = useFire

  return (
    <div>
      <div className={`nowPlaying ${props.theme === "light" && " light"}`}>
        <img src={data.image} alt="album art" />
        <div className="nowPlaying__information">
          <p className="track">{data.track}</p>
          <p className="artist">{data.artist}</p>
        </div>
      </div>
    </div>
  )
}

export default NowPlaying
