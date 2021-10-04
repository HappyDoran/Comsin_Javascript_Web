var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template');
var app = express();;
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var auth = require('../lib/auth')
var shortid = require('shortid');

var db = require('../lib/db');
var shortid = require('shortid');

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일
let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분

var authData = {                   //사용자의 정보를 담은 객체
  email: `kirin2211@naver.com`,
  password: `tjehddnjs14`,   //해쉬와 비밀번호 암호화 작업 필요
  nickname: `Tuna`
}

router.get('/login', function (request, response) {
  var title = 'Login';
  // var list = template.list();
  var html = template.HTML(title, ` `, `
  <div class = "form">
  <h1>LOG-IN</h1>
  <form action="/login_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI">
    <input type = "password" name = "password" placeholder = "Password">
  </p>
  <p class = "UI">
    <input type="submit" value = "로그인">
  </p>
</form></div>
    ` , '');
  response.send(html);
});

router.get('/login/wrong', function (request, response) {
  var title = 'Login';
  // var list = template.list();
  var html = template.HTML(title, ` `, `
  <div class = "form">
  <h1>LOG-IN</h1>
  <p class = "message">ID 혹은 비밀번호를 다시 입력해주세요!</p>
  <form action="/login_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI">
    <input type = "password" name = "password" placeholder = "Password">
  </p>
  <p class = "UI">
    <input type="submit" value = "로그인">
  </p>
</form></div>
    ` , '');
  response.send(html);
});

router.get('/register', function (request, response) {
  var title = 'register';
  // var list = template.list();
  var html = template.HTML(title, ` `, `
  <div class = "form">
  <h1>REGISTER</h1>
  <form action="/register_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type = "password" name = "password2" placeholder = "Confirm Password"></p>
  <p class = "UI"><input type="text" name="displayName" placeholder="Display Name"></p>
  <p class = "UI"><input type="submit" value = "회원 가입"></p>
</form></div>
    `, '');
  response.send(html);
});

router.get('/register/wrong', function (request, response) {
  var title = 'register';
  // var list = template.list();
  var html = template.HTML(title, ` `, `
  <div class = "form">
  <h1>REGISTER</h1>
  <p class = "message">비밀번호가 일치하지 않습니다!</p>
  <form action="/register_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type = "password" name = "password2" placeholder = "Confirm Password"></p>
  <p class = "UI"><input type="text" name="displayName" placeholder="Display Name"></p>
  <p class = "UI"><input type="submit" value = "회원 가입"></p>
</form></div>
    `, '');
  response.send(html);
});

router.get('/logout', function (request, response) {
  request.session.destroy(function (err) {
    // request.logout();
    // request.session.save(function () {
    response.redirect('/');
  });
});

router.get('/Mainboard_Intel', function (request, response) {
  var title = 'COMSIN';
  var description = `<section class="content">
  <h1 "class="titlefont">Intel</h1>
  <div class="slideshow-container">
      <main>
          <div class="description">
              <div class="mySlides fade">
                  <h2>ASUS</h2>
                  <img id="description_img" src="img/ASUS.PNG" width="30%">
                  <h3>-장점-</h3>
                  현 메인보드 판매량 1위인 브랜드이며 뛰어난 안정성으로 하이엔드 컴퓨터와 <br>
                  오버클럭을 사용하는 이용자들이 선호하며 깔끔한 바이오스 UI는 누구나 쉽게 접근하기 <br>
                  좋습니다. CPU와 연관하여 인텔 또는 AMD에서 새 기준(소켓)을 발표할경우 누구보다 <br>
                  빠르게 새 기준을 적용시켜 출시합니다. 특히 Republic of Gamers 라인업의 메인보드는 <br>
                  특유의 외관과 RGB의 효과로인해 타 브랜드의 메인보드보다 멋지다는 평가도 있을정도입니다.<br><br>
                  <h3>-단점-</h3>
                  중, 고성능 라인업(Z시리즈) 메인보드는 타 브랜드에 비해 가격이 매우 <br>
                  비싸며 종류 또한 매우 많기때문에 쉽게 선택하기 어렵다는 단점이있습니다.

                  <div class="video">
                      <div class="video-container">
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/z1EeTlBmHgw"
                              title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen></iframe>
                      </div>
                  </div>
              </div>

              <div class="mySlides fade">
                  <h2>MSI</h2>
                  <img id="description_img" src="img/MSI.PNG" width="30%">

                  <h3>-장점-</h3>
                  중저가형 가성비 브랜드로 하이엔드면에서도 독보적인 GODLIKE 시리즈가 있으며 <br>
                  타브랜드 하이엔드 메인보드에 못지않은 디자인과 성능을 가지고있습니다.<br>
                  또한 가격대에비해 제품 구성이 훌륭하고 강화된 전원부 설계, 메모리의 호환성리스트를 <br>
                  공식홈페이지를 통해 모두 제공하여 타브랜드와의 높은 호환성을 자랑하고있습니다.<br>
                  <h3>-단점-</h3>
                  AS면에서 평가가 좋지않으며 오버클럭에대해서는 큰 성능을 발휘하기 어렵습니다.<br>

                  <div class="video">
                      <div class="video-container">
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/gv0s4UItrk0"
                              title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen></iframe>
                      </div>
                  </div>
              </div>

              <div class="mySlides fade">
                  <h2>ASROCK</h2>
                  <img id="description_img" src="img/ASROCK.PNG" width="30%">

                  <h3>-장점-</h3>
                  기존의 업체에서는 선보이지 않던 신개념 메인보드를 많이 출시하며 대표적인 예시로 <br>
                  DDR2 메모리와 DDR3메모리를 동시에 장착할 수 있는 메인보드를 선보이기도 했습니다.<br>
                  이처럼 신기술을 많이 적용시키는데 유명하고 전체적인 라인업을 봤을때 타 브랜드에 비해 <br>
                  가격면에서도 저렴하고 이에 비해 성능비는 최고수준이라고 알려져 있습니다.<br>
                  특히 고가형 라인업인 TAICHI 급 모델은 타브랜드에 밀리는 모습을 보인적이없습니다.<br>

                  <h3>-단점-</h3>
                  메인보드를 구성하는 각종 부품들은 중저가 제품들이 많이 사용되어서 안정성이 떨어지고<br>
                  초기불량이 있을수 있다는 점입니다.

                  <div class="video">
                      <div class="video-container">
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/oudHaxaa-GQ"
                              title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen></iframe>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  </div>
  <!-- <aside>혹시 몰라서 비워둔 부분</aside> -->
</section>
<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

<div class="dot_position">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div>
</div>
</body>
<script>
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
showSlides(slideIndex += n);
}

function currentSlide(n) {
showSlides(slideIndex = n);
}

function showSlides(n) {
var i;
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");
if (n > slides.length) { slideIndex = 1 }
if (n < 1) { slideIndex = slides.length }
for (i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
}
for (i = 0; i < dots.length; i++) {
  dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex - 1].style.display = "block";
dots[slideIndex - 1].className += " active";
}

</script>`;
  var list = template.list();
  var html = template.HTML(title, list,
    description, '', auth.StatusUI(request, response)
  );
  response.send(html);
});

router.get('/QnA', function (request, response) {
  var title = 'COMSIN';
  var QnAlist = template.QNAlist(request.list);
  var description = `
  <h1 "class="titlefont" 
  style = "font-size : 2rem; margin-left : 50px; color : black;">게시판</h1>
  <div class="slideshow-container">
      <main>
          ${QnAlist}
      </main>
  </div>
  <!-- <aside>혹시 몰라서 비워둔 부분</aside> -->

</div>
</body>
`;
  var list = template.list();
  var html = template.HTML(title, list,
    description, `<a style = "float: right; padding-right : 40px; font-size : 15px;" href="/QnA/create">글 작성</a>`, auth.StatusUI(request, response)
  );
  response.send(html);
});

router.get('/QnA/create', function (request, response) {
  var title = 'WEB - create';
  var list = template.list();
  var html = template.HTML(title, list, `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
      </form>
    `, ``,auth.StatusUI(request, response));
  response.send(html);
});

router.post('/create_process', function (request, response) {
  var post = request.body;
  var title = post.title;
  var description = post.description;
  // fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
  //   response.redirect(`/${title}`);
  // });
  var id = shortid.generate();
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let day = today.getDay();  // 요일
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  db.get('topics').push({
    id: id,
    title: title,
    description: description,
    user_id: request.user.id,
    displayName: request.user.displayName,
    today : today,
    year : year,
    month : month,
    date : date,
    day : day,  // 요일
    hours : hours, // 시
    minutes : minutes  // 분
  }).write();
  response.redirect(`/QnA/${id}`);
});

router.get('/update/:pageId', function (request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      ``,
      `<a href="/create">create</a> <a href="/update/${title}">update</a>`
    );
    response.send(html);
  });
});

router.post('/update_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function (error) {
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      response.redirect(`/${title}`);
    })
  });
});

router.post('/delete_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function (error) {
    response.redirect('/');
  });
});


router.get('/QnA/:pageId', function (request, response, next) {
  var topic = db.get('topics').find({ id: request.params.pageId }).value();
  var sanitizedTitle = sanitizeHtml(topic.title);
  var sanitizedDescription = sanitizeHtml(topic.description, {
    allowedTags: ['h1']
  });
  var user = db.get('users').find({ id: topic.user_id }).value();
  var list = template.list();
  var html = template.HTML(sanitizedTitle, list,
    `
    <h2 class = "titlefont" style = "font-size : 1.5rem; margin-left : 50px; color : black;">${sanitizedTitle}</h2>
    <p style = "margin-left : 50px">${user.displayName}</p>
    <p style = "margin-left : 50px">${topic.year+ '.'+ topic.month + '.' + topic.date + '   ' + topic.hours+ ':'+ topic.minutes}</p>
        <main>
        <div class = "description" style = "padding : 30px; padding-top : 0px">
        ${sanitizedDescription}
        </div>
        </main>
        `,
    ``,auth.StatusUI(request, response)
  );
  response.send(html);

});
module.exports = router;