import React, { useState, useEffect } from "react"
import "./中文.scss"
const pinyin = require("pinyin")

interface ExpressionOfTheDayResponse {
  english?: string
  chinese?: string
}

interface Tuple {
  character: string
  pinyin: string
}

interface ExpressionOfTheDay {
  chinese?: Tuple[]
  english?: string
}

interface 中文Props {
  theme?: string
}

const url = "https://eotd.mmathys.workers.dev"
const updateInterval = 1 * 60 * 60 * 1000

function 中文(props: 中文Props) {
  let [data, setData] = useState<ExpressionOfTheDay>({})

  const fetchData = async () => {
    let res = await fetch(url)
    let data: ExpressionOfTheDayResponse = await res.json()
    let chinese: Tuple[] = data
      .chinese!.replace("。", "")
      .split("")
      .map((character) => ({
        character,
        pinyin: pinyin(character) as string,
      }))

    setData({ chinese, english: data.english })
  }

  useEffect(() => {
    fetchData()
    setInterval(fetchData, updateInterval)
  }, [])

  const divs = () =>
    data.chinese?.map(({ character, pinyin }, i) => (
      <div key={i}>
        <p>{pinyin}</p>
        <p className="character">{character}</p>
      </div>
    ))

  return (
    <div>
      <div className={`中文 ${props.theme === "light" && " light"}`}>
        <div className="tuples">{divs()}</div>
        <p>{data.english}</p>
      </div>
    </div>
  )
}

export default 中文
