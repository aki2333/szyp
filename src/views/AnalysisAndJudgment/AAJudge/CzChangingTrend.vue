<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.czxx.bhqs.cx"
    :cxCheck="$cdata.czxx.bhqs.cxCheck" 
    :pd="cx.pd" 
    :cxPara="cx" 
    @cxFnc="cxFnc" 
    @lcFnc="lcFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item tabImgActive_1 hand">常住变化趋势</div>
    </div>
    <div class="page-box">
      <div style="padding:20px 20px 0">
        <p class="trend-title">计算维度</p>
        <div class="trend-radio">
          <el-radio-group v-model="cx.pd.analysisType">
            <el-radio v-for="(item,ind) in analysisType" :key="ind" :label="item.dm">{{item.mc}}</el-radio>
          </el-radio-group>
          <div class="trend-page-btn-box">
             <template v-for="(pb,pbi) in $store.state.plBtn">
              <el-button
                class="cx-btn"
                size="small"
                :type="pb.py=='hb'?'success':'primary'"
                round
                v-if="pb.button_type==3"
                :key="pbi"
                @click="btnClick(pb.py)"
              >{{pb.button_name||pb.menu_name}}</el-button>
            </template>
          </div>
        </div>
        <Charts :key="new Date().getTime()" :optData="optData" :Cheight="'400px'"></Charts>
      </div>
    </div>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Charts from "@/components/Charts.vue";
export default {
  components: { Inquire,Charts },
  data() {
    return {
      cx: {
        pd: {},
        pageSize: 10,
        pageNum: 1,
      },
      analysisType:[
        {
          mc:'性别',
          dm:'gender'
        },
        {
          mc:'国家地区',
          dm:'nationality'
        },
        {
          mc:'证件种类',
          dm:'paper_type'
        },
        {
          mc:'签证种类',
          dm:'visa_type'
        },
        {
          mc:'身份',
          dm:'degree_code'
        },
        {
          mc:'境外人员类别',
          dm:'personnel_area_type'
        },
        {
          mc:'年龄段',
          dm:'age'
        },
      ],
      optData:{},
      radio:''
    };
  },
  mounted() {
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetDM",'qzzl');
    this.$store.dispatch("aGetDMPro",'dm_jwrysf');
    this.$store.dispatch("aGetDMPro",'dm_pcswlb');
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');
    this.$cdata.jzdZrq()
    this.chartShow();
    this.getChart();
  },
  methods: {
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.getChart();
    },
    lcFnc(data) {
      console.log(data)
    },
    btnClick(){},
    getChart(){
      this.$api.post(this.$api.aport4+'/residetrend/trendchart',this.cx,r=>{
        this.chartShow(r.xAxis.data,r.series[0].data)
      })
    },
    chartShow(xdata,series) {
      this.optData = {
        grid: {
          x: 45,
          y: 40,
          x2: 30
        },
        xAxis: {
          type: "category",
          data: xdata,
          boundaryGap: false,
          axisPointer: {
            type: "none"
          },
          axisLine: {
            //去除x坐标轴
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            show: true, //这行代码控制着坐标轴x轴的文字是否显示
            color: "#919294",
            fontSize: 12
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "50%"],
          axisLine: {
            //去除y坐标轴
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            show: true, //这行代码控制着坐标轴的文字是否显示
            color: "#919294",
            fontSize: 12
          },
          axisPointer: {
            //去除鼠标hover样式
            type: "none"
          },
          axisTick: {
            //去掉坐标刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: ["#ddd"],
              type: "dashed"
            }
          }
        },
        series: [
          {
            type: "line",
            smooth: 0.7,
            symbolSize: 8,
            symbol: "emptyCircle", //设定为实心点
            itemStyle: {
              normal: {
                color: "#5486F9",
                borderWidth: 2
              }
            },
            label: {
              show: true,
              fontSize: 14,
              color: "#000",
              fontWeight:'bold'
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#862CFE' // 0% 处的颜色
                }, {
                    offset: 1, color: '#5C4CFC' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              width: 5,
              shadowColor: "rgba(134,44,254, 0.7)",
              shadowBlur: 20,
              shadowOffsetY: 10,
              shadowOffsetX: 10,
            },
            data: series,
          }
        ]
      };
    },
  }
};
</script>