<template>
  <div>
    <div class="login" v-show="!$store.state.itstate">
      <div class="other-page">
        <el-popover placement="bottom" width="300" trigger="hover">
          <div class="other-dia">
            <!-- <img src="@/assets/images/main/chrome.png" alt /> -->
            <h3>推荐浏览器下载</h3>
            <img src="@/assets/images/main/chrome.png" alt />
            <a href="http://50.73.70.116:8080/83.0.4103.97_chrome_installerX32.exe">chrome 32位</a>
            <a href="http://50.73.70.116:8080/83.0.4103.97_chrome_installer.exe">chrome 64位</a>
          </div>
          <span slot="reference" class="other-title hand">
            <i class="el-icon-question mr-5"></i>帮助中心
          </span>
        </el-popover>

        <!-- <img src="@/assets/images/main/chrome.png" alt />
        <a
        href="http://50.73.70.116:8080/83.0.4103.97_chrome_installerX32.exe"
      >32位</a>

      <a
        href="http://50.73.70.116:8080/83.0.4103.97_chrome_installer.exe"
        >64位</a>-->
      </div>
      <div class="login_main">
        <img src="../assets/images/login/pro_tip.png" alt />
        <img class="mt-30" src="../assets/images/login/login_tip_1.png" @click="loginPassword" alt />
        <img
          class="mt-50"
          src="../assets/images/login/login_btn.png"
          @click="login"
          alt
          v-show="!isLogin"
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
      <div class="login-bottom">
        <div class="copyright">© 版权所有：苏州市公安局</div>
        <!-- <div class="copyright">安全备案号：苏050200000003</div> -->
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
      userIt: {},
      isLogin: false,
      turnPage: "",
      sfzh: this.$store.state.sfzhTurn,
      loginFlag: false
    };
  },
  mounted() {
    // 由其他平台登入
    // console.log('由其他平台登入',window.location.href,window.location.href.includes("sfzh"),this.getItsUrl(window.location.href,'sfzh'))
    if (window.location.href.includes("sfzh")) {
      // console.log("this.$store.sfzh前", this.$store.state.sfzhTurn);
      this.sfzh = this.getItsUrl(window.location.href, "sfzh");
      this.turnPage = this.getItsUrl(window.location.href, "page");
      this.$store.dispatch("aGetPage", this.turnPage); //存入跳转页面page
      // console.log("this.turnPage", this.turnPage);
      this.$store.dispatch("aGetItS", true); //是否隐藏菜单标志
      if (this.sfzh != this.$store.state.sfzhTurn) {
        //身份证号是否变更
        // console.log("身份证号已变更", this.sfzh);
        this.userIt.type = "0";
        this.userIt.name = this.sfzh;
        this.$api.post(this.$api.aport1 + "/accountLogin", this.userIt, r => {
          if (r.authorization) {
            this.$store.dispatch("aGetToken", r.authorization).then(data => {
              console.log("第三方登陆成功", data);
              this.getUser();
            });
            this.$store.dispatch("aGetSfzhT", this.sfzh); //存入身份证号
            // console.log("this.$store.sfzh后", this.$store.state.sfzhTurn);
          }
        });
      } else {
        // console.log("身份证号未变更");
        this.getUser();
      }
    }
    // console.log("====", window.location.href);
    if (window.location.href.includes("authorization")) {
      if (this.$store.state.token) {
        this.getUser();
      } else {
        let token = this.getUrlParam("authorization");
        // if (token == 1) {
        //   let url = this.$store.state.aurl;
        //   window.location.href = url.replace(/login\?/, "logout?");
        // } else
        if (token) {
          this.$store.dispatch("aGetToken", token).then(() => {
            // this.$router.push({ name: "Frame" });
            this.getUser();
          });
        }
        // else {
        //   this.$message({
        //     message: "登录失败！请重新登录",
        //     type: "warning"
        //   });
        // }
      }
    }
    // else if (this.$store.state.token) {
    //   this.getUser();
    // }
  },
  methods: {
    //证书登陆
    login() {
      let url =
        "http://tyyh.szh.js:9080/cas/login?service=" +
        this.$api.root +
        this.$api.aport1 +
        "/login";
      this.$store.dispatch("aGetUrl", url).then(data => {
        window.location.href = data;
      });
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
    getItsUrl(url, name) {
      //取得url中?后面的字符
      // console.log('==',url,url.split("?")[1].split("&"))
      var query = url.split("?")[1];
      var pair = query.split("&");
      for (var i = 0; i < pair.length; i++) {
        if (pair[i].split("=")[0] == name) {
          return pair[i].split("=")[1];
        }
      }
    },
    //用户名密码登陆
    loginPassword() {
      // this.isLogin = true;

      window.sessionStorage.clear();
      this.$store.dispatch("aGetUrl", "");
      this.clickFive++;
      if (this.clickFive == 5) {
        this.isLogin = true;
        this.clickFive = 0;
      } else if (this.clickFive < 5) {
        // setTimeout(() => {
        //   this.clickFive = 0;
        // }, 2000);
      }
    },
    keyLogin() {
      if (this.user.name == "" || this.user.name == undefined) {
        this.$message({
          showClose: true,
          message: "请输入用户名！",
          duration: 0,
          type: "error"
        });
        return;
      }
      if (this.user.password == "" || this.user.password == undefined) {
        this.$message({
          showClose: true,
          message: "请输入密码！",
          duration: 0,
          type: "error"
        });
        return;
      }
      if (this.user.name && this.user.password) {
        this.$api.post(this.$api.aport1 + "/accountLogin", this.user, r => {
          if (r.authorization) {
            this.$store.dispatch("aGetToken", r.authorization).then(data => {
              console.log("登陆成功", data);
              this.getUser();
            });
          }
        });
      }
    },
    getUser() {
      this.$api.post(this.$api.aport1 + "/userController/getUser", {}, r => {
        this.$store.dispatch("aGetUser", r).then(data => {
          console.log("获取用户信息成功", data);
          this.getNav(data);
        });
      });
    },
    getNav(data) {
      this.$api.post(
        this.$api.aport1 + "/dept/getPermissionTree",
        {
          userId: data.userId,
          userBmbh: data.bmbh
        },
        r => {
          this.$store.dispatch("aGetMenu", r[0].childrenMenu).then(data2 => {
            console.log("获取菜单成功", data2);
            let menuC = [];
            data2.forEach(item => {
              item.childrenMenu.forEach(jtem => {
                // console.log(jtem.childrenMenu)
                jtem.childrenMenu.forEach(ktem => {
                  menuC.push(ktem)
                  // console.log('menuC',menuC)
                  this.$store.dispatch("aGetMenuC",menuC)
                })
              })
            });
            if (data2.length == 0) {
              this.$confirm(" 没有功能权限，请联系管理员", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {});
            } else {
              this.$router.push({ name: "Frame" }); //page:由第三方介入页面跳转
              this.isLogin = false;
            }
          });
        }
      );
    }
  }
};
</script>
<style scoped>
.other-page {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0px;
  text-align: right;
  color: #fff;
}
.other-title {
  color: #fff;
  margin: 20px 25px 0px 0px;
  display: inline-block;
}
.other-dia {
  text-align: center;
}
.other-dia h3 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}

.other-dia img {
  width: 25px;
  vertical-align: middle;
}
.other-dia a {
  color: #000;
  margin: 10px;
}
.other-dia a:hover {
  color: #4186f4;
}
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