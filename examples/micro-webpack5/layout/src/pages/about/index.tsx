import React from 'templates/react/src/node_modules/react'
import {
  Switch,
  Route,
} from 'templates/react/src/components/wau/breadcrumb/node_modules/react-router-dom'

export default function About() {
  const AboutChild = <div>about-child</div>
  const About = (
    <div>
      <div>about</div>
      <Switch>
        <Route path="/about/child">{AboutChild}</Route>
      </Switch>
    </div>
  )
  return About
}
