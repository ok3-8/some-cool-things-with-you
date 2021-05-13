import React, { useContext } from 'react';

import marked from 'marked';
import hljs from "highlight.js";

import { Context } from "../../App"
import codeJson from "./../../code_source/new_json.json";
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

let currentIndex = 0;

function Bad2Good() {

  const { tag } = useContext(Context);

  function getJsonSingle() {
    const getIndex: any = {
      random: () => Math.floor(Math.random() * codeJson.ocean.length),
      sequence: () => (currentIndex + 1) > (codeJson.ocean.length - 1) ? 0 : (currentIndex + 1)
    }
    currentIndex = getIndex[tag]();
    return codeJson.ocean[currentIndex];
  }

  const [data, setDate] = React.useState(codeJson.ocean[0]);

  const info = {
    __html: marked( "## " + data.description)
  } 
  const badCodeHtml = {
    __html: marked(data.bad_code)
  } 
  const goodCodeHtml = {
    __html: marked(data.good_code)
  } 

  function handleChange(){
    setDate(getJsonSingle());
  }

  return (
    <div className="App bad2good">
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
            <button onClick={handleChange}>Keep on</button>
        </div>
    </div>
  );
}

export default Bad2Good;
