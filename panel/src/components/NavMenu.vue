<template>
  <div class="navmenu">
    <div id="sections" class="d-flex flex-row justify-content-center align-items-start mt-5">

      <!-- items list-->
      <div id="section-items" class="card cardView text-right mb-4 mt-5 mr-3">
        <!-- header -->
        <div class="card-header d-flex flex-row justify-content-between">
          <button class="btn btn-success removeSize" type="submit" v-b-modal.modal-items>
            افزودن
          </button>
          <span class="fontBold">{{ menus.menu[currentMenuItem].name }}</span>
        </div>

        <!-- body -->
        <div class="card-body bg-transparent p-0 m-0 text-center">

          <div v-if="menus.menu[currentMenuItem].items.length == 0" class="text-secondary mt-3 mb-3 p-0" style="font-size: 14px;">موردی یافت نشد</div>

          <div
            v-else
            class="d-flex flex-column"
            v-for="(item,index) in menus.menu[currentMenuItem].items"
            :key="item.name"
          >
            <hr class="m-0 p-0" style="width:100%;" />

            <div
              class="d-flex flex-row justify-content-between align-items-center pl-4 pr-4 pt-2"
            >
              <!-- left items -->
              <div class="d-flex flex-row">
                <span class="fontBold text-danger itemDelete mr-3" v-on:click="removeItem(index)">حذف</span>
                <span class="fontBold text-info itemDelete mr-4" v-on:click="showEditItemsModal(index)">ویرایش</span>
                <span class="fontBold text-success" style="font-size: 13px;" dir="rtl">{{formatPrice(item.price)}}</span>
              </div>

              <!-- right items -->
              <div class="d-flex flex-column">
                <span class="fontBold text-dark text-right" style="font-size: 14px;">{{item.name}}</span>
                <span class="text-secondary text-right" style="font-size: 12px;">{{item.desc}}</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- menu list -->
      <div id="section-category" class="cardView text-right">

        <!-- header -->
        <div
          class="card-header bg-transparent fontBold pr-0 pl-0"
          style="border: none;">

          <div class="d-flex flex-row justify-content-between">
            <span style="font-size: 11px;padding-top:3px;cursor: pointer;outline: none !important;" class="text-success" v-b-modal.modal-menu>جدید</span>
            <span>منو</span>
          </div>

        </div>

        <!-- body -->
        <div class="bg-transparent">
          <div class="d-flex flex-column fontBold">
            <button
              type="button"
              class="btn btn-deactive"
              v-for="(item, index) in menus.menu"
              :key="item.name"
              v-bind:class="{ 'btn-active': index == currentMenuItem }"
              v-on:click="currentMenuItem = index"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- modal category/menu -->
    <b-modal
      id="modal-menu"
      ref="modal"
      title="دسته بندی جدید"
      content-class="font"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" class="fontBold" @submit.stop.prevent="submitModal">
        <b-form-group
          label="عنوان"
          label-for="name-input"
          class="text-right labelSize"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="catModalName"
            class="text-right inputSize"
            autofocus
            required
          ></b-form-input>
        </b-form-group>

      </form>

       <template #modal-header>
        <div class="d-flex justify-content-end w-100">

          <span class="fontBold p-0">دسته بندی جدید</span>

        </div>
      </template>

       <template #modal-footer>
        <div class="d-flex justify-content-start w-100">

          <b-button
            variant="success"
            size="sm"
            class="font"
            style="width:60px;"
            @click="submitModal">
            ثبت
          </b-button>

          <b-button
            variant="light"
            size="sm"
            class="font ml-2"
            style="width:60px;"
            @click="hideModal">
            لغو
          </b-button>
          

        </div>
      </template>

    </b-modal>

    <!-- modal new items -->
    <b-modal
      id="modal-items"
      ref="modalitems"
      title="افزودن محصول"
      content-class="font"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" class="fontBold" @submit.stop.prevent="submitModal">

        <b-form-group
          label="عنوان"
          label-for="name-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="name-input"
            v-model="itemModalName"
            class="text-right inputSize"
            autofocus
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="توضیحات"
          label-for="desc-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="desc-input"
            v-model="itemModalDesc"
            class="text-right inputSize"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="قیمت"
          label-for="price-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="price-input"
            type="number"
            v-model="itemModalPrice"
            class="text-right inputSize"
            required
          ></b-form-input>
        </b-form-group>

      </form>

       <template #modal-header>
        <div class="d-flex justify-content-end w-100">
          <span class="fontBold p-0">افزودن محصول</span>
        </div>
      </template>

       <template #modal-footer>
        <div class="d-flex justify-content-start w-100">

          <b-button
            variant="success"
            size="sm"
            class="font"
            style="width:60px;"
            @click="submitItemsModal">
            ثبت
          </b-button>

          <b-button
            variant="light"
            size="sm"
            class="font ml-2"
            style="width:60px;"
            @click="hideItemsModal">
            لغو
          </b-button>
          

        </div>
      </template>

    </b-modal>


    <!-- modal edit items -->
    <b-modal
      id="modal-edit-items"
      ref="modaledititems"
      title="ویرایش محصول"
      content-class="font"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" class="fontBold" @submit.stop.prevent="submitEditItemsModal">

        <!-- <span>{{menus.menu[currentMenuItem].items[currentMenuItemChild].name}}</span> -->
        <b-form-group
          label="عنوان"
          label-for="name-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="name-input"
            v-model="itemEditModalName"
            class="text-right inputSize"
            autofocus
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="توضیحات"
          label-for="desc-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="desc-input"
            v-model="itemEditModalDesc"
            class="text-right inputSize"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="قیمت"
          label-for="price-input"
          class="text-right labelSize"
          invalid-feedback="Name is required">
          <b-form-input
            id="price-input"
            type="number"
            v-model="itemEditModalPrice"
            class="text-right inputSize"
            required
          ></b-form-input>
        </b-form-group>

      </form>

       <template #modal-header>
        <div class="d-flex justify-content-end w-100">
          <span class="fontBold p-0">ویرایش محصول</span>
        </div>
      </template>

       <template #modal-footer>
        <div class="d-flex justify-content-start w-100">

          <b-button
            variant="success"
            size="sm"
            class="font"
            style="width:60px;"
            @click="submitEditItemsModal">
            ثبت
          </b-button>

          <b-button
            variant="light"
            size="sm"
            class="font ml-2"
            style="width:60px;"
            @click="hideEditItemsModal">
            لغو
          </b-button>
          

        </div>
      </template>

    </b-modal>


  </div>
</template>

<script>
import axios from "axios";
import config from '../config';

export default {
  name: "NavMenu",
  data() {
    return {
      loading: false,
      errored: false,
      errorMsg: "",
      currentMenuItem: 0,
      currentMenuItemChild: null,
      catModalName:null,
      itemModalName:null,
      itemModalDesc:null,
      itemModalPrice:null,

      itemEditModalName:null,
      itemEditModalDesc:null,
      itemEditModalPrice:null,

      menus: {}
    };
  },
  mounted() {
    this.caller();
  },
  methods: {
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
            this.menus = response.data;
          } else {
            this.hasError("لطفا مجددا تلاش کنید");
          }
        })
        .catch(error => {
          this.hasError("لطفا مجددا تلاش کنید");
          console.log(error);
        });
    },
    patchCaller: function(event) {
      axios
        .post(config.PATCH_CALLER, this.menus, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(response => {
          console.log(response);

          // if (response.status == 200) {
          //   this.menus = response.data;
          // } else {
          //   this.hasError("لطفا مجددا تلاش کنید");
          // }
        })
        .catch(error => {
          // this.hasError("لطفا مجددا تلاش کنید");
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
    resetModal() {
      this.catModalName = null
    },
    hideModal() {
      this.$refs['modal'].hide()
    },
    submitModal(){

      if(!this.catModalName){
        return;
      }

      let newCategory = {
        "name": this.catModalName,
        "items": []
      };

      this.menus.menu.push(newCategory);

      this.patchCaller();
      this.hideModal();
      this.resetModal();

    },
    resetItemsModal() {
      this.itemModalName = null;
      this.itemModalDesc = null;
      this.itemModalPrice = null;
    },
    hideItemsModal() {
      this.$refs['modalitems'].hide()
    },
    submitItemsModal(){

      if(!this.itemModalName){
        return;
      }

      if(!this.itemModalDesc){
        return;
      }

      if(!this.itemModalPrice){
        return;
      }

      let newItems = {
        "name": this.itemModalName,
        "price": this.itemModalPrice,
        "desc": this.itemModalDesc
      };

      this.menus.menu[this.currentMenuItem].items.push(newItems);

      this.patchCaller();
      this.hideItemsModal();
      this.resetItemsModal();
    },
    removeItem(index){
      this.menus.menu[this.currentMenuItem].items.splice(index, 1);
      this.patchCaller();
    },

    showEditItemsModal(index) {
      this.currentMenuItemChild = index;
      this.itemEditModalName = this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].name;
      this.itemEditModalDesc = this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].desc;
      this.itemEditModalPrice = this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].price;
      this.$refs['modaledititems'].show();
    },

    submitEditItemsModal(){

      if(!this.itemEditModalName){
        return;
      }

      if(!this.itemEditModalDesc){
        return;
      }

      if(!this.itemEditModalPrice){
        return;
      }

      this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].name = this.itemEditModalName;
      this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].desc = this.itemEditModalDesc;
      this.menus.menu[this.currentMenuItem].items[this.currentMenuItemChild].price = this.itemEditModalPrice;

      this.patchCaller();
      this.hideEditItemsModal();
      this.resetEditItemsModal();
    },

    resetEditItemsModal() {
      this.itemEditModalName = null;
      this.itemEditModalDesc = null;
      this.itemEditModalPrice = null;
    },

    hideEditItemsModal() {
      this.$refs['modaledititems'].hide()
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

html,
body {
  height: 100%;
  background-color: #fefefe;
}

.rtl {
  direction: rtl;
}

.navmenu {
  font-family: "IranSans";
}

.font {
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
  outline: none;
}

.btn-deactive {
  background-color: #f4f4f4;
  margin-bottom: 8px;
  font-size: 13px;
  color: #000000;
}

.btn-active {
  background-color: #0199cc;
  margin-bottom: 8px;
  color: white;
  font-size: 13px;
}

.btn-deactive:focus,
.btn-active:focus {
  outline: none !important;
  box-shadow: none;
}

.labelSize {
  font-size: 14px;
}

.inputSize {
  font-size: 15px;
}

#section-items{
  width: 50%;
}

#section-category{
  width: 135px;
}

@media only screen and (max-width:620px) {
     /* For mobile phones: */
  #sections{
    flex-direction: column !important;
  }

  #section-items{
    order:2;
    width: 90%;
    margin-left: 5%;
  }

  #section-category{
    order:1;
    width: 90%;
    margin-left: 5%;
  }
}

</style>
