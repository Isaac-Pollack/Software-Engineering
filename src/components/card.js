import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const name = props.name;
  const avatar = props.avatar;
  const github = props.github;
  const linkedin = props.linkedin;

  Card.propTypes = {
    name: PropTypes.string.isRequired
  }

    return (
      <div className='card'>
        <img src={avatar} />
        <h3>{name}</h3>
        <button href={github} className='btn'><i className='fab fa-github-square'></i></button>
        <button href={linkedin} className='btn'><i className='fab fa-github-square'></i></button>
      </div>
    );
}

export default Card