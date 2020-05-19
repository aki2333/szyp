<template>
  <div>
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="small"
      ref="form"
      label-width="100px"
      class="form-ruleForm"
      v-if="!isXJ"
    >
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="16">
          <el-col :span="24" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input>
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
                  @change="linkChange(cx,dialogData[cx.dm])"
                >
                  <el-option
                    v-for="item in $store.state[cx.dm]"
                    :key="item.dm"
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
                <el-radio-group v-model="dialogData[cx.dm]">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      :model="newForm"
      status-icon
      :rules="rules"
      size="small"
      ref="form"
      label-width="100px"
      class="form-ruleForm"
      v-else
    >
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="16">
          <el-col :span="24" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="newForm[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <!-- 取常量值 optype=true  取store值 optype=!true -->
                <el-select
                  v-model="newForm[cx.dm]"
                  v-if="cx.optype"
                  clearable
                  :disabled="cx.dis||newForm.menu_type!=''"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.dm"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="newForm[cx.dm]"
                  v-else
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $store.state[cx.dm]"
                    :key="item.dm"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="newForm[cx.dm]"
                  :disabled="cx.dis"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="newForm[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="newForm[cx.children[1].dm]"
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
                <el-radio-group v-model="newForm[cx.dm]">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-btn-box">
      <el-button v-if="dialogType=='gnlb'" size="mini" type="primary" round @click="xj()">新建</el-button>

      <el-button size="mini" type="primary" round @click="save('form')">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>

      <el-button
        v-if="dialogType=='gnlb'"
        size="mini"
        type="info"
        round
        @click="save('form','del')"
      >删除</el-button>
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
    }
  },
  data() {
    return {
      // form: {},
      rules: {},
      isXJ: false,
      newForm: {}
    };
  },
  watch: {
    dialogType(val) {
      console.log(val);
      this.isXJ = false;
    }
  },
  mounted() {
    // this.form = this.dialogData;
    // console.log(this.form);
  },
  methods: {
    xj() {
      this.isXJ = true;
      Object.assign(this.newForm, this.dialogData);
      this.newForm = JSON.parse(JSON.stringify(this.newForm));
      if (this.newForm.menu_grade == "3") {
        this.newForm.menu_type = "B";
      } else {
        this.newForm.menu_type = "P";
      }
      this.newForm.parent_id = this.newForm.serial;
      this.newForm.menu_name = "";
      this.newForm.menu_order = "";
      this.newForm.menu_url = "";
      this.newForm.serial = "";
    },
    save(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isXJ) {
            this.$emit("dialogSave", {
              type: this.dialogType,
              data: this.dialogData,
              btnType: type
            });
          } else {
            this.$emit("dialogSave", {
              type: this.dialogType,
              data: this.newForm
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    linkChange(key, val) {
      this.$emit("formLcFnc", { key: key, data: val });
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