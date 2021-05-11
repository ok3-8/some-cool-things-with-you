import React from 'react';

import marked from 'marked';
import hljs from "highlight.js";

import codeJson from "./../../code_source/answer_json.json";

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

function getJsonSingle() {
  return codeJson.ocean[Math.floor(Math.random() * codeJson.ocean.length)];
}

function Answer() {
  const [data, setDate] = React.useState(getJsonSingle());
  const goodCodeHtml = {
    __html: marked( "## " + data.code.slice(data.code.indexOf(".") + 1))
  } 
  function handleChange(){
    setDate(getJsonSingle());
  }
    return (
      <div className="App answer">
        <div className="question">
          <div dangerouslySetInnerHTML={goodCodeHtml}></div>
        </div>
        <div className="change">
          <button onClick={handleChange}>Keep on</button>
        </div>
      </div>
    );
}
 
export default Answer;
