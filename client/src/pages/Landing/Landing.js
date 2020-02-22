import React from 'react';
import '../../App.css';
import HomepageImage from '../../components/HomepageImage.js';
import Card from '../../components/chirpCard/chirpCard.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomepageImage />
        <p>
          Welcome to Chirpr
        </p>
        <p>
          Join the Chirpr community community and chirp away!
          <Card />
        </p>
      </header>
    </div>
  );
}

export default App;
