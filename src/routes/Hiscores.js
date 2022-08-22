import * as React from 'react';
import { Link } from "react-router-dom";

export default function Hiscores() {
  return (
      <div>
      <h2>Hiscores</h2>
      <p>The game prototype should demonstrate following function:</p>
      <ol>
        <li>To click the score button in the start up page pop up the top score page.</li>
        <li>
          The top score page will display 10 best scores and the users (The data can be fake in the
          prototype)
        </li>
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