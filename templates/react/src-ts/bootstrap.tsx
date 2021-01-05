import React from 'react'
import ReactDOM from 'react-dom'
<%_ if (project.features.admin) { _%>
import { BrowserRouter as Router } from 'react-router-dom'
<%_ } _%>

import '@/index.css'
import App from '@/App'

export default (): void => {
  ReactDOM.render(
    <React.StrictMode>
      <%_ if (project.features.admin) { _%>
      <Router>
      <%_ } _%>
        <App />
      <%_ if (project.features.admin) { _%>
      </Router>
      <%_ } _%>
    </React.StrictMode>,
    document.getElementById('app')
  )
}
