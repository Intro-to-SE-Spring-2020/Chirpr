import React from 'react'

function HomepageImage () {
  const url = 'https://i.ibb.co/rdHPc04/chirpr-removebg-preview.png'
  return (
    <img data-testid="landing-homepage-image" name="landing-image" src={url} style={{ width: 250, height: 250 }} alt='Chirpr' />
  )
}

export default HomepageImage
