const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const connection = mysql.createConnection({
     host: 'localhost'
   , port: 3306
   , user: 'root'
   , password: 'qwe123!@#'
   , database: 'routiner'
})

connection.connect();

app.use(cors());               // 모든 client에서 접속을 허용한다는 의미
app.use(bodyParser.json());    // POST방식은 body 영역에 넣어서 보내니까 json 으로 값 추출하기 위해 쓴다는 뜻
app.use(bodyParser.urlencoded({ extended: true }));   // body에서 꺼내면서 한글 깨지는거 방지


app.listen(3000, function () {
   console.log('node Start');
});

app.get('/query', (req, res) => {
    console.log('query');
    let responseData = {};
    connection.query('select * from board', (err,rows)=>{
       if(err) throw err;      // 실패하면 err 문구 던져줌
       if(rows[0]){
          console.log(rows[0]);
          responseData.data = rows;
          responseData.state = 'ok';
       } else{
          responseData.state = 'none';
       }
 
       res.json(responseData);
    });
 })