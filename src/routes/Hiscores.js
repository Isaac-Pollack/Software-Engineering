import * as React from 'react'
import { Link } from 'react-router-dom'
import { faker } from '@faker-js/faker' //For Hi-Scores Demo

export default function Hiscores() {
  return (
    <div>
      <h1>Hiscores</h1>

      <table>
        <tbody>
          <tr>
            <th>PLAYER</th>
            <th>SCORE</th>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>3004</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2909</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2752</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2658</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2500</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2312</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2270</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2105</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>2074</td>
          </tr>
          <tr>
            <td>{faker.name.fullName()}</td>
            <td>1846</td>
          </tr>
        </tbody>
      </table>

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
