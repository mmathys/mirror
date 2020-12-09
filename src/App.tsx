import React from "react"
import "./App.scss"
import Clock from "./components/Clock/Clock"
import Hanzi from "./components/Hanzi/Hanzi"
import Date from "./components/Date/Date"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Weather from "./components/Weather/Weather"
import Publibike from "./components/Publibike/Publibike"
import Hackernews from "./components/Hackernews/Hackernews"
import 中文 from "./components/中文/中文"

function App() {
  const prod = true
  const classes = () => "App" + (prod ? " prod" : "")

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className={classes()}>
            <div className="container">
              <Hanzi></Hanzi>
              <Clock></Clock>
              <Date></Date>
              <Weather></Weather>
              <Hackernews></Hackernews>
              <Publibike></Publibike>
              <中文></中文>
            </div>
          </div>
        </Route>
        <Route path="/weather">
          <div className="weatherDev">
            <Weather theme="light"></Weather>
          </div>
        </Route>
        <Route path="/publibike">
          <Publibike theme="light"></Publibike>
        </Route>
        <Route path="/hn">
          <Hackernews theme="light"></Hackernews>
        </Route>
        <Route path="/中文">
          <中文 theme="light"></中文>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
