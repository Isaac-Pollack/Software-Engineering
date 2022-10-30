import * as React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
// import { faker } from '@faker-js/faker' //For Hi-Scores Demo

var hiscores;

function updateHiscores() {
  hiscores = JSON.parse(localStorage.getItem("Scores"));
  console.log('hiscores: ' + hiscores);
  var records = hiscores.sort((a, b) => b.hiscore-a.hiscore);
  var table = document.getElementById("hiScores");

  function addEntry(tr, entry) {
    var td = tr.updateCell();
    td.textContext = entry;
    return td;
  }

  var rows = table.childNodes;
  for (var i = 1; i < rows.length; i++) {
    addEntry(rows[i], records[i].name);
    addEntry(rows[i], records[i].hiscore);
  }
  console.log('Hiscores updated');
}

export default function Hiscores() {
  useEffect(() => {
    updateHiscores();
  });
  return (
    <div>
      <h1>Hiscores</h1>

      <table className="hiscores-table" id="hiScores">
        <tbody>
          <tr>
            <th>PLAYER</th>
            <th>SCORE</th>
          </tr>
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
            <button className='exit-btn' type='button' onClick={window.close()}>EXIT</button>
          </Link>
        </li>
      </ol>
      <div className="authors">
        <br /><b>GROUP 18</b>
        <br />2805ICT/3815ICT
        <br />Clay Johnson
        <br />Isaac Pollack
      </div>
    </div>
  )
}

