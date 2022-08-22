import * as React from 'react'
import { Link } from 'react-router-dom'

export default function Configure() {
  return (
    <div>
      <h1>Configure</h1>

      <form>
        <label htmlFor='gameType'>Game Type: </label>
        <select id='gameType'>
          <option value='normal'>Normal</option>
          <option value='extended'>Extended</option>
        </select>

        <label htmlFor='AI'>Who is playing: </label>
        <select id='AI'>
          <option value='Player'>You</option>
          <option value='AI'>AI</option>
        </select>

        <label htmlFor='startingLevel'>Starting Level: </label>
        <input
          type='number'
          id='startingLevel'
          name='startingLevel'
          min={1}
          max={10}
          defaultValue={1}
        ></input>

        <label htmlFor='fieldWidth'>Field Width: </label>
        <input
          type='number'
          id='fieldWidth'
          name='fieldWidth'
          min={2}
          max={24}
          step={2}
          defaultValue={10}
        ></input>
        <label htmlFor='fieldHeight'>Field Height: </label>
        <input
          type='number'
          id='fieldHeight'
          name='fieldHeight'
          min={2}
          max={40}
          step={2}
          defaultValue={24}
        ></input>
      </form>

      <ol className='noList'>
        <li>
          <Link to='/'>
            <button type='button'>EXIT</button>
          </Link>
        </li>
      </ol>
    </div>
  )
}
