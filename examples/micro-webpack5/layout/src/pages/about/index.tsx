import React from 'react'
import { Switch, Route } from 'react-router-dom'

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
