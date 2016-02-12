$(document).ready(function(){
	var baseUrl = "http://127.0.0.1:8000"
	$('form[name="signup"]').submit(function(event){
		event.preventDefault();
		var email = $(this).find('input[name="email"]').val();
		var password = $(this).find('input[name="password"]').val();
		var confirm_password = $(this).find('input[name="confirm_password"]').val();

		// if(email == ""){
		// 	alert('Insira um e-mail.');
		// }else if(!isEmail(email)){
		// 	alert('Insira um e-mail válido.');
		// }else if(password == ""){
		// 	alert('Insira uma senha.');
		// }else if(password.length != 6){
		// 	alert('A senha deve conter 6 dígitos.');
		// }else if(password != confirm_password){
		// 	alert('As senhas não conferem.');
		// }else{

	        $.ajax({
	            url: "http://127.0.0.1:8000/api/signup/",
	            dataType : 'json',
	            type: 'POST',
	            data: $.param( '{"username":email, "password":password}' ),
	            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	            error : function(res) {
	                // error handler
	                console.log(res);
	            },
	            success: function(data) {
	                console.log(data);
	            },
	            crossDomain:false
	        });


		// }
	});
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}