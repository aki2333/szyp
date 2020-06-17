<template>
  <div>
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="mini"
      ref="form"
      label-width="100px"
      class="form-ruleForm"
    >
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="16">
          <el-col :span="24" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-if="cx.type=='joinInput'">
                <el-input v-model="dialogData[cx.dm]" :disabled="joinFlag||cx.dis"></el-input>
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
                >
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
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
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
                <el-radio-group v-model="dialogData[cx.dm]" @change="radioChange" :disabled="cx.dis">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- <template v-if="cx.type=='line'">
                <el-divider></el-divider>
            </template> -->
            <template v-if="cx.type=='line'">
                <span class="divider-text">{{cx.title}}</span>
                <el-divider></el-divider>
            </template>
          </el-col>
        </el-col>
      </el-row>
    </el-form>

    <div class="page-btn-box">
      <!-- <el-button v-if="dialogType=='gnlb'" size="mini" type="primary" round @click="xj()">新建</el-button> -->
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
      <div style="display:inline-block;" v-if="commonBtn">
        <el-button size="mini" type="primary" round v-if="isEditBtn" @click="save('form')">保存</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
      </div>
      

      <!-- <el-button
        v-if="dialogType=='gnlb'"
        size="mini"
        type="info"
        round
        @click="save('form','del')"
      >删除</el-button>-->
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
      default: false
    },
    isEditBtn: {
      type: Boolean,
      default: true
    },
    commonBtn: {
      type: Boolean,
      default: true
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
      rules: {
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
        bmbh: [{ required: true, message: "请选择单位", trigger: "blur" }]
      },
      isXJ: false,
      newForm: {},
      isPS:true,
      isJoinFlag:false,
    };
  },
  watch: {
    dialogType(val) {
      console.log(val)
      this.isXJ = false;
    },
    joinFlag(val){
      this.isJoinFlag = val;
    },
  },
  mounted() {
    // this.form = this.dialogData;
    // console.log(this.form);
  },
  methods: {
    save(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("dialogSave", {
            type: this.dialogType,
            data: this.dialogData,
            btnType: type
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dbBtnFun(val) {
      this.$emit("dbFnc", val);
    },
    radioChange(val){
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
</style>