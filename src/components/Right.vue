<template>
  <el-aside :width="righttWidth" class="right-box">
    <div class="right-box-content" v-if="righttWidth=='182px'" >
      <div class="right-box-one" @click.self="openRight">
        <span class="right-title">
          <i class="title-icon el-icon-edit-outline"></i>待办事项
        </span>
        <el-collapse accordion class="db-right targetItem">
          <el-collapse-item class="targetItem" v-for="(item,ind) in dbData.allData" :key="ind">
            <template slot="title">
              <div class="one-menu targetItem" @click="openPage(item)">
                <el-badge :value="item.sum" class="badge-item-title hand targetItem">{{item.menu_name}}</el-badge>
              </div>
            </template>
            <div class="targetItem" v-for="(child,inds) in item.dataList" v-show="child.name!='走访中'" :key="inds" @click="toPageFun(child)">
              <el-badge  :value="child.num" class="badge-item hand targetItem">{{child.name}}</el-badge>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right-box-two" @click.self="openRight">
        <span class="right-title">
          <i class="title-icon el-icon-s-help"></i>操作提示
        </span>
      </div>
    </div>
    <div class="right-box-content" v-else @click="openRight">
      <div class="right-box-one">
        <div class="short-title">
          <i class="title-icon el-icon-edit-outline"></i>
          <span class="short-text">待办事项</span>
          <el-badge class="badge-sum" :value="dbData.total" :max="99"></el-badge>
        </div>
      </div>
      <div class="right-box-two">
        <div class="short-title">
          <i class="title-icon el-icon-s-help"></i>
          <span class="short-text">操作提示</span>
        </div>
      </div>
    </div>
    <img
      class="right-open"
      :src="righttWidth=='36px'?require('@/assets/images/main/right_open.png'):require('@/assets/images/main/right_close.png')"
      @click="openRight"
    />
  </el-aside>
</template>

<script>
export default {
  name: "Right",
  data() {
    return {
      righttWidth: "36px",
      dbData: {
        // total: 8000,
        // allData: [
        //   {
        //     menu_url: "Specialcheck",
        //     menu_name: "核查走访",
        //     dataList: [
        //       {
        //         name: "市局未处理",
        //         num: "4000",
        //         url: "Specialcheck",
        //         page: "1"
        //       },
        //       {
        //         name: "派出所未处理",
        //         num: "3000",
        //         url: "Specialcheck",
        //         page: "3"
        //       }
        //     ],
        //     sum: 6000
        //   },
        //   {
        //     menu_url: "Temporary",
        //     menu_name: "网报临住",
        //     dataList: [],
        //     sum: 6000
        //   }
        // ]
      }
    };
  },
  mounted() {
    this.oneData();
  },
  methods: {
    openRight() {
      // console.log('e==',e)
      // if (!e.target.className.includes("targetItem") && e.target.tagName != "SUP") {
        this.righttWidth = this.righttWidth == "36px" ? "182px" : "36px";
        this.oneData();
      // }
    },
    toPageFun(val){
      var result = this.$store.state.menuC.some((item)=>{
        if(item.menu_url==val.url){
          this.$router.push({name:val.url,query:{pageA:val.pageA,page:val.page,turn:val.url}})
          return true
        }
      })
      if(!result){
        this.$alert(" 没有此功能权限，请联系管理员", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        })
      }
    },
    openPage(val){
      if(val.dataList.length==0){
        this.$router.push({name:val.menu_url,query:{turn:val.menu_url}})
      }
    },
    oneData() {
      let p = {
        jb: this.$store.state.user.jb,
        bmbh: this.$store.state.user.bmbh,
        userId:this.$store.state.user.userId,
        zrqList:this.$store.state.user.zrqList,
      };
      this.$api.post(
        this.$api.aport2 + "/pendingData/pendingDataStatistics",
        p,
        r => {
          this.dbData = r;
        }
      );
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
.right-box-content {
  height: 100%;
  overflow: hidden;
}
.right-one-data {
  padding: 0 0 0 20px;
}
.right-title {
  padding: 40px 0px 15px 20px;
  display: inline-block;
}
.title-icon {
  padding-right: 10px;
  font-size: 18px;
  vertical-align: bottom;
}
.right-box-one {
  height: 49.5%;
  border-bottom: 1px solid #888;
}
.right-box-two {
  height: 49%;
}
.right-open {
  position: absolute;
  left: 0;
  top: 47%;
}
.short-title {
  width: 20px;
  margin: 0 auto;
  padding-top: 40px;
  box-sizing: border-box;
  line-height: 20px;
}
.short-text {
  display: block;
  padding-left: 1px;
}
</style>
