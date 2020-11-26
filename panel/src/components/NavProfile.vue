<template>
  <div class="navprofile">

    <div
      class="d-flex flex-column justify-content-center align-items-center mt-5">

      <!-- card info -->
      <div class="card cardView text-right card-width d-print-none">
        <!-- header -->
        <div class="card-header fontBold">اطلاعات</div>

        <!-- body -->
        <div class="card-body bg-transparent">
          <form>
            <div class="form-group">
              <label for="formGroupExampleInput" class="labelSize mb-0"
                >عنوان</label
              >
              <input
                v-model="title"
                type="text"
                class="form-control text-right inputSize"
                id="formGroupExampleInput"
                placeholder="عنوان"
                required
              />
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2" class="labelSize mb-0"
                >توضیحات</label
              >
              <b-form-textarea
                v-model="desc"
                class="form-control text-right inputSize"
                rows="3"
                no-resize
                id="textarea-no-resize"
                placeholder="توضیحات"
                required
              />
            </div>
            <button
              class="btn btn-success fontBold pl-3 pr-3"
              type="submit"
              v-on:click="updateInfoTap"
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

      <!-- card pass -->
      <div class="card cardView text-right card-width mt-4 d-print-none">
        <!-- header -->
        <div class="card-header fontBold">تغییر رمز عبور</div>

        <!-- body -->
        <div class="card-body bg-transparent">
          <form autocomplete="off">

            <div class="form-group">
              <label for="formGroupExampleInput" class="labelSize mb-0"
                >رمز عبور فعلی</label
              >
              <input
                v-model="oldPass"
                type="text"
                class="form-control text-right inputSize text-center"
                id="formGroupExampleInput"
                placeholder="رمز عبور فعلی"
                required
              />
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2" class="labelSize mb-0"
                >رمز عبور جدید</label
              >
              <input
                v-model="newPass"
                type="text"
                class="form-control text-right inputSize text-center"
                id="formGroupExampleInput2"
                placeholder="رمز عبور جدید"
                required
              />
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2" class="labelSize mb-0"
                >تکرار رمز عبور</label
              >
              <input
                v-model="reNewPass"
                type="text"
                class="form-control text-right inputSize text-center"
                id="formGroupExampleInput2"
                placeholder="تکرار رمز عبور"
                required
              />
            </div>

            <button
              class="btn btn-success fontBold pl-3 pr-3"
              type="submit"
              v-on:click="changePassTap"
              :disabled="!!passSubmitloading"
            >
              <span
                v-if="passSubmitloading"
                class="spinner-border spinner-border-sm mb-1"
                role="status"
                aria-hidden="true"
              ></span>
              <span v-else>ثبت</span>
            </button>
          </form>
        </div>
      </div>

      <!-- card qrCode -->
      <div class="card cardView text-right card-width mt-4 mb-4 d-print-none">
        <!-- header -->
        <div class="card-header d-flex flex-row justify-content-between">

        
          <div class="d-inline-flex">

            <!-- <button class="btn btn-info removeSize" type="submit" v-on:click="purgeAllCalless">
              چاپ
            </button>

            <button class="btn btn-success removeSize" type="submit" v-on:click="purgeAllCalless">
              مشاهده
            </button> -->

          </div>

          <span class="fontBold">صفحه مشتری</span>
        </div>

        <!-- body -->
        <div class="card-body bg-transparent text-center">

          <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>

          <div class="text-right">

            <button
              class="btn btn-success fontBold pl-3 pr-3 d-print-none"
              type="submit"
              @click="showUserPageTap">
              مشاهده
            </button>

            <button
              class="btn btn-info fontBold pl-3 pr-3 d-print-none"
              type="submit"
              @click="printQrTap">
              چاپ
            </button>

          </div>

        </div>
      </div>

    </div>

    <qrcode-vue :value="value" :size="450" level="H"  class="onlyPrint"></qrcode-vue>

    <div v-show="errored" class="alert alert-warning mt-2 font card-width fixed-bottom mx-auto">
      <strong>خطا!</strong>
      <span>{{errorMsg}}</span>
    </div>

    <div v-show="seccessed" class="alert alert-success mt-2 font card-width fixed-bottom mx-auto">
      <span>{{successMsg}}</span>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import config from '../config';
import QrcodeVue from 'qrcode.vue'

export default {
  name: "NavProfile",
  data() {
    return {
      title: "",
      desc: "",
      menus: {},

      oldPass:'',
      newPass:'',
      reNewPass:'',

      passSubmitloading: false,
      submitloading: false,
      loadedMenu: false,
      errored: false,
      errorMsg: '',
      seccessed: false,
      successMsg: '',

      value: 'https://beresid.com/?c=' + localStorage.id,
      size: 180,
    };
  },
  components: {
    QrcodeVue,
  },
  mounted() {
    this.caller();
  },
  methods: {
    showUserPageTap: function(event){
        // location.href=this.value
        window.open(this.value, '_blank');
    },
    printQrTap: function(event){
      window.print();
      // this.largeQrSize();
      // setTimeout(() => {
      //   window.print();  
      //   this.smallQrSize();
      // }, 100);
      
    },
    caller: function(event) {
      const body = {
        staticID: localStorage.id
      };
      axios
        .post(config.GET_CALLER, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          console.log(response);

          if (response.status == 200) {
            this.loadedMenu = true;
            this.menus = response.data;
            this.title =this.menus.title;
            this.desc =this.menus.desc;
          } else {
            this.hasError("لطفا مجددا تلاش کنید");
          }
        })
        .catch(error => {
          this.hasError("لطفا مجددا تلاش کنید");
          console.log(error);
        });
    },
    updateInfoTap: function(event) {

      if (!this.title) {
        return;
      }
      if (!this.desc) {
        return;
      }

      if(!this.loadedMenu){
        this.hasError('مشکلی پیش آمده، لحظاتی دیگر تلاش کنید');
        return;
      }

      this.menus.title = this.title;
      this.menus.desc = this.desc;
      
      this.submitloading = true;

      axios
        .post(config.PATCH_CALLER, this.menus, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          
          this.submitloading = false;
          console.log(response);
          
          if (response.status == 202) {
            this.hasSuccess('اطلاعات با موفقیت ثبت شد');
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
    changePassTap: function(event) {

      if (!this.oldPass) {
        return;
      }

      if (!this.newPass) {
        return;
      }

      if (!this.reNewPass) {
        return;
      }

      if(this.newPass != this.reNewPass){
        this.hasError('رمز عبور جدید و تکرار رمز عبور یکسان نیستند');
        return;
      }

      
      this.passSubmitloading = true;

      const body = {
        pwd: this.oldPass,
        newPwd: this.newPass
      };

      axios
        .post(config.RESET_PASS, body, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          
          this.passSubmitloading = false;
          console.log(response);
          
          if (response.status == 202) {
            this.hasSuccess('اطلاعات با موفقیت ثبت شد');
            this.oldPass = '';
            this.newPass = '';
            this.reNewPass = '';
          } else {
              this.hasError('لطفا مجددا تلاش کنید');
          }

        })
        .catch(error => {
        
          this.passSubmitloading = false;

          if(error.response.data.error.message == 'auth failed'){
            this.hasError('رمز عبور اشتباه است');
          }else if(error.response.data.error.message == 'body.pwd should NOT be shorter than 8 characters'){
            this.hasError('رمز عبور فعلی نباید کمتر از 8 کاراکتر باشد');
          }else if(error.response.data.error.message == 'body.newPwd should NOT be shorter than 8 characters'){
            this.hasError('رمز عبور جدید نباید کمتر از 8 کاراکتر باشد');
          }else if(error.response.data.error.message == 'same passwords'){
            this.hasError('رمز عبور جدید با رمز عبور فعلی نمیتواند یکسان باشد');
          }else{
            this.hasError('لطفا مجددا تلاش کنید');
          }
          
          console.log(error + ' -- '+error.response.data.error.message);
        });
    },
    hasError: function(msg) {
      this.errorMsg = msg;
      this.errored = true;
      setTimeout(() => {
        this.errored = false;
      }, 3000);
    },
    hasSuccess: function(msg) {
      this.successMsg = msg;
      this.seccessed = true;
      setTimeout(() => {
        this.seccessed = false;
      }, 3000);
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
  height: 100%;
  background-color: #fefefe;
}

.rtl {
  direction: rtl;
}

.navprofile {
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
  font-size: 13px;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.card-width{
  width: 50%;
}

@media only screen and (max-width:620px) {
     /* For mobile phones: */
    .card-width{
        width:90%;
    }
}


@media print {
  .noPrint {
      display:none;
  }
}
@media screen {
   .onlyPrint {
       display: none;
   }
}
</style>
