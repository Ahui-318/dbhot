const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const fs =require('fs');


const app = express();
//表示接收post参数的格式是 以&拼接符传递的参数
// app.use(bodyParser.urlencoded())

// 该方法表示接收json格式参数
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, "public")));

app.get("/first", (req, res) => {
  res.send("hello ajax");
});
app.get("/responseData", (req, res) => {
  res.send({
    name: "zs",
  });
});
app.get("/get", (req, res) => {
  // req.query获取get请求参数
  res.send(req.query)
});
app.post("/post", (req, res) => {
  // req.body获取get请求参数
  res.send(req.body)
});
app.post("/json", (req, res) => {
  // req.body获取get请求参数
  res.send(req.body)
});
app.get("/state", (req, res) => {
  // req.query获取get请求参数
  res.send("hello")
});
app.get("/cache", (req, res) => {
  fs.readFile('./test.txt',(err, result)=>{
    if (err) {
      console.log('读取失败');
    }else{
      res.send(result)
    }
    
  })
});
app.listen(3300, function () {
  console.log("running...");
});
