<template>
  <div class="login">
    <div class="login_main">
      <img src="../assets/images/login/pro_tip.png" @click="loginPassword" alt />
      <img class="mt-30" src="../assets/images/login/login_tip.png" alt />
      <img
        class="mt-50"
        src="../assets/images/login/login_btn.png"
        @click="login"
        alt
        v-if="!isLogin"
      />
      <div class="login-box" v-if="isLogin">
        <div class="logintitle">用户登录</div>
        <div class="login-item yzform">
          <el-input placeholder="用户名" v-model="user.name" @keyup.enter.native="keyLogin">
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
        </div>
        <div class="login-item yzform">
          <el-input
            placeholder="密码"
            type="password"
            v-model="user.password"
            @keyup.enter.native="keyLogin"
          >
            <i slot="prefix" class="el-input__icon"></i>
          </el-input>
        </div>
        <div @click="keyLogin" class="hand" style="color:#fff">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clickFive: 0,
      user: {},
      isLogin: false
    };
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
          this.$message({
            message: "登录成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "登录失败！请重新登录",
            type: "warning"
          });
        }
      });
    },
    loginPassword() {
      this.clickFive++;
      if (this.clickFive == 5) {
        this.isLogin = true;
        this.clickFive = 0;
      }
    },
    keyLogin() {
      if (this.user.name == "" || this.user.name == undefined) {
        this.$message.error("请输入用户名！");
        return;
      }
      if (this.user.password == "" || this.user.password == undefined) {
        this.$message.error("请输入密码！");
        return;
      }
      if (this.user.name && this.user.password) {
        this.$api.post("/accountLogin", this.user, r => {
          if (r.authorization) {
            this.$store.commit("getToken", r.authorization);
            this.$router.push({ name: "Frame" });
            this.isLogin = false;
          }
        });
      }
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