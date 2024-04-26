// 함수 선언
const express = require('express'); // Node.js 기반으로 서버를 구동하게 해주는 플러그인 
const app = express(); 
const cors = require('cors'); // cors 설정하는 변수 
const bodyParser = require('body-parser'); // POST 방식으로 보내기 위한 변수 선언 
const mysql = require('mysql2'); // DB와 연동하는 변수 선언 
const connection  = mysql.createConnection({
    host: 'localhost', // DB가 있는 IP주소 입력
    port: 3306,
    user: 'root', // DB계정명
    password: 'qwe123!@#',
    database: 'routiner' 
})


// 함수 실행
connection.connect(); // DB 구동

app.listen(3000, function(){ // 서버 열기 
    console.log('node Start');
})

app.use(cors()); // CORS policy 수정: 모든 클라이언트로부터 서버 접근 허용
app.use(express.json());
app.use(bodyParser.json()); // POST는 보통 body영역에 넣어서 보내므로 json으로 값 추출
app.use(bodyParser.urlencoded({extended:true})); // 한글 깨짐 방지 

app.get('/query3', (req, res) => { // 로그인 id와 pw DB에서 가져와서 확인
    console.log(req.query);
    console.log('query');

    let responseData = {};
    let id = req.query.id;
    let pw = req.query.pw;

    let query = 'SELECT * FROM MEMBER WHERE id = ? AND password = ?';

    connection.query(query, [id, pw], (err, rows) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        if(rows[0]){
            console.log(rows[0]);
            responseData.data = rows; // get은 비동기로 처리 되기 때문에 쿼리 결과는 if문에 작성해준다. 
            responseData.state = 'ok';
        } else{
            responseData.state = 'none'; // 쿼리 실행 성공은 했지만 결과 값이 없을 때. else 조건 안 붙여주면 무한 루프
        }

        res.json(responseData); // 클라이언트가 받을 수 있도록 res에 json으로 담아준다.
    })      
}) 

app.get('/query4', (req, res) => { // 사용자 id 별 루틴 항목이 존재하는지 확인 -> VueX 연결해야됨...
    console.log(req.query);
    console.log('query');

    let responseData = {};
    let id = req.query.userId;

    let query = 'SELECT * FROM mem_routine WHERE id = ?';

    connection.query(query, [id], (err, rows) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        if(rows[0]){
            console.log(rows[0]);
            responseData.data = rows; // get은 비동기로 처리 되기 때문에 쿼리 결과는 if문에 작성해준다. 
            responseData.state = 'ok';
        } else{
            responseData.state = 'none'; // 쿼리 실행 성공은 했지만 결과 값이 없을 때. else 조건 안 붙여주면 무한 루프
        }

        res.json(responseData); // 클라이언트가 받을 수 있도록 res에 json으로 담아준다.
    })      
}) 

app.get('/query5', (req, res) => { // 루틴 카테고리별 리스트 가져오기 
    console.log(req.query);
    console.log('query');

    let responseData = {};
    let cate_id = req.query.cate_id;

    let query = 'SELECT * FROM routine WHERE cate_id = ?';

    connection.query(query, [cate_id], (err, rows) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 

        if(rows[0]){
            console.log(rows[0]);
            responseData.data = rows; // get은 비동기로 처리 되기 때문에 쿼리 결과는 if문에 작성해준다. 
            responseData.state = 'ok';
        } else{
            responseData.state = 'none'; // 쿼리 실행 성공은 했지만 결과 값이 없을 때. else 조건 안 붙여주면 무한 루프
        }  

        res.json(responseData); // 클라이언트가 받을 수 있도록 res에 json으로 담아준다.
    })      
}) 

app.post('/routin_joinUs', (req, res) => { // 회원가입 시 중복 허용 여부 
    let data = req.body;
    console.log("===================================");
    console.log(data);
    let id = data.id;
    let name = data.name;
    let password = data.password;
    let birthdate = data.birthdate;
    let favorite_id = data.favorite_id;
    let checkQuery = 'SELECT COUNT(*) AS count FROM member WHERE id = ?';
    let insertQuery = 'INSERT INTO member VALUES (?, ?, ?, ?, ?, CURDATE(), 0)';
    connection.query(checkQuery, [id], (err, result, fields) => {
        if(err) {
            console.error(err);
            res.status(500).send("회원가입 도중 오류가 발생했습니다.");
        } else {
            // 중복 아이디가 존재하는 경우
            if (result[0].count > 0) {
                res.status(400).send("중복된 아이디가 있습니다.");
            } else {
                // 중복 아이디가 없는 경우 회원가입 처리
                connection.query(insertQuery, [id, name, password, birthdate, favorite_id], (err, result, fields) => {
                    if(err) {
                        console.error(err);
                        res.status(500).send("회원가입 도중 오류가 발생했습니다.");
                    } else {
                        console.log(result);
                        res.send("회원가입이 완료되었습니다.");
                    }
                });
            }
        }
    });
});

app.post('/kakao-member', (req, res) => {
    let data = req.body;
    console.log("이건 첫번째"+data);
    let id = data.id;
    let name = data.name;
    console.log('서버까지 진입함');
    // 먼저 해당 kakaoId의 사용자가 있는지 확인
    const checkQuery = `SELECT * FROM member WHERE id = ?`;
    connection.query(checkQuery, [id], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Database check error:', checkErr);
        res.status(500).send('Database check error');
        return;
      }
      if (checkResults.length > 0) {
        // 이미 존재하는 회원, 기존 데이터 반환
        res.json({
          status: 'exists',
          data: checkResults[0]
        });
      } else {
        // 새로운 회원, 데이터베이스에 삽입
        const insertQuery = 'INSERT INTO member VALUES (?,?,1,19000101, 1, curdate(), 0)';
        connection.query(insertQuery, [id, name], (insertErr, insertResults) => {
          if (insertErr) {
            console.error('Database insert error:', insertErr);
            res.status(500).send('Database insert error');
            return;
          }
          res.send('Member saved successfully');
        });
      }
    });
  });

  app.get('/RoutineList', (req, res) => { // 로그인한 사용자의 등록된 루틴 리스트 가져오기 
    console.log(req.query);
    console.log('위에 쿼리 나옴');
    console.log(req.query.mem_id);

    let responseData = {};
    let mem_id = req.query.mem_id;

    let query = `SELECT substring_index(tt.mem_id, '@', 1) as mem_id, tt.r_id, tt.r_name, curdate() as check_date, COALESCE(mrc.checkYn, 0) AS checkYn from (select mr.mem_id, mr.r_id, rt.r_name from mem_routine mr join routine rt on mr.r_id = rt.r_id where mem_id = ?) tt LEFT JOIN (SELECT mem_id, r_id, COALESCE(checkYn, 0) AS checkYn FROM mem_r_check WHERE check_date = curdate()) AS mrc ON tt.mem_id = mrc.mem_id AND tt.r_id = mrc.r_id where tt.mem_id= ?`;

    connection.query(query, [mem_id, mem_id], (err, rows) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        if(rows[0]){
            console.log("성공하면 결과들이 나와야 하는데",rows);
            responseData.data = rows; // get은 비동기로 처리 되기 때문에 쿼리 결과는 if문에 작성해준다. 
            responseData.state = 'ok';
        } else{
            responseData.state = 'none'; // 쿼리 실행 성공은 했지만 결과 값이 없을 때. else 조건 안 붙여주면 무한 루프
        }

        res.json(responseData); // 클라이언트가 받을 수 있도록 res에 json으로 담아준다.
    })      
}) 

app.post('/check-insert', (req, res) => { // 체크하면 insert 
    let data = req.body; // POST 방식은 body에 데이터 담긴다
    console.log("진짜로 데이터가 왔나?(인서트)", data);
    let mem_id = data.mem_id;
    let r_id = data.r_id;
    let checkYn = data.checkYn;
    console.log(mem_id, r_id, checkYn);

    let query = 'insert into mem_r_check (mem_id, r_id, check_date, checkYn) values (?, ?, curdate(), ?)';

    connection.query(query, [mem_id, r_id, checkYn], (err, result, fields) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // insert, delete 구문은 여러 값을 받아올 필요가 없으므로 rows 삭제. 성공/실패 여부만 가져오면 된다
        
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        console.log("이건 성공 결과", result);
       
    })      
}) 

app.post('/check-update', (req, res) => { // 체크하면 update 
    let data = req.body; // POST 방식은 body에 데이터 담긴다
    console.log("진짜로 데이터가 왔나?(업데이트)", data);
    let mem_id = data.mem_id;
    let r_id = data.r_id;
    let checkYn = data.checkYn;
    console.log(r_id, checkYn);

    let query = 'update mem_r_check set checkYn = ? where r_id = ? and mem_id =? and check_date=curdate()';

    connection.query(query, [checkYn, r_id, mem_id], (err, result, fields) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // insert, delete 구문은 여러 값을 받아올 필요가 없으므로 rows 삭제. 성공/실패 여부만 가져오면 된다
        
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        console.log("이건 성공 결과", result);
       
    })      
}) 

app.get('/check-select', (req, res) => { // check 하기전에 기존 정보가 존재하는지 조회 
    console.log(req.query);
    console.log('위에는 체크한 이력이 있는 지 확인하기 위해 받아온 req');

    let responseData = {};
    let mem_id = req.query.mem_id;
    let r_id = req.query.r_id;
    
    let query = 'SELECT * FROM mem_r_check WHERE mem_id =? and r_id = ? and check_date = curdate()';

    connection.query(query, [mem_id, r_id], (err, rows) => { // [] 배열 안은 ?의 값을 받아올 변수 
        // DB 작성할 때 아래 부분은 수정 필요 없음 
        if(err) throw err; // 실패시 
        if(rows[0]){
            console.log(rows[0]);
            responseData.data = rows; // get은 비동기로 처리 되기 때문에 쿼리 결과는 if문에 작성해준다. 
            responseData.state = 'ok';
        } else{
            responseData.state = 'none'; // 쿼리 실행 성공은 했지만 결과 값이 없을 때. else 조건 안 붙여주면 무한 루프
        }

        res.json(responseData); // 클라이언트가 받을 수 있도록 res에 json으로 담아준다.'
      
    })      
}) 

// 루틴선택하면 db에 저장되는거
app.post('/insert_selroutine', (req, res) => {
    let data = req.body;
    console.log(data);
    let userId = data.id;
    let r_ids = data.routines;
    console.log(userId, r_ids);
    r_ids.forEach(r_id => {
      let query = 'INSERT INTO mem_routine VALUES (?, ?, curdate())';
      connection.query(query, [userId, r_id], (err, result, fields) => {
        if(err) throw err;
        console.log(result);
      });
    });
    res.send('데이터가 성공적으로 저장되었습니다.');
  });

  app.get('/select_favorite', (req, res) => { // 루틴 추천
    console.log("====================================================================");
    console.log(req.query);
    let resData = {};
    let id = req.query.id;
    let query = 'select favorite_id from member where id=?';
    connection.query(query, [id], (err, rows) => {
        if(err) throw err;
        if(rows[0]) {
            console.log(rows[0]);
            resData.data = rows[0].favorite_id;
            resData.state = 'ok';
            res.json(resData);
        } else {
            resData.state = 'none';
            res.json(resData);
        }
    })
})

// 캘린더 조회하는거
app.get('/select_calendar', (req, res) => {
    let resData = {};
    let id = req.query.id;
    let date = req.query.date;
    // let query = 'select mrc.mem_id, mrc.r_id, mrc.check_date, mrc.checkYn, rt.r_name from mem_r_check mrc join routine rt on mrc.r_id = rt.r_id where mem_id = ? and check_date = ?';
    let query = 'SELECT tt.mem_id, tt.r_id, tt.r_name, COALESCE(mrc.checkYn, 0) AS checkYn from (select mr.mem_id, mr.r_id, rt.r_name from mem_routine mr join routine rt on mr.r_id = rt.r_id where mem_id = ?) tt LEFT JOIN (SELECT mem_id, r_id, COALESCE(checkYn, 0) AS checkYn FROM mem_r_check WHERE check_date = ?) AS mrc ON tt.mem_id = mrc.mem_id AND tt.r_id = mrc.r_id where tt.mem_id=?';
    // connection.query(query, [id, date], (err, rows) => {
        connection.query(query, [id, date, id], (err, rows) => {
        if(err) throw err;
        if(rows[0]) {
            resData.data = rows;
            resData.state = 'ok';
            res.json(resData);
        } else {
            resData.state = 'none';
            res.json(resData);
        }
    })
})

// Board의 주제별로 글제목 등 정보를 가져오는 API
 app.get('/boards/category/:cate_id', (req, res) => {
   const { cate_id } = req.params;
   console.log(cate_id);
   const query = `SELECT board_num, title, SUBSTRING_INDEX(mem_id, '@', 1) as mem_id, contents, DATE_FORMAT(w_date, '%y/%m/%d') as w_date FROM board WHERE cate_id = ? AND deleteYN = '0' order by board_num desc`;
   connection.query(query, [cate_id], (err, results) => {
     if (err) {
       console.error('Database query error:', err);
       res.status(500).send('Database query error');
       return;
     }
    //  if(results[0]){
      let obj = {};
      obj.data = results;
      res.json(obj);
      console.log(obj.data);
    //  }
    //  res.json(results);
   });
 });
 
  // Board 데이터를 가져오는 API
app.get('/boards/num/:board_num', (req, res) => {
  const { board_num } = req.params;
  console.log('글 contents 불러오기 test');
  // console.log(req);
  const query = `SELECT board_num, title, SUBSTRING_INDEX(mem_id, '@', 1) as mem_id, contents, DATE_FORMAT(w_date, '%y/%m/%d %h:%i:%s') as w_date FROM board  WHERE board_num = ? AND deleteYN = '0'`;
  connection.query(query, [board_num], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Database query error');
      return;
    }
    console.log('글정보는 server에서 이렇게 보냅니다: ');
    let obj = {};
    obj.data = results;
    res.json(obj);
    console.log(obj.data);
  });
});

 app.post('/boards_write', (req, res) => {
   console.log('일단 boards_write까지 진입성공');
   const { title, content, tags } = req.body;
   console.log('Received new post:', title, content, tags);
   res.status(201).send('Post created successfully');
 });

 // 게시판 저장하는거
 app.post('/insert_boards', (req, res) => {
    let data = req.body;
    let id = data.id;
    let cate = data.cate;
    let title = data.title;
    let contents = data.contents;
    console.log("title은??", title);
      let query = 'insert into board (mem_id, cate_id, title, contents, w_date, deleteYn) values (?, ?, ?, ?, curdate(), 0)';
      connection.query(query, [id, cate, title, contents], (err, result, fields) => {
        if(err) throw err;
        console.log(result);
      });
      res.send('데이터가 성공적으로 저장되었습니다.');
    });

    // 내가쓴글인지 조회
    app.get('/board_id', (req, res) => {
        let data = req.query;
        console.log("여기여기", req.query);
        let id = data.id;
        let boardNum = data.boardNum;
        let query1 = 'select mem_id from board where mem_id=? and board_num=?';
        let obj = {};
        connection.query(query1, [id, boardNum], (err, row) => {
            if(err) throw err;
            console.log('row', row);
            console.log('row',row[0]);
            if(row[0]) {
                obj.yn = 'Y';
                obj.state = 'ok';
            } else {
                obj.yn = 'N';
                obj.state = 'none';
            }
            res.json(obj);
        });
    });
     // 게시판 삭제하는거
 app.post('/delete_boards', (req, res) => {
    let data = req.body;
    let id = data.id;
    let boardNum = data.boardNum;
    console.log("boardNum??", boardNum);
      let query2 = 'update board set deleteYn = 1 where board_num = ?';
            connection.query(query2, [boardNum], (err, result, fields) => {
                if(err) {
                    console.error(err);
                    res.status(500).send("글 삭제가 정상적으로 처리되지 않았습니다.");
                } else {
                    console.log(result);
                    res.send("글이 삭제되었습니다.");
                }
            })
});