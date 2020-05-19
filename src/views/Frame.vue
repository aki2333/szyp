<template>
  <div id="frame">
    <Header v-if="headData.length>0" :headData="headData"></Header>
    <el-container>
      <Left v-if="$store.state.leftMenu.length>0" :leftMenu="$store.state.leftMenu"></Left>
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
    // let token = this.getUrlParam('authorization');
    // this.$store.commit('getToken',token);
    this.getUser();
  },
  methods: {
    getUser() {
      this.$api.post("userController/getUser", {}, r => {
        this.$store.dispatch("aGetUser", r).then(data => {
          console.log(data);
          this.getNav(data);
        });
      });
    },
    getNav(data) {
      this.$api.post(
        "dept/getPermissionTree",
        {
          userId: data.userId,
          userBmbh: data.bmbh
        },
        r => {
          this.$store.dispatch("aGetMenu", r).then(data => {
            console.log(data);
            console.log("aaa", a);
            this.headData = data[0].childrenMenu;
            let a = [...this.headData];
            this.$store
              .dispatch("aGetLeftMenu", a.childrenMenu[0].childrenMenu)
              .then(data2 => {
                console.log(this.$store.state, data2);
              });
          });
        }
      );
    }
    //  getUrlParam(name) {
    // var url="http://10.0.30.78:8083/#/?authorization=jskdjfkjdslkfjdslkjflks"
    // var url = window.location.href;
    // 取得url中?后面的字符
    // var query = url.split("?")[1];
    // var query = window.location.search.substring(1);
    // var pair = query.split("=");
    // if(pair[0] == name){
    // return pair[1];
    // }
    // }
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
  min-height: 91vh;
}
</style>>
