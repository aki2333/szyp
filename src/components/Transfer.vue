<template>
  <div>
      <div class="transfer">
        <el-transfer
        v-model="value"
        :props="propsData"
        :data="transData"
        :titles="['可选择列', '已选择列']"
        ></el-transfer>
    </div>
    <div class="mt-30 text-center">
        <el-button size="mini" type="primary" round  @click="save(value)">确定</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        transData:{
            type:Array,
            default: () => []
        },
        propsData:{
            type:Object,
            default: () => {
                return{
                    key:'dm',
                    label:'cm'
                } 
            }
        },
        pointData:{
            type:Array,
            default: () => []
        }
    },
    data(){
        return{
            value:[],
        }
    },
    mounted(){
        // console.log('transData',this.pointData)
        this.$nextTick(() =>{
            let arrObj = this.pointData
            let arr = [];
            arrObj.forEach(element => {
                arr.push(element.dm)
            });
            // console.log(arr)
            this.value = arr
        })
    },
    methods:{
        save(data){
            // console.log('value',data)
            this.$emit("transSave",data);
        },
        cancel() {
            this.$emit("dialogCancel");
        }
    }
}
</script>
<style scoped>
.transfer{
    display: flex;
    justify-content: center;
    /* text-align: center; */
}
</style>