import React, { useEffect } from 'react';

import './index.css';

function Land4glory() {

   const [info, setInfo] = React.useState<any[]>([]);
   const [questions, setQuestions] = React.useState<any[]>([]);

   React.useEffect(()=>{
    const getInfo: any[] = JSON.parse(window.localStorage.getItem("bad2good") || "[]");
    const getQuestions: any[] = JSON.parse(window.localStorage.getItem("bestquestions") || "[]");
     setInfo(getInfo); setQuestions(getQuestions); 
   }, []);

   function DetailInfo({title, usage, language, time}: any) {
      return (
        <div className="list-info">
          <p>{title}</p> 
          <div>
              <span className="tag">tag: {language}</span> 
              {/* <span className="usage">usage time: {usage}</span>  */}
              <span className="when">time: {time}</span>                     
          </div>
        </div>
      )
    }

    return (
      <div className="App Land4glory">

        <h2>Land of lory</h2>
        <table className="gridtable">
          <tr>
              <th>Bad to good</th><th>best questions</th>
          </tr>
          {/* <tr>
              <td>
                1
              </td>
              <td>2</td>
          </tr> */}
          <tr>
              <td>
                {
                  info.map(o => {
                    return (<><DetailInfo {...o}/><hr /></>)
                  })
                }
                {
                  info.length == 0 && "Simply click on them to change or expand it. It's so fun, good luck! ❤️"
                }
              </td>
              <td>{
                  questions.map(o => {
                    return (<><DetailInfo {...o}/><hr /></>)
                  })
                }</td>
          </tr>
        </table>

        
      {/* // clean code js or ts {id: js/ts + xxx, title: xxx, language: xxx, time: xxx }  */}
      {/* // best questions {id: xxx, title: xxx, time: xxx} */}


      </div>
    );
}
 
export default Land4glory;
