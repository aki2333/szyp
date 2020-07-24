<template>
  <div class="custom">
    <el-form
        :model="dialogData"
        status-icon
        size="mini"
        ref="form"
        label-width="100px"
        class="form-ruleForm"
      >
      <el-row :gutter="30" align="middle" justify="center">
       <el-col :span="24">
         <el-col :span="8" v-for="(all,alls) in dialogData.data" :key="alls">
           <el-row type="flex">
            <el-col :span="18">
                <el-form-item v-for="(item,ind) in labelData" :key="ind" :label="item.cm">
                  <template v-if="item.type=='input'">
                    <el-input v-model="all[item.dm]" :type="item.mold?item.mold:''"></el-input>
                  </template>
                  <template v-if="item.type=='block'">
                    <el-select v-model="all[item.dm]" placeholder="请选择" popper-class="color-block">
                      <el-option
                        v-for="(item,its) in colorData"
                        :key="its"
                        :label="item"
                        :value="item">
                        <span style="width:20px;height:20px;display: inline-block;" :style="{backgroundColor:item}"></span>
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="ml-5 align-center"> 
                <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="Add()" v-if="dialogData.data.length-1==alls"></el-button>
                <el-button type="danger" icon="el-icon-minus" size="mini" circle @click="deleteModel(alls)" v-if="alls!=0"></el-button>
              </el-col>
            </el-row>
         </el-col>
       </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  prop:{
    // dialogData:{
    //   type: Object,
    //   default: () => {
    //     return{
    //       data:[
    //         {
    //           id:1,
    //           gdsj:'',
    //           gdyssh:'',
    //         },
    //       ],
    //     }
    //   }
    // },
  },
  data(){
    return{
      dialogData:{
        data:[
          {
            id:1,
            gdsj:'',
            gdyssh:'',
          },
        ],
      },
      modelData:{
        id:1,
        gdsj:'',
        gdyssh:'',
      },
      count:1,
      labelData:[
        {
            cm:'天数',
            dm:'gdsj',
            type:'input',
            mold:'number'
          },
          {
            cm:'颜色',
            dm:'gdyssh',
            type:'block'
          }
      ],
      colorData:['#67C23A','#E6A23C','#F56C6C','#409EFF','#909399']
    }
  },
  methods:{
    Add(){
      this.count++;
      this.modelData={id:this.count,gdsj:'',gdyssh:''}
      this.dialogData.data.push(this.modelData)
    },
    deleteModel(ind){
      this.dialogData.data.splice(ind,1)
    }
  },
}
</script>
<style scoped>

</style>