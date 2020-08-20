<template>
  <div>
    <!-- <div id="frame" v-if="$store.state.itstate">
      <Header :headData="$store.state.menu" v-show="false"></Header>
      <el-container>
        <Left :leftMenu="$store.state.leftMenu" v-show="false"></Left>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </div>   -->
    <div id="frame">
      <Header :headData="$store.state.menu" v-show="!$store.state.itstate"></Header>
      <el-container>
        <Left :leftMenu="$store.state.leftMenu" v-show="!$store.state.itstate"></Left>
        <el-main class="main">
          <Breadcrumb v-show="!$store.state.itstate"></Breadcrumb>
          <router-view />
        </el-main>
        <Right v-show="!$store.state.itstate"></Right>
      </el-container>
    </div>
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
      headData: [],
      turnPage:'',
    };
  },
  mounted() {
    // this.turnPage = this.$route.query.page
    // if(this.turnPage == 'Specialcheck'){
    //   this.$router.push({ name: "Specialcheck" });
    // }else if(this.turnPage == 'ZrqManagement'){
    //   this.$router.push({ name: "ZrqManagement" });
    // }else if(this.turnPage == 'ZrqVistManage'){
    //   this.$router.push({ name: "ZrqVistManage" });
    // }
    console.log("store", this.$store.state,this.turnPage);
  },
  methods: {}
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
