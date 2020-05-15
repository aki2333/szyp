<template>
  <div>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      size="small"
      ref="form"
      label-width="70px"
      class="form-ruleForm"
    >
      <el-row :gutter="30" type="flex" align="middle" justify="center">
        <el-col :span="16">
          <el-col :span="24" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="form[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select v-model="form[cx.dm]" clearable placeholder="请选择">
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker v-model="form[cx.dm]" type="date" placeholder="选择日期"></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="form[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="form[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束日期"
                    ></el-date-picker>
                  </div>
                  <!-- <div class="double" v-for="(c,chi) in cx.children" :key="chi">
                    <el-date-picker v-model="form[c.dm]" :type="c.type" placeholder="选择日期"></el-date-picker>
                  </div>-->
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <div class="page-btn-box">
        <el-button size="mini" type="primary" round @click="save('form')">保存</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
      </div>
    </el-form>
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
      form: {},
      rules: {}
    };
  },
  mounted() {
    console.log(this.dialogData);
    this.form = this.dialogData;
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("dialogSave", { type: this.dialogType, data: this.form });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("dialogCancel");
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