<template>
  <div class="navresid">
    <div
      class="d-flex flex-column justify-content-center align-items-center mt-5"
    >

      <!-- card submit -->
      <div class="card cardView text-right card-width">
        <!-- header -->
        <div class="card-header fontBold">ثبت رسید</div>

        <!-- body -->
        <div class="card-body bg-transparent">
          <form autocomplete="on">
            <div class="form-group">
              <label for="formGroupExampleInput" class="labelSize mb-0"
                >شماره رسید</label
              >
              <input
                v-model="code"
                pattern="[0123456789۰۱۲۳۴۵۶۷۸۹]{1,8}"
                type="tel"
                onClick="this.select();" 
                class="form-control text-right inputSize text-center"
                id="formGroupExampleInput"
                placeholder="شماره رسید"
                required
              />
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2" class="labelSize mb-0"
                >پیام</label
              >
              <input
                v-model="msg"
                type="text"
                class="form-control text-right inputSize text-center"
                id="formGroupExampleInput2"
                placeholder="پیام"
                required
              />
            </div>
            <button
              class="btn btn-success fontBold pl-3 pr-3"
              type="submit"
              v-on:click="upsertCallTap"
              :disabled="!!submitloading"
            >
              <span
                v-if="submitloading"
                class="spinner-border spinner-border-sm mb-1"
                role="status"
                aria-hidden="true"
              ></span>
              <span v-else>ثبت</span>
            </button>
          </form>
        </div>
      </div>

      <!-- card list -->
      <div class="card cardView text-right card-width mt-4 mb-4">
        <!-- header -->
        <div class="card-header d-flex flex-row justify-content-between">
          
          <div class="d-flex align-items-center">

            <button class="btn btn-danger removeSize" type="submit" v-on:click="purgeAllCalless">
              حذف همه
            </button>

            <span class="badge-max-resid ml-3 pt-1">{{highestCode}}<i class="fas fa-arrow-up ml-1 mr-1"></i></span>
          
          </div>
          
          <span class="fontBold">رسید ها</span>

        </div>

        <!-- body -->
        <div class="card-body bg-transparent p-0 m-0 pb-1 text-center">

          <div v-if="callees.length == 0" class="text-secondary mt-3 mb-3" style="font-size: 14px;">موردی یافت نشد</div>
          <div
            v-else
            class="d-flex flex-column"
            v-for="item in callees"
            :key="item.code">

            <hr class="m-0 p-0" style="width:100%;" />

            <div class="d-flex flex-row justify-content-between align-items-center pl-4 pr-4 pt-2 c-pointer" v-on:click="CallessTap(item.code,item.msg)">

              <div class="d-flex"> 

                <span class="fontBold text-danger itemDelete" v-on:click="purgeCalless(item.code)"><i class="far fa-trash-alt"></i></span>
                <span  dir="rtl" class="text-secondary ml-4" style="font-size: 13px;">{{
                 timeDifference(item.callAt * 1000)
                }}</span>
              </div>

              <div class="d-flex flex-column text-right">
                <span class="fontBold text-dark big-num-tel" style="font-size: 14px;">{{
                  item.code
                }}</span>
                <span class="text-secondary" style="font-size: 14px;">{{
                  item.msg
                }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="errored" class="alert alert-warning mt-2 font card-width fixed-bottom mx-auto">
      <strong>خطا!</strong>
      <span>{{errorMsg}}</span>
    </div>

    <button v-on:click="scrollTop" id="topBtn" class="bg-info"><i class="fas fa-angle-double-up p-0 m-0 pt-1"></i></button>

  </div>
</template>

<script>
import axios from "axios";
import config from '../config';

export default {
  name: "NavResid",
  data() {
    return {
      code: "",
      msg: "",
      submitloading: false,
      errored: false,
      errorMsg: '',
      callees: [],
      highestCode: '0'
    };
  },
  mounted() {
    this.getCalleesList();

    var mybutton = document.getElementById("topBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

  },
  methods: {
    scrollTop: function(e){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    getCalleesList: function(event) {
      const body = {
        filter: {},
        sort: [["callAt", 1]],
        skip: 0,
        limit: 50
      };
      axios
        .post(config.LIST_CALLEESS, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          // console.log(response);

          try{
              if (response.status == 200) {
                this.callees = response.data;
                this.highestCode = this.calcHighestCode().code;
              } else {
                this.hasError('لطفا مجددا تلاش کنید');
              }
          }catch(e){
              console.log(e);
          }

        })
        .catch(error => {
          console.log('clear!!! ' + error)
            localStorage.clear();
          this.$router.replace({ path: "/login" });
          // this.hasError('لطفا مجددا تلاش کنید');
          // console.log(error);
        });
    },
    calcHighestCode(){
      if (this.callees.length == 0) return 
      return this.callees.reduce((a,b) => Number(a.code) > Number(b.code) ? a : b)     
    },
    purgeCalless: function(code) {

      this.callees = this.callees.filter((e)=>e.code !== code )

      const body = {
        filter: { code: code }
      };
      axios
        .post(config.PURGE_CALLEES, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          // console.log(response);

          if (response.status == 200) {
            this.getCalleesList();
          } else {
            this.hasError('لطفا مجددا تلاش کنید');
          }
        })
        .catch(error => {
          this.hasError('لطفا مجددا تلاش کنید');
          console.log(error);
        });
    },
    purgeAllCalless: function() {

      const body = {
        filter: {}
      };
      axios
        .post(config.PURGE_CALLEES, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          // console.log(response);

          if (response.status == 200) {
            this.getCalleesList();
          } else {
            this.hasError('لطفا مجددا تلاش کنید');
          }
        })
        .catch(error => {
          this.hasError('لطفا مجددا تلاش کنید');
          console.log(error);
        });
    },
    upsertCallTap: function(event) {

      if (!this.code) {
        return;
      }
      if (!this.msg) {
        return;
      }

      this.submitloading = true;
      const body = {
        code: this.code,
        msg: this.msg
      };
      axios
        .post(config.UPSERT_CALL, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          
          this.submitloading = false;

          if (response.status == 202) {
            this.code = "";
            // this.msg = "";
            this.getCalleesList();  
          } else {
              this.hasError('لطفا مجددا تلاش کنید');
          }
        })
        .catch(error => {
          this.hasError('لطفا مجددا تلاش کنید');
          this.submitloading = false;
          console.log(error);
        });
    },
    hasError: function(msg) {
      this.errorMsg = msg;
      this.errored = true;
      setTimeout(() => {
        this.errored = false;
      }, 3000);
    },
    timeDifference: function(previous) {

        const current = new Date().getTime();

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

    },
    CallessTap: function(code, msg){
      this.code= code;
      this.msg= msg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: "IranSans-bold";
  src: url("../assets/fonts/IRANSansMobile_Medium_fa.ttf");
}

@font-face {
  font-family: "IranSans";
  src: url("../assets/fonts/IRANSansMobile_Light_fa.ttf");
}

* {    
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

input, textarea {
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

html,
body {
  scroll-behavior: smooth;
  height: 100%;
  background-color: #fefefe;
}

.rtl {
  direction: rtl;
}

.navresid {
  font-family: "IranSans";
}

.fontBold {
  font-family: "IranSans-bold";
}

.background {
  background-color: #fefefe;
}

.cardView {
  border-color: #d4d4d5;
}

.labelSize {
  font-size: 14px;
}

.inputSize {
  font-size: 15px;
}

.removeSize {
  font-size: 13px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 3px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.itemDelete {
  font-size: 17px;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.card-width{
  width: 50%;
}

.c-pointer{
  cursor: pointer;
}

#topBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 20px;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  padding: 0px;
  border-radius: 22.5px;
  width: 45px;
  height: 45px;
}

  input[type=tel], .big-num-tel{
    letter-spacing: 0.15em;
    font-size: 1.2em;
    font-weight: bold;
    font-family:monospace, "monospace";
  }

  ::-webkit-input-placeholder { /* Edge */
    font-family: 'IranSans';
    letter-spacing: 0em;
    font-weight: normal;
    font-size: 16px;
  }
  
  :-ms-input-placeholder { /* Internet Explorer */
    font-family: 'IranSans';
    letter-spacing: 0em;
    font-weight: normal;
    font-size: 16px;
  }
  
  ::placeholder {
    font-family: 'IranSans';
    letter-spacing: 0em;
    font-weight: normal;
    font-size: 16px;
  }

@media only screen and (max-width:620px) {
     /* For mobile phones: */
    .card-width{
        width:90%;
    }
}

</style>
