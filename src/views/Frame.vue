<template>
  <div id="frame">
    <Header :headData="$store.state.menu"></Header>
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
