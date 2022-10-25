import * as React from 'react'
import { Link } from 'react-router-dom'
import './play.css'

export default function Play() {
  return(
    <div>
      <link href="./play.css" rel="stylesheet" type="text/css"></link>

      <h1>TETRIS</h1>

      <div id="gamescreen" className="text"></div>

      <div id="gamestatic" className="text">
        <br /><b>[2805ICT/3815ICT: GROUP 18]</b>
      </div>

      <div id="gameinfo" className="text"></div>

      <div id="gamecommands" className="text">
        <br /><b>[Key Commands]</b>
        <br />Move Left: [Left Arrow]
        <br />Move Right: [Right Arrow]
        <br />Move Down: [Left Arrow]
        <br />Rotate Shape: [Up Arrow]
        <br />Drop Shape: [Space Bar]
        <br />Speed Up: [Q]
        <br />Slow Down: [A]
        <br />Inspect Move Selection: [F]
      </div>

      <script src="./tetris.js"></script>
      <script src="./ai.js"></script>

      <ol className='noList'>
        <li>
          <Link to='/'>
            <button type='button'>EXIT</button>
            {/* <button type='button' onClick={window.close()}>EXIT</button> */}
          </Link>
        </li>
      </ol>
    </div>
  )
}
