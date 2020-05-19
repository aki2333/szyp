<template>
  <el-aside :width="leftWidth" class="left-box">
    <div class="left-nav-box" :class="{'left-nav-open':leftWidth=='225px'}">
      <div
        class="left-nav-item"
        :class="{'left-nav-item-hover':active1==lind}"
        v-for="(ln,lind) in leftMenu"
        :key="lind"
        @click="toChildren(ln,lind)"
      >
        <img v-if="active1==lind" :src="require('@/assets/images/menu/yhgngl_1.png')" />
        <img v-else :src="require('@/assets/images/menu/yhgngl_0.png')" />
        <!-- <img v-if="active1==lind" :src="require('@/assets/images/menu/'+ln.menu_icon+'_1.png')" />
        <img v-else :src="require('@/assets/images/menu/'+ln.menu_icon+'_0.png')" />-->
        <div
          class="left-nav-name"
          :class="{'left-nav-name-hover':active1==lind}"
          v-if="leftWidth=='225px'"
        >{{ln.menu_name}}</div>
      </div>
      <img class="left-open" :src="leftWidth=='225px'?require('@/assets/images/main/left_open.png'):require('@/assets/images/main/left_close.png')" @click="openLeft" />
    </div>
    <div class="chilren-nav-box" v-if="leftWidth=='225px'">
      <div
        :class="{'children-nav-item-hover':active2==cind}"
        class="children-nav-item"
        v-for="(cn,cind) in chilrenNav"
        :key="cind"
        @click="toPage(cn,cind)"
      >{{cn.menu_name}}</div>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {
      leftWidth: "225px",
      active1: 0,
      active2: 0,
      chilrenNav: [],
      bread: []
    };
  },
  props: {
    leftMenu: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    leftMenu(val) {
      console.log(val);
      this.toChildren(this.leftMenu[0], 0);
    }
  },
  mounted() {
    this.toChildren(this.leftMenu[0], 0);
  },
  methods: {
    openLeft() {
      this.leftWidth = this.leftWidth == "74px" ? "225px" : "74px";
    },
    toChildren(item, index) {
      this.active1 = index;
      console.log(2, item);
      this.chilrenNav = item.childrenMenu;
      this.bread = [];
      this.bread.push(item);
      this.toPage(this.chilrenNav[0], 0);
    },
    toPage(item, index) {
      console.log(3, item);
      this.active2 = index;
      this.bread[1] = item;
      this.$store.dispatch("aGetBread", this.bread);
      this.$router.push({ name: item.menu_url });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-box {
  /* min-height: 90vh; */
  background: rgba(10, 22, 49, 0.3);
  display: flex;
}
.left-nav-box {
  height: 100%;
  background: rgba(10, 22, 49, 0.7);
  position: relative;
  width: 74px;
}
.left-nav-open {
  width: 100px;
}
.left-open {
  position: absolute;
  right: 0;
  top: 400px;
}
.left-nav-item {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #8f969c;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.left-nav-item-hover,
.left-nav-item:hover {
  background-color: #1b3968;
  background-image: url(../assets/images/menu/menu_before.png);
  background-repeat: no-repeat;
  background-position-y: center;
}
.left-nav-name {
  margin-top: 8px;
}
.left-nav-name-hover {
  color: #ffffff;
}
.chilren-nav-box {
  color: #b1b8be;
  font-size: 13px;
  padding: 20px 10px;
}
.children-nav-item {
  height: 50px;
  cursor: pointer;
}
.children-nav-item:hover,
.children-nav-item-hover {
  color: #4294f7;
}
.children-nav-item::before {
  content: "·";
  font-size: 30px;
  vertical-align: sub;
  margin: 0 5px;
}
</style>
