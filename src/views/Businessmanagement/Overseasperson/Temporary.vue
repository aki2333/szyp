<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" @cxFnc="cxFnc" @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick(0)">
        <img :src="cx.pd.shzt=='shzt_0'?tabImgActive_1:tabImg_1" alt />
        <span>待审核</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick(1)">
        <img :src="cx.pd.shzt=='shzt_1'?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">审核通过</span>
      </div>
      <div class="tab-top-item hand" style="margin-left: -14px;" @click="tabTopClick(2)">
        <img :src="cx.pd.shzt=='shzt_2'?tabImgActive_2:tabImg_2" alt />
        <span class="t-leftT">审核未通过</span>
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
            :isTab="isTab"
            :page="tabPage"
            :lbTab="lbTab"
            :lbBtn="lbBtn"
            czWidth="130px"
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
    <Dialog
      width="1200px"
      :isShowDialog="isShowDialog"
      :title="dialogTitle"
      @hideDialog="isShowDialog=false"
    >
      <el-dialog width="50%" :visible.sync="innerVisible" append-to-body>
        <el-form :model="innerForm" ref="innerForm" label-width="100px" class="tc-form">
          <el-form-item label="不通过原因" prop="hcsm">
            <el-input v-model="innerForm.shsm" autocomplete="off"></el-input>
          </el-form-item>
          <div class="page-btn-box">
            <el-button type="primary" @click="shwtg">提交</el-button>
          </div>
        </el-form>
      </el-dialog>
      <TemporaryXQ
        v-if="(dialogType=='bj'||dialogType=='ck')&&isShowDialog"
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
      isTab: false,
      lbTab: [],
      lbBtn: this.$cdata.lzsb.lzsb.lbBtn1,
      tabImg_1: require("../../../assets/images/main/tab_2.png"),
      tabImgActive_1: require("../../../assets/images/main/tab_2_pre.png"),
      tabImg_2: require("../../../assets/images/main/tab_1.png"),
      tabImgActive_2: require("../../../assets/images/main/tab_1_pre.png"),
      tabPage: "",
      cx: {
        pd: { shzt: "shzt_0", hczt: "hczt_0" },
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
      innerVisible: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      dialogImgData: [],
      labelData: [],
      innerForm: {
        shsm: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetDM", "qzzl");
    this.$store.dispatch("aGetDM", "xzqh");

    this.$store.dispatch("aGetDM", "lz_zfzl");
    this.$store.dispatch("aGetDM", "lz_zsxz");
    this.$store.dispatch("aGetDM", "rydylb");
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
    this.tabTopClick(0);
  },
  methods: {
    tabTopClick(index) {
      this.cx.pd.shzt = "shzt_" + index;
      this.cx.pageNum = 1;
      if (index == 1) {
        this.isTab = true;
        this.cx.pd.hczt = "hczt_0";
        this.lbTab = this.$cdata.lzsb.lzsb.lbTab;
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      } else if (index == 0) {
        this.isTab = false;
        this.lbTab = [];
        this.cx.pd.hczt = "hczt_0";
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn1;
      } else if (index == 2) {
        this.isTab = false;
        this.lbTab = [];
        this.cx.pd.hczt = "hczt_2";
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      }
      this.getTable();
    },
    tabFnc(data) {
      console.log("shangbaozhuangtai", data);
      this.cx.pd.hczt = data;
      this.tabPage = data;
      this.cx.pageNum = 1;
      if (data == "hczt_1") {
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn3;
      } else {
        this.lbBtn = this.$cdata.lzsb.lzsb.lbBtn2;
      }
      this.getTable();
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
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
        let p = {
          id: data.data.id,
          spr: this.$store.state.user.userId,
          sprdw: this.$store.state.user.bmbh
        };
        this.getDetailLzsb(p);
        this.getDetailLzsbTp(data.data.id);
      } else if (data.btn.button_type == "ck") {
        let p = {
          id: data.data.id
        };
        this.getDetailLzsb(p);
        this.getDetailLzsbTp(data.data.id);
      }
    },
    // 获取详情
    getDetailLzsb(p) {
      this.$api.post(this.$api.aport3 + "/api/lzsb/getDetailLzsb", p, r => {
        this.dialogData = r;
        this.$store.dispatch("aGetPolice", r.suboffice.slice(0, 6));
        this.isShowDialog = true;
      });
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
      console.log(data);
      if (data.type == "bj") {
        if (data.btnType == 1) {
          let p = data.data;
          p.shzt = "shzt_1";
          this.updateLzsb(data.data);
        } else if (data.btnType == 0) {
          this.innerForm = data.data;
          this.innerForm.shzt = "shzt_2";
          this.innerVisible = true;
        }
      }
    },
    shwtg() {
      this.updateLzsb(this.innerForm);
    },
    updateLzsb(data) {
      this.$api.post(this.$api.aport3 + "/api/lzsb/updateLzsb", data, () => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.getTable();
        this.isShowDialog = false;
        this.innerVisible = false;
      });
    }
  }
};
</script>