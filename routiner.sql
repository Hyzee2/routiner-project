CREATE TABLE member(
  id varchar(30) PRIMARY KEY,
  name varchar(30) NOT NULL,
  password varchar(30) NOT NULL,
  birthdate date not null,
  favorite_id int not null,
  join_date date not null,
  manager_status int not null check(manager_status in (0,1))
  );
 CREATE TABLE routine(
  r_id int PRIMARY key,
  r_name varchar(30) NOT NULL,
  cate_id int not null,
  cate_name varchar(30) NOT NULL
  );
 insert into routine values
  (1,'아침에 물 한잔',1,'health'),
  (2,'영양제 챙겨먹기',1,'health'),
  (3,'하루 5천보 이상 걷기',1,'health'),
  (4,'저녁 2km 러닝',1,'health'),
  (5,'스쿼트 30개',1,'health'),
  (6,'아침 명상하기',2,'selfcare'),
  (7,'하루 한끼 가볍게 먹기',2,'selfcare'),
  (8,'밥먹고 10분 산책하기',2,'selfcare'),
  (9,'감사일기 쓰기',2,'selfcare'),
  (10,'선크림 바르기',2,'selfcare'),
  (11,'집오면 바로 씻기',3,'life'),
  (12,'내일 입을 옷 준비해놓기',3,'life'),
  (13,'목표 시간에 눕기',3,'life'),
  (14,'침대에서 핸드폰 30분만!',3,'life'),
  (15,'설거지 바로 하기',3,'life'),
  (16,'출근길 뉴스레터 읽기',4,'improve'),
  (17,'오전 20분간 책읽기',4,'improve'),
  (18,'저녁 전화영어',4,'improve'),
  (19,'퇴근 후 15분 영어공부',4,'improve'),
  (20,'관심분야 콘텐츠 1개 공부',4,'improve');
 CREATE TABLE mem_routine(
  mem_id varchar(30),
  r_id int,
  start_date date not null,
  primary key(mem_id, r_id)
  );
 delete from mem_routine;
 CREATE TABLE mem_r_check(
  mem_id varchar(30),
  r_id int,
  check_date date not null,
  checkYn int check(checkYn in (0,1)),
  primary key(mem_id, r_id, check_date)
  );
 CREATE TABLE board(
  board_num int auto_increment primary key,
  mem_id varchar(30) not null,
  cate_id int not null,
  title varchar(30) not null,
  contents varchar(500) not null,
  w_date timestamp not null,
  deleteYn int default 0 check(deleteYn in (0,1) )
  );
INSERT INTO board (mem_id, cate_id, title, contents, w_date) VALUES
('abc@kakao.com', 1, '러닝 페이스 조절하는법', '체력에 맞게 알아서 하세요', now()),
('gogo@kakao.com', 1, '하루에 얼마나 걸으세요?', '난20000 그럼 20000', now()),
('google@kakao.com', 1, '드디어 루틴 100%달성', '오늘 시작함ㅎㅎㅎ', now()),
('ㅋㅋ', 1, '종합비타민이랑 비타민c 같이 먹지마라..', '건강한 사람된다...나만먹을거임', now()),
('억지로운동', 1, '출근을 달리기로 해봤더니.jpg', '달려서 출근한 사람됨', now()),
('gogo@kakao.com', 2, '하루3잔 물마시기 성공하는법', '하루에 물을 3잔씩 마시면 됩니다.', now()),
('sweethome@kakao.com', 2, '감사일기를 쓰니 좋다', '매사에 감사하다', now()),
('화이팅', 2, '선크림 바르고나서 생긴 변화', '선크림 바른 사람이 됨', now()),
('ㅇㅇ', 2, '스마트폰을 멀리하세요', '문명에서 뒤쳐진 사람이 됩니다', now()),
('ESG맨', 2, '환경을 생각한다면', '숨을 조금만 쉬어서 이산화탄소를 줄여봐요', now()),
('whyrano@kakao.com', 3, '밥먹고 바로 설거지하기 시러요', '하지만 그렇다면 냄새나고 벌레가 꼬이겠지', now()),
('냥냥', 3, '수면안대의 효능', '누워서 폰을 안보게돼요', now()),
('mz_power@kakao.com', 3, 'OOTD 평가좀', '어떰? 평가좀...', now()),
('댕댕', 4, '전화영어 업체추천', '전화영어는 역시 야너두', now()),
('goodgood', 4, 'MZ특) 책대신 유튜브봄', '유튜브로 책 20분컷 뚝딱 ㅇㅈ?', now()),
('sjst@kakao.com', 4, '아래아래 추천글 광고임', '비추준다', now()),
('mz_power@kakao.com', 4, '님들 뉴진스 해체해요?', '절대지켜', now()),
('abc', 4, '개발자가 되고싶은데...', '외환전문역1종 자격증 도움되나요?', now());
