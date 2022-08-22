import * as React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return (
      <div>
      <h1>2805ICT/3815ICT Group Project</h1>

      <ol className='noList'>
      <li><Link to="/play">
        <button type="button">
          PLAY TETRIS
        </button>
      </Link></li>
      
      <li><Link to="/configure">
        <button type="button">
          SETTINGS
        </button>
      </Link></li>

      <li><Link to="/hiscores">
        <button type="button">
          HISCORES
        </button>
      </Link></li>
      </ol>

      <p>
        <br></br>
        {/* TODO Dirty line breaks for now fix */}
        <br></br>
        <b>REQUIREMENTS:</b>
        <ol>
          <li>The title of Tetris</li>
          <li>The year and course code</li>
          <li>The list of all students in your group</li>
          <li>An exit button to exit the program</li>
          <li>A score button to show top 10 players with their scores</li>
          <li>
            A configure button. In the configure page, a player can select normal game or game with
            extension (explain later), and can select the size of the field, which is the area the
            blocks move and build, the block dropping speeds (levels). A player can also select AI
            game
          </li>
        </ol>
      </p>

        <div className="card_box">
          {/* Card component to go here with props
           Card component to go here with props */}
        </div>

      </div>
  );
}
