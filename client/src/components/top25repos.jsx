import React from 'react';
import ReactDOM from 'react-dom';
import Repo from './eachRepo.jsx';

let Top25Repos = (props) => {
  return (
    <div>{props.top25.map((repo) => {
      return <Repo repo={repo} />
    })}</div>
  )
}

export default Top25Repos