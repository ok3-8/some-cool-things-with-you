
const request = require("request");

function handleRequestByPromise(options) {
  const op = Object.assign(
    {},
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
    throw new Error("请求的url地址不正确");
  }

  const promise = new Promise(function(resolve, reject) {
    request(op, (err, response, body) => {
      if (err) reject(err);

      if (response && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(`请求✿✿✿${url}✿✿✿失败`);
      }
    });
  });

  return promise;
}

export default handleRequestByPromise;
// module.exports = handleRequestByPromise