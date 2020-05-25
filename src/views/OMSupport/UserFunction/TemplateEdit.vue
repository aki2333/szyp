<template>
  <div class="page-box page">
    <el-row v-if="dialogType!='bj'" type="flex" justify="center" class="mb-10" :gutter="30">
      <el-col :span="8" class="bj-item">
        <label>单位级别</label>
        <el-select v-model="template_grade" filterable clearable placeholder="请选择" size="small">
          <el-option
            v-for="(item,ind) in $store.state.grade"
            :key="ind"
            :label="item.dm+' - '+item.mc"
            :value="item.dm"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" class="bj-item">
        <label>模板名称</label>
        <el-input placeholder="请输入" v-model="template_name" size="small">
          <!-- <template slot="prepend">模板名称</template> -->
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="24">
        <TreeCard
          cardTitle="功能列表"
          treeType="gnlb"
          :treeData="treeData1"
          :treeProps="treeProps1"
          nodeKey="serial"
          :isExpand="true"
          :isCheckbox="true"
          @getCheckedNodes="getCheckedNodes"
        ></TreeCard>
      </el-col>
    </el-row>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" round @click="save">保存</el-button>
      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import TreeCard from "@/components/TreeCard.vue";

export default {
  components: { TreeCard },
  props: {
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
      treeData1: [],
      treeProps1: {
        label: "menu_name",
        children: "childrenMenu"
      },
      defaultChecked1: [],
      buttonList: [],
      menuList: [],
      template_grade: "",
      template_name: ""
    };
  },
  mounted() {
    console.log("编辑", this.dialogType, this.dialogData);
    this.$store.dispatch("aGetGrade", this.$store.state.user.jb).then(data => {
      console.log(data);
    });
    this.begin();
  },
  methods: {
    // 获取功能列表
    getMenuTree() {
      this.$api.post(this.$api.aport1+"/menuController/getMenuTree", {}, r => {
        this.treeData1 = r;
      });
    },
    getCheckedNodes(data) {
      if (data.type == "gnlb") {
        console.log("gnlb", data);
        this.buttonList = [];
        this.menuList = [];
        let arr = [...data.data];

        arr.forEach(item => {
          if (item.menu_type == "B") {
            this.buttonList.push(item.serial);
          } else {
            this.menuList.push(item.serial);
          }
        });
      }
    },
    save() {
      this.$emit("dialogSave", {
        type: this.dialogType,
        data: {
          buttonList: this.buttonList,
          menuList: this.menuList,
          template_grade: this.template_grade,
          template_name: this.template_name,
          userId: this.$store.state.user.userId
        }
      });
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    // 开始
    begin() {
      this.getMenuTree();
    }
  }
};
</script>
<style scoped>
.bj-item {
  display: flex;
}
.bj-item label {
  width: 100px;
  vertical-align: middle;
  line-height: 32px;
  text-align: right;
  padding-right: 5px;
}
</style>