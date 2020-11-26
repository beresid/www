function toEnglishNumber(strNum) {
  var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  var cache = strNum;
  for (var i = 0; i < 10; i++) {
      var regex_fa = new RegExp(pn[i], 'g');
      cache = cache.replace(regex_fa, en[i]);
  }
  // $('#'+name).val(cache);
  return cache;
}

function formatPrice(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

$(document).ready(function() {

    $("input, textarea").focusout(function(){
      $('meta[name=viewport]').remove();
      $('head').append('<meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=0">');

      $('meta[name=viewport]').remove();
      $('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">' );
    });

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
                if(items.enabled){
                  $('#cat').append( '<table><tr><td id="child-price"> ' + formatPrice(items.price) + ' </td><td><table><tbody><tr><td id="child-title">' + items.name + '</td><td id="child-dot" rowspan="0"><span class="dot"></span></td></tr><tr><td id="child-sub">' + items.desc + '</td></tr></tbody></table></td></tr></table>' );
                }
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

    $("#code_input").keyup(function(e) {
      code = $(this).val();
    });

    $( "#tracking" ).click(function(e) {

      e.preventDefault();

      if(code == null || code == ''){
        return;
      }

      $('#form')[0].reset();

      window.open('file:///home/amir/Desktop/restaurant/www/t.html?c=' + hash[1] + '&n=' + toEnglishNumber(code) + '&t=' + title, '_self');
      // window.open('https://beresid.com/t.html?c=' + hash[1] + '&n=' + toEnglishNumber(code) + '&t=' + title, '_self');
    
    });

    }else{
      window.location.replace("http://beresid.com/404");
    }

    // $.getJSON("./lib/dictionary.js", function(data){
        
         
    //   console.log('aa ' + data);
    //   // var obj = JSON.parse(data);
    
    //   // console.log(obj.employees[1].firstName);

    // }).fail(function(){
    //     console.log("An error has occurred.");
    // });


    // var text = '{ "employees" : [' +
    // '{ "firstName":"John" , "lastName":"Doe" },' +
    // '{ "firstName":"Anna" , "lastName":"Smith" },' +
    // '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
 
  });