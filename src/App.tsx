import React, { useContext, useReducer } from 'react';
import {Link} from 'react-router-dom';
import Router from './Router';

import avatar from './assets/avatar5.jpg';
import setting from './assets/setting.png';

export const Context = React.createContext({tag: "random"});

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'random':
      return {tag: "random"};
    case 'sequence':
      return {tag: "sequence"};
    default:
      throw new Error();
  }
}

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

  const [state, dispatch] = useReducer(reducer, {tag: "random"});

  function handleChange(e: any) {
    const { checked } = e.target;
    dispatch({type: checked ? 'sequence' : 'random'});
  }

  const { tag } = state;

  return (
    <Context.Provider 
      value={{
        tag
      }}
    >
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
          <div className="cycle">
            <div className="option">
              <div className="tg-list-item">
                <h4>in sequence or by random</h4>
                <input className="tgl tgl-flip" id="cb5" onChange={handleChange} type="checkbox" />
                <label className="tgl-btn" data-tg-off="Random" data-tg-on="Sequence" htmlFor="cb5"></label>
              </div>
            </div>
            <div className="setting" style={{animation: `${tag === "random" ? "rondomRotation" : "rotation"} 1.6s linear infinite`}}><img src={setting}></img></div>
          </div>   
        </div>
        <Router />
      </div>
    </Context.Provider>
  );
}
 
export default App;
