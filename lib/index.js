$(document).ready(function() {

    $("#spinner").show();
    $("#card-1").hide();
    $("#card-2").hide();
    $("#card-3").hide();

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var hash = hashes.split('=');

    var title;

    if(hash[0] == 'c'){
      var staticId = hash[1];

      $.ajax({
        url:"https://beresid.com/GetCaller",
        type:"POST",
        data:'{"staticID":"'+staticId+'"}',
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        headers: {
          "Content-Type": "application/json"
        },
        success: function(data,status){
          
          title = data.title;
          $("#title").text(data.title);
          $("#desc").text(data.desc);

          jQuery.each( data.menu, function( i, val ) {

            if(val.items.length > 0){
              $('#cat').append( '<p id="category">' + val.name + '</p>' );
            
              jQuery.each( val.items, function( i, items ) {
              $('#cat').append( '<table><tr><td id="child-price"> ' + items.price + ' ت</td><td><table><tbody><tr><td id="child-title">' + items.name + '</td><td id="child-dot" rowspan="0"><span class="dot"></span></td></tr><tr><td id="child-sub">' + items.desc + '</td></tr></tbody></table></td></tr></table>' );
              });
            }

          });

          $("#spinner").hide();
          $("#card-1").show();
          $("#card-2").show();
          $("#card-3").show();

        },
        error: function(){
          window.location.replace("http://beresid.com/404");
        }
      });
      
      var code;

    $("#code_input").keyup(function() {
      code = $(this).val();
    });

    $( "#tracking" ).click(function(e) {

      e.preventDefault();

      if(code == null || code == ''){
        return;
      }

      $('#form')[0].reset();

      window.open('file:///home/amir/Desktop/restaurant/www/tracking.html?c=' + hash[1] + '&n=' + code + '&t=' + title, '_self');
    
    });

    }else{
      window.location.replace("http://beresid.com/404");
    }

  });