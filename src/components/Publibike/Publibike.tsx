import React, { useState, useEffect } from "react"
import "./Publibike.scss"

interface StationData {
  vehicles: Vehicle[]
}

interface Vehicle {
  id: number
  ebike_battery_level: number
  type: {
    id: number
    name: number
  }
}

interface PublibikeProps {
  theme?: string
}

const url = "https://publibike.mmathys.workers.dev/"
const updateInterval = 2 * 60 * 1000

function Publibike(props: PublibikeProps) {
  let [data, setData] = useState<StationData | null>(null)
  let [vehicles, setVehicles] = useState<Vehicle[]>([])

  const fetchData = async () => {
    let res = await fetch(url)
    let data = await res.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
    setInterval(fetchData, updateInterval)
  }, [])

  useEffect(() => {
    if (!data) return
    let vehicles = data.vehicles
      .map((a) => {
        if (a.type.id === 1) {
          a.ebike_battery_level = 0
        }
        return a
      })
      .sort((a, b) => b.ebike_battery_level - a.ebike_battery_level)
    setVehicles(vehicles)
  }, [data])

  const bikes = vehicles.map((vehicle) => (
    <div key={vehicle.id} className={`vehicle ${props.theme === "light" && " light"}`}>
      <span>{vehicle.ebike_battery_level || ""}</span>
    </div>
  ))

  return (
    <div>
      <p className="title">Publibike Hegibachplatz</p>
      <div className="vehicle-container">{bikes}</div>
    </div>
  )
}

export default Publibike
