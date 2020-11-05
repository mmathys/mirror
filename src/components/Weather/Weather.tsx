import React, { useState, useEffect } from "react"
import Chart from "chart.js"
import "./Weather.scss"

interface WeatherDay {
  currentTime: number
  max_date: number
  min_date: number
  rainfall: number[][]
  temperature: number[][]
}

interface WeatherProps {
  theme?: string
}

const updateInterval = 10 * 60 * 1000

const sleep: any = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Weather({ theme }: WeatherProps) {
  if (!theme) {
    theme = "dark"
  } else if (!["light", "dark"].includes(theme)) {
    console.error("theme must be 'light' or 'dark', got:", theme)
  }

  let [data, setData] = useState<WeatherDay[] | null>(null)
  let [chart, setChart] = useState<Chart | null>(null)
  let [chartRef, setChartRef] = useState<HTMLCanvasElement | null>(null)
  let [timedOut, setTimedOut] = useState(false)

  const fetchData = async () => {
    let res = await Promise.race([sleep(10 * 1000), fetch("https://meteo.mmathys.workers.dev/")])
    if (!res) {
      console.log("timeout")
      setTimedOut(true)
      return
    } else setTimedOut(false)
    let data = await res.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
    setInterval(fetchData, updateInterval)
  }, [])

  useEffect(() => {
    if (chartRef === null) return

    let gradient = chartRef.getContext("2d")?.createLinearGradient(0, 500, 0, 100)
    if (gradient) {
      gradient.addColorStop(1, "transparent")
      gradient.addColorStop(0, "transparent")
    } else {
      console.error("gradient is undefined")
    }

    let ticks = {
      fontColor: theme === "dark" ? "white" : "black",
      fontFamily: "SFPro",
      fontSize: 18,
    }

    let chart = new Chart(chartRef, {
      type: "line",
      data: {
        datasets: [
          {
            type: "line",
            borderColor: theme === "dark" ? "white" : "black",
            fill: true,
            backgroundColor: gradient,
            pointRadius: 0,
            data: [],
            yAxisID: "temperature",
          },
          {
            type: "bar",
            borderColor: theme === "dark" ? "white" : "black",
            backgroundColor: theme === "dark" ? "white" : "black",
            data: [],
            yAxisID: "rainfall",
          },
        ],
      },
      options: {
        layout: {},
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              ticks: {
                ...ticks,
                padding: 10,
                maxRotation: 0,
                maxTicksLimit: 4,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              id: "temperature",
              type: "linear",
              ticks: { ...ticks, maxTicksLimit: 5, padding: 20 },
            },
            {
              id: "rainfall",
              type: "linear",
              display: false,
              ticks: {
                min: 0,
                max: 6,
              },
            },
          ],
        },
      },
    })
    setChart(chart)
  }, [chartRef, theme])

  useEffect(() => {
    if (!data || !chart) return
    let offset = 0
    let day1 = data[0 + offset]
    let day2 = data[1 + offset]
    if (!day1?.temperature || !day2?.temperature || !chart?.data.datasets) return

    let temp = day1.temperature
    temp.push(day2.temperature[0])
    let tempLabels = temp.map((el) => new Date(el[0]))
    let tempData = temp.map((el) => el[1])

    let rain = day1.rainfall
    rain.push(day2.rainfall[0])
    let rainData = rain.map((el) => el[1])

    chart.data.labels = tempLabels
    chart.data.datasets[0].data = tempData
    chart.data.datasets[1].data = rainData

    chart.update()
  }, [data, chart])

  return !timedOut ? (
    <div className="graph">
      <canvas
        ref={(el) => {
          if (el != null) setChartRef(el)
        }}
      ></canvas>
    </div>
  ) : (
    <div></div>
  )
}

export default Weather
