import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageContainer } from '@/components'

export default function About() {
  const AboutChild = <div>about-child</div>
  const About = (
    <PageContainer>
      <div>
        <div>about</div>
        <Switch>
          <Route path="/about/child">{AboutChild}</Route>
        </Switch>
      </div>
    </PageContainer>
  )
  return About
}
