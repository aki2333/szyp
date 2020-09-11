<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.czxx.bhqs.cx"
    :cxCheck="$cdata.czxx.bhqs.cxCheck" 
    :pd="cx" 
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
          <el-radio-group v-model="cx.analysisType" @change="calcuFun()">
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
        <Charts :key="new Date().getTime()" :optData="optData" :Cheight="'400px'" @chartClick="chartClick"></Charts>
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
      cx: {},
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
    };
  },
  mounted() {
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetDM",'qzzl');
    this.$store.dispatch("aGetDMPro",'dm_jwrysf');
    // this.$store.dispatch("aGetDMPro",'dm_pcswlb');
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');
    this.$cdata.jzdZrq()
    // this.chartShow();
    this.getChart();
    this.getSpInit();

  },
  methods: {
    getSpInit(){
      this.$cdata.qxgl.getSjBm(this.$store.state.user.bmbh).then(data => {
        this.$store.dispatch("aGetssdw", {
          bmbh: "320500000000",
          type: "ssfj",
        });
        if (this.$store.state.user.jb == 2) {
          if(data.fj){
            this.cx.jzd_ssfj = data.fj
            this.cx.gzd_ssfj = data.fj
          }else{
            this.cx.jzd_ssfj = data.bmbh
            this.cx.gzd_ssfj = data.fj
          }
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "sspcs" });
          this.cx.jzd_ssfjdis = true;
          this.cx.gzd_ssfjdis = true;
        } else if (this.$store.state.user.jb == 3) {
          this.$store.dispatch("aGetssdw", { bmbh: data.fj, type: "sspcs" });
          this.$store.dispatch("aGetssdw", { bmbh: data.bmbh, type: "zrq" });
          this.cx.jzd_ssfj = data.fj;
          this.cx.gzd_ssfj = data.fj;
          this.cx.workplace_police_station = data.bmbh;
          this.cx.inhabi_police_station = data.bmbh;
          this.cx.jzd_ssfjdis = true;
          this.cx.gzd_ssfjdis = true;
          this.cx.workplace_police_stationdis = true;
          this.cx.inhabi_police_stationdis = true;
        }
      });
    },
    // 获取查询参数
    cxFnc(data) {
      this.cx = data;
      this.getChart();
    },
    lcFnc(data) {
      console.log(data)
      if(data.key.dm == 'jzd_ssfj'){
        if(data.data == ""){
          data.obj.inhabi_police_station = "";
        }else if(data.obj.inhabi_police_station){
          data.obj.inhabi_police_station = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs",ptype:'jzd'});
      }
      if(data.key.dm == "gzd_ssfj"){
        if(data.data == ""){
          data.obj.workplace_police_station = ""
        }else if(data.obj.workplace_police_station){
          data.obj.workplace_police_station = "";
        }
        this.$store.dispatch("aGetssdw", { bmbh: data.data, type: "sspcs",ptype:'gzd'});
      }
    },
    btnClick(data){
      if(data == 'hb'){
        this.cx.analysisType = '';
        this.getChart();
      }
    },
    calcuFun(){
      this.getChart();
    },
    getChart(){
      this.$api.post(this.$api.aport4+'/residetrend/trendchart',this.cx,r=>{
        if(this.cx.analysisType){//多条线
          let double={
            type: 'line',
            smooth: 0.7,
            symbolSize: 8,
            symbol: "emptyCircle", //设定为实心点
            label: {
              show: true,
              fontSize: 14,
              position:'right',
              // color: "#000",
              fontWeight:'bold'
            },
            lineStyle: {
              width: 3,
            },
          }
          let dataReal = [];
          r.series.forEach(item => {
            let dataItem =  Object.assign({},item,double)
            dataReal.push(dataItem)
          })
          this.chartShow(r.xAxis.data,dataReal,r.legend.data)
        }else{//单条线
          let single = [
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
                  data: r.series[0].data,
                }
              ]
          this.chartShow(r.xAxis.data,single,[])
        }
      })
    },
    chartShow(xdata,series,legend) {
      this.optData = {
        grid: {
          x: 45,
          y: 40,
          x2: 30
        },
        legend: {data: legend},
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
        series: series
      };
    },
    chartClick(data){
      console.log('data==',data)
    },
  }
};
</script>