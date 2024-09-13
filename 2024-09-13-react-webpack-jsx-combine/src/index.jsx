import React from 'react'
import ReactDOM from 'react-dom/client'
const myElement = <h1>I Love JSX!</h1>;
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      {myElement}
    </React.StrictMode>,
)