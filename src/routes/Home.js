import * as React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/card'

export default function Home() {
  return (
    <div>
      <h1>2805ICT/3815ICT Group Project</h1>

      <ol className='noList'>
        <li>
          <Link to='/play'>
            <button type='button'>PLAY TETRIS</button>
          </Link>
        </li>

        <li>
          <Link to='/configure'>
            <button type='button'>CONFIGURE</button>
          </Link>
        </li>

        <li>
          <Link to='/hiscores'>
            <button type='button'>HI-SCORES</button>
          </Link>
        </li>

        <li>
          <button type='button' onClick={window.close()}>
            EXIT
          </button>{' '}
          {/* TODO Figure out if we can get this to work or scrap it, seems more work than it's worth */}
        </li>
      </ol>

      <h2 className='middle'>THE GROUP</h2>
      <div className='card_box'>
        <Card
          name='Isaac P'
          avatar='https://avatars.githubusercontent.com/u/66584817?v=4'
          github='https://github.com/Isaac-Pollack'
          linkedin='https://www.linkedin.com/in/Isaac-Pollack'
        />
        <Card
          name='Clay J'
          avatar='https://avatars.githubusercontent.com/u/49152327?v=4'
          github='https://github.com/clayajohnson'
          linkedin='https://letmegooglethat.com/?q=Clay+Johnson+Linkedin'
        />
      </div>
    </div>
  )
}
