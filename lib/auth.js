module.exports = {
    IsOwner: function (request, response) {
        // console.log(request.session.is_logined);
        // console.log(request.session.is_logined);
        // console.log(":", request.user);
        if (request.user) {
            return true;
        } else {
            return false;
        }
    }
    ,
    StatusUI: function (request, response) {
        var authStatusUI = '<a href="/login" >로그인</a>';
        // console.log(this.IsOwner(request, response));
        if (this.IsOwner(request, response)) {
            authStatusUI = `<strong>${request.user.displayName} </strong>님 환영합니다! <a href="/logout">로그아웃</a>`;
            // authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    },

    RegisterUI: function (request, response) {
        var authRegisterUI = '<a = "UI" href="/register">회원 가입</a>';
        
        return authRegisterUI;
    }
    ,
    UserName: function (request, response) {
        if (this.IsOwner(request, response)) {
            var username = `${request.user.displayName}`;
        }
        return username;
    }
}