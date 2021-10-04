var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var shortid = require('shortid');

var db = require('../lib/db');

module.exports = function (passport) {
  // router.get('/login', function (request, response) {
  //   var title = 'Login';
  //   // var list = template.list();
  //   var html = template.HTML(title, ` `, `
  //   <div class = "form">
  //   <h1>LOG-IN</h1>
  //   <form action="/login_process" method="post" style = "text-align : center">
  //   <p><input type="text" name="email" placeholder="E-mail"></p>
  //   <p>
  //     <input type = "password" name = "password" placeholder = "Password">
  //   </p>
  //   <p>
  //     <input type="submit" value = "로그인">
  //   </p>
  // </form></div>
  //     ` , '');
  //   response.send(html);
  // });

  router.post('/login_process',
    passport.authenticate('local', {
      // successRedirect: '/',
      failureRedirect: '/login/wrong',
      failureFlash: true,
      successFlash: true
    }
    )
    , function (request, response) {
      request.session.save(function () {
        response.redirect('/');
      })
    });



    // router.get('/register', function (request, response) {
    //   var title = 'register';
    //   // var list = template.list();
    //   var html = template.HTML(title, ` `, `
    //   <div class = "form">
    //   <h1>REGISTER</h1>
    //   <form action="/register_process" method="post" style = "text-align : center">
    //   <p><input type="text" name="email" placeholder="E-mail"></p>
    //   <p><input type = "password" name = "password" placeholder = "Password"></p>
    //   <p><input type = "password" name = "password2" placeholder = "Confirm Password"></p>
    //   <p><input type="text" name="displayName" placeholder="Display Name"></p>
    //   <p><input type="submit" value = "회원 가입"></p>
    // </form></div>
    //     `, '');
    //   response.send(html);
    // });

  router.post('/register_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.password;
    var pwd2 = post.password2;
    var displayName = post.displayName;
    if(pwd !== pwd2){
      request.flash('error', 'Password must same!');
      response.redirect('/register');
    } else {
     var user ={
        id:shortid.generate(),
        email:email,
        password:pwd,
        displayName:displayName
      };
      db.get('users').push(user).write();
      request.login(user, function(err){
        console.log('redirect');
        return response.redirect('/');
      })
    }
  });


  router.get('/logout', function (request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
    });
  });
  return router;
}


// var authData = {                   //사용자의 정보를 담은 객체
//   email: `kirin2211@naver.com`,
//   password: `tjehddnjs14`,   //해쉬와 비밀번호 암호화 작업 필요
//   nickname: `Tuna`
// }

// router.get('/login', function (request, response) {
//   var title = 'Login';
//   // var list = template.list();
//   var html = template.HTML(title, `로그인 해주시기 바랍니다`, `
//     <form action="/auth/login_process" method="post" style = "text-align : center">
//       <p><input type="text" name="email" placeholder="email"></p>
//       <p>
//         <input type = "password" name = "password" placeholder = "password">
//       </p>
//       <p>
//         <input type="submit" value = "로그인">
//       </p>
//     </form>
//     ` ,'');
//   response.send(html);
// });

// router.post('/login_process', function (request, response) {
//   var post = request.body;
//   // console.log(request.body);
//   // console.log(authData);
//   // console.log(post);
//   var email = post.email;
//   // console.log(email);
//   var password = post.password;
//   console.log(password);
//   if(email === authData.email && password === authData.password){
//     //success
//     request.session.is_logined = true;
//     console.log(request.session.is_logined);
//     request.session.nickname = authData.nickname;
//     request.session.save(function(){
//       response.redirect(`/`);
//     });
//     // console.log(request.session.nickname);
//     // console.log(authData.nickname);
//   }
//   else {
//     response.send("who?");
//   }
//   //response.redirect(`/topic/${title}`);
// });

// router.get('/logout', function (request, response) {
//   request.session.destroy(function (err) {
//     response.redirect('/');
//   });
// });
/*
router.get('/create', function (request, response) {
  var title = 'WEB - create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
      <form action="/topic/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
  response.send(html);
});
router.post('/create_process', function (request, response) {
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
    response.redirect(`/topic/${title}`);
  });
});
router.get('/update/:pageId', function (request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
        <form action="/topic/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
      `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
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
      response.redirect(`/topic/${title}`);
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
router.get('/:pageId', function (request, response, next) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
    if (err) {
      next(err);
    } else {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(request.list);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
            <a href="/topic/update/${sanitizedTitle}">update</a>
            <form action="/topic/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
      );
      response.send(html);
    }
  });
});

module.exports = router;
*/