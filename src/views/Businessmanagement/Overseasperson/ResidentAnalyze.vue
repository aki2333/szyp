<template>
  <div class="page">
    <Inquire :cxData="$cdata.lzsb.lzsb.cx" :pd="cx.pd" :cxPara="cx" @cxFnc="cxFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" :class="tab=='1'?'tabImgActive_1':'tabImg_1'" @click="tabTopClick('1')">
        列表
      </div>
      <div class="tab-top-item hand" :class="tab=='2'?'tabImgActive_2':'tabImg_2'" @click="tabTopClick('2')">
        图表
      </div>
    </div>
    <div class="page-box">
      <el-row v-if="tab=='1'">{{'liebiao'}}</el-row>
      <el-row v-if="tab=='2'">
        <!-- 迁入量 -->
        <el-col :xl="6" :lg="12" class="pr-15">
          <p class="chart-title mb-10">迁入量</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <div class="chart-box">
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_1"
                :id="'1_1'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">上期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_2"
                :id="'1_2'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">本期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_1_3"
                :id="'1_3'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">同期</div>
            </div>
          </div>
        </el-col>
        <!-- 迁出量 -->
        <el-col :xl="6" :lg="12" class="pr-15">
          <p class="chart-title mb-10">迁出量</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <div class="chart-box">
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_1"
                :id="'2_1'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">上期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_2"
                :id="'2_2'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">本期</div>
            </div>
            <div>
              <Charts
                :key="new Date().getTime()"
                :optData="optData_2_3"
                :id="'2_3'"
                :Cwidth="'125px'"
                :Cheight="'180px'"
              ></Charts>
              <div class="chart-tip">同期</div>
            </div>
          </div>
        </el-col>
        <!-- 国家地区 -->
        <el-col :xl="6" :lg="12" class="pr-15">
          <p class="chart-title mb-10">国家地区</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <Charts :key="new Date().getTime()" :Cheight="'210px'" :optData="optData_3" :id="'3'"></Charts>
        </el-col>
        <!-- TOP -->
        <el-col :xl="6" :lg="12">
          <p class="chart-title mb-10">TOP</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <Charts :key="new Date().getTime()" :optData="optData_4" :id="'4'"></Charts>
        </el-col>
        <!-- 变化趋势分析图 -->
        <el-col :xl="12" :lg="12" >
          <p class="chart-title mb-10">变化趋势分析图</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <Charts :key="new Date().getTime()" :optData="optData_5" :id="'5'"></Charts>
        </el-col>
        <!--  -->
        <el-col :xl="12" :lg="12">
          <p class="chart-title mb-10">变化趋势分析图</p>
          <div class="chart-outer ml-10">
            <div class="chart-outer-label">分析维度</div>
            <el-select class="chart-select" placeholder="请选择" size="medium">
              <el-option>{{'1'}}</el-option>
            </el-select>
          </div>
          <Charts :key="new Date().getTime()" :optData="optData_6" :id="'6'"></Charts>
        </el-col>
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
      tab: "1",
      optData_1_1: {},
      optData_1_2: {},
      optData_1_3: {},

      optData_2_1: {},
      optData_2_2: {},
      optData_2_3: {},

      optData_3: {},
      optData_4: {},
      optData_5: {},
      optData_6: {}
    };
  },
  mounted() {
    
  },
  methods: {
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      //   this.getTable();
    },
    tabTopClick(index) {
      this.tab = index;
      if(this.tab == '1'){
        //   this.getTable();
      }else if(this.tab == '2'){
        this.chartsBegin()
      }
      
    },
    chartsBegin(){
      /////
      this.chartShow_1_1();
      this.chartShow_1_2();
      this.chartShow_1_3();
      /////
      this.chartShow_2_1();
      this.chartShow_2_2();
      this.chartShow_2_3();
      /////
      this.chartShow_3();
      /////
      this.chartShow_4();
      /////
      this.chartShow_5();
      /////
      this.chartShow_6();
    },
    //
    chartShow_1_1() {
      this.optData_1_1 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_1_2() {
      this.optData_1_2 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
                          color: "#FB7693" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FDAE62" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_1_3() {
      this.optData_1_3 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
                          color: "#9D27EC" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#F167A2" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    //
    chartShow_2_1() {
      this.optData_2_1 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_2_2() {
      this.optData_2_2 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
                          color: "#FB7693" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FDAE62" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    chartShow_2_3() {
      this.optData_2_3 = {
        title: {
          text: "33",
          textStyle: {
            color: "#000",
            fontSize: 30
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
          radius: "160%" //图形大小
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
                          color: "#9D27EC" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#F167A2" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              }
            ],
            coordinateSystem: "polar", //极坐标
            roundCap: true, //有圆弧 只针对极坐标有效
            barWidth: 8,
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
            barWidth: 11,
            barGap: "-110%", // 两环重叠
            radius: ["20%", "53%"],
            z: 1
          }
        ]
      };
    },
    //
    chartShow_3() {
      this.optData_3 = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          itemWidth: 15, //修改icon图形大小
          itemHeight: 15, //修改icon图形大小
          type: "scroll",
          padding: [0, 0, 13, 0],
          textStyle: {
            color: "#919294"
          },
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["35%", "50%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            // label: {
            //   show: false,
            //   position: "center"
            // },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "30",
            //     fontWeight: "bold"
            //   }
            // },
            labelLine: {
              show: true
            },
            data: [
              {
                value: 335,
                name: "直接访问",
                label: {
                  color: "#000",
                  fontSize: 12,
                  formatter: "{b}\n{c} ({d}%)"
                },
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#FCAC62"
                    },
                    {
                      offset: 1,
                      color: "#FC8C7E"
                    }
                  ])
                },
                labelLine: {
                  // length:30,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              {
                value: 310,
                name: "邮件营销",
                label: {
                  color: "#000",
                  fontSize: 12,
                  formatter: "{b}\n{c} ({d}%)"
                },
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#F86948"
                    },
                    {
                      offset: 1,
                      color: "#E2453F"
                    }
                  ])
                },
                labelLine: {
                  // length:30,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              {
                value: 234,
                name: "联盟广告",
                label: {
                  color: "#000",
                  fontSize: 12,
                  formatter: "{b}\n{c} ({d}%)"
                },
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#AA30DF"
                    },
                    {
                      offset: 1,
                      color: "#CE4AC0"
                    }
                  ])
                },
                labelLine: {
                  // length:30,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              {
                value: 135,
                name: "视频广告",
                label: {
                  color: "#000",
                  fontSize: 12,
                  formatter: "{b}\n{c} ({d}%)"
                },
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#30BFDA"
                    },
                    {
                      offset: 1,
                      color: "#48DAC8"
                    }
                  ])
                },
                labelLine: {
                  // length:30,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              {
                value: 1548,
                name: "搜索引擎",
                label: {
                  color: "#000",
                  fontSize: 12,
                  formatter: "{b}\n{c} ({d}%)"
                },
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#0FACFA"
                    },
                    {
                      offset: 1,
                      color: "#1ACCE8"
                    }
                  ])
                },
                labelLine: {
                  // length:30,
                  lineStyle: {
                    width: 2
                  }
                }
              }
            ]
          }
        ]
      };
    },
    //
    chartShow_4() {
      this.optData_4 = {
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
              color: "#919294",
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
              color: "#1AC8EA",
              opacity: 0.1,
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
                    fontSize: 12,
                    fontWeight:'bold'
                  }
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1AC8EA"
                  },
                  {
                    offset: 1,
                    color: "#10ADFA"
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
    },
    //
    chartShow_5() {
      this.optData_5 = {
        grid: {
          x: 50,
          y: 20,
          x2: 40
        },
        xAxis: {
          type: "category",
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
              color: ["#eee"],
              type: "dashed"
            }
          }
        },
        // visualMap: {
        //   type: "piecewise",
        //   show: false,
        //   dimension: 0,
        //   seriesIndex: 0,
        //   pieces: [
        //     {
        //       gt: 1,
        //       lt: 3,
        //       color: "rgba(0, 180, 0, 0.5)"
        //     },
        //     {
        //       gt: 5,
        //       lt: 7,
        //       color: "rgba(0, 180, 0, 0.5)"
        //     }
        //   ]
        // },
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
              color: "#5486F9",
              width: 2,
              shadowColor: "rgba(85,137,247, 0.5)",
              shadowBlur: 10,
              shadowOffsetX: 10
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(85,137,247,0.5)"
                },
                {
                  offset: 1,
                  color: "rgba(85,137,247,0.1)"
                }
              ])
            },
            data: [
              ["2019-10-10", 200],
              ["2019-10-11", 400],
              ["2019-10-12", 650],
              ["2019-10-13", 500],
              ["2019-10-14", 250],
              ["2019-10-15", 300],
              ["2019-10-16", 450],
              ["2019-10-17", 300],
              ["2019-10-18", 100]
            ]
          }
        ]
      };
    },
    //
    chartShow_6() {
      this.optData_6 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告"]
        },
        grid: {
          x: 50,
          y: 30,
          x2: 40
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
              color: ["#eee"],
              type: "dotted"
            }
          }
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            label: {
              show: true,
              color:'#000',
              position: "right",
              fontWeight:'bold'
            },
            itemStyle:{
              normal:{
                barBorderRadius: 30, //柱状图边角圆弧化
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#EC66A5'
                  }, {
                    offset: 1,
                    color: '#9E29E9'
                  }])
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D5C95D'
                  }, {
                    offset: 1,
                    color: '#C39E69'
                  }])
              },
            },
            data: [{
              value:320,
              label:{
                show:false
              }
            }, 302, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              color:'#000',
              position: "inside",
              fontWeight:'bold'
            },
            itemStyle:{
              normal:{
                barBorderRadius: 30, //柱状图边角圆弧化
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#4CE0C6'
                  }, {
                    offset: 1,
                    color: '#1DA8EB'
                  }])
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D5C95D'
                  }, {
                    offset: 1,
                    color: '#C39E69'
                  }])
              },
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              color:'#000',
              position: "inside",
              fontWeight:'bold'
            },
            itemStyle:{
              normal:{
                barBorderRadius: 30, //柱状图边角圆弧化
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D9D9D9'
                  }, {
                    offset: 1,
                    color: '#D9D9D9'
                  }])
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D5C95D'
                  }, {
                    offset: 1,
                    color: '#C39E69'
                  }])
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      };
    }
  }
};
</script>