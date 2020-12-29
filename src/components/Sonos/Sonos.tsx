import React, { Suspense } from "react"
import NowPlaying from "./NowPlaying/NowPlaying"
import "./Sonos.scss"

interface SonosProps {
  theme?: string
}

function Sonos(props: SonosProps) {
  return (
    <div className={`sonos ${props.theme === "light" ? "light" : ""}`}>
      <Suspense fallback={<p className="loading">Loading...</p>}>
        <NowPlaying theme={props.theme}></NowPlaying>
      </Suspense>
    </div>
  )
}

export default Sonos
