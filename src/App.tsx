import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Router from './Router';

import avatar from './assets/avatar5.jpg';

function CircularText ({text, emoji, color}: any) {
  return <div className={`circular ${color}`}>
    <svg viewBox="0 0 100 100">
      <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
          <text>
            <textPath xlinkHref="#circle">{text}</textPath>
          </text>
    </svg>
    <span>{emoji}</span>
  </div>
}

function App() {
  return (
    <div>
      <div className="nav">
        <Link to='/'><div className="logo"><img src={avatar}></img></div></Link>
        <Link to='/bad-to-good'>
          <CircularText text="Bad To Good" emoji="🥝" color="green"/>
        </Link>
        <Link to='/best-answer'>
          <CircularText text="Best Answer" emoji="🍋" color="cyan"/>
        </Link>          
        <Link to='/abcdefg'>
          <CircularText text="A B C D E F G" emoji="🍓" color="timber"/>
        </Link>       
      </div>
      <Router />
    </div>
  );
}
 
export default App;
