var db = require('./db')
let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일
let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분

module.exports = {
    HTML: function (title, list, body, control,
        StatusUI = '<a href="/login">로그인</a>'
        , RegisterUI = '<a href="/register">회원 가입</a>',) {
        return `
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/static/style.css">
        <link rel="stylesheet" href="/static/default.css">
        <title>Comsin-컴퓨터에 대한 모든 정보!</title>
        <!-- <div class="login"><a href="/login">로그인</a></div>
        <div class="login"><a href="/register">회원 가입</a></div> -->
        <br><br><br>
        <link rel="shortcut icon" href="/path/to/favicon.ico">
        <link rel="shortcut icon" type="image/x-icon" href="/img/logo.png">
        <div class="titlefont">
            <!-- <a href="/">
                <h1 style=" font-size : 75px; margin-bottom : 0px; color : black">COMSIN</h1>
                <h4 style="color : black">컴퓨터에 대한 모든 정보를 담았다!</h4>
            </a> -->
        </div>
        <!--<div id="title"><a href = "/"><img src = "/img/title_logo_2.png"></a></div> -->
    </head>

      <body>
        <header>
        <h1><a href="/">COMSIN</a></h1>
        <nav class = "lnb">
        ${list}
        </nav>
        <nav class="spot">
            <ul>
            <li>${StatusUI}</li>
            <li>${RegisterUI}</LI>
            </ul>
        </header>
        <section class="content">
        ${body}
        </section>
        ${control}
      </body>
      <br>
      <footer>
      <div class="top">
          <div class = "clear">
              <ul>
                  <li><a href="#a">팀원1</a></li>
                  <li><a href="#a">팀원2</a></li>
                  <li><a href="#a">팀원3</a></li>
                  <li><a href="#a">팀원4</a></li>
              </ul>
              <div>
                  <p>질의 문의<strong>080-777-2299</strong></p>
                  <select>
                      <option>COMSIN</option>
                  </select>
              </div>
          </div>
      </div>
      <div class="btm">
          <p>한솔홈데코</p>
          <ul>
              <li>충청남도 천안시 동남구 백석대학로 1</li>
              <li>Tel 080-777-2299</li>
              <li>개인정보취급관리자 강준모</li>
              <li>email - Comsin@naver.com </li>
          </ul>
          <address>컴신© Copyright 2021, All Rights Reserved</address>
      </div>
  </footer>
      </html>
      `;


    }, list: function () {
        return `
        <ul>
                <li>
                    <a href="introduce.html" class="dropbtn" style="color : rgb(30,80,133)">팀 소개</a>
                </li>
                <li class="dropdown">
                    <a href="CPU.html" class="dropbtn" style="color : rgb(30,80,133)">CPU</a>
                    <div class="dropdown-content">
                        <a href="#">CPU1</a>
                        <a href="#">CPU2</a>
                        <a href="#">CPU3</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="RAM.html" class="dropbtn" style="color : rgb(30,80,133)">램</a>
                    <div class="dropdown-content">
                        <a href="#">RAM1</a>
                        <a href="#">RAM2</a>
                        <a href="#">RAM3</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="SSD.html" class="dropbtn" style="color : rgb(30,80,133)">SSD</a>
                    <div class="dropdown-content">
                        <a href="#">SSD1</a>
                        <a href="#">SSD2</a>
                        <a href="#">SSD3</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a style="font-size : 15px; color : rgb(30,80,133)" href="Graphic.html"
                        class="dropbtn">그래픽 카드</a>
                    <div class="dropdown-content">
                        <a href="#">GC1</a>
                        <a href="#">GC2</a>
                        <a href="#">GC3</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="Mainboard.html" class="dropbtn" style="color : rgb(30,80,133)">메인보드</a>
                    <div class="dropdown-content">
                        <a href="/Mainboard_Intel">INTEL</a>
                        <a href="#">Mainboard2</a>
                        <a href="#">Mainboard3</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="POWER.html" class="dropbtn" style="color : rgb(30,80,133)">파워</a>
                    <div class="dropdown-content">
                        <a href="#">power1</a>
                        <a href="#">power2</a>
                        <a href="#">power3</a>
                    </div>
                </li>
                <li>
                    <a href="/QnA" style="color : rgb(30,80,133)">게시판</a>
                </li>
            </ul>
  `;
    }, QNAlist: function (filelist) {
        var list = `<table class="type07">
        <thead>
            <tr>
                <th scope="cols">번호</th>
                <th scope="cols">작성자</th>
                <th scope="cols">제목</th>
                <th scope="cols">작성일</th>
            </tr>
        </thead>
        <tbody>
            `;
        var i = filelist.length;
        i = i - 1;
        // console.log(i);
        
        while (i >= 0) {
            if (filelist[i].year == year && filelist[i].month == month && filelist[i].date == date) {
                list = list + `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${filelist[i].displayName}</td>
                                    <th scope="row"><a href="/QnA/${filelist[i].id}">${filelist[i].title}</a></th>
                                    <td>${filelist[i].hours + ' : ' + filelist[i].minutes}</td>
                                </tr>
                            `
            }
            else {
                list = list + `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${filelist[i].displayName}</td>
                                    <th scope="row"><a href="/QnA/${filelist[i].id}">${filelist[i].title}</a></th>
                                    <td>${filelist[i].year + ' . ' + filelist[i].month + ' . ' + filelist[i].date}</td>
                                </tr>
                            `
            }
            i = i - 1;
        }
        list = list + `</tbody></table>`;
        return list;
    }, Commentlist: function (commentlist, topic_id) {
        var list = `
            <ul>`;
        var i = 0;
        while (i < commentlist.length) {
            if (topic_id == commentlist[i].topic_id) {
                list = list + `<li style = "border-bottom : 1px solid #999; padding-bottom : 10px">
                    <div style = "font-weight : bold;  font-size: 17px;">${commentlist[i].displayName}</div>
                    ${commentlist[i].description}</a><br>
                    ${commentlist[i].year + '.' + commentlist[i].month + '.' + commentlist[i].date + '   ' + commentlist[i].hours + ':' + commentlist[i].minutes}<br>                                 
                 </li>
                 <br>`
            }
            else {
            }
            i = i + 1;
        }
        list = list + `</ul>`;
        return list;
    }
}
