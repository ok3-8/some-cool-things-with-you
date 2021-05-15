import React, { useContext, useEffect } from 'react';

import marked from 'marked';
import hljs from "highlight.js";
import dayjs from 'dayjs'

import { Context } from "../../App"
import jsCodeJson from "./../../code_source/clean-code-javascript.json";
import tsCodeJson from "./../../code_source/clean-code-typescript.json";
import './index.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
}); 

const scripts: any = {
  js: jsCodeJson,
  ts: tsCodeJson
};
let currentLang = "js";
let currentIndex = 0;
let codeJson: any = scripts[currentLang];

function Bad2Good() {

  const { tag } = useContext(Context);

  function getJsonSingle() {
    const getIndex: any = {
      random: () => {
        currentLang = Object.keys(scripts)[Math.floor(Math.random() * 2)];
        codeJson = scripts[currentLang];
        return Math.floor(Math.random() * codeJson.ocean.length);
      },
      sequence: () => {
        const isOverflow = (currentIndex + 1) > (codeJson.ocean.length - 1);
        if( isOverflow ) {
          currentLang = currentLang === 'js' ? 'ts' : 'js';
          codeJson = scripts[currentLang];
        }
        return  isOverflow ? 0 : (currentIndex + 1);
      } 
    }
    currentIndex = getIndex[tag]();
    return codeJson.ocean[currentIndex];
  }

  useEffect(() => {
    const getInfo: any[] = JSON.parse(window.localStorage.getItem("bad2good") || "[]");
    const currentInfo = codeJson.ocean[currentIndex];
    if(!getInfo.some((item: any) => item.id == currentInfo.id)) {
      const o = {
          id: currentInfo.language + currentInfo.id,
          title: (currentIndex + 1) + "、"+ currentInfo.description.substring(0, currentInfo.description.indexOf("\n")),
          language: currentInfo.language,
          usage: "15:00",
          times: 0,
          time: dayjs().format('hh:mm:ss DD/MM/YYYY') 
      }
      getInfo.push(o);
      window.localStorage.setItem("bad2good", JSON.stringify(getInfo))      
    }
  }, [currentIndex])

  const [data, setDate] = React.useState(codeJson.ocean[currentIndex]);
  const [btnState, setBtnState] = React.useState({
    disabled: false
  });

  const info = {
    __html: marked( `## ${currentIndex + 1}.` + data.description)
  } 
  const badCodeHtml = {
    __html: marked(data.bad_code)
  } 
  const goodCodeHtml = {
    __html: marked(data.good_code)
  } 

  function handleChange(){
    if(btnState.disabled) { return false; }
    setBtnState({ disabled: true });
    setTimeout(() => {
      setDate(getJsonSingle());
      (window as any).scrollTo({
        top: 0,
        behavior: "smooth"
      }); 
      setBtnState({ disabled: false });
    }, 800); 
  }

  return (
    <div className="App bad2good" id="Bad2Good">
        <div className="header">
          <div className="box" dangerouslySetInnerHTML={info}></div>
        </div>
        <div className="compare">
          <div className="code-area bad">
            <p>BAD CODE</p>
            <div dangerouslySetInnerHTML={badCodeHtml}></div>
          </div>
          <div className="arrow">
            <div>
              <small>Working</small>
            </div>
          </div>
          <div className="code-area good">
            <p>GOOD CODE</p>
            <div dangerouslySetInnerHTML={goodCodeHtml}></div>
          </div>
        </div>
        <p className="text">
          Every day is a new start.
          Forget the bad and move on to the good.
          Be who you want and you will be great.
        </p>
        <div className="change">
          <button onClick={handleChange} className={`progress-button ${btnState.disabled && 'active'}`}>
            <span className="content">Keep on</span>
            <span className="progress"></span>
					</button>
        </div>
    </div>
  );
}

export default Bad2Good;
