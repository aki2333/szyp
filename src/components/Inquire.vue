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
      v-if="queryIsShow"
    >
      <el-row :gutter="0" type="flex" align="middle" justify="center">
        <el-col :span="20">
          <el-col :md="12" :lg="8" v-for="(cx,i) in cxData" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
              <template v-if="cx.type=='input'">
                <el-input v-model="inquire[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select
                  v-model="inquire[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  :clearable="!cx.must"
                  placeholder="请选择"
                  @change="linkChange(cx,inquire[cx.dm])"
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
                  clearable
                  placeholder="请选择"
                  @change="linkChange(cx,inquire[cx.dm])"
                >
                  <el-option
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker v-model="inquire[cx.dm]" type="date" placeholder="选择日期"></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="inquire[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="inquire[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束日期"
                      value-format="yyyy-MM-dd"
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
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="4" align="center">
          <el-button
            class="cx-btn"
            round
            size="small"
            type="primary"
            @click="submitForm('inquire')"
          >查询</el-button>
          <el-button size="small" type="info" round @click="resetForm('inquire')">清除</el-button>
        </el-col>
      </el-row>
    </el-form>
    <img :src="queryIsShow==true?closeImg:openImg" alt @click="queryShow" class="changeBtn" />
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
    pd: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      inquire: this.pd,
      rules: {},
      queryIsShow: true,
      openImg: require("../assets/images/main/open_query.png"),
      closeImg: require("../assets/images/main/close_query.png")
    };
  },
  mounted() {},
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
    },
    queryShow() {
      this.queryIsShow = !this.queryIsShow;
      this.$emit("queryShowFnc", this.queryIsShow);
    },
    linkChange(key, val) {
      this.$emit("lcFnc", { key: key, data: val });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.inquire {
  padding: 15px 15px 50x;
  border-bottom: 1px solid #295287;
  margin-bottom: 20px;
  color: #e1e8ee;
  position: relative;
}
.changeBtn {
  position: absolute;
  bottom: -23px;
  right: 0px;
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