import React, { useContext } from 'react';

import marked from 'marked';
import hljs from "highlight.js";

import { Context } from "../../App"
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

let currentIndex = 0;

function Answer() {

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
  
  const goodCodeHtml = {
    // __html: marked( "## " + data.code.slice(data.code.indexOf(".") + 1))
    __html: marked( data.code.slice(4))
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
