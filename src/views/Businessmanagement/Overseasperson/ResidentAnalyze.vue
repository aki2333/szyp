<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc"></Inquire>
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
      <el-row>
        <el-col :xl="6" :lg="12">
          <Charts :key="new Date().getTime()" :optData="optData_1" :id="'1'"></Charts>
        </el-col>
        <el-col :xl="6" :lg="12">
          <Charts :key="new Date().getTime()" :optData="optData_2" :id="'2'"></Charts>
        </el-col>
        <el-col :xl="6" :lg="12"></el-col>
        <el-col :xl="6" :lg="12"></el-col>
        <el-col :xl="12" :lg="12"></el-col>
        <el-col :xl="12" :lg="12"></el-col>
      </el-row>
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
      tab: "0",
      optData_1: {},
      optData_2: {},
      optData_3: {},
      optData_4: {}
    };
  },
  mounted() {
    this.chartShow_1();
    this.chartShow_2();
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
    },
    chartShow_1() {
      this.optData_1 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30,
          },
          left: "45",
          top: "83"
        },
        angleAxis: {
          max: 100, // 满分
          // clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["70", "100"],
          radius: "80%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "作文得分",
                value: 70,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#31D8A0" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#21C2B3" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar",//极坐标
            roundCap: true,//有圆弧 只针对极坐标有效
            barWidth: 10,
            barGap: "-100%", // 两环重叠（如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。）
            radius: ["20%", "52%"],
            z: 2 //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          },
          {
            // 灰色环
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#eee"
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 13,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_2() {
      this.optData_2 = {
        tooltip: {},
        grid: {
          x: 0,
          y: 20
        },
        xAxis: [
          {
            type: "category",
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            axisPointer: {
              type: "none"
            },
            axisLine: {
              //去除x坐标轴
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              color: "#ccc",
              fontSize: 12
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //去除y坐标轴
              lineStyle: {
                color: "#fff"
              }
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
              //去除网格线
              show: false
            }
          }
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: "#5568D4",
              opacity: 0.3,
              barBorderRadius: 30
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30, //柱状图边角圆弧化
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#000",
                    fontSize: 12
                  }
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#895EDB"
                  },
                  {
                    offset: 1,
                    color: "#5568D4"
                  }
                ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#D5C95D"
                  },
                  {
                    offset: 1,
                    color: "#C39E69"
                  }
                ])
              }
            },
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
    }
  }
};
</script>