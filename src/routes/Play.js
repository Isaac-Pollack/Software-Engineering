import * as React from 'react'
import { Link } from 'react-router-dom'

export default function Play() {
  return (
    <div>
      <h1>TETRIS HERE</h1>
      <br></br>
      <b>Game Control Requirements:</b>
      <ol>
        <li>Left arrow key to move falling block move left.</li>
        <li>Right arrow key to move falling block move right.</li>
        <li>Up arrow key to turn the falling block 90 degree clockwise.</li>
        <li>Down arrow key to speed up dropping speed of the falling block.</li>
        <li>“P” key to pause and resume the game.</li>
        <li>
          Esc key will bring a dialog box ask if the player want to finish the game. If the user
          select “Yes” then return to the start page, if “No” continue game.
        </li>
        <li>“M” key to turn on/off music and sound effects.</li>
      </ol>

      <br></br>
      <b>Game Scoring Requirements:</b>
      <p>
        We use a simple scoring for the game. A player or AI can get points only when they eliminate
        lines. More lines they eliminate through one block dropping, more points they will receive.
        The mapping between points and number of lines removed in one round is as:
      </p>
      <ul>
        <li>1 Lines = 100 points</li>
        <li>2 Lines = 300 points</li>
        <li>3 Lines = 600 points</li>
        <li>4 Lines = 1000 points</li>
      </ul>
      <br></br>

      <b>Game Extension Requirements:</b>
      <br></br>
      <img src={require('../images/GameExtensionRequirements.png')} />

      <br></br>
      <b>AI Game Requirements:</b>
      <p>
        The game has two different play mode: player mode and AI mode. In the player mode, the
        player uses the keyboard to control the movement of the dropping block as described in Game
        control section. In the AI mode, game AI will control the movement of the dropping block, to
        make it move left, right, turn and speedup dropping.
      </p>
      <p>A player can select different mode in the configuration page.</p>
      <p>
        When a player complete a game with score in top 10, the system will ask the player to input
        a name, and then the name and the score can be found in the top score page. In the gameplay
        page, apart from the field of the game, the dropping block, and the accumulated blocks at
        the bottom part of the field, the page will also need to display other information:
      </p>
      <ol>
        <li>Your group number (you will get the number when you enrol in one group).</li>
        <li>Current score of this play session.</li>
        <li>Number of lines have been eliminated in this play session.</li>
        <li>Current level.</li>
        <li>Extended game or normal game.</li>
        <li>Player mode or AI mode</li>
        <li>
          Next block (the shape of next dropping block when current block drops to the bottom)
        </li>
      </ol>

      <br></br>
      <b>Game Completion Requirements:</b>
      <p>
        There are two ways for a game to be completed. The first is that when the field is filled
        with blocks and a new dropping block has no space to appear, then the game is completed. The
        other way is that during a game, when a player presses ESC key and then click “Yes” in the
        dialogue box, then the game is also completed.
      </p>
      <p>
        Whenever a game is complete, if the score is in the top 10, the game will pop up an input
        dialogue box for the player to input a name. Then the name and score will appear in the top
        score page.
      </p>
      <p>
        The rule is applicable for AI mode as well. But no name input is required. AI game will take
        “AI” as the name.
      </p>
      <p>
        When a player completes a game with score in top 10, the system will ask the player to input
        a name, and then the name and the score can be found in the top score page.
      </p>

      <br></br>
      <p>
        <b>The game prototype should demonstrate following function:</b>
      </p>
      <ol>
        <li>To click the play button in the start up page pop up the game play page.</li>
        <li>The game page should display following items:</li>
        <ul className='letterlist'>
          <li>Game field and a dropping block</li>
          <li>Your group number.</li>
          <li>Current score of this play session.</li>
          <li>Number of lines have been eliminated in this play session.</li>
          <li>Current level.</li>
          <li>Extended game or normal game</li>
          <li>Player mode or AI mode</li>
          <li>
            Next block (the shape of next dropping block when current block drops to the bottom)
          </li>
        </ul>
        <li>The dropping block is dropping.</li>
        <li>
          A player can move the dropping block left, right and turn. When the dropping block reach
          the bottom of the field, it will stop. Other features will not required.
        </li>
        <li>
          Press Esc key will bring a dialog box ask if you want to finish the game. If click “Yes”
          then return to the start up page, if “No” continue game.
        </li>
      </ol>

      <br></br>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  )
}
