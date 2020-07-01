<template>
  <el-aside :width="righttWidth" class="right-box">
    <div class="right-box-content" v-if="righttWidth=='182px'">
      <div class="right-box-one">
        <span class="right-title"><i class="title-icon el-icon-edit-outline"></i>待办事项</span>
      </div>
      <div class="right-box-two">
        <span class="right-title"><i class="title-icon el-icon-s-help"></i>操作提示</span>
      </div>
    </div>

    <img
      class="right-open"
      :src="righttWidth=='28px'?require('@/assets/images/main/right_open.png'):require('@/assets/images/main/right_close.png')"
      @click="openRight"
    />
  </el-aside>
</template>

<script>
export default {
  name: "Right",
  data() {
    return {
      righttWidth: "28px",
    };
  },
  methods: {
    openRight() {
      this.righttWidth = this.righttWidth == "28px" ? "182px" : "28px";
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
  color: #fff;
  font-size: 14px;
}
.right-box-content{
  height: 100%;
}
.right-title{
  padding: 40px 0px 20px 20px;
  display: inline-block;
}
.title-icon{
  padding-right: 10px;
  font-size: 18px;
  vertical-align: bottom;
}
.right-box-one {
  height: 49.5%;
  border-bottom: 1px solid #888;
}
/* .right-box-two {
  height: 49%;
} */
.right-open {
  position: absolute;
  left: 0;
  top: 47%;
}
</style>
