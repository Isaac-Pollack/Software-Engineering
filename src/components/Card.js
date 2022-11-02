import React from 'react'
import PropTypes from 'prop-types'

import { FaLinkedin, FaGithub } from 'react-icons/fa'

/**
 * React function for displaying github profile cards
 * @param {*} props 
 * @returns JSX.Element
 */
function Card(props) {
  const name = props.name
  const avatar = props.avatar
  const github = props.github
  const linkedin = props.linkedin

  Card.propTypes = {
    name: PropTypes.any.isRequired,
    avatar: PropTypes.node,
    github: PropTypes.string,
    linkedin: PropTypes.string,
  }

  return (
    <div className='card'>
      <h3>{name}</h3>
      <img src={avatar} width='260' height='260' alt='Avatar' />

      <a href={github} target='_blank' rel='noreferrer'>
        <button>
          <FaGithub></FaGithub>
        </button>
      </a>

      <a href={linkedin} target='_blank' rel='noreferrer'>
        <button>
          <FaLinkedin></FaLinkedin>
        </button>
      </a>
    </div>
  )
}

export default Card
