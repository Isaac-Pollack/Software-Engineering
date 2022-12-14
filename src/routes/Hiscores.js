import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

var hiscores;

/**
 * Update the Hiscores entries using localStorage Scores item
 */
function updateHiscores() {
	hiscores = JSON.parse(localStorage.getItem("Scores"));
	console.log(`hiscores: ${hiscores}`);
	console.log(`hicores[0].name: ${hiscores[0].name}`);
	var records = hiscores.sort((a, b) => b.hiscore - a.hiscore);
	var table = document.getElementById("hiScores");

	function addEntry(tr, idx, entry) {
		tr.deleteCell(idx);
		var td = tr.insertCell(idx);
		td.innerHTML = entry;
		console.log("[debug] td: ", td);
		return td;
	}

	var rows = table.childNodes[1];
	rows = rows.childNodes;
	console.log("[debug] rows: ", rows);
	for (var i = 0; i < rows.length; i++) {
		addEntry(rows[i], 0, records[i].name);
		addEntry(rows[i], 1, records[i].hiscore);
		console.log("[debug] score: ", records[i]);
	}
	console.log("Hiscores updated");
}

/**
 * Export Hiscores route and render Hiscores page, update Hiscores entries with React hook useEffect
 * @returns JSX.Element
 */
export default function Hiscores() {
	useEffect(() => {
		console.log("Updating Scores");
		updateHiscores();
	});
	return (
		<div>
			<h1>Hiscores</h1>

			<table className="hiscores-table" id="hiScores">
				<thead>
					<tr>
						<th>PLAYER</th>
						<th>SCORE</th>
					</tr>
				</thead>
				<tbody>
					<tr id="first">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="second">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="third">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="fourth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="fifth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="sixth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="seventh">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="eigth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="ninth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					<tr id="tenth">
						<td>N/A</td>
						<td>N/A</td>
					</tr>
					{/* <tr>
            <td>{faker.name.fullName()}</td>
            <td>1846</td>
          </tr> */}
				</tbody>
			</table>
			<ol>
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
