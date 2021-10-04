var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var template = require('../lib/template.js');
var router = express.Router();
var auth = require("../lib/auth")

//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function (request, response) {
//   console.log('/', request.user);
  var title = 'consin';
  var description = `<div class="slideshow-container">
  <main>
        <div class="mySlides fade">
            <img id="description_img" src="img/BANNER.PNG">
        </div>
        <div class="mySlides fade">
            <img id="description_img" src="img/banner_2.PNG">
        </div>
        <div class="mySlides fade">
            <img id="description_img" src="img/ASROCK.PNG" width="40%">
        </div>
        <div class="dot_position">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </main>
  </div>
  <!-- <aside>혹시 몰라서 비워둔 부분</aside> -->
  <div class="product">
    <ul>
        <li><a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiq8tGN35vzAhUTPmAKHUwxAsgYABAAGgJ0bQ&ae=2&ohost=www.google.com&cid=CAESQeD2_cL0oaS6Us_rl1dKPdXEiRlYAAuzHukLmEe191wJoPOS-wR5h1N391j-ar0jwJ_pwp6QGTypcvA2fbb6YxhN&sig=AOD64_1l4CCUP3cMhfcLCd54iWOML6wjcw&q&adurl&ved=2ahUKEwic3sqN35vzAhWLy4sBHa-WAxEQ0Qx6BAgCEAE&dct=1">
            <img src = "./static/img/shopping.png" witdh = "100%">컴신이 추천한 구매 사이트</a></li>
        <li><a href="/QnA"><img src = "./img/question.png">견적 게시판</a></li>
    </ul>
  </div>';
  <section class="banner">
        <h2 class="hide">주요서비스</h2>
        <ul>
            <div class="menu">
                <li><strong>뉴스</strong>최신 뉴스 소식<br><br>
                    <a href="#">'화이자 접종한 고3 사망했다?' 경찰 가짜뉴스에 엄정 대응</a>
                    <a href="#">이금희 "무직에 차 없는 남친만 만나…용돈까지 줬다"</a>
                    <a href="#">금태섭 "조국 수호 몇마디 하고 국회의원 하는 與, 정신 못차리는 野"</a>
                    <a href="#">강물에 둥둥 떠다니는 소녀 얼굴...충격에 빠진 스페인 주민들</a>
                    <a href="#">홍준표, TK·무당층도 윤석열에 앞섰다…野 대세론 지각변동 조짐</a>
                    <a href="#">'학폭' 이재영·다영, 결국 사과없이 그리스行 비행기 탄다</a>
                    <a href="#">전세대출 제한 임박… ‘보증금 오른 만큼만’ 적용案 부상</a>
                </li>
            </div>
            <div class="menu">
                <li><strong>유튜브</strong>CPU, SSD 등 리뷰 후기!<br><br>
                    <div class="video">
                        <div class="video-container">
                            <iframe width="560px" height="315px" src="https://www.youtube.com/embed/oudHaxaa-GQ"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                    </div>
                </li>
            </div>
        </ul>
    </section>
</body>
  <script>
    // var slideIndex = 1;
    // showSlides(slideIndex);

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // function showSlides(n) {
    //     var i;
    //     var slides = document.getElementsByClassName("mySlides");
    //     var dots = document.getElementsByClassName("dot");
    //     if (n > slides.length) { slideIndex = 1 }
    //     if (n < 1) { slideIndex = slides.length }
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //     }
    //     slides[slideIndex - 1].style.display = "block";
    //     dots[slideIndex - 1].className += " active";

    // }
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 5000); // 5초에 한번씩 이미지가 바뀜
    }

</script>
` 
  var list = template.list();
  var html = template.HTML(title, list,
    `${description}`,
    '', auth.StatusUI(request, response),
    auth.RegisterUI(request,response),
    
  );
  response.send(html);
});

module.exports = router;