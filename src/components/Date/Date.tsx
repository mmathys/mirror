import React, { useState, useEffect } from "react"
import moment from "moment"
import "./Date.scss"

const formatDate = () => moment().format("ddd, D MMM")

function Clock() {
  let [date, setDate] = useState("")

  useEffect(() => {
    let prevS = moment().startOf("second")
    let diff = 1000 - moment().diff(prevS)
    setDate(formatDate())
    setTimeout(() => setInterval(() => setDate(formatDate()), 1000), diff)
  }, [])

  return (
    <div>
      <p className="date">{date}</p>
    </div>
  )
}

export default Clock
