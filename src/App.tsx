import React from "react"
import "./App.scss"
import Clock from "./components/Clock/Clock"
import Hanzi from "./components/Hanzi/Hanzi"
import Date from "./components/Date/Date"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Weather from "./components/Weather/Weather"
import Publibike from "./components/Publibike/Publibike"
import Hackernews from "./components/Hackernews/Hackernews"

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
      </Switch>
    </Router>
  )
}

export default App
