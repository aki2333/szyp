<template>
  <div class="page">
    <Inquire 
    :cxData="$cdata.czxx.zhfx.cx" 
    :pd="cx.pd"
    :cxCheck="$cdata.czxx.zhfx.cxCheck"   
    :cxPara="cx" 
    @lcFnc="lcFnc"
    @cxFnc="cxFnc"></Inquire>
    <div class="t-tab-top">
      <div class="tab-top-item hand" :class="tab=='1'?'tabImgActive_1':'tabImg_1'" @click="tabTopClick('1')">
        列表
      </div>
      <div class="tab-top-item hand" :class="tab=='2'?'tabImgActive_2':'tabImg_2'" @click="tabTopClick('2')">
        图表
      </div>
    </div>
    <div class="page-box">
      <el-row v-if="tab=='1'">
        <p class="trend-title mb-12">统计类别</p>
        <el-checkbox-group v-model="cx.pd.statiType">
          <el-checkbox v-for="(item,ind) in checkList" :key="ind" :label="item.dm">{{item.mc}}</el-checkbox>
        </el-checkbox-group>
        <Table
          :lbData="lbData"
          :isSelect="true"
          :lbBtn="lbBtn"
          :plBtn="plBtn"
          :tableData="tableData"
          :refName="'czzhfx'"
          :selection="selection"
          :pageSizeArr="pageSizeArr"
          :clearSort="clearSort"
          :expData="cx"
          :expUrl="$api.aport2+''"
          @plFnc="plFnc"
          @pageSizeFnc="pageSizeFnc"
          @pageNumFnc="pageNumFnc"
          @blFnc="blFnc"
          @SelectionChange="SelectionChange"
          @rowClick="rowClick"
          @rowDbClick="blFnc"
          @sortChange="sortChange"
          @transSaveFnc="transSaveFnc"
        ></Table>
      </el-row>
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
            <el-select class="chart-select" v-model="cx.pd.analysisType" placeholder="请选择" size="medium">
              <el-option v-for="(item,ind) in analysis_3" :key="ind" :label="item.mc" :value="item.dm"></el-option>
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
    <Dialog :isShowDialog="isShowDialog" :title="dialogTitle" @hideDialog="isShowDialog=false">
      <CzTable
        :key="timer"
        :pd="tablePd"
        :dialogType="dialogType"
        :dialogData="dialogData"
        :pageRef="pageRef"
        @dialogCancel="isShowDialog=false"></CzTable>
    </Dialog>
  </div>
</template>
<script>
import Inquire from "@/components/Inquire.vue";
import Charts from "@/components/Charts.vue";
import Table from "@/components/Table.vue";
import CzTable from "../../AnalysisAndJudgment/AAJudge/CzTable.vue"
import Dialog from "@/components/Dialog.vue";

export default {
  components: { Inquire, Charts,Table,CzTable,Dialog },
  data() {
    return {
      cx: {
        pd: {
          statiType:[],
          analysisType:''
        },
        pageSize: 15,
        pageNum: 1,
      },
      lbData:this.$cdata.czxx.xxwhgl.lb,
      lbBtn: this.$cdata.czxx.zhfx.lbBtn,
			plBtn: this.$store.state.plBtn,
			pageSizeArr: [15, 100, 500],
      selection: [],
      tableData: {
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1
			},
      clearSort:0,

      checkList:[
        {
          dm:'gender',
          mc:'性别'
        },
        {
          dm:'nationality',
          mc:'国家地区'
        },
        {
          dm:'paper_type',
          mc:'证件种类'
        },
        {
          dm:'visa_type',
          mc:'签证种类'
        },
        {
          dm:'degree_code',
          mc:'身份'
        },
        {
          dm:'personnel_area_type',
          mc:'境外人员类别'
        },
        {
          dm:'age',
          mc:'年龄段'
        },
      ],
      tableHead:[
        {
          dm:'gender_desc',
          cm:'性别'
        },
        {
          dm:'nationality_desc',
          cm:'国家地区'
        },
        {
          dm:'paper_type_desc',
          cm:'证件种类'
        },
        {
          dm:'visa_type_desc',
          cm:'签证种类'
        },
        {
          dm:'degree_code_desc',
          cm:'身份'
        },
        {
          dm:'personnel_area_type_desc',
          cm:'境外人员类别'
        },
        {
          dm:'age',
          cm:'年龄段'
        },
      ],
      tableHeadReal:[
        {
          dm:'count',
          cm:'统计数量'
        },
      ],
      //弹窗
      tablePd:{},
      pageRef:'',
      timer:'',
      isShowDialog: false,
      dialogTitle: "",
      dialogType: "",
      dialogData: {},
      labelData: [],

      analysis_3:[
        {
          dm:'gender',
          mc:'性别'
        },
        {
          dm:'nationality',
          mc:'国家地区'
        },
        {
          dm:'paper_type',
          mc:'证件种类'
        },
        {
          dm:'visa_type',
          mc:'签证种类'
        },
        {
          dm:'degree_code',
          mc:'身份'
        },
        {
          dm:'personnel_area_type',
          mc:'境外人员类别'
        },
        {
          dm:'age',
          mc:'年龄段'
        },
      ],
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
    this.$store.dispatch("aGetGender");
    this.$store.dispatch("aGetPassport");
    this.$store.dispatch("aGetNation");
    this.$store.dispatch("aGetDM",'qzzl');
    this.$store.dispatch("aGetDMPro",'dm_jwrysf');
    this.$store.dispatch("aGetDMPro",'dm_crjbs');
    this.$store.dispatch("aGetDMPro",'dm_rydylbb');
    this.getTable();
  },
  methods: {
    // 获取查询参数
    cxFnc(data) {
      this.cx.pd = data;
      this.cx.pageNum = 1;
      this.getTable(true);
    },
    tabTopClick(index) {
      this.tab = index;
      if(this.tab == '1'){
        this.getTable();
      }else if(this.tab == '2'){
        this.chartsBegin()
      }
    },
    lcFnc(data) {
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
    //简表数据 子组件通知父组件改表格数据
    transSaveFnc(data){
      this.lbData = data
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
		//表格排序
		sortChange(data){
			this.cx.order = data.prop;
      this.cx.direction = data.direction
      this.getTable();
		},
		// 查询用户列表
    getTable(flag,pdQ) {
      if(flag){this.clearSort = new Date().getTime();delete this.cx.order;delete this.cx.direction }
      if(this.cx.pd.statiType.length==0){
        this.lbData = this.$cdata.czxx.xxwhgl.lb
        this.$api.post(this.$api.aport4 + "/comprehensive/listdata", pdQ||this.cx, r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total
        });
      }else{
        this.$api.post(this.$api.aport4 + '/comprehensive/getGroupData',pdQ||this.cx, r => {
          this.tableData.list = r.list;
          this.tableData.total = r.total;
          this.tableHeadReal = [
            {
              dm:'count',
              cm:'统计数量'
            },
          ];
          this.cx.pd.statiType.forEach((item) => {
            this.tableHead.forEach((jtem) => {
              if(item == jtem.dm||item+'_desc' == jtem.dm){
                this.tableHeadReal.splice(this.tableHeadReal.length-1,0,jtem)
              }
            })
          })
          this.lbData = this.tableHeadReal
        })
      }
    },
		//批量按钮
		plFnc(data){
      console.log(data)
      // this.dialogTitle = data.menu_name;
      // this.dialogType = data.py;
		},
		//列表内按钮&&双击行
		blFnc(data){
      console.log(data)
      this.dialogType = data.btn.button_type;
      this.dialogTitle = data.btn.button_name;
      // this.onlyId = data.data.personnel_id;
      if(data.double){
        this.dialogType = 'detail',
        this.dialogTitle = '详情'
      }
      if(this.dialogType == 'detail'){
        if(this.cx.pd.statiType.length == 0){
          let routeData = this.$router.resolve({
            path: '/CzCTXQ',
            query:{onlyId:data.data.personnel_id}
          });
          window.open(routeData.href, '_blank');
        }else{
          this.pageRef="zhfx"//常住综合分析
          this.tablePd = {};
          let queryPd = this.cx.pd;
          let basicPd = this.$fnc.objCompare(data.data, queryPd);
          this.tablePd = Object.assign({},basicPd.obj1,basicPd.obj2)
          this.timer = new Date().getTime();
          this.isShowDialog = true;
        }
      }
    },
    //表格复选框选择
		SelectionChange(){},
		//点击行
		rowClick(){},
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
      // this.chartShow_3();
      this.chartFun_3()
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
                value: 20,
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
          // {
          //   // 灰色环
          //   type: "bar",
          //   data: [
          //     {
          //       value: 100,
          //       itemStyle: {
          //         color: "#eee"
          //       }
          //     }
          //   ],
          //   coordinateSystem: "polar",
          //   roundCap: true,
          //   barWidth: 11,
          //   barGap: "-110%", // 两环重叠
          //   radius: ["20%", "53%"],
          //   z: 1
          // }
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
    chartFun_3(){
      this.$api.post(this.$api.aport4 + '/comprehensive/pieChart',this.cx,r=>{
        this.chartShow_3();
        console.log(r)
      })
    },
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