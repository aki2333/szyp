<template>
  <div id="frame">
    <Header v-if="$store.state.menu.length>0" :headData="$store.state.menu"></Header>
    <el-container>
      <Left :leftMenu="$store.state.leftMenu"></Left>
      <el-main class="main">
        <Breadcrumb></Breadcrumb>
        <router-view />
      </el-main>
      <Right></Right>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "Frame",
  components: {
    Header,
    Left,
    Right,
    Breadcrumb
  },
  data() {
    return {
      headData: []
    };
  },
  mounted() {
    console.log("store", this.$store.state);
    if (!localStorage.getItem("user")) {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      this.$api.post(this.$api.aport1 + "/userController/getUser", {}, r => {
        this.$store.dispatch("aGetUser", r).then(data => {
          console.log(data);
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
          this.$store.dispatch("aGetMenu", r[0].childrenMenu);
          // .then(data => {
          //console.log(data);
          //this.headData = data[0].childrenMenu;
          // });
        }
      );
    }
  }
};
</script>
<style scoped>
#frame {
  background: url(../assets/images/main/bg.jpg);
  background-size: 100% 100%;
  min-height: 100vh;
}
.main {
  overflow: hidden !important;
  min-height: 91vh;
}
</style>>
