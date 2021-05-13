const request = require("request");
const fs = require("fs-extra");
const iconv = require("iconv-lite");

const outputFileName = "./ryanmcdermott_clean-code-javascript_README.md";
const source_url = "https://raw.githubusercontent.com/labs42io/clean-code-typescript/master/README.md";
// https://raw.githubusercontent.com/ryanmcdermott/clean-code-javascript/master/README.md
// https://raw.githubusercontent.com/labs42io/clean-code-typescript/master/README.md
async function outputFile (f, content) {
  try {
    await fs.outputFile(f, content)
  } catch (err) {
    console.error(err)
  }
}
async function main() {
  const homeBody = await handleRequestByPromise({ url: source_url });
  // homeBody = iconv.decode(homeBody,"GBK");
  outputFile(outputFileName, homeBody)
}

main();

function handleRequestByPromise(options) {
  const op = Object.assign(
    {
      url: "",
      method: "GET",
      encoding: null,
      header: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        Referer: "https://www.google.com"
      }
    },
    options
  );

  if (op.url === "") {
    throw new Error("The requested URL address is incorrect.");
  }

  const promise = new Promise(function(resolve, reject) {
    request(op, (err, response, body) => {
      if (err) reject(err);
      if (response && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(`Request✿✿✿${url}✿✿✿was aborted`);
      }
    });
  });

  return promise;
}



