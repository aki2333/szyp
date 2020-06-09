<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" @cxFnc="cxFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" @click="tabTopClick('0')">
        <img :src="tab=='0'?$cdata.tabImgActive_1:$cdata.tabImg_1" alt />
        <span>列表</span>
      </div>
      <div class="tab-top-item hand ml--33" @click="tabTopClick('1')">
        <img :src="tab=='1'?$cdata.tabImgActive_2:$cdata.tabImg_2" alt />
        <span class="t-leftT">图表</span>
      </div>
    </div>
    <div class="page-box">
      <Charts></Charts>
    </div>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Charts from "@/components/Charts.vue";

export default {
  components: { Inquire, Charts },
  data() {
    return {
      cx: {
        pd: {}
      },
      tab: "0"
    };
  },
  methods: {
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      //   this.getTable();
    },
    tabTopClick(index) {
      this.tab = index;
      //   this.getTable();
    }
  }
};
</script>