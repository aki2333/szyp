<template>
  <div>
    <div :id="'akiChart'+id" class="my-chart" :ref="'akiChart'+id" :style="{width:Cwidth,height:Cheight}"></div>
  </div>
</template>
<script>
export default {
  props: {
    optData: {
      type: Object,
      default: () => {}
    },
    id:{
      type:String,
      default:""
    },
    Cwidth:{
      type:String,
      default:'100%'
    },
    Cheight:{
      type:String,
      default:'240px'
    },
    // MyChart:{
    //   type: Object,
    //   default: () => null
    // }
  },
  data(){
    return{
      MyChart:null
    }
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      // 初始化
      this.MyChart = this.$echarts.init(document.getElementById("akiChart"+this.id));
      // 绘制
      this.MyChart.setOption(this.optData);
      this.MyChart.on('click',(params)=>{
        this.$emit('chartClick',params)
      })
      // 监听浏览器尺寸
      window.addEventListener("resize", function() {
       this.MyChart.resize();
      });
    }
  }
};
</script>
<style scoped>

</style>