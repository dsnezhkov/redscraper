## Hook Examples

```javascript
<!--
 Examples of hook functions that could be put on form submission either
   within existing page DOM (straing JS), or by bringing in external frameworks
 like JQuery
-->

<script type="text/javascript">
 function loadHook()
 {
   var req = new XMLHttpRequest()
   req.onreadystatechange = function()
   {
   if (req.readyState == 4)
   {
     if (req.status != 200)
     {
       //error handling code here
     }
     else
     {
       var response = JSON.parse(req.responseText)
       // Exmaple: coudl do somehting with response
       //document.getElementById('myDiv').innerHTML = response
     }
   }
   }

   // Example: Post to default route 
   req.open('POST', '/save')
   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

   // Example: Typical use of form parameters you would like to send. 
   var userName = document.getElementById(Login.userNameInput).value;
   var password = document.getElementById(Login.passwordInput).value;
   var postVars = 'username='+userName+'&password='+password
   req.send(postVars)

   return false
 }
</script>

<!--
 JQuery (3.x): Load from HTML
-->
<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
  crossorigin="anonymous"></script>


<script type="text/javascript">

 function loadHook()
 {

   var userName = document.getElementById(Login.userNameInput).value;
   var password = document.getElementById(Login.passwordInput).value;

     // This can optionally be wrapped into someting like this 
   //  $('button').click(function() {
     // });

  $.ajax({
         url: '/save',
         data: $('#loginForm').serialize(),
         contentType: "application/x-www-form-urlencoded"
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


<!--
  JQuery (3.x): Load from JS

    // Load the script
    var script = document.createElement("script");
    script.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
    script.integrity = 'sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=';
    script.crossorigin = 'anonymous';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    // do more here ...
  $.ajax({
         url: '/save',
         data: $('#loginForm').serialize(),
         contentType: "application/x-www-form-urlencoded"
         type: 'POST',
         success: function(response) {
             console.log(response);
         },
         error: function(error) {
             console.log(error);
         }
     });
-->
```
