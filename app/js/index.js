$(document).ready(function(){
	// base url
	var baseUrl = "http://127.0.0.1:8000"

	$('.slick').slick();

// $('.slick').slick({
//   infinite: false,
// });

	// gif load
	$(document).ajaxStart(function() {
	    $.mobile.loading('show');
	});

	$(document).ajaxStop(function() {
	    $.mobile.loading('hide');
	});

	// signin
	$('form[name="signin"]').submit(function(event){
		event.preventDefault();
		var username = $(this).find('input[name="username"]').val();
		var password = $(this).find('input[name="password"]').val();

		if(username == ""){
			alert('Insira um e-mail.');
		}else if(!isEmail(username)){
			alert('Insira um e-mail válido.');
		}else if(password == ""){
			alert('Insira uma senha.');
		}else if(password.length < 6){
			alert('A senha deve conter 6 dígitos.');
		}else{
	        $.ajax({
	            url: "http://127.0.0.1:8000/api/signin/",
	            dataType : 'json',
	            type: 'POST',
	            data: $(this).serialize(),
	            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	            success: function(data, status, s) {
	            	if(data == 400){ 
	            		alert('Usuário ou senha incorreta.');
	            	}else{
						localStorage.token = data.token;
						$.mobile.changePage( '#initial-setting', { transition: "fade" });
	            	}
	            },
	            error : function(res) {
	                alert('Ops! Ocorreu algum erro. Tente mais tarde.');
	            },
	            crossDomain:false
	        });
		}
	});


	// signup
	$('form[name="signup"]').submit(function(event){
		event.preventDefault();
		var username = $(this).find('input[name="username"]').val();
		var password = $(this).find('input[name="password"]').val();
		var confirm_password = $(this).find('input[name="confirm_password"]').val();

		if(username == ""){
			alert('Insira um e-mail.');
		}else if(!isEmail(username)){
			alert('Insira um e-mail válido.');
		}else if(password == ""){
			alert('Insira uma senha.');
		}else if(password.length != 6){
			alert('A senha deve conter 6 dígitos.');
		}else if(password != confirm_password){
			alert('As senhas não conferem.');
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
	            		$.mobile.changePage( '#main', { transition: "fade" });
	            	}else{
		            	var msg = "";
						jQuery.each(data, function(i, val) {
						  // alert(i+': '+val);
						  msg += val+'\n';
						});
						alert(msg);
	            	}
	            	
	            },
	            error : function(res) {
	                alert('Ops! Ocorreu algum erro. Tente mais tarde.');
	            },
	            crossDomain:false
	        });
		}
	});

	// carrega a pagina de configuracao inicial
	$('#initial-setting').on("pagecreate",function(event){
		// carrega a lista de todas as categorias disponiveis
        $.ajax({
            url: "http://127.0.0.1:8000/api/category/",
            dataType : 'json',
            type: 'GET',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data, status, s) {
            	console.log(data);
            	var categories = "";
            	for(i=0; i<data.length; i++){
            		categories += '<label for="'+data[i].pk+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">'+data[i].fields.category_pt+'</label><input type="checkbox" id="'+data[i].pk+'">';
            	}
            	$('#list-categories').html(categories);
            	$("#list-categories").trigger('create');

            },
            error : function(res) {
                alert('Ops! Ocorreu algum erro. Tente mais tarde.');
            },
            crossDomain:false
        });
	});

	// carrega os dados da pagina principal
	$('#main').on("pagecreate",function(event){
	  $(this).find('h1').html('Main Page');
	});
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

