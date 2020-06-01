<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick(0)">
        <img :src="cx.pd.sbzt==0?tabImgActive_1:tabImg_1" alt />
        <span>待上报</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick(1)">
        <img :src="cx.pd.sbzt==1?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">上报成功</span>
      </div>
      <div class="tab-top-item hand" style="margin-left: -14px;" @click="tabTopClick(2)">
        <img :src="cx.pd.sbzt==2?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">上报失败</span>
      </div>
    </div>
    <div class="page-box">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table
            :lbData="$cdata.lzsb.lzsb.lb"
            :isSelect="false"
            :isEdit="true"
            :isPl="false"
            :isTab="true"
            :lbTab="lbTab"
            :lbBtn="$cdata.lzsb.lzsb.lbBtn"
            :tableData="tableData"
            @tabFnc="tabFnc"
            @rowClick="rowClick"
            @pageSizeFnc="pageSizeFnc"
            @pageNumFnc="pageNumFnc"
            @blFnc="blFnc"
          ></Table>
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <TemporaryXQ
        v-if="dialogType=='bj'&&isShowDialog"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :dialogImgData="dialogImgData"
        :cxData="$cdata.lzsb.lzsb.bj"
        @dialogCancel="isShowDialog=false"
        @dialogSave="dialogSave"
        @formLcFnc="lcFnc"
      ></TemporaryXQ>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import TemporaryXQ from "./TemporaryXQ.vue";

export default {
  components: { Inquire, Table, Dialog, TemporaryXQ },
  data() {
    return {
      lbTab: this.$store.state.shzt,
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      cx: {
        pd: { sbzt: 0, shzt: "shzt_0" },
        pageSize: 10,
        pageNum: 1,
        order: "id",
        direction: 1
      },
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      currentRow: {},
      // 弹窗数据,
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      dialogImgData: [],
      labelData: []
    };
  },
  mounted() {
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetDM", "shzt").then(data => {
      this.lbTab = data;
      this.tabTopClick(0);
    });
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDM", "lz_zfzl");
    this.$store.dispatch("aGetDM", "lz_zsxz");
    this.$store.dispatch("aGetDM", "rydylb");
    // this.$store.dispatch("aGetDM", "xzqh");
    // this.$store.dispatch("aGetDM", "pcs");
    this.$store.dispatch("aGetDM", "bjjgka");
    this.$store.dispatch("aGetDM", "wgr_sqsy");
    this.$store.dispatch("aGetDM", "spqfd");
    if (this.$store.state.user.jb == "1") {
      this.$store.dispatch("aGetSuboffice");
    } else if (this.$store.state.user.jb == "2") {
      this.$store.dispatch(
        "aGetSuboffice",
        this.$store.state.user.bmbh.slice(0, 6)
      );
    } else if (this.$store.state.user.jb == "3") {
      this.$store.dispatch(
        "aGetSuboffice",
        this.$store.state.user.bmbh.slice(0, 6) + "000000"
      );
    }
    if (this.$store.state.user.jb == "1") {
      this.$store.dispatch("aGetPolice");
    } else if (this.$store.state.user.jb == "2") {
      this.$store.dispatch(
        "aGetPolice",
        this.$store.state.user.bmbh.slice(0, 6)
      );
    } else if (this.$store.state.user.jb == "3") {
      this.$store.dispatch("aGetPolice", this.$store.state.user.bmbh);
    }
  },
  methods: {
    tabTopClick(index) {
      this.cx.pd.sbzt = index;
      let tab = [...this.$store.state.shzt];
      if (index == 1) {
        this.lbTab = this.$store.state.shzt;
      } else {
        this.lbTab = [tab[index]];
      }
      this.cx.pd.shzt = this.lbTab[0].dm;
      this.getTable();
    },
    tabFnc(data) {
      //   console.log("shangbaozhuangtai", data);
      this.cx.pd.shzt = data;
      this.cx.pageNum = 1;
      this.getTable();
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.getTable();
    },
    // 获取分页等信息
    pageSizeFnc(data) {
      this.cx.pageSize = data;
      this.getTable();
    },
    pageNumFnc(data) {
      this.cx.pageNum = data;
      this.getTable();
    },
    // 查询列表
    getTable() {
      this.$api.post(this.$api.aport3 + "/api/lzsb/getLzsb", this.cx, r => {
        this.tableData = r;
      });
    },
    // 点击表格行
    rowClick(data) {
      this.currentRow = data.data;
    },
    lcFnc(data) {
      console.log("下拉选", data.data);
      if (data.key.dm == "suboffice") {
        if (data.data == "") {
          data.obj.policestation = "";
        }
        if (data.obj.policestation) {
          data.obj.policestation = "";
        }
        this.$store.dispatch("aGetPolice", data.data.slice(0, 6));
      }
    },

    // 表格内操作
    blFnc(data) {
      console.log("表格按钮" + data.btn.button_name, data);
      this.dialogTitle = data.btn.button_name;
      this.dialogType = data.btn.button_type;
      if (data.btn.button_type == "xzjl") {
        this.downZsdjd(data.data.id);
      } else if (data.btn.button_type == "bj") {
        this.getDetailLzsb(data.data.id);
        this.getDetailLzsbTp(data.data.id);
      }
    },
    // 获取详情
    getDetailLzsb(id) {
      this.$api.post(
        this.$api.aport3 + "/api/lzsb/getDetailLzsb",
        { id: id },
        r => {
          this.dialogData = r;
          this.isShowDialog = true;
        }
      );
    },
    // 获取图片
    getDetailLzsbTp(id) {
      this.$api.post(
        this.$api.aport3 + "/api/lzsb/getDetailLzsbTp",
        { id: id },
        r => {
          this.dialogImgData = r;
        }
      );
    },
    downZsdjd(id) {
      this.$api.post(
        this.$api.aport3 + "/api/lzsb/downZsdjd",
        { id: id },
        "",
        "",
        "blob"
      );
    },
    dialogSave(data) {
      if (data.type == "bj") {
        this.updateLzsb(data.data);
      }
    },
    updateLzsb(data) {
      this.$api.post(this.$api.aport3 + "/api/lzsb/updateLzsb", data, () => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
      });
    }
  }
};
</script>