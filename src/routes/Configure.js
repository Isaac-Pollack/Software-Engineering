import * as React from 'react'
import { Link } from 'react-router-dom'

var settings;

function saveConfiguration() {
  var settings = {
    gametype: document.getElementById("gameType").value,
    gamemode: document.getElementById("gameMode").value,
    gamelevel: document.getElementById("gameLevel").value,
    fieldwidth: document.getElementById("fieldWidth").value,
    fieldheight: document.getElementById("fieldHeight").value
  };
  localStorage.setItem("Settings",  JSON.stringify({gametype: settings.gametype, gamemode: settings.gamemode, gamelevel: settings.gamelevel, fieldwidth: settings.fieldwidth, fieldheight: settings.fieldheight}));
  console.log('Settings saved');
  console.log(JSON.parse(localStorage.getItem("Settings")));
}

export default function Configure() {
  settings = JSON.parse(localStorage.getItem('Settings'));
  return (
    <div>
      <h1>Configure</h1>

      <form>
        <label htmlFor="type">Game Type: </label>
        <select id="gameType" defaultValue={settings.gametype}>
          <option value={false}>Normal</option>
          <option value={true}>Extended</option>
        </select>

        <label htmlFor="mode">Game Mode: </label>
        <select id="gameMode" type='string' defaultValue={settings.gamemode}>
          <option value={false}>You</option>
          <option value={true}>AI</option>
        </select>

        <label htmlFor="level">Game Level: </label>
        <input
          id="gameLevel"
          type='number'
          defaultValue={1}
          // name="gameLevel"
          min={1}
          max={5}
          step={1}
        ></input>

        <label htmlFor="width">Field Width: </label>
        <input
          id="fieldWidth"
          type='number'
          defaultValue={10}
          // name='fieldWidth'
          min={2}
          max={20}
          step={2}
        ></input>
        <label htmlFor="height">Field Height: </label>
        <input
          id="fieldHeight"
          type='number'
          defaultValue={20}
          // name='fieldHeight'
          min={4}
          max={40}
          step={4}
        ></input>
      </form>

      <ol className='noList'>
        <li>
          <button type='button' onClick={saveConfiguration}>SAVE</button>
        </li>

        <li>
          <Link to='/'>
            <button type='button' onClick={window.close()}>EXIT</button>
          </Link>
        </li>
      </ol>
    </div>
  )
}