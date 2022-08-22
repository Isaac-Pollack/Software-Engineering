import * as React from 'react';
import { Link } from "react-router-dom";

export default function Configure() {
  return (
      <div>
      <h2>Configure</h2>
      <p>The game prototype should demonstrate following function:</p>
      <ol>
        <li>To click the configure button in the start up page pop up the configure page.</li>
        <li>
          The configure page shows following configure items. (in the prototype, you only need to
          display following settings, functions of those settings are not asked)
        </li>
        <ul type='a'>
          <li>Size of the field</li>
          <li>Game Level</li>
          <li>Normal or Extended game</li>
          <li>Player or AI game mode</li>
        </ul>
        <li>
          A close button in the page, when player click that button, the top score page will be
          closed and return to start up page
        </li>
      </ol>
      <br></br>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}