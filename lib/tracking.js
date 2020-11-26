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

function getCall(id, code){

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
      
      var callAt = data.callAt;
      const currentTimeStamp = new Date().getTime();
      const time = timeDifference(currentTimeStamp,callAt * 1000);

      console.log('old callAt is ' + localStorage.getItem("callAt") );
      console.log('new callAt is ' + callAt );
      
      if(localStorage.getItem("callAt") != '' && localStorage.getItem("callAt") != callAt){

        console.log('callAt new');

        try {
          var audio = new Audio('assets/sound/notif.mp3');
          audio.play();          
        }catch(err) {
          console.log(err);
        }
      
      }else{
        console.log('callAt old');
      }

      localStorage.setItem("callAt", data.callAt);

      $("#spinner").hide();
      $("#msg").text(data.msg || '');
      $("#time").text(time || '');
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

    $("#title").text(title || '');

    $("#spinner").show();
    $("#card-result").hide();

    getCall(staticId, code);

    $("#reload").click(function(e) {
      location.reload();
    });

    $("#reload-1").click(function(e) {
      location.reload();
    });

    setInterval(function() {
      console.log("refeshed!!!!");

      $("#spinner").show();
      $("#card-result").hide();
      hideAlert();

      getCall(staticId, code);
    }, 1000 * 10); 

  });