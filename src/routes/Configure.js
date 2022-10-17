import * as React from 'react'
import { Link } from 'react-router-dom'

function saveSettings() {
  //Form ID's
  var settings = { gametype: document.getElementById("gameType"), player: document.getElementById("AI"), startinglevel: document.getElementById("startingLevel"), fieldwidth: document.getElementById("fieldWidth"), fieldheight: document.getElementById("fieldHeight") }

  console.log(settings.gametype)
  //Save Settings
  //localStorage.setItem('Settings',  JSON.stringify(settings));
  console.log('Settings updated.')
}

export default function Configure() {
  return (
    <div>
      <h1>Configure</h1>

      <form>
        <label htmlFor='gameType'>Game Type: </label>
        <select id='gameType' defaultValue={'normal'}>
          <option value='normal'>Normal</option>
          <option value='extended'>Extended</option>
        </select>

        <label htmlFor='AI'>Who is playing: </label>
        <select id='AI' defaultValue={'player'}>
          <option value='player'>You</option>
          <option value='ai'>AI</option>
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
          <button type='button' onClick={saveSettings}>SAVE</button>
        </li>

        <li>
          <Link to='/'>
            <button type='button'>EXIT</button>
          </Link>
        </li>
      </ol>
    </div>
  )
}