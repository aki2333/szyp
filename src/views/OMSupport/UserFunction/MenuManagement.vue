<template>
  <div class="page-box page">
    <el-row type="flex">
      <el-col :span="8">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData2"
          :treeProps="treeProps2"
          nodeKey="serial"
          :isExpand="true"
          :isCheckbox="false"
          @getTree="getTree"
        ></TreeCard>
      </el-col>
      <el-col :span="16">
        <div class="form-box">
          <el-form
            :model="formData"
            status-icon
            :rules="rules"
            size="small"
            ref="form"
            label-width="100px"
            :disabled="formDisabled"
          >
            <el-row :gutter="30" type="flex" align="middle" justify="center">
              <el-col :span="16">
                <el-col :span="24" v-for="(cx,i) in labelData" :key="i">
                  <el-form-item :label="cx.cm" :prop="cx.dm">
                    <template v-if="cx.type=='input'">
                      <el-input v-model="formData[cx.dm]"></el-input>
                    </template>
                    <template v-else-if="cx.type=='select'">
                      <el-select
                        v-model="formData[cx.dm]"
                        v-if="cx.optype"
                        clearable
                        :disabled="true"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in $cdata.options[cx.dm]"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="formData.menu_type=='B'">
                  <el-form-item label="按钮类型" prop="button_type">
                    <el-select v-model="formData.button_type" placeholder="请选择">
                      <el-option
                        v-for="item in $cdata.options.button_type"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
          <div class="page-btn-box">
            <el-button
              size="mini"
              type="primary"
              round
              @click="addMenu"
              :disabled="xjDis"
              v-if="formData.menu_type!='B'&&!addBc"
            >新建</el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="xgDis"
              round
              @click="updateMenu"
              v-if="((formData.menu_order&&formData.menu_order!='0')||formData.menu_type=='B')&&!updateBc"
            >修改</el-button>
            <el-button size="mini" type="success" round @click="save('form','add')" v-if="addBc">保存</el-button>
            <el-button
              size="mini"
              type="success"
              round
              @click="save('form','update')"
              v-if="updateBc"
            >保存</el-button>
            <el-button size="mini" type="info" round @click="cancel" v-if="addBc||updateBc">取消</el-button>
            <el-button size="mini" type="info" round @click="delMenu">删除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";
// import Form from "@/components/Form.vue";

export default {
  components: { TreeCard },
  data() {
    return {
      treeData2: [],
      treeProps2: {
        label: "menu_name",
        children: "childrenMenu"
      },
      labelData: this.$cdata.qxgl.cdgl.cd,
      rules: {},
      formData: { menu_url: "", menu_order: "" },
      oldformData: {},
      formDisabled: true,
      formType: "",
      addBc: false,
      updateBc: false,
      xjDis: false,
      xgDis: false
    };
  },
  mounted() {
    this.cancel();
  },
  methods: {
    // 获取功能列表
    getMenuTree() {
      this.$api.post(
        this.$api.aport1 + "/menuController/getMenuTree",
        {},
        r => {
          this.treeData2 = r;
        }
      );
    },
    getTree(data) {
      console.log("点击树节点-", data);
      this.formType = data.type;
      this.formDisabled = true;
      this.oldformData = data.data;
      this.formData = data.data;
      this.formData = JSON.parse(JSON.stringify(this.formData));
      console.log("formData", this.formData);
      this.oldformData = JSON.parse(JSON.stringify(this.oldformData));

      this.addBc = false;
      this.updateBc = false;
    },
    getCheckedKeys(data) {
      if (data.type == "dwlb") {
        this.bmbhList = data.data;
      }
    },
    // 添加
    addMenu() {
      if (!this.formData.serial) {
        this.$message({
          message: "请先选择菜单",
          showClose: true,
          duration:13000,
          type: "warning"
        });
        return false;
      }
      this.formDisabled = false;
      this.addBc = true;
      this.updateBc = false;
      if (this.formData.menu_grade == "3") {
        this.formData.menu_type = "B";
      } else {
        this.formData.menu_type = "P";
      }
      this.formData.parent_id = this.formData.serial;
      this.formData.menu_name = "";
      this.formData.menu_order = "";
      this.formData.menu_url = "";
      this.formData.serial = "";
      //console.log(this.oldformData, this.formData);
    },
    addMenuInfo(data) {
      this.$api.post(
        this.$api.aport1 + "/menuController/addMenuInfo",
        data,
        r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.cancel();
        }
      );
    },
    // 修改
    updateMenu() {
      Object.assign(this.formData, this.oldformData);
      this.formData = JSON.parse(JSON.stringify(this.formData));
      if (!this.formData.serial) {
        this.$message({
          message: "请先选择菜单",
          showClose: true,
          duration:13000,
          type: "warning"
        });
        return false;
      }
      this.formDisabled = false;
      this.updateBc = true;
      this.addBc = false;
    },
    updateMenuInfo(data) {
      this.$api.post(
        this.$api.aport1 + "/menuController/updateMenuInfo",
        data,
        r => {
          this.$message({
            message: r,
            showClose: true,
            duration:8000,
            type: "success"
          });
          this.cancel();
        }
      );
    },
    save(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _data = this.formData;
          _data.userId = this.$store.state.user.userId;
          if (type == "update") {
            this.updateMenuInfo(_data);
          } else {
            this.addMenuInfo(_data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除
    delMenu() {
      if (!this.formData.serial) {
        this.$message({
          message: "请先选择菜单",
          showClose: true,
          duration:13000,
          type: "warning"
        });
        return false;
      }
      let _data = this.formData;
      _data.userId = this.$store.state.user.userId;
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.post(
          this.$api.aport1 + "/menuController/deleteMenuInfo",
          _data,
          r => {
            this.$message({
              message: r,
              showClose: true,
              duration:8000,
              type: "success"
            });
            this.cancel();
          }
        );
      });
    },
    // 清除
    cancel() {
      this.getMenuTree();
      this.formData = { menu_url: "", menu_order: "" };
      this.formType = "";
      this.formDisabled = true;
      this.addBc = false;
      this.updateBc = false;
    }
  }
};
</script>
<style scoped>
.form-box {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>