import React, { useState, useEffect } from "react"
import moment from "moment"
import "./Clock.scss"

const formatTime = () => moment().format("HH:mm")

function Clock() {
  let [time, setTime] = useState("")

  useEffect(() => {
    let prevS = moment().startOf("second")
    let diff = 1000 - moment().diff(prevS)
    setTime(formatTime())
    setTimeout(() => setInterval(() => setTime(formatTime()), 1000), diff)
  }, [])

  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}

export default Clock
