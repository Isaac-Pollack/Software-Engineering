import React from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

//Routes
import Home from './routes/Home'
import Play from './routes/Play'
import Configure from './routes/Configure'
import Hiscores from './routes/Hiscores'
import { FaGithub } from 'react-icons/fa'

// const settings = {gametype: "normal", gamemode: "you", gamelevel: "1", fieldwidth: "10", fieldheight: "20" };

if(localStorage.getItem('Settings')) {
  console.log('Settings found');
  console.log(localStorage.getItem('Settings'));
} else {
  console.log('Settings not found');
  localStorage.setItem('Settings',  JSON.stringify({gametype: "normal", gamemode: "you", gamelevel: "1", fieldwidth: "10", fieldheight: "20" }));
  console.log(localStorage.getItem('Settings'));
  // localStorage.setItem("Settings",  JSON.stringify(settings));
}

export default function App() {
  return (
    <div>
      {/* TODO CSS Styling for Layout/Navbar */}

      {/* Routes nest inside one another. Nested route paths build upon
      parent route paths, and nested route elements render inside
      parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='play' element={<Play />} />
          <Route path='configure' element={<Configure />} />
          <Route path='hiscores' element={<Hiscores />} />

          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div className='Nav'>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/play'>Play</Link>
          {/* <a href={process.env.PUBLIC_URL + "play.html"} rel="noreferrer" >Play</a> */}
        </li>
        <li>
          <Link to='/configure'>Configure</Link>
        </li>
        <li>
          <Link to='/hiscores'>Hiscores</Link>
        </li>
        <li>
          <a
            href={'https://github.com/Isaac-Pollack/Software-Engineering'}
            target='_blank'
            rel='noreferrer'
          >
            <FaGithub></FaGithub>
          </a>
        </li>
      </ul>

      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <main className='Outlet'>
        <Outlet />
      </main>
    </div>
  )
}

//Catch case for everything else
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  )
}
