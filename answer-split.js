const fs = require("fs-extra");

const file = "./answer.md";

const data = {
  ocean: []
};

fs.readFile(file, 'utf8', (err, str) => {

  let loop_str = str; 
  let stop_index = 0; 
  let get_code = "";
  let start_index = 0;

  try {
    while (stop_index >= 0)
    {
      start_index = loop_str.indexOf("######");
      stop_index = loop_str.indexOf("######", start_index + 6);
      
      get_code = loop_str.substring(start_index, stop_index);
      stop_index != -1 && createCodeInfo(get_code);

      loop_str = loop_str.slice(stop_index);
    };

  } catch (e) {
    console.error(e.message);
  }

  outputFile("./answer_json.json", JSON.stringify(data));
  
});

function outputFile (f, content) {
  try {
    fs.outputFile(f, content)
  } catch (err) {
    console.error(err)
  }
}

function createCodeInfo(str){

  const simple = {
    id: generateUUID(),
    language: "javascript",
    code: str
  };

  data.ocean.push(simple);

};

function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c ==' x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
