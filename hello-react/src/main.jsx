import React from 'react'
import ReactDOM from 'react-dom/client'
//import our component to render in jsx
import App from './App.jsx'
  

//plain js find the empty div in index.html
const el = document.getElementById('root')

//hand it to react to inject our jsx into it
const root = ReactDOM.createRoot(el)

// render the App component into the root element (div) *
//StrictMode component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)