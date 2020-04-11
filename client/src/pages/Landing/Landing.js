import React from 'react'
import '../../App.css'
import HomepageImage from '../../components/HomepageImage.js'

const styles = {
  header: {
    backgroundColor: '#282c34',
    fontSize: 'calc(30px + 2vmin)',
    minHeight: 'calc(100vh - 56px)',
    borderRadius: 0
  }
}

function App () {
  return (
    <div data-testid='landing' className='App'>
      <header className="d-flex flex-column align-items-center justify-content-center text-white" style={styles.header}>
        <HomepageImage />
        <p data-testid="landing-welcome">
          Welcome to Chirpr!
        </p>
        <p data-testid="landing-join">
          Join the Chirpr community and chirp away!
        </p>
      </header>
    </div>
  )
}

export default App
