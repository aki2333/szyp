<template>
  <div class="login">
    <div class="login_main" @click="aa()">
      <img src="../assets/images/login/pro_tip.png" alt />
      <img class="mt-30" src="../assets/images/login/login_tip.png" @click="loginPassword" alt />
      <img
        class="mt-50"
        src="../assets/images/login/login_btn.png"
        @click="login"
        alt
        v-if="!isLogin"
      />
      <div class="login-box" v-if="isLogin">
        <div class="logintitle" style="color:#fff">用户登录</div>
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
        <div class="foot-btn">
          <button class="login-btn" @click="keyLogin">登录</button>
          <button
            class="login-btn"
            @click="isLogin=false"
            style="background: #99d8ff;margin-left: 20px;"
          >取消</button>
        </div>
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
  mounted() {
    if (window.location.href.includes("authorization")) {
      let token = this.getUrlParam("authorization");
      console.log("toker==", token);
      if (token) {
        this.$store.dispatch("getToken", token).then(() => {
          this.$router.push({ name: "Frame" });
        });
      }
      // else {
      //   this.$message({
      //     message: "登录失败！请重新登录",
      //     type: "warning"
      //   });
      // }
    }
  },
  methods: {
    login() {
      let url =
        "http://tyyh.szh.js:9080/cas/login?service=" +
        this.$api.root +
        "/login";
      // let url=this.$api.root+'/login'
      this.$store.dispatch("aGetUrl", url).then(data => {
        window.location.href = data;
      });

      // this.$api.post("/login", null, r => {
      //   if (r.authorization) {
      //     this.$store.commit('getToken',r.authorization);
      //     //this.getUser();
      //     // this.$store.commit("getToken", "6DDF3A214DD94F9F9BEEE04973DA397F");
      //     this.$router.push({ name: "Frame" });
      //     this.$message({
      //       message: "登录成功",
      //       type: "success"
      //     });
      //   } else {
      //     this.$message({
      //       message: "登录失败！请重新登录",
      //       type: "warning"
      //     });
      //   }
      // });
    },
    getUrlParam(name) {
      let url = window.location.href;
      //取得url中?后面的字符
      var query = url.split("?")[1];
      var pair = query.split("=");
      if (pair[0] == name) {
        return pair[1];
      }
    },
    aa() {
      // if(this.isLogin==true){
      //   this.isLogin=false
      // }
    },
    loginPassword() {
      // this.isLogin = true;
      this.$store.dispatch("aGetUrl", "");
      this.clickFive++;
      if (this.clickFive == 5) {
        this.isLogin = true;
        this.clickFive = 0;
      } else if (this.clickFive < 5) {
        setTimeout(() => {
          this.clickFive = 0;
        }, 2000);
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
.logintitle {
  font-size: 20px;
  text-align: center;
  margin: 45px 0 15px 0;
}
.login-item {
  margin-top: 20px;
  width: 80%;
  color: #fff;
}
.login-btn {
  margin-top: 40px;
  border: none;
  border-radius: 5px;
  background: #4186f4;
  width: 100px;
  min-height: 35px;
  height: 48px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
}
.login-box {
  width: 25%;
  height: 40%;
  position: fixed;
  top: 180px;
  left: 50%;
  background: #ffffff;
  border-radius: 10px;
  margin-left: -12%;
  z-index: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  min-height: 360px;
  /* justify-content:center; */
}
.foot-btn {
  display: flex;
  justify-content: space-around;
}
</style>