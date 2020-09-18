<template>
  <el-aside :width="leftWidth" class="left-box">
    <div class="left-nav-box" :class="{'left-nav-open':leftWidth=='auto'}">
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
          v-if="leftWidth=='auto'"
        >{{ln.menu_name}}</div>
      </div>
      <img
        class="left-open"
        :src="leftWidth=='36px'?require('@/assets/images/main/left_open.png'):require('@/assets/images/main/left_close.png')"
        @click="openLeft"
      />
    </div>
    <div class="chilren-nav-box" v-if="leftWidth=='auto'">
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
      leftWidth: "auto",
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
    leftMenu() {
      // console.log('leftwatch==',this.$store.state.leftMenu)
      if(JSON.stringify(this.$store.state.menuTo) == "{}"){
        this.toChildren(this.$store.state.leftMenu[0], 0);//二级菜单
      }else{
        // console.log('000000',this.$store.state.leftMenu[this.$store.state.menuTo.active1],this.$store.state.menuTo.active1)
        this.toChildren(this.$store.state.leftMenu[this.$store.state.menuTo.active1], this.$store.state.menuTo.active1,true,this.$store.state.menuTo.query);//二级菜单
      }
    },
    $route:{
      handler(val){
        if(val.query.turn){
          // console.log('this.$store.state.menuTo',JSON.stringify(this.$store.state.menuTo) != "{}")
          if(JSON.stringify(this.$store.state.menuTo) != "{}"){
            // console.log('111111',this.$store.state.leftMenu[this.$store.state.menuTo.active1],this.$store.state.menuTo.active1)
            this.toChildren(this.$store.state.leftMenu[this.$store.state.menuTo.active1], this.$store.state.menuTo.active1,true,val.query);//二级菜单
          }
        }
      },
      // deep:true,
      // immediate: true
    }
  },
  mounted() {
    console.log('left===',this.$store.state.leftMenu)
    this.toChildren(this.$store.state.leftMenu[0], 0);//首次加载第一个二级菜单
  },
  methods: {
    openLeft() {
      this.leftWidth = this.leftWidth == "36px" ? "auto" : "36px";
      this.$store.commit('getLeftWid',this.leftWidth)
    },
    toChildren(item, index, mt, query) {//item 点击选中的二级菜单
      this.active1 = index;
      console.log(2, item,this.$store.state.turnPage);
      this.chilrenNav = item.childrenMenu;//三级菜单data
      this.bread = [];
      this.bread.push(item);//面包屑 第一项记录二级菜单
      if(this.$store.state.turnPage){//由第三方进入系统 跳转页面
        var result = this.chilrenNav.some((item,ind)=>{
          if(item.menu_url==this.$store.state.turnPage){
              this.toPage(item, ind);
              return true
          } 
        })
        if(!result){
          this.$alert("没有此功能权限，请联系所护分县局出入境管理大队", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          })
        }
      }else{
        if(mt){
          this.toPage(this.chilrenNav[this.$store.state.menuTo.active2], this.$store.state.menuTo.active2,query);
        }else{
          this.toPage(this.chilrenNav[0], 0);//首先跳转到第一个二级菜单下的第一个三级菜单
        }
      }
    },
    toPage(item, index, query) {//点击选中的三级菜单，跳转到相应的页面
      if (item.menu_url.indexOf("http") > -1) {
        window.open(item.menu_url, "_blank");
      }else {
        console.log(3, item);
        this.active2 = index;
        this.bread[1] = item;//面包屑 第二项记录三级菜单
        console.log("this.bread", this.bread);
        this.$store.dispatch("aGetBread", this.bread);
        console.log("this.childrenMenu", item.childrenMenu);
        if (item.childrenMenu) {//菜单第四级 按钮权限 1-系统按钮，2-表格按钮，3-操作按钮
          this.$store.dispatch("aGetPlBtn", item.childrenMenu).then(() => {
            this.$router.push({ name: item.menu_url, query:query});
          });
        } else {
          this.$store.dispatch("aGetPlBtn", []).then(() => {
            this.$router.push({ name: item.menu_url, query:query});
          });
        }
      }
      this.$store.commit("getMenuTo",{})
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
  width: 36px;
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
  padding: 20px 15px 20px 10px;
}
.children-nav-item {
  height: 50px;
  cursor: pointer;
  font-weight: bold;
}
.children-nav-item:hover,
.children-nav-item-hover {
  color: #85bcfc;
}
.children-nav-item::before {
  content: "·";
  font-size: 25px;
  vertical-align: sub;
  margin: 0 2px;
}
</style>
