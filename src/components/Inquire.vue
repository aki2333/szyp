<template>
  <div class="inquire">
    <el-form
      :model="inquire"
      status-icon
      :rules="rules"
      size="small"
      ref="inquire"
      label-width="100px"
      class="inquire-ruleForm"
    >
      <el-row :gutter="20" type="flex" align="middle" justify="center">
        <el-col :span="20">
          <el-col :span="8" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="inquire[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select v-model="inquire[cx.dm]" clearable placeholder="请选择">
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker v-model="inquire[cx.dm]" type="date" placeholder="选择日期"></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="2" align="center">
          <el-button
            class="cx-btn"
            round
            size="small"
            type="primary"
            @click="submitForm('inquire')"
          >查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    cxType: {
      type: String,
      default: ""
    },
    cxData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      inquire: {
        userType: "0"
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("cxFnc", this.inquire);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.inquire {
  padding: 15px 15px 50x;
  border-bottom: 1px solid #295287;
  margin-bottom: 20px;
}
.cx-btn {
  margin-bottom: 18px;
}
</style>