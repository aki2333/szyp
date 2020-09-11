<template>
  <div>
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="mini"
      ref="form"
      :label-width="cxData[0].labelWid==undefined?'100px':cxData[0].labelWid"
      class="form-ruleForm"
      :disabled="dialogType=='ck'"
    >
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="cxData[0].mRow==undefined?16:cxData[0].mRow">
          <el-col :span="cx.col?cx.col:24" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="!cx.hc_con||(cx.dm=='datasources_desc'&&page==cx.hc_con)||(cx.dm=='phone'&&dialogData['datatype']==cx.hc_con)?cx.cm:''" :prop="cx.dm" :title="cx.cm">
              <template v-if="cx.type=='input'">
                <el-input v-if="!cx.hc_con||(cx.dm=='datasources_desc'&&page==cx.hc_con)||(cx.dm=='phone'&&dialogData['datatype']==cx.hc_con)" v-model="dialogData[cx.dm]" :disabled="cx.dis" :maxlength="cx.max"></el-input>
              </template>
              <template v-if="cx.type=='joinInput'">
                <el-input v-model="dialogData[cx.dm]" :disabled="joinFlag"></el-input>
              </template>
              <template v-if="cx.type=='inpColor'">
                <el-row type="flex" justify="start">
                  <el-col :span="23"><el-input v-model="dialogData[cx.dm]"></el-input></el-col>
                  <el-col :span="3" class="ml-10"><span style="width:20px;height:20px;display:inline-block;vertical-align: middle;" :style="{backgroundColor:dialogData[cx.dm]}"></span></el-col>
                </el-row>
              </template>
              <template v-if="cx.type=='block'">
                <colorPicker v-model="dialogData[cx.dm]"/>
                <!-- <el-select v-model="dialogData[cx.dm]" placeholder="请选择" popper-class="color-block" class="color-inp" @change="colorChange(dialogData[cx.dm],0)">
                  <el-option
                    v-for="(item,its) in colorArr"
                    :key="its"
                    :label="item"
                    :value="item">
                    <span style="width:20px;height:20px;display: inline-block;" :style="{backgroundColor:item}"></span>
                  </el-option>
                </el-select> -->
              </template>
              <template v-if="cx.type=='inpUnit'">
                <el-row type="flex" justify="start">
                  <el-col :span="23"><el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input></el-col>
                  <el-col :span="3" class="ml-10"><span>{{cx.unit=='hour'?'小时':'天'}}</span></el-col>
                </el-row>
              </template>
              <template v-else-if="cx.type=='password'">
                <el-input type="password" v-model="dialogData[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <!-- 取常量值 optype=true  取store值 optype=!true -->
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)">
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.dm"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-else
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)"
                >
                  <el-option
                    v-for="(item,index) in $store.state[cx.dm]"
                    :key="index"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='datetimePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束日期"
                    ></el-date-picker>
                  </div>
                  <!-- <div class="double" v-for="(c,chi) in cx.children" :key="chi">
                    <el-date-picker v-model="form[c.dm]" :type="c.type" placeholder="选择日期"></el-date-picker>
                  </div>-->
                </div>
              </template>
              <template v-else-if="cx.type=='radio'">
                <el-radio-group v-model="dialogData[cx.dm]" @change="radioChange" class="form-radio" :disabled="cx.dis">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="cx.type=='textarea'">
                <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="请输入内容"
                  v-model="dialogData[cx.dm]">
                </el-input>
              </template>
            </el-form-item>
            <el-row  :gutter="30">
              <el-col :span="cus.col" v-for="(cus,ind) in cx.issueDataFeedbackList" :key="ind">
                <el-form-item :label="cus.title">
                  <template v-if="cus.type=='text'">
                    <el-input v-model="dialogData[cus.serial].value" :disabled="cus.dis"></el-input>
                  </template>
                  <template v-if="cus.type=='radio'">
                    <el-radio-group v-model="dialogData[cus.serial].value" class="form-radio" :disabled="cus.dis">
                      <el-radio
                        :label="item.id"
                        v-for="(item,ind) in JSON.parse(cus.name)"
                        :key="ind"
                      >{{item.textAdd}}</el-radio>
                    </el-radio-group>
                  </template>
                  <template v-if="cus.type=='select'">
                    <el-select
                      v-model="dialogData[cus.serial].value"
                      filterable
                      clearable
                      :disabled="cus.dis"
                      placeholder="请选择">
                      <el-option
                        v-for="item in JSON.parse(cus.name)"
                        :key="item.id"
                        :label="item.textAdd"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </template>
                  <template v-if="cus.type=='checkbox'">
                    <el-checkbox-group v-model="dialogData[cus.serial].value" :disabled="cus.dis">
                      <el-checkbox
                      v-for="(item,ind) in JSON.parse(cus.name)"
                      :key="ind"
                      :label="item.id">{{item.textAdd}}</el-checkbox>
                    </el-checkbox-group>
                  </template> 
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="cx.type=='line'">
                <span class="divider-text">{{cx.title}}</span>
                <el-divider></el-divider>
            </template>
            <template v-else-if="cx.type=='checkbox'">
              <el-checkbox v-model="dialogData[cx.dm]" :true-label="cx.trueLabel" :false-label="cx.falseLabel">{{cx.mc}}</el-checkbox>
            </template>
            <template v-if="cx.type=='photo'">
              <el-popover placement="right" title="" trigger="hover">
                <img :src="dialogData[cx.dm]" style="max-width:700px; max-height:700px;"/>
                <img slot="reference" :src="dialogData[cx.dm]" :alt="dialogData[cx.dm]"  width="100" height="100" >
            </el-popover>
            </template>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <!-- <ZDY
     v-if="ZDYShow"></ZDY> -->
     <div class="custom" v-if="ZDYShow">
      <el-form
          :model="ColorData"
          status-icon
          size="mini"
          ref="colorForm"
          label-width="130px"
          class="form-ruleForm"
        >
        <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="16">
          <el-col :span="24" class="color-part" v-for="(all,alls) in ColorData.data" :key="alls">
            <el-row type="flex">
              <el-col :span="19">
                  <el-form-item  v-for="(item,ind) in ColorLabel" :key="ind" :label="item.cm" :prop="item.dm=='ysshbz'?'':'data.'+alls+'.'+item.dm" 
                  :rules="{required: true, message: '此项必填', trigger: 'blur'}" :class="item.class">
                    <template v-if="item.type=='inpUnit'">
                      <el-row type="flex" justify="start">
                        <el-input v-model="all[item.dm]" :type="item.mold?item.mold:''"></el-input>
                        <el-col :span="3" class="ml-10"><span>天</span></el-col>
                      </el-row>
                    </template>
                    <template v-if="item.type=='input'">
                      <el-input v-model="all[item.dm]" :type="item.mold?item.mold:''"></el-input>
                    </template>
                    <template v-if="item.type=='block'">
                      <colorPicker v-model="all[item.dm]"/>
                    </template>
                    <template v-else-if="item.type=='textarea'">
                      <el-input
                        type="textarea"
                        :rows="1"
                        placeholder="请输入内容"
                        v-model="all[item.dm]">
                      </el-input>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="ml-5 align-center"> 
                  <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="Add()" v-if="ColorData.data.length-1==alls"></el-button>
                  <el-button type="danger" icon="el-icon-minus" size="mini" circle @click="deleteModel(alls)" v-if="alls!=0"></el-button>
                </el-col>
              </el-row>
          </el-col>
        </el-col>
        </el-row>
      </el-form>
  </div>
    <div class="page-btn-box" v-if="dialogType=='ck'">
        <el-button size="mini" type="info" round @click="cancel">关闭</el-button>
    </div>
    <div class="page-btn-box" v-else-if="btnPage=='czxxwhjzd'">
      <el-button size="mini" type="primary" round v-if="isEditBtn" @click="save('form')">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
    <div class="page-btn-box" v-else-if="btnPage=='czxxwhgzd'">
      <el-button size="mini" type="primary" round v-if="isEditBtn" @click="save('form')">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
    <div class="page-btn-box" v-else>
      <div style="display:inline-block;margin-right:10px" v-if="isDb">
        <el-button
          size="mini"
          :type="db.type"
          round
          v-for="(db,dbi) in dbBtn"
          @click="dbBtnFun(db)"
          :key="dbi"
        >{{db.button_name}}</el-button>
      </div>
      <div style="display:inline-block" v-if="commonBtn&&dialogType!='ck'">
        <el-button size="mini" type="primary" round v-if="isEditBtn" @click="save('form')">保存</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cxData: {
      type: Array,
      default: () => []
    },
    // 【内层列表tab】
    page: {
      type: String,
      default: ""
    },
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    dbBtn: {
      type: Array,
      default: () => {}
    },
    isDb: {
      type: Boolean,
      default: false
    },
    joinFlag: {
      type: Boolean,
      default: true
    },
    isEditBtn: {
      type: Boolean,
      default: true
    },
    commonBtn:{
      type: Boolean,
      default: true
    },
    ZDYShow:{
      type: Boolean,
      default: false
    },
    btnPage:{
      type:String,
      default:''
    },
    rulsName:{
      type:String,
      default:''
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.dialogData.xtmm) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // form: {},
      rules: this.dialogType=='singSb'?{
        suboffice: [{ required: true, message: "请选择分局", trigger: "blur" }],
        policestation: [{ required: true, message: "请选择派出所", trigger: "blur" }],
        turnoutarea: [{ required: true, message: "请选择责任区", trigger: "blur" }],
      }:(this.rulsName=='zxhc'&&this.dialogType!='ck')?{//专项核查新增
        title:[{required: true, message: "此项必填", trigger: "blur"}],
        name:[{required: true, message: "此项必填", trigger: "blur"}],
        givenname:[{required: true, message: "此项必填", trigger: "blur"}],
        gender:[{required: true, message: "此项必填", trigger: "blur"}],
        birthday:[{required: true, message: "此项必填", trigger: "blur"}],
        nationality:[{required: true, message: "此项必填", trigger: "blur"}],
        passportType:[{required: true, message: "此项必填", trigger: "blur"}],
        passportno:[{required: true, message: "此项必填", trigger: "blur"}],
        visaType:[{required: true, message: "此项必填", trigger: "blur"}],
        visano:[{required: true, message: "此项必填", trigger: "blur"}],
        address:[{required: true, message: "此项必填", trigger: "blur"}],
      }:{
        xtmm: [{ required: true, message: "请输入密码", trigger: "blur" }],
        qrxtmm: [{ validator: validatePass, trigger: "blur" }],
        xm: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        yddh: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { max: 11, message: "长度不可超过11位", trigger: "blur" },
          {
            required: true,
            pattern: /^-?[1-9]\d*$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        sfzh: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 15, max: 18, message: "请如实填写18位号码", trigger: "blur" },
          {
            required: true,
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证号码",
            trigger: "blur"
          }
        ],
        jingHao: [
          { required: true, message: "请输入警号", trigger: "blur" },
          { max: 20, message: "长度不可超过20位", trigger: "blur" }
        ],
        bmbh: [{ required: true, message: "请选择单位", trigger: "blur" }],
        ywlb: [{ required: true, message: "此项必填", trigger: "blur" }],
        dwjb: [{ required: true, message: "此项必填", trigger: "blur" }],
        czpzlx: [{ required: true, message: "此项必填", trigger: "blur" }],
        gdsj: [{ required: true, message: "此项必填", trigger: "blur" }],
        gdyssh: [{ required: true, message: "请选择颜色", trigger: "blur" }],
        zrqMc: [{ required: true, message: "此项必填", trigger: "blur" }],
      },
      isXJ: false,
      newForm: {},
      isPS:true,
      isJoinFlag:true,

      ColorData:{
        data:[
          {
            id:1,
            gdsj:'',
            gdyssh:'',
            ysshbz:''
          },
        ],
      },
      modelData:{
        id:1,
        gdsj:'',
        gdyssh:'',
        ysshbz:'',
      },
      count:1,
      ColorLabel:[
        {
            cm:'超期时间',
            dm:'gdsj',
            type:'inpUnit',
            mold:'number'
          },
          {
            cm:'超期显示(颜色)',
            dm:'gdyssh',
            type:'block',
            class:'m-color'
          },
          {
            cm:'颜色说明',
            type:'textarea',
            dm:'ysshbz',
            class:'yssm'
          }
      ],
      colorArr:['#67C23A','#E6A23C','#F56C6C','#409EFF','#909399']
    };
  },
  watch: {
    dialogType(val) {
      console.log(val)
      this.isXJ = false;
    },
    joinFlag(val){
      console.log('状态',val)
      this.isJoinFlag = val;
    },
  },
  mounted() {
    if(this.ZDYShow){//新增 颜色清空
      this.ColorData={
        data:[
          {
            id:1,
            gdsj:'',
            gdyssh:'',
            ysshbz:'',
          },
        ],
      }
      // document.getElementsByClassName('color-inp')[0].getElementsByClassName('el-input__inner')[0].style.backgroundColor=''
    }
    // if(this.dialogType == 'edit'){
    //   document.getElementsByClassName('color-inp')[0].getElementsByClassName('el-input__inner')[0].style.backgroundColor=this.dialogData.gdyssh
    // }
  },
  methods: {
    save(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ZDYShow){
            this.$refs['colorForm'].validate(valid => {
              if(valid){
                this.dialogData.gdnrList = this.ColorData.data
                this.$emit("dialogSave", {
                  type: this.dialogType,
                  data: this.dialogData,
                  btnType: type
                });
              }else {
                console.log("error submit!!");
                return false;
              }
            });
          }else{
            if(valid){
                this.$emit("dialogSave", {
                  type: this.dialogType,
                  data: this.dialogData,
                  btnType: type
                });
              }else {
                console.log("error submit!!");
                return false;
              }
          } 
        } 
      });
    },
    //移除表单校验
    clearValid() {
      this.$refs['form'].clearValidate();
    },
    Add(){
      this.count++;
      this.modelData={id:this.count,gdsj:'',gdyssh:''}
      this.ColorData.data.push(this.modelData)
    },
    deleteModel(ind){
      this.ColorData.data.splice(ind,1)
    },
    colorChange(color,ind){
      console.log('====',color)
      if(color){
        document.getElementsByClassName('color-inp')[ind].getElementsByClassName('el-input__inner')[0].style.backgroundColor=color
      }else{
        document.getElementsByClassName('color-inp')[ind].getElementsByClassName('el-input__inner')[0].style.backgroundColor=''
      }
    },
    dbBtnFun(val) {
      this.$emit("dbFnc", val);
    },
    radioChange(val){
      console.log('进入',val)
      this.$emit("radioChange",val);
    },
    linkChange(key, val, dialogData) {
      this.$emit("formLcFnc", { key: key, data: val, obj: dialogData });
    },
    cancel() {
      if (this.isXJ) {
        this.isXJ = false;
      } else {
        this.$emit("dialogCancel");
      }
    }
  }
};
</script>
<style scoped>
.form {
  padding: 15px 15px 50x;
  border-bottom: 1px solid #295287;
  margin-bottom: 20px;
  color: #e1e8ee;
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
.color-part{
  border-top: 1px solid #eee;
  padding: 10px 15px 5px 15px!important;
}
</style>