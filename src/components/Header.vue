<template>
  <div class="head">
    <div class="head-logo"></div>
    <div class="head-nav">
      <div
        class="head-nav-item"
        :class="{'head-nav-item-hover':active==nind}"
        v-for="(nn,nind) in $store.state.menu"
        :key="nind"
        @click="toLeftMenu(nn,nind)"
      >
        <img v-if="active==nind" :src="require('@/assets/images/menu/'+nn.menu_url+'_1_1.png')" />
        <img v-else :src="require('@/assets/images/menu/'+nn.menu_url+'_1.png')" />
        <!-- <img v-if="active==nind" :src="require('@/assets/images/menu/fxyp_1_1.png')" />
        <img v-else :src="require('@/assets/images/menu/fxyp_1.png')" />-->

        <div class="ml-10">{{nn.menu_name}}</div>
      </div>
      <div class="user-box">
        <img class="user-tx mr-10" src="@/assets/images/main/tx.png" />
        <div class="user-msg">
          <div class="user-name">{{$store.state.user.xm}}</div>
          <div class="user-dd">
            {{$store.state.user.xtyhbmmc}}
            <i class="el-icon-location"></i>
          </div>
        </div>
        <div class="user-logout" @click="logout">
          <img src="@/assets/images/main/exit.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    headData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      msg: "我是头部",
      headMenu: [],
      active: "0"
    };
  },
  created() {
    this.getNav();
  },
  methods: {
    getNav() {
      console.log(this.$store.state.menu, this.$store.state.menu[0], 0);
      this.toLeftMenu(this.$store.state.menu[0], 0);
    },
    toLeftMenu(item, index) {
      console.log(1, item);
      this.active = index;
      this.$store.commit("getLeftMenu", item.childrenMenu);
    },
    logout() {
      let url = this.$store.state.aurl;
      window.localStorage.clear();
      this.$store.state.user = {};
      this.$store.state.menu = [];
      this.$store.state.token = "";
      this.$store.state.leftMenu = [];

      if (url) {
        window.location.href = url.replace(/login\?/, "logout?");
      } else {
        this.$router.push({ name: "Login" });
        // location.reload();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  height: 79px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #295287;
}
.head-logo {
  margin-left: 14px;
  width: 450px;
  height: 46px;
  background: url(../assets/images/main/title.png);
}
.head-nav {
  /* width: 905px; */
  height: 100%;
  display: flex;
  align-items: center;
}
.head-nav-item {
  color: #8c9eb5;
  height: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  background: #1c3f6c;
  border-radius: 40px 0 0 40px;
  padding: 0 40px 0 20px;
  margin-left: -30px;
  cursor: pointer;
}
.head-nav-item:hover,
.head-nav-item-hover {
  color: #ffffff;
  background: #173356;
}
.user-box {
  background: #1c3f6c;
  height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 2px;
  padding-left: 15px;
}
.user-name {
  font-size: 18px;
}
.user-dd {
  font-size: 14px;
  color: #9fb8fb;
}
.user-logout {
  height: 100%;
  width: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 22, 49, 0.4);
  margin-left: 15px;
}
</style>
