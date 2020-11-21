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

function goBack(){
  window.history.back();
}

function showAlert(){
  $("#alert-nothing").show();

  $("#spinner").hide();
  $("#card-result").hide();
}

function hideAlert() {
  $("#alert-nothing").hide();
}

$(document).ready(function() {

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    // encodeURIComponent
    // decodeURIComponent
    var title = decodeURIComponent(vars["t"]);
    var staticId = vars["c"];
    var code = vars["n"];
    
    if(code == null || title == null || staticId == null){
      goBack();
    }

    $("#title").text(title);
    console.log(title);
    
    $("#spinner").show();
    $("#card-result").hide();

    $.ajax({
      url:"https://beresid.com/GetCall",
      type:"POST",
      data:'{"caller":"'+staticId+'","code":"'+code+'"}',
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(data,status){

        $("#spinner").hide();
        $("#card-result").show();

        console.log(data);

        const currentTimeStamp = new Date().getTime();
        const time = timeDifference(currentTimeStamp,data.callAt * 1000);

        $("#msg").text(data.msg);
        $("#time").text(time);
        $("#card-result").show();
        hideAlert();
        
      },
      error: function (jqXHR, textStatus, errorThrown) {

        // const response = JSON.parse(jqXHR.responseText);

        // if(response.error.code == 2815497167 ){
        //   // showAlert('شماره رسید اشتباه است');
        //   goBack();
        // }else{
        //   console.log(jqXHR.responseText);
        //   // showAlert(response.error.code);
        //   goBack();
        // }
        
        showAlert();
        
      }
    });


  });