<template>
  <el-aside :width="righttWidth" class="right-box">
    <div class="right-box-content" v-if="righttWidth=='182px'">
      <div class="right-box-one">
        <span class="right-title"><i class="title-icon el-icon-edit-outline"></i>待办事项</span>
        <ul class="right-one-data">
          <li v-for="(item,ind) in dbData.dataList" :key="ind" @click="$router.push({name:item.url,query:{page:item.page,turn:item.url}})">
            <el-badge  :value="item.num" class="badge-item hand">{{item.name}}</el-badge>
            <!-- <el-badge :value="10" class="badge-item">数据查询</el-badge> -->
          </li>
        </ul>
      </div>
      <div class="right-box-two">
        <span class="right-title"><i class="title-icon el-icon-s-help"></i>操作提示</span>
      </div>
    </div>
    <div class="right-box-content" v-else>
      <div class="right-box-one">
        <div class="short-title">
          <i class="title-icon el-icon-edit-outline"></i>
          <span class="short-text">待办事项</span>
          <el-badge class="badge-sum" :value="dbData.sum" :max="99"></el-badge>
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
      dbData:{
        dataList:[
          {
            name:'市局未处理',
            num:'4000',
            url:'Specialcheck',
            page:'1'
          },
          {
            name:'派出所未处理',
            num:'3000',
            url:'Specialcheck',
            page:'3'
          },
        ]
      },
    };
  },
  mounted(){
    this.oneData();
  },
  methods: {
    openRight() {
      this.righttWidth = this.righttWidth == "36px" ? "182px" : "36px";
      this.oneData();
    },
    oneData(){
      let p={
        jb:this.$store.state.user.jb,
        bmbh:this.$store.state.user.bmbh
      }
      this.$api.post(this.$api.aport2+'/pendingData/pendingDataStatistics',p,r=>{
        this.dbData = r.hczf
      })
    },
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
.right-one-data{
  padding: 0 0 0 20px;
}
.right-title{
  padding: 40px 0px 15px 20px;
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
.short-title{
  width: 20px;  
  margin: 0 auto;  
  padding-top: 40px;
  box-sizing: border-box;
  line-height: 20px;  
}
.short-text{
  display: block;
  padding-left: 1px;
}
</style>
