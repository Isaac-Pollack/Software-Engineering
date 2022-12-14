import * as React from "react";
import { Link } from "react-router-dom";

var settings;

/**
 * Save configuration settings to localStorage item Settings
 */
function saveConfiguration() {
	var settings = {
		gametype: document.getElementById("gameType").value,
		gamemode: document.getElementById("gameMode").value,
		gamelevel: document.getElementById("gameLevel").value,
		fieldwidth: document.getElementById("fieldWidth").value,
		fieldheight: document.getElementById("fieldHeight").value,
	};
	// localStorage.setItem("Settings", JSON.stringify({gametype: settings.gametype, gamemode: settings.gamemode, gamelevel: settings.gamelevel, fieldwidth: settings.fieldwidth, fieldheight: settings.fieldheight}));
	localStorage.setItem("Settings", JSON.stringify(settings));
	console.log("Settings saved");
	console.log(JSON.parse(localStorage.getItem("Settings")));
}

/**
 * Export Configure route and render Configure page, save configuration settings onClick
 * @returns JSX.Element
 */
export default function Configure() {
	settings = JSON.parse(localStorage.getItem("Settings"));
	return (
		<div>
			<h1>Configure</h1>
			<form>
				<label htmlFor="type">Game Type: </label>
				<select id="gameType" type='string' defaultValue={settings.gametype}>
					<option value={"normal"}>Normal</option>
					<option value={"extended"}>Extended</option>
				</select>
				<label htmlFor="mode">Game Mode: </label>
				<select id="gameMode" type='string' defaultValue={settings.gamemode}>
					<option className="n-mode" value={"player"}>
						Player
					</option>
					<option className="a-mode" value={"ai"}>
						AI
					</option>
				</select>
				<label htmlFor="level">Game Level: </label>
				<select id="gameLevel" type='number' defaultValue={settings.gamelevel}>
					<option className="b-level" value={0}>
						Begginer
					</option>
					<option className="n-level" value={1}>
						Normal
					</option>
					<option className="h-level" value={2}>
						Hard
					</option>
					<option className="p-level" value={3}>
						Pro
					</option>
					<option className="i-level" value={4}>
						INSANE
					</option>
				</select>
				<label htmlFor="width">Field Width: </label>
				<input
					id="fieldWidth"
					type='number'
					defaultValue={settings.fieldwidth}
					min={2}
					max={20}
					step={2}
				/>
				<label htmlFor="height">Field Height: </label>
				<input
					id="fieldHeight"
					type='number'
					defaultValue={settings.fieldheight}
					min={4}
					max={40}
					step={4}
				/>
			</form>
			<ol>
				<li>
					<button
						className='save-btn'
						type='button'
						onClick={saveConfiguration}
					>
						SAVE
					</button>
				</li>
				<li>
					<Link to='/'>
						<button className='exit-btn' type='button' onClick={window.close()}>
							EXIT
						</button>
					</Link>
				</li>
			</ol>
			<div className="authors">
				<br />
				<b>GROUP 18</b>
				<br />
				2805ICT/3815ICT
				<br />
				Clay Johnson
				<br />
				Isaac Pollack
			</div>
		</div>
	);
}

{
	/* <input
  id="gameLevel"
  type='number'
  defaultValue={1}
  min={1}
  max={5}
  step={1}
></input> */
}
