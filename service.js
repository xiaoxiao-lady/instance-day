const express = require("express");

const app = express();
app.get("/say", function(req, res) {
  const { callback } = req;
  res.end(`${callback}('结果')`);
});
console.log(app);
app.listen(3000, function() {
  console.log("请求来了");
});
