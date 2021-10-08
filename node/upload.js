let express = require('express');
let cors = require('cors');
let path = require('path');
let multiparty = require('multiparty');


let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

let uploadDir = `${__dirname}/public/upload`;


function handleMultiparty(req,res,temp) {
    return new Promise((resolve,reject) => {
        let options = {
            maxFieldSize:2*1024*1024
        }
        !temp ? options.uploadDir = uploadDir : null;
        let form = new multiparty.Form(options);
        form.parse(req, function (err,fields,files) {
            if (err) {
                res.send({
                    code: 3,
                    reason:err
                });
                reject(err);
                return;
            }
            resolve({
                fields,
                files
            });
        });
    });
}
app.post("/a",(req,res)=>{
  console.log("来了")
  res.send({
    name:"王金玉"
  })
})
app.post('/upload', async (req,res) => {
    let { files } = await handleMultiparty(req,res);
    let file = files.file[0];
    let filePath = file.path.replace(__dirname, 'http://localhost:5000');
    filePath = filePath.replace(/\\public/, '');
    res.send({
        code: 0,
        originalFilename: file.originalFilename,
        path: filePath,
    });
});
app.listen(5000, function () {
    console.log('express 服务启动成功！');
});


