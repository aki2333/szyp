<template>
  <div class="no-color-page">
    <div class="portrait-head">
      <el-container>
        <el-aside width="130px" class="data-height"><img class="data-height" :src="require('@/assets/images/main/mrzp.png')" alt=""></el-aside>
        <el-main>
          <div class="portrait-data">
            <div class="data-height data-basic">
              <div class="data-title">基本信息</div>
              <div class="data-content mt-20">
                <el-row>
                  <el-col :span="8" class="t-el-content" v-for="(basic,ind) in jbxx" :key="ind">
                    <div class="t-el-text color-fff">{{basic.name}}：</div><div class="t-el-sub color-fff">{{basic.value}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="data-height data-viso">
              <div class="data-title">签证签发信息</div>
              <div class="data-content mt-20">
                <el-row>
                  <el-col :span="12" class="t-el-content" v-for="(qz,inds) in qzxx" :key="inds">
                    <div class="t-el-text color-fff">{{qz.name}}：</div><div class="t-el-sub color-fff">{{qz.value}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="data-height data-address">
              <div class="data-title">住宿地址信息</div>
              <div class="data-content mt-20">
                <el-row>
                  <el-col :span="24" class="t-el-content" v-for="(zs,inds) in zsxx" :key="inds">
                    <div class="t-el-text color-fff">{{zs.name}}：</div><div class="t-el-sub color-fff">{{zs.value}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="portrait-body mt-20">
      <div id="boxQz" :class="qzTableData.show?'body-tag':'body-down'">
        <div class="body-title">
          <img :src="require('@/assets/images/main/tag-title.png')" alt="">
          <span class="ml-10">证件与签证信息</span>
        </div>
        <!-- <div class="table-other">
          <div class="table-tab-box">
            
          </div>
          <div class="table-btn-box">
            <span
              class="hand"
              :class="{'tab_active':page1==lt.dm}"
              v-for="(lt,lti) in lbTab"
              :key="lti"
              @click="lbTabFun(lt.dm)"
            >{{lt.mc}}</span>
          </div>
        </div> -->
        <Table
        v-show="qzTableData.show"
        :lbData="$cdata.ryhx.ryhx.qzTable"
        :tableData="qzTableData"
        :lbBtn="$cdata.ryhx.ryhx.qzLbBtn"
        :pageSizeArr="pageSizeArr"
         @pageSizeFnc="qzpageSizeFnc"
         @pageNumFnc="qzpageNumFnc"
        ></Table>
        <el-divider  content-position="right">
          <el-button :icon="qzTableData.show?'el-icon-arrow-up':'el-icon-arrow-down'" circle size='small' @click="qzTableData.show=!qzTableData.show"></el-button>
        </el-divider>
      </div>

      <div id="boxCrj" :class="crjTableData.show?'body-tag':'body-down'">
        <div class="body-title">
          <img :src="require('@/assets/images/main/tag-title.png')" alt="">
          <span class="ml-10">出入境记录</span>
        </div>
        <Table
        v-show="crjTableData.show"
        :lbData="$cdata.ryhx.ryhx.crjTable"
        :tableData="crjTableData"
        :lbBtn="$cdata.ryhx.ryhx.crjLbBtn"
        :pageSizeArr="pageSizeArr"
         @pageSizeFnc="crjpageSizeFnc"
         @pageNumFnc="crjpageNumFnc"
        ></Table>
        <el-divider  content-position="right">
          <el-button :icon="crjTableData.show?'el-icon-arrow-up':'el-icon-arrow-down'" circle size='small' @click="crjTableData.show=!crjTableData.show"></el-button>
        </el-divider>
      </div>

      <div id="boxLz" :class="lzTableData.show?'body-tag':'body-down'">
        <div class="body-title">
          <img :src="require('@/assets/images/main/tag-title.png')" alt="">
          <span class="ml-10">临住记录</span>
        </div>
        <Table
        v-show="lzTableData.show"
        :lbData="$cdata.ryhx.ryhx.lzTable"
        :tableData="lzTableData"
        :lbBtn="$cdata.ryhx.ryhx.lzLbBtn"
        :pageSizeArr="pageSizeArr"
         @pageSizeFnc="lzpageSizeFnc"
         @pageNumFnc="lzpageNumFnc"
        ></Table>
        <el-divider  content-position="right">
          <el-button :icon="lzTableData.show?'el-icon-arrow-up':'el-icon-arrow-down'" circle size='small' @click="lzTableData.show=!lzTableData.show"></el-button>
        </el-divider>
      </div>

      <div id="boxCz" :class="lzTableData.show?'body-tag':'body-down'">
        <div class="body-title">
          <img :src="require('@/assets/images/main/tag-title.png')" alt="">
          <span class="ml-10">常住记录</span>
        </div>
        <Table
        v-show="czTableData.show"
        :lbData="$cdata.ryhx.ryhx.czTable"
        :tableData="czTableData"
        :lbBtn="$cdata.ryhx.ryhx.czLbBtn"
        :pageSizeArr="pageSizeArr"
         @pageSizeFnc="czpageSizeFnc"
         @pageNumFnc="czpageNumFnc"
        ></Table>
        <el-divider  content-position="right">
          <el-button :icon="czTableData.show?'el-icon-arrow-up':'el-icon-arrow-down'" circle size='small' @click="czTableData.show=!czTableData.show"></el-button>
        </el-divider>
      </div>

      <div id="boxAj" :class="ajTableData.show?'body-tag':'body-down'">
        <div class="body-title">
          <img :src="require('@/assets/images/main/tag-title.png')" alt="">
          <span class="ml-10">案事件记录</span>
        </div>
        <Table
        v-show="ajTableData.show"
        :lbData="$cdata.ryhx.ryhx.ajTable"
        :tableData="ajTableData"
        :lbBtn="$cdata.ryhx.ryhx.ajLbBtn"
        :pageSizeArr="pageSizeArr"
         @pageSizeFnc="ajpageSizeFnc"
         @pageNumFnc="ajpageNumFnc"
        ></Table>
        <el-divider  content-position="right">
          <el-button :icon="ajTableData.show?'el-icon-arrow-up':'el-icon-arrow-down'" circle size='small' @click="ajTableData.show=!ajTableData.show"></el-button>
        </el-divider>
      </div>
    </div>
    <el-dropdown @command="menuClick">
      <div class="ryhx-menu el-icon-plus"></div>
      <el-dropdown-menu class="ryhx-menu-dropdown" slot="dropdown">
        <el-dropdown-item 
        v-for="(menu,ind) in menu"
        :key="ind"
        :command="menu.id">{{menu.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Table from "@/components/RyhxTable.vue";
export default {
  components:{Table},
  data(){
    return{
      jbxx:[
        {
          name:'中文姓名',
          value:'麦克'
        },
        {
          name:'性别',
          value:'男'
        },
        {
          name:'国家地区',
          value:'韩国'
        },
        {
          name:'英文姓名',
          value:'miake'
        },
        {
          name:'出生日期',
          value:'1993年03月10号'
        },
        {
          name:'证件号码',
          value:'EH14525395'
        },
        {
          name:'电话号码',
          value:'145253955288'
        },
      ],
      qzxx:[
        {
          name:'证件种类',
          value:'居民身份证'
        },
        {
          name:'签证种类',
          value:'往来港澳通行证'
        },
        {
          name:'证件号码',
          value:'145269523698562324588'
        },
        {
          name:'签证号码',
          value:'H44441455'
        },
        {
          name:'证件有效期',
          value:'2023年1月20号'
        },
        {
          name:'签证有效期',
          value:'2024年1月11号'
        },
      ],
      zsxx:[
        {
          name:'临住地址',
          value:'江苏省苏州市乌镇国际豪华酒店'
        },
        {
          name:'常住地址',
          value:'江苏省苏州市乌镇国际豪华酒店'
        },
        {
          name:'服务处所地址',
          value:'江苏省苏州市乌镇国际豪华酒店'
        },
      ],
      menu:[
        {
          name:'证件与签证信息',
          id:'boxQz'
        },
        {
          name:'出入境记录',
          id:'boxCrj'
        },
        {
          name:'临住记录',
          id:'boxLz'
        },
        {
          name:'常住记录',
          id:'boxCz'
        },
        {
          name:'案事件记录',
          id:'boxAj'
        },
        // {
        //   name:'出入境记录',
        //   id:'boxCrj'
        // },
        // {
        //   name:'出入境记录',
        //   id:'boxCrj'
        // },
        // {
        //   name:'出入境记录',
        //   id:'boxCrj'
        // },
      ],
      qzTableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        show:true,
      },
      qzCx:{
        pageSize: 15,
        pageNum: 1,
      },
      crjTableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        show:true,
      },
      crjCx:{
        pageSize: 15,
        pageNum: 1,
      },
      lzTableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        show:true,
      },
      lzCx:{
        pageSize: 15,
        pageNum: 1,
      },
      czTableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        show:true,
      },
      czCx:{
        pageSize: 15,
        pageNum: 1,
      },
      ajTableData:{
        list: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        show:true,
      },
      ajCx:{
        pageSize: 15,
        pageNum: 1,
      },
      // crjTableData:{
      //   list: [],
      //   total: 0,
      //   pageSize: 10,
      //   pageNum: 1,
      //   show:true,
      // },
      // crjCx:{
      //   pageSize: 15,
      //   pageNum: 1,
      // },
      pageSizeArr:[5,10,20],
    }
  },
  methods:{
    menuClick(id){
      document.querySelector('#'+id).scrollIntoView(true);
    },
    // 获取分页等信息
    qzpageSizeFnc(data) {
      this.qzCx.pageSize = data;
      // this.getTable();
    },
    qzpageNumFnc(data) {
      this.qzCx.pageNum = data;
      // this.getTable();
    },
    // 获取分页等信息
    crjpageSizeFnc(data) {
      this.crjCx.pageSize = data;
      // this.getTable();
    },
    crjpageNumFnc(data) {
      this.crjCx.pageNum = data;
      // this.getTable();
    },
    // 获取分页等信息
    lzpageSizeFnc(data) {
      this.lzCx.pageSize = data;
      // this.getTable();
    },
    lzpageNumFnc(data) {
      this.lzCx.pageNum = data;
      // this.getTable();
    },
    // 获取分页等信息
    czpageSizeFnc(data) {
      this.czCx.pageSize = data;
      // this.getTable();
    },
    czpageNumFnc(data) {
      this.czCx.pageNum = data;
      // this.getTable();
    },
    // 获取分页等信息
    ajpageSizeFnc(data) {
      this.czCx.pageSize = data;
      // this.getTable();
    },
    ajpageNumFnc(data) {
      this.czCx.pageNum = data;
      // this.getTable();
    },
  }
}
</script>
<style>

</style>