<template>
  <div class="no-color-page">
    <div class="search-head">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':check==0}" @click="check=0">
          境外人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':check==1}" @click="check=1">
          大陆居民
        </div>
      </div>
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-search">
        <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="search-legend mt-20">
        <ul>
          <li v-for="(leg,legs) in legend" :key="legs">
            <el-avatar shape="square" :size="60" :fit="'none'" :src="require('@/assets/images/main/'+ leg.url +'_data.png')"></el-avatar>
            <div class="legend-data">
              <span>{{leg.name}}</span>
              <span>{{leg.data}}条</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-body">
      <div class="search-time">
        <span>数据更新时间：2020-08-17 12:20:00</span>
      </div>
      <div class="search-card">
        <ul>
          <li v-for="(item,ind) in cardData" :key="ind">
            <el-container>
              <el-aside width="80px"><img :src="require('@/assets/images/main/mrzp.png')" alt=""></el-aside>
              <el-main>
                <div class="card-data">
                  <h3>TAN TYGHUIKJH MANO</h3>
                  <el-row>
                    <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{item.xb}}</div></el-col>
                    <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{item.csrq}}</div></el-col>
                    <el-col :span="6" class="t-el-content"><div class="t-el-text">国家地区：</div><div class="t-el-sub">{{item.gjdqmc}}</div></el-col>
                    <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{item.zjhm}}</div></el-col>
                    <el-col :span="6" class="t-el-content"><div class="t-el-text">命中信息：</div><div class="t-el-sub">{{item.zjhm}}</div></el-col>
                  </el-row>
              </div>
              </el-main>
            </el-container>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      check:0,
      input3:'',
      legend:[
        {
          url:'lz',
          name:'临住数据',
          data:'345678',
        },
        {
          url:'cz',
          name:'常住数据',
          data:'345678',
        },
        {
          url:'qz',
          name:'签证数据',
          data:'345678',
        },
        {
          url:'aj',
          name:'案件数据',
          data:'345678',
        },
        {
          url:'crj',
          name:'出入境数据',
          data:'345678',
        },
      ],
      cardData:[
        {
          xb:'男',
          csrq:'1993-08-09',
          gjdqmc:'加利福尼亚',
          zjhm:'EG145865826',
          name:'TAN TYGHUIKJH MANO'
        },
        {
          xb:'男',
          csrq:'1993-08-09',
          gjdqmc:'加利福尼亚',
          zjhm:'EG145865826',
          name:'TAN TYGHUIKJH MANO'
        },
        {
          xb:'男',
          csrq:'1993-08-09',
          gjdqmc:'加利福尼亚',
          zjhm:'EG145865826',
          name:'TAN TYGHUIKJH MANO'
        },
        {
          xb:'男',
          csrq:'1993-08-09',
          gjdqmc:'加利福尼亚',
          zjhm:'EG145865826',
          name:'TAN TYGHUIKJH MANO'
        },
      ],
    }
  },
}
</script>
<style>

</style>