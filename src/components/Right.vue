<template>
  <el-aside :width="righttWidth" class="right-box">
    <img class="right-open" src="@/assets/images/main/right_open.png" @click="openRight" />
  </el-aside>
</template>

<script>
export default {
  name: "Right",
  data() {
    return {
      righttWidth: "38px"
    };
  },
  methods: {
    openRight() {
      this.righttWidth = this.righttWidth == "38px" ? "182px" : "38px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right-box {
  /* min-height: 90vh; */
  background: rgba(10, 22, 49, 0.4);
  position: relative;
}
.right-open {
  position: absolute;
  left: 0;
  top: 700px;
}
</style>
