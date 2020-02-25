import React from 'react'
import '../../App.css'
import HomepageImage from '../../components/HomepageImage.js'

function App () {
  return (
    <div data-testid='landing' className='App'>
      <header className='App-header'>
        <HomepageImage />
        <p>
          Welcome to Chirpr!
        </p>
        <p>
          Join the Chirpr community and chirp away!
        </p>
      </header>
    </div>
  )
}

export default App
