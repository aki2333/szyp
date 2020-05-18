<template>
  <div class="login">
    <div class="login_main">
      <img src="../assets/images/login/pro_tip.png" alt />
      <img class="mt-30" src="../assets/images/login/login_tip.png" alt />
      <img class="mt-50" src="../assets/images/login/login_btn.png" @click="login" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    login() {
      // let url = 'http://10.0.30.57:9404/login'
      this.$api.post("/login", null, r => {
        if (r.authorization) {
          // this.$store.commit('getToken',r.authorization);
          //this.getUser();
          this.$store.commit("getToken", "6DDF3A214DD94F9F9BEEE04973DA397F");
          this.$router.push({ name: "Frame" });
        } else {
          this.$message({
            message: "登录失败！请重新登录",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  background: url("../assets/images/login/bg.png");
  background-size: 100% 100%;
  min-height: 100vh;
  overflow: hidden;
}
.login_main {
  display: flex;
  flex-direction: column;
  align-items: center; /*由于flex-direction: column，因此align-items代表的是水平方向*/
  justify-content: center;
  margin-top: 20%;
}
</style>