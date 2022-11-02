import * as React from 'react'
import { Link } from 'react-router-dom'

/**
 * Export Home route and render Home page
 * @returns JSX.Element
 */
export default function Home() {
  return (
    <div>
      <div className="menu">
        <ol className="menulist">
          <li>
            <Link to='/play'>
              <button className='play-btn' type='button'>PLAY</button>
            </Link>
          </li>
          <li>
            <Link to='/hiscores'>
              <button className='hiscores-btn' type='button'>HISCORES</button>
            </Link>
          </li>
          <li>
            <Link to='/configure'>
              <button className='configure-btn' type='button'>CONFIGURE</button>
            </Link>
          </li>
          {/* <li>
            <button className='button' type='button' onClick={window.close()}>EXIT</button>
            redirect to a "you can close this window safely page"
          </li> */}
        </ol>
      </div>
      <div className="authors">
        <br /><b>GROUP 18</b>
        <br />2805ICT/3815ICT
        <br />Clay Johnson
        <br />Isaac Pollack
      </div>
    </div>
  )
}
