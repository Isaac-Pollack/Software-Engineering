import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Home from "./routes/Home";
import Play from "./routes/Play";
import Hiscores from "./routes/Hiscores";
import Configure from "./routes/Configure";

/**
 * set default scores
 */
if (localStorage.getItem("Scores")) {
	console.log("Scores found");
	console.log(localStorage.getItem("Scores"));
} else {
	console.log("Scores not found");
	// localStorage.setItem('Scores',  JSON.stringify(new Array(10).fill({name: 'NA', hiscore: 0})));
	localStorage.setItem(
		"Scores",
		JSON.stringify([
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
			{ name: "NA", hiscore: 0 },
		]),
	);
	console.log(localStorage.getItem("Scores"));
}

/**
 * set default settings
 */
if (localStorage.getItem("Settings")) {
	console.log("Settings found");
	console.log(localStorage.getItem("Settings"));
} else {
	console.log("Settings not found");
	localStorage.setItem(
		"Settings",
		JSON.stringify({
			gametype: "normal",
			gamemode: "player",
			gamelevel: 1,
			fieldwidth: 10,
			fieldheight: 20,
		}),
	);
	console.log(localStorage.getItem("Settings"));
}

/**
 * Export the application routes
 */
export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='play' element={<Play />} />
					<Route path='hiscores' element={<Hiscores />} />
					<Route path='configure' element={<Configure />} />
					<Route path='*' element={<NoMatch />} />
				</Route>
			</Routes>
		</div>
	);
}

/**
 * Render the application layout
 */
function Layout() {
	return (
		<div>
			<div className='navbar'>
				<a className="home" href="/">
					<b>TETRIS</b>
				</a>
				<div>
					<ul className="navlist">
						<li className="navplay">
							<Link to='/play'>Play</Link>
						</li>
						<li className="navhiscores">
							<Link to='/hiscores'>Hiscores</Link>
						</li>
						<li className="navconfigure">
							<Link to='/configure'>Configure</Link>
						</li>
					</ul>
				</div>
			</div>
			<main className='Outlet'>
				<Outlet />
			</main>
		</div>
	);
}

/**
 * Link back to homepage on invalid route
 */
function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to='/'>Go to the home page</Link>
			</p>
		</div>
	);
}
