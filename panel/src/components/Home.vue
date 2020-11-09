<template>
  <div class="home">

    <!-- sideBar -->
    <div class="sidenav d-flex align-items-end flex-column align-items-stretch pb-2">

      <!-- userName -->
      <div class="d-flex flex-column align-items-center navUser">
        <i class="fas fa-user-circle navUserIcon"></i>
        <span class="pt-2">{{userName}}</span>
      </div>

      <hr class="divider">

      <!-- item1 -->
      <div class="d-flex flex-row-reverse align-items-center pr-4 navitem" v-bind:class="{ active: navItem1}" v-on:click="navItem1Tap">
        <i class="fas fa-clipboard-list navicon"></i>
        <div class="pr-3 pt-1 pb-0">رسید ها</div>
      </div>

      <!-- item2 -->
      <div class="d-flex flex-row-reverse align-items-center pr-4 navitem" v-bind:class="{ active: navItem2}" v-on:click="navItem2Tap">
        <i class="fas fa-sitemap"></i>
        <div class="pr-3 pt-1 pb-0">منو</div>
      </div>

      <!-- logout -->
      <div class="mt-auto d-flex flex-row-reverse align-items-center pr-4 navitem" v-on:click="logoutTap">
        <i class="fas fa-sign-out-alt"></i>
        <div class="pr-3 pt-1 pb-0">خروج</div>
      </div>

    </div>

    <!-- main -->
    <div class="main">

      <navResid v-show="navItem1"></navResid>
      <navMenu v-show="navItem2"></navMenu>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import navMenu from './NavMenu'
import navResid from './NavResid'

export default {
  name: "Home",
  components:{
    navMenu,
    navResid
  },
  data() {
    return {
      userName:'',
      loading: false,
      errored: false,
      errors: [],
      navItem1: true,
      navItem2: false
    };
  },
  mounted() {
    this.userName = localStorage.userName;
  },
  methods: {
    logoutTap: function (event) {
      localStorage.clear();
      this.$router.replace({ path: "/" });
    },
    navItem1Tap: function (event) {
      this.navItem1 = true;
      this.navItem2 = false;
    },
    navItem2Tap: function (event) {
      this.navItem1 = false;
      this.navItem2 = true;
    },
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

html,
body {
  height: 100%;
  background-color: #fefefe;
}


.sidenav {
  height: 100%;
  width: 238px;
  position: fixed;
  z-index: 0;
  top: 0;
  right: 0;
  background-color: #212529;
  overflow-x: hidden;
  padding-top: 20px;
  font-family: 'IranSans';
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.navicon{
  font-size: 20px;
}

.main {
  margin-right: 238px;
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

.rtl {
  direction: rtl;
}

.font {
  font-family: "IranSans";
}

.white{
  color: white;
}

.navUser{
  padding-top: 4px;
  padding-bottom: 0px;
  background: transparent;
  color: white;
  cursor: default;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.navUserIcon{
  font-size: 35px;
}

.navitem{
  margin-top: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: transparent;
  color: #c2c7d0;
  margin-left: 8px;
  margin-right: 8px;
  cursor: default;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: pointer;
  font-size: 15px;
}

/* mouse over link */
.navitem:hover {
	color: white;
	-moz-transition: background 0.2s ease-in-out;
	-o-transition: background 0.2s ease-in-out;
	-webkit-transition: background 0.2s ease-in-out;
	background: #3c4145;
	transition: background 0.2s ease-in-out;
  text-decoration: none;
	border-radius: 8px;
}

.active{
  background: #eee;
  color: #000;
  border-radius: 8px;
}

.active:hover {
  background: #eee;
  color: #000;
  border-radius: 8px;
}

/* unvisited link */
/* .navitem:link {
	text-decoration: none;
    color: #cfcfcf;
} */

/* visited link */
/* .navitem:visited {
    color: #cfcfcf;
} */

/* selected link */
/* .navitem:active {
    color: #cfcfcf;
} */

hr.divider {
  border-top: 0.05px solid #818181;
  width: 100% auto;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
}

</style>
