/* eslint-disable react/jsx-pascal-case */
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
import { FirebaseAppProvider } from "reactfire"
import { firebaseConfig } from "./constants"
import Sonos from "./components/Sonos/Sonos"

function App() {
  const prod = true
  const classes = () => "App" + (prod ? " prod" : "")

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
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
                <Sonos></Sonos>
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
          <Route path="/中文">
            <中文 theme="light"></中文>
          </Route>
          <Route path="/sonos">
            <Sonos theme="light"></Sonos>
          </Route>
        </Switch>
      </Router>
    </FirebaseAppProvider>
  )
}

export default App
