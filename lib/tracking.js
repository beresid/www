function timeDifference(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' ثانیه پیش';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' دقیقه پیش';   
  }

  else if (elapsed < msPerDay ) {
       return  Math.round(elapsed/msPerHour ) +  ' ساعت پیش' ;   
  }

  else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' روز پیش';   
  }

  else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' ماه پیش';   
  }

  else {
      return Math.round(elapsed/msPerYear ) + ' سال پیش';   
  }
}

function showAlert(text){
  $("#alert-error").text(text);
  $("#alert-error").show();
  setTimeout(hideAlert, 3000);
}

function hideAlert() {
  $("#alert-error").hide();
}

$(document).ready(function() {

    $("#track-btn-loading").hide();
    $("#alert-error").hide();

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var hash = hashes.split('=');

    var code;
    var id = hash[1];

    $("#code_input").keyup(function() {
      code = $(this).val();
    });

    $("#track-btn").click(function(e) {
        
      e.preventDefault();

      if(code == null || code == ''){
        showAlert('شماره رسید را وارد کنید');
        return;
      }

      if(hash[0] != 'c'){
        showAlert('خطا! لطفا لحظاتی دیگر تلاش کنید');
        return;
      }

      $("#track-btn-loading").show();
      $("#track-btn-text").hide();
      $("#card-result").hide();

      $.ajax({
        url:"https://beresid.com/GetCall",
        type:"POST",
        data:'{"caller":"'+id+'","code":"'+code+'"}',
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        headers: {
          "Content-Type": "application/json"
        },
        success: function(data,status){

          $("#track-btn-text").show();
          $("#track-btn-loading").hide();

          console.log(data);

          const currentTimeStamp = new Date().getTime();
          const time = timeDifference(currentTimeStamp,data.callAt * 1000);

          $("#msg").text(data.msg);
          $("#time").text(time);
          $("#card-result").show();
          
        },
        error: function (jqXHR, textStatus, errorThrown) {

          const response = JSON.parse(jqXHR.responseText);
          if(response.error.code == 2815497167 ){
            showAlert('شماره رسید اشتباه است');
          }else{
            console.log(jqXHR.responseText);
            showAlert(response.error.code);
          }
          
          $("#track-btn-text").show();
          $("#track-btn-loading").hide();
          
        }
      });

    });

  });