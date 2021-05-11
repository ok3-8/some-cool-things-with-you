const fs = require("fs-extra");

const file = "./rrr.md";

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
      start_index = loop_str.indexOf("###");
      stop_index = loop_str.indexOf("**[⬆ back to top]");
      
      get_code = loop_str.substring(start_index + 3, stop_index);
      stop_index != -1 && createCodeInfo(get_code);

      loop_str = loop_str.slice(stop_index + 10);
    };

  } catch (e) {
    console.error(e.message);
  }

  outputFile("./new_json.json", JSON.stringify(data));
  
});

function outputFile (f, content) {
  try {
    fs.outputFile(f, content)
  } catch (err) {
    console.error(err)
  }
}

function createCodeInfo(str){

  const separator = {
    bad: "**Bad:**",
    good: "**Good:**"
  };

  const index = {
    bad: str.indexOf(separator.bad),
    good: str.indexOf(separator.good)
  };

  const simple = {
    id: generateUUID(),
    language: "javascript",
    description: str.substring(0, index.bad),
    bad_code: str.substring(index.bad + separator.bad.length, index.good),
    good_code: str.substring(index.good + separator.good.length, str.length)
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
