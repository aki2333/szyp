<template>
  <div id="frame">
    <Header></Header>
    <el-container>
      <Left></Left>
      <el-main>
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
    return {};
  }
};
</script>
<style scoped>
#frame {
  background: url(../assets/images/main/bg.jpg);
  background-size: 100% 100%;
  min-height: 100vh;
}
</style>>
