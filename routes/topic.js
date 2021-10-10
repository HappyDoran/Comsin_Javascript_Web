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

router.get('/login', function (request, response) {
  var title = 'LOG-IN';
  var description = `
  <div class = "form">
  <h1>${title}</h1>
  <form action="/login_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type="submit" value = "로그인"></p>
  </form></div>
    `;
  var html = template.HTML(title, ``, description, ``, auth.StatusUI(request, response), auth.RegisterUI(request, response));
  response.send(html);
});

router.get('/login/wrong', function (request, response) {
  var title = 'LOG-IN';
  var description = `
  <div class = "form">
  <h1>${title}</h1>
  <p class = "message">ID 혹은 비밀번호를 다시 입력해주세요!</p>
  <form action="/login_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type="submit" value = "로그인"></p>
  </form></div>
    `;
  var html = template.HTML(title, ``, description, ``, auth.StatusUI(request, response), auth.RegisterUI(request, response));
  response.send(html);
});

router.get('/register', function (request, response) {
  var title = 'REGISTER';
  var description = `
  <div class = "form">
  <h1>${title}</h1>
  <form action="/register_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type = "password" name = "password2" placeholder = "Confirm Password"></p>
  <p class = "UI"><input type="text" name="displayName" placeholder="Display Name"></p>
  <p class = "UI"><input type="submit" value = "회원 가입"></p>
  </form></div>
    `;
  var html = template.HTML(title, ``, description, ``, auth.StatusUI(request, response), auth.RegisterUI(request, response));
  response.send(html);
});

router.get('/register/wrong', function (request, response) {
  var title = 'REGISTER';
  var description = `
  <div class = "form">
  <h1>${title}</h1>
  <p class = "message">비밀번호가 일치하지 않습니다!</p>
  <form action="/register_process" method="post" style = "text-align : center">
  <p class = "UI"><input type="text" name="email" placeholder="E-mail"></p>
  <p class = "UI"><input type = "password" name = "password" placeholder = "Password"></p>
  <p class = "UI"><input type = "password" name = "password2" placeholder = "Confirm Password"></p>
  <p class = "UI"><input type="text" name="displayName" placeholder="Display Name"></p>
  <p class = "UI"><input type="submit" value = "회원 가입"></p>
  </form></div>
    `;
  var html = template.HTML(title, ``, description, ``, auth.StatusUI(request, response), auth.RegisterUI(request, response));
  response.send(html);
});

router.get('/logout', function (request, response) {
  request.session.destroy(function (err) {
    response.redirect('/');
  });
});

router.get('/Mainboard_Intel', function (request, response) {
  var title = 'COMSIN';
  var list = template.list();
  var description = `
  <h1 "class="titlefont" 
  style = "font-size : 2rem; margin-left : 50px; color : black;">Intel</h1>
  <section class="content">
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
  if (auth.IsOwner(request, response) == true) {
    var html = template.HTML(title, list,
      description, ``, auth.StatusUI(request, response), ``
    );
    response.send(html);
  }
  else {
    var html = template.HTML(title, list,
      description, ``, auth.StatusUI(request, response), auth.RegisterUI(request, response)
    );
    response.send(html);
  }
});

router.get('/QnA', function (request, response) {
  var title = 'COMSIN';
  var QnAlist = template.QNAlist(request.list);
  var list = template.list();
  var description = `
  <h1 "class="titlefont" 
  style = "font-size : 2rem; margin-left : 50px; color : black;">게시판</h1>
  <div class="slideshow-container">
      <main>
      <div class="description">
          ${QnAlist}
      </div>
      </main>
  </div>`;
  if (auth.IsOwner(request, response) == true) {
    var html = template.HTML(title, list,
      description, `<a style = "float: right; padding-right : 40px; font-size : 15px;" href="/QnA/create">글 작성</a>`,
      auth.StatusUI(request, response), ``
    );
    response.send(html);
  }
  else {
    var html = template.HTML(title, list,
      description, `<a style = "float: right; padding-right : 40px; font-size : 15px;" href="/login"  onclick="alert('로그인을 하신 후 이용해 주시기 바랍니다.');">글 작성</a>`,
      auth.StatusUI(request, response), auth.RegisterUI(request, response)
    );
    response.send(html);
  }
});

router.get('/QnA/create', function (request, response) {
  var title = 'WEB - create';
  var list = template.list();
  var html = template.HTML(title, list, `
          <div class = "description" style = "padding : 30px; padding-top : 0px">
          <div style = "padding : 20px; text-align : left">
          <form action="/create_process" method="post">
          <p class = "UI"><input type="text" name="title" placeholder="제목"></p>
          <p class = "UI"><textarea name="description" style="width:100%; height:100%;" placeholder="본문을 남겨주세요!"></textarea></p>
          <p class = "UI"><input type="submit" value = "완료" style = "width : 10%; float : right; margin-right : 15px;"></p>
          </form>
          </div>
          </div>
    `, ``, auth.StatusUI(request, response), ``);
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
    today: today,
    year: year,
    month: month,
    date: date,
    day: day,  // 요일
    hours: hours, // 시
    minutes: minutes  // 분
  }).write();
  response.redirect(`/QnA/${id}`);
});

router.post('/comment_process', function (request, response) {
  var post = request.body;
  console.log(post);
  var description = post.description;
  console.log(description);
  var topic_id = post.title;
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
  db.get('comment').push({
    id: id,
    description: description,
    topic_id: topic_id,
    user_id: request.user.id,
    displayName: request.user.displayName,
    today: today,
    year: year,
    month: month,
    date: date,
    day: day,  // 요일
    hours: hours, // 시
    minutes: minutes  // 분
  }).write();
  response.redirect(`/QnA/${topic_id}`);
});

router.get('/QnA/update/:pageId', function (request, response) {
    var topic = db.get('topics').find({id : request.params.pageId}).value();
    var title =topic.title;
    var description = topic.description;
    console.log(description);
    var list = template.list();
    var html = template.HTML(title, list, `
    <div class = "description" style = "padding : 30px; padding-top : 0px">
    <div style = "padding : 20px; text-align : left">
    <form action="/update_process" method="post">
    <p class = "UI"><input type="text" name="title" placeholder="제목" value = "${title}"></p>
    <p class = "UI"><textarea name="description"  value = ${description} style="width:100%; height:100%;" placeholder="본문을 남겨주세요!"></textarea></p>
    <p class = "UI"><input type="submit" value = "완료" style = "width : 10%; float : right; margin-right : 15px;"></p>
    </form>
    </div>
    </div>
    `, ``, auth.StatusUI(request, response), ``);
    response.send(html);
});

router.post('/update_process', function (request, response) {
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
    today: today,
    year: year,
    month: month,
    date: date,
    day: day,  // 요일
    hours: hours, // 시
    minutes: minutes  // 분
  }).write();
  response.redirect(`/QnA/${id}`);
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
  // var loger = db.get('users').find({id:id}).value();
  var user = db.get('users').find({ id: topic.user_id }).value();
  var list = template.list();
  var QnAlist = template.QNAlist(request.list);
  var comment = template.Commentlist(request.comment, topic.id);
  // console.log(topic.id); //페이지 아이디
  // console.log(user.id); // 작성자 코드
  // console.log(topic.user_id); //글쓴 사람 코드
  if (auth.IsOwner(request, response) == true) {
    // console.log(request.user.displayName);
    var html = template.HTML(sanitizedTitle, list,
      `
      <h2 class = "titlefont" style = "font-size : 1.5rem; margin-left : 50px; color : black;">${sanitizedTitle}</h2>
      <p style = "margin-left : 50px">${user.displayName}</p>
      <p style = "margin-left : 50px">${topic.year + '.' + topic.month + '.' + topic.date + '   ' + topic.hours + ':' + topic.minutes}</p>
          <main>
          <div class = "description" style = "padding : 30px; padding-top : 0px">
          <div style = "padding : 20px; text-align : left">
          ${sanitizedDescription}
          </div>
          </div>
          </main>
          <div class = "comment">
          ${comment}
          <form action="/comment_process" method="post">
          <p class = "UI"><textarea name="description" placeholder="댓글 작성란" style="width:100%; height:15%;"></textarea></p>
          <p class = "UI"><input type="text" name="title" placeholder="제목" value = "${topic.id}" style = "display : none;"></p>
          <p class = "UI"><input type="submit" value = "완료" style = "width : 10%; float : right; margin-right : 15px;"></p>
          </form>
          </div>
         <div style = "padding : 20px; text-align : left">
          ${QnAlist}
          </div>
          `,
      ``, auth.StatusUI(request, response), ``
    );
    response.send(html);
  }
  else {
    var html = template.HTML(sanitizedTitle, list,
      `
      <h2 class = "titlefont" style = "font-size : 1.5rem; margin-left : 50px; color : black;">${sanitizedTitle}</h2>
      <p style = "margin-left : 50px">${user.displayName}</p>
      <p style = "margin-left : 50px">${topic.year + '.' + topic.month + '.' + topic.date + '   ' + topic.hours + ':' + topic.minutes}</p>
          <main>
          <div class = "description" style = "padding : 30px; padding-top : 0px">
          <div style = "padding : 20px; text-align : left">
          ${sanitizedDescription}
          </div>
          </div>
          </main>
          <div class = "comment">
          ${comment}
          <p class = "UI" style = "font-weight : bold; font-size : 13px;" >댓글을 작성하려면 로그인 해주세요.</p>
          <div style = "padding : 20px; text-align : left">
          ${QnAlist}
          </div>
          </div>
          `,
      ``, auth.StatusUI(request, response), auth.RegisterUI(request, response)
    );
    response.send(html);
  }
});

module.exports = router;