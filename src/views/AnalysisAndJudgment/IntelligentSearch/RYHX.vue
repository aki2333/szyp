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
      <div class="search-legend">
        <ul>
          <li>
            <el-avatar shape="square" :size="50" :fit="fit" src=""></el-avatar>
            <div class="legend-data">
              <span>临住数据</span>
              <span>345678条</span>
            </div>
          </li>
          <li>
            <el-avatar shape="square" :size="50" :fit="fit" :src="url"></el-avatar>
            <div class="legend-data">
              <span>临住数据</span>
              <span>345678条</span>
            </div>
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
      url:''
    }
  },
}
</script>
<style>

</style>