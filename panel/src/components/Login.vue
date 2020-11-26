<template>
  <div class="login">
    <form class="form-signin pt-5">
      <svg
        class="mt-5"
        width="177"
        height="100"
        viewBox="0 0 177 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="72" cy="50" r="30" fill="#68DBFF" />
        <ellipse cx="104.647" cy="50" rx="29.7059" ry="30" fill="#FF7917" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M88.4039 75.1221C96.5911 69.7652 102 60.5143 102 50C102 39.4858 96.5911 30.2348 88.4039 24.878C80.2971 30.2348 74.9412 39.4858 74.9412 50C74.9412 60.5143 80.2971 69.7652 88.4039 75.1221Z"
          fill="#5D2C02"
        />
      </svg>

      <h1 class="h3 mb-5 font-weight-bold">beresid</h1>

      <label for="inputUserName" class="sr-only">نام کاربری</label>

      <input
        v-model="userName"
        type="text"
        id="inputUserName"
        class="form-control text-right"
        placeholder="نام کاربری"
        required
        autofocus
      />

      <label for="inputPassword" class="sr-only">رمز عبور</label>

      <input
        v-model="password"
        type="password"
        id="inputPassword"
        class="form-control text-right"
        placeholder="رمز عبور"
        required
      />

      <button
        :disabled="!!loading"
        class="btn btn-lg btn-block mt-4 btn-success submit"
        type="submit"
        v-on:click="loginTap"
      >
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm mb-1"
          role="status"
          aria-hidden="true"
        ></span>
        <span v-else>ورود</span>
      </button>

      <div v-show="errored" class="alert alert-warning mt-2 font">
        <strong>خطا!</strong>
        <span>نام کاربری یا رمز عبور اشتباه است</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import config from '../config';

export default {
  name: "Login",
  data() {
    return {
      userName: null,
      password: null,
      loading: false,
      errored: false
    };
  },
  mounted() {},
  methods: {
    loginTap: function(event) {
      if (!this.userName) {
        return;
      }
      if (!this.password) {
        return;
      }

      this.loading = true;
      const body = { dynamicID: this.userName };
      axios
        .post(config.LOGIN, body)
        .then(response => {

          console.log(response);

          if (response.status == 200) {
            localStorage.id = response.data.staticID;
            this.genToken(response.data.staticID)
          } else {
              this.hasError();
          }
          
        })
        .catch(error => {
          this.hasError();
          console.log(error);
        });
    },
    genToken: function(staticId){

      const body = { staticID: staticId, pwd: this.password};
      axios
        .post(config.GEN_TOKEN, body)
        .then(response => {

          console.log(response);

          if (response.status == 200) {
            this.loading = false;
            localStorage.token = response.data.token;
            localStorage.userName = this.userName;
            console.log(response.data.token);
            // this.$router.push({ path: "home" });
            this.$router.replace({ path: "/home" });
          } else {
              this.hasError();
          }
          
        })
        .catch(error => {
          this.hasError();
          console.log(error);
        });

    },
    hasError: function() {
      this.loading = false;
      this.errored = true;
      setTimeout(() => {
        this.errored = false;
      }, 4000);
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

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input {
  font-family: "IranSans";
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.submit {
  font-size: medium;
  font-family: "IranSans-bold";
  cursor: pointer;
}

.login {
  background-color: #fefefe;
}

.rtl {
  direction: rtl;
}

.font {
  font-family: "IranSans";
}
</style>
