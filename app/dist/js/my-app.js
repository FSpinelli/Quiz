// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7();
 
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});
 
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$$('.submit').on('click', function() { $$(this).parents('form').trigger('submit'); });
// signin
$('form[name="signin"]').submit(function(event){
    event.preventDefault();
    var username = $(this).find('input[name="username"]').val();
    var password = $(this).find('input[name="password"]').val();

    if(username == ""){
        myApp.alert('Insira um e-mail.');
    }else if(!isEmail(username)){
        myApp.alert('Insira um e-mail válido.');
    }else if(password == ""){
        myApp.alert('Insira uma senha.');
    }else if(password.length < 6){
        myApp.alert('A senha deve conter 6 dígitos.');
    }else{
        $.ajax({
            url: "http://127.0.0.1:8000/api/signin/",
            dataType : 'json',
            type: 'POST',
            data: $(this).serialize(),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data, status, s) {
                if(data == 400){ 
                    myApp.alert('Usuário ou senha incorreta.');
                }else{
                    localStorage.token = data.token;
                    mainView.router.load({url:'home.html'});
                }
            },
            error : function(res) {
                myApp.alert('Ops! Ocorreu algum erro. Tente mais tarde.');
            },
            crossDomain:false
        });
    }
});

myApp.onPageInit('signup', function (page) {
  // Do something here for "about" page
    $$('.submit').on('click', function() { $$(this).parents('form').trigger('submit'); });

    // signup
    $('form[name="signup"]').submit(function(event){
        event.preventDefault();
        var username = $(this).find('input[name="username"]').val();
        var password = $(this).find('input[name="password"]').val();
        var confirm_password = $(this).find('input[name="confirm_password"]').val();

        if(username == ""){
            myApp.alert('Insira um e-mail.');
        }else if(!isEmail(username)){
            myApp.alert('Insira um e-mail válido.');
        }else if(password == ""){
            myApp.alert('Insira uma senha.');
        }else if(password.length != 6){
            myApp.alert('A senha deve conter 6 dígitos.');
        }else if(password != confirm_password){
            myApp.alert('As senhas não conferem.');
        }else{
            $.ajax({
                url: "http://127.0.0.1:8000/api/signup/",
                dataType : 'json',
                type: 'POST',
                data: $(this).serialize(),
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(data, status, s) {
                    if(data.token !== undefined){
                        localStorage.token = data.token;
                        mainView.router.load({url:'home.html'});
                    }else{
                        var msg = "";
                        $.each(data, function(i, val) {
                          // myApp.alert(i+': '+val);
                          msg += val+'\n';
                        });
                        myApp.alert(msg);
                    }
                    
                },
                error : function(res) {
                    myApp.alert('Ops! Ocorreu algum erro. Tente mais tarde.');
                },
                crossDomain:false
            });
        }
    });
})

myApp.onPageInit('signup', function (page) {

});