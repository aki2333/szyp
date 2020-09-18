<template>
  <div class="inquire">
    <div  v-if="!queryIsShow" key='1'>
      <div v-for="(item,ind) in facxData" :key="ind" class="inline-block mr-5">
        <div v-for="(tags,inds) in checkArr[ind]" :key="inds" class="inline-block mr-5">
          <template v-if="!linkFlag[ind]">
            <el-tag 
              size="medium"
              effect="dark"
              :type="item.color"
              class="hand mr-5"
              :style="[{backgroundColor:backstatus==tags.dm?item.checkC:''},{borderColor:backstatus==tags.dm?item.checkC:''}]"
              @click="tagClick(tags,item,ind)"
            >{{tags.mc}}</el-tag>
          </template>
        </div>
      </div>


      <!-- <el-dropdown v-for="(fa,fai) in facxData" :key="fai" @command="commandfnc" class="mr-10">
        <el-button type="primary" size='mini'>
          {{JSON.stringify(checkObj[fai]) == "{}"?fa.cm:checkObj[fai].mc}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" v-if="fa.type=='select'">
          <el-dropdown-item v-for="(item,ind) in $store.state[fa.dm]" :key="ind" :command="item.mc+'-'+item.dm+'-'+fa.dm+'-'+fai">{{item.mc}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- <template v-for="(item,ind) in $store.state[fa.dm]">
        <el-tag 
        type="warning"
        :key="ind"
        v-if="item.dm==checkObj[fai]"
        >{{item.mc}}</el-tag>
      </template> -->
    </div>
    <el-form
      :model="inquire"
      status-icon
      :rules="rules"
      size="mini"
      ref="inquire"
      label-width="100px"
      class="inquire-ruleForm"
      v-else
      key="2"
    >
      <el-row :gutter="0" type="flex" align="middle" justify="center">
        <el-col :span="20">
          <el-col :span="cx.type=='double'?12:(cx.col?cx.col:6)" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="inquire[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select
                  v-model="inquire[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  :clearable="!cx.must"
                  placeholder="请选择"
                  @change="linkChange(cx,inquire[cx.dm],inquire)"
                >
                  <el-option
                    v-for="(item,ind) in $cdata.options[cx.dm]"
                    :key="ind"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="inquire[cx.dm]"
                  filterable
                  v-else
                  placeholder="请选择"
                  :clearable="!cx.must"
                  :disabled="inquire[cx.dm+'dis']"
                  :multiple="cx.mult"
                  :collapse-tags="cx.mult"
                  @change="linkChange(cx,inquire[cx.dm],inquire)"
                >
                  <el-option
                    v-for="(item,inds) in $store.state[cx.dm]"
                    :key="inds+'o'"
                    :label="cx.disdm?item.mc:item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="inquire[cx.dm]"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="inquire[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始时间"
                      :value-format="cx.children[0].type=='date'?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="inquire[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束时间"
                      :value-format="cx.children[0].type=='date'?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'"
                    ></el-date-picker>
                  </div>
                  <!-- <div class="double" v-for="(c,chi) in cx.children" :key="chi">
                    <el-date-picker v-model="inquire[c.dm]" :type="c.type" placeholder="选择日期"></el-date-picker>
                  </div>-->
                </div>
              </template>
              <template v-else-if="cx.type=='ageDouble'">
                <div class="double-box">
                  <div class="double">
                    <el-input v-model="inquire[cx.children[0].dm]" :type="cx.children[0].type"></el-input>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-input v-model="inquire[cx.children[1].dm]" :type="cx.children[1].type"></el-input>
                  </div>
                </div>
              </template>
              <template v-else-if="cx.type=='button'">
                <el-button 
                :type="item.dm==btnChecked?'success':'primary'" 
                size="mini"
                v-for="(item,inds) in $cdata.options[cx.dm]"
                :key="inds"
                @click="quickView(item.dm)">{{item.mc}}</el-button>
              </template>
            </el-form-item>
          </el-col>
          <el-checkbox v-for="(cc,ind) in cxCheck" :key="ind+'che'" class="quire-check" v-model="inquire[cc.dm]" :true-label="cc.trueLabel" :false-label="cc.falseLabel" :checked="cc.check">{{cc.mc}}</el-checkbox>
        </el-col>
        <el-col :span="4" align="center">
          <template v-for="(pb,pbi) in $store.state.plBtn">
            <el-button
              class="cx-btn"
              size="small"
              :type="pb.py=='cx'?'primary':'info'"
              round
              v-if="cxType!='noCbtn'&&pb.button_type==1"
              :key="pbi"
              @click="btnClick(pb.py,pb)"
            >{{pb.button_name||pb.menu_name}}</el-button>
          </template>
          <template v-if="cxType=='noCbtn'">
            <el-button
              class="cx-btn"
              round
              size="small"
              type="primary"
              @click="submitForm('inquire')"
            >查询</el-button>
            <el-button size="small" type="info" round @click="resetForm('inquire')">清除</el-button>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <div class="changeBtn hand"  @click="queryShow">
      <i :class="queryIsShow==true?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      <span>{{queryIsShow==true?'快速筛选':'筛选条件'}}</span>
    </div>
    <!-- <img :src="queryIsShow==true?closeImg:openImg" alt @click="queryShow" class="changeBtn" /> -->
  </div>
</template>
<script>
export default {
  props: {
    cxType: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    cxData: {
      type: Array,
      default: () => []
    },
    cxCheck: {
      type: Array,
      default: () => []
    },
    facxData:{
      type:Array,
      default: () => []
    },
    pd: {
      type: Object,
      default: () => {}
    },
    cxPara:{
      type: Object,
      default: () => {}
    },
    cxShow:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inquire: this.pd,
      tagCheck:'',
      rules: {},
      queryIsShow: this.cxShow,
      openImg: require("../assets/images/main/open_query.png"),
      closeImg: require("../assets/images/main/close_query.png"),
      mrz: {},
      flag:{
        0:true,
        1:true,
        2:true,
        3:true,
      },
      linkFlag:{},
      checkObj:{
        0:{},
        1:{},
        2:{},
        3:{},
      },
      checkArr:{
        0:[],
        1:[],
        2:[],
        3:[],
      },
      QcxObj:{},
      aa:true,
      backstatus:'',//走访状态
      btnChecked:''
    };
  },
  watch:{
    // checkArr: {
    //   handler() {
    //     if(this.aa){
    //       this.facxData.length==0?this.checkArr[0]=[]:this.checkArr[0]
    //       // this.checkArr[0] = this.$store.state[this.facxData[0].dm]
    //       this.aa = false
    //     }
    //   },
    //   deep: true
    // },
  },
  mounted() {
    Object.assign(this.mrz, this.pd);
    this.mrz = JSON.parse(JSON.stringify(this.mrz));
    //核查走访
    this.$store.dispatch("aGetDatatype").then((data) => {
      this.checkArr[0] = data
    });  
  },
  methods: {
    btnClick(py,pb) {
      if (py == "cx") {
        this.submitForm("inquire",pb);
      } else if (py == "qc") {
        this.resetForm("inquire");
      }
    },
    quickView(val){
      if(this.btnChecked == val){
        this.btnChecked = ''
      }else{
        this.btnChecked = val;
      }
      this.$emit('quickView',this.btnChecked)
    },
    tagClick(value,data,ind){
      this.checkArr[ind] = JSON.parse(JSON.stringify(this.$store.state[data.dm]))
      this.flag[ind] = !this.flag[ind]
      if(data.dm=='datatype'){//两者位置在一起的联动
        if(this.flag[ind]){
          this.linkFlag[ind+1]=true//未选中下发类别，走访状态隐藏
          this.backstatus = ''//清空走访状态标志值
        }else{
          this.linkFlag[ind+1]=false//选中下发类别，走访状态展开
        }
        this.$store.dispatch("aGetBackstatus",value.dm).then((data) => {
          this.checkArr[ind+1] = data
        });  
      }
      if(data.dm=='backstatus'){//走访状态 选中与未选中
        if(this.backstatus == value.dm){//取消选中
          this.backstatus = ''
        }else{
          this.backstatus = value.dm
        }
      }
      if(data.dm!='backstatus'){//被关联项平铺
        if(this.flag[ind]){//当下发类别未选中时，去掉走访状态的值
          this.checkArr[ind] = this.$store.state[data.dm]
          for(var i in this.QcxObj){
            if(this.QcxObj[i].dmx=='backstatus'){
              this.QcxObj[i].dm = ''
            }
          }
        }else{
          this.checkArr[ind] = Object.assign([],[value])
        }
      }
      // console.log('===',ind,data.dm,value.dm,this.QcxObj)
      this.QcxObj[ind]={
          dmx:data.dm,
          dm:(this.flag[ind]&&data.dm!="backstatus")?'':(data.dm=='backstatus'&&!this.backstatus)?'':value.dm//被关联项平铺，不受flag控制，走访状态的value已在上面控制
      } 
      // console.log('flag==',ind,this.flag[ind],this.checkArr[ind],this.QcxObj)
      this.$emit('tagClickFnc',{value:value,data:data,para:this.QcxObj})
    },
    // tagClick(value,data,ind){
    //   this.checkArr[data.dm] = JSON.parse(JSON.stringify(this.$store.state[data.dm]))
    //   if(data.dm=='datatype'){
    //     this.checkArr['backstatus'] = JSON.parse(JSON.stringify(this.$store.state['backstatus']))
    //   }
    //   this.flag[data.dm] = !this.flag[data.dm]
    //   if(this.flag[data.dm]){
    //     this.checkArr[data.dm] = this.$store.state[data.dm]
    //   }else{
    //     this.checkArr[data.dm] = Object.assign([],[value]) 
    //   }
    //   console.log('flag==',ind,this.flag[data.dm],this.checkArr[data.dm])
    //   this.$emit('tagClickFnc',{value:value,data:data})
    // },
    commandfnc(command){
      this.$nextTick(()=>{
        let obj={
          dm:command.split('-')[1],
          mc:command.split('-')[0],
          dmx:command.split('-')[2]
        }
        this.checkObj[command.split('-')[3]] = obj;
        console.log(this.checkObj,this.checkObj[command.split('-')[3]],command.split('-')[1],command.split('-')[0])
        this.$emit('commandfnc',{obj:this.checkObj,data:command.split('-')[2],command:command.split('-')[1]})
      })
    },
    submitForm(formName,pb) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(pb)
          // console.log('bread',this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name)
          if(this.cxType!='noCbtn'){
            this.cxPara.menu_name = this.$store.state.breadcrumb[this.$store.state.breadcrumb.length-1].menu_name;
            this.cxPara.btn_name = pb.menu_name;
            this.cxPara.user = this.$store.state.user;
          }
          this.$emit("cxFnc", this.inquire);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    queryShow() {
      this.queryIsShow = !this.queryIsShow;
      // this.checkArr={0:this.facxData.length==0?[]:this.$store.state[this.facxData[0].dm],1:[],2:[],3:[],},

      this.$emit("queryShowFnc", this.queryIsShow);
    },
    linkChange(key, val, inquire) {
      this.$emit("lcFnc", { key: key, data: val, obj: inquire });
    },
    resetForm() {
      let mrz = {};
      Object.assign(mrz, this.mrz);
      this.inquire = mrz;
      // console.log(this.inquire, this.mrz);
      // this.$emit("getFirstPd", this.mrz);
      // this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.inquire {
  padding: 18px 15px 11px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #295287; */
  /* margin-bottom: 11px; */
  color: #a09fa7;
  position: relative;
  /* background-color: #fff; */
}
.changeBtn {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 80px;
  height: 20px;
  line-height: 20px;
  background-color:#7FCEFF;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.changeBtn span{
  padding: 0 5px;
}
.cx-btn {
  margin-bottom: 18px;
}
.double-box {
  display: flex;
  justify-content: space-between;
}
.double {
  width: 48%;
}
</style>
<style>
.changeBtn .el-icon-d-arrow-left{
  transform: rotate(-90deg);
}
.changeBtn .el-icon-d-arrow-right{
  transform: rotate(-90deg);
}
</style>
