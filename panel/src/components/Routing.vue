<template>
  <div class="routing">
    
  </div>
</template>

<script>

export default {
  name: "Routing",
  data() {
    return {
    };
  },
  mounted() {
    if(localStorage.token == null || localStorage.token ==''){
      this.$router.replace({ path: "/login" });
    }else{
      this.$router.replace({ path: "/home" });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
