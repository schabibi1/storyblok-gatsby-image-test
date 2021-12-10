import * as React from "react"

const Teaser = ({ blok }) => {
  return(
    <div>
      <h2>{ blok.headline }</h2>
      <img src={ blok.image.filename } alt={ blok.image.alt } />
    </div>
  )
}
export default Teaser