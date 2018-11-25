//##########################################################################
//
//##########################################################################

$(document).ready(function(){
  

  //************************************************************************
  //Sign-in button click
  //************************************************************************
  // Working but triggered before form validation
  /*  $("#ixsignin").on('click', function(){
    alert("The Sign In button was clicked from main.js.");
  });*/
  
  
 
  //************************************************************************
  //Show pass
  //************************************************************************
  /*      
  var showPass = 0;
  $('.btn-show-pass').on('click', function(){
    if(showPass == 0) {
      $(this).next('input').attr('type','text');
      $(this).find('i').removeClass('fa-eye');
      $(this).find('i').addClass('fa-eye-slash');
      showPass = 1;
    }
    else {
      $(this).next('input').attr('type','password');
      $(this).find('i').removeClass('fa-eye-slash');
      $(this).find('i').addClass('fa-eye');
      showPass = 0;
      }
    });
   */  
  
});


//************************************************************************
//Form validate
//************************************************************************
(function($) {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('form-signin');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
	if (form.checkValidity() === false) {
	  event.preventDefault();
	  event.stopPropagation();
	  alert("Not Valid");
	} else {
	  alert("Valid, can submit form");
	}
	form.classList.add('was-validated');
      }, false);
    });
  }, false);
})(jQuery);




//##########################################################################
//Debug tests
//##########################################################################

/*

(function ($) {
    "use strict";


    //[ Validators ]
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    //[ Show password ]
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
        
    });
  

})(jQuery);

*/