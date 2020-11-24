import React, { useState, useEffect } from "react"
import "./Hackernews.scss"

interface Story {
  id: number
  title: string
}

interface HackernewsProps {
  theme?: string
}

const url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
const updateInterval = 10 * 60 * 1000

function Hackernews(props: HackernewsProps) {
  let [data, setData] = useState<Story[]>([])

  const fetchData = async () => {
    let res = await fetch(url)
    let data: number[] = await res.json()

    let stories = await Promise.all(
      data.slice(0, 5).map(async (id) => {
        let storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        let story = await storyRes.json()
        console.log(story)
        return story
      })
    )
    setData(stories)
  }

  useEffect(() => {
    fetchData()
    setInterval(fetchData, updateInterval)
  }, [])

  const stories = data.map((story) => (
    <div key={story.id} className={`story ${props.theme === "light" && " light"}`}>
      <p>{story.title}</p>
    </div>
  ))

  return (
    <div>
      <div className="story-container">{stories}</div>
    </div>
  )
}

export default Hackernews
