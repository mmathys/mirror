import React, { useState, useEffect, Suspense } from "react"
import { useDatabase, useFirestoreDocData } from "reactfire"
import NowPlaying from "./NowPlaying/NowPlaying"
import "./Sonos.scss"

interface SonosProps {
  theme?: string
}

function Sonos(props: SonosProps) {
  return (
    <div>
      <div className={`${props.theme === "light" && " light"}`}>
        <p>Sonos</p>
        <Suspense fallback="Loading...">
          <NowPlaying></NowPlaying>
        </Suspense>
      </div>
    </div>
  )
}

export default Sonos
