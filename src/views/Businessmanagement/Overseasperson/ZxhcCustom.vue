<template>
  <div class="custom">
    <el-row>
      <el-col :span="12">
        <div>
          <el-form
            :model="dialogData"
            status-icon
            size="mini"
            ref="form"
            label-width="100px"
            class="form-ruleForm"
          >
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="22">         
              <el-form-item label="类型">
                <el-col :span="18">
                  <el-select v-model="dialogData.type" placeholder="请选择" @change="lxChange(dialogData.type)">
                    <el-option 
                    v-for="item in lx"
                    :key='item.dm'
                    :label="item.cm"
                    :value="item.dm"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>             
              <el-form-item label="内容" v-if="dialogData.type=='text'">
                <el-row type="flex" v-for="(item,inds) in dialogData.content" :key="inds">
                  <el-col :span="18">
                    <el-form-item :prop="'content.'+ inds + '.textAdd'" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                      <el-input v-model="item.textAdd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="Add(dialogData.type)" v-if="dialogData.content.length-1==inds"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteModel(inds)" v-if="inds!=0"></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="内容" v-else>
                <el-row>
                  <el-col :span="10">
                    <el-form-item prop="title" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                      <el-input placeholder="标题" v-model="dialogData.title"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" v-for="(item,inds) in dialogData.content" :key="inds">                  
                  <el-col :span="18">
                    <el-form-item :prop="'content.'+ inds + '.textAdd'" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                      <el-input placeholder="选择项" v-model="item.textAdd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="Add(dialogData.type)" v-if="dialogData.content.length-1==inds"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteModel(inds)" v-if="inds!=0"></el-button>
                  </el-col>                
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div v-for="(item,ind) in allData" :key="ind">
          <el-form
            :model="item"
            status-icon
            size="mini"
            :ref="'fCon'+ind"
            label-width="100px"
            class="form-ruleForm"
          >
            <el-row type="flex" align="middle" justify="center">
              <el-col :span="22">
                <el-form-item label="类型">
                  <el-col :span="18">
                     <el-select v-model="item.type" placeholder="请选择" disabled>
                      <el-option 
                      v-for="item in lx"
                      :key='item.dm'
                      :label="item.cm"
                      :value="item.dm"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5" class="ml-5">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(ind)"></el-button>
                  </el-col>
                </el-form-item>    
                <el-form-item label="内容" v-if="item.type=='text'">
                <el-row type="flex" v-for="(con,cons) in item.content" :key="cons">
                  <el-col :span="18">
                    <el-form-item :prop="'content.'+ cons + '.textAdd'" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                      <el-input v-model="con.textAdd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="AddEdit(item,con)" v-if="item.content.length-1==cons"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteEdit(item,cons)" v-if="cons!=0"></el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="内容" v-else>
                <el-row>
                  <el-col :span="10" prop="title" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                    <el-input placeholder="标题" v-model="item.title"></el-input>
                  </el-col>
                </el-row>
                <el-row type="flex" v-for="(cond,conds) in item.content" :key="conds">                  
                  <el-col :span="18">
                    <el-form-item :prop="'content.'+ conds + '.textAdd'" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                      <el-input placeholder="选择项" v-model="cond.textAdd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="AddEdit(item,cond)" v-if="item.content.length-1==conds"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteEdit(item,conds)" v-if="conds!=0"></el-button>
                  </el-col>                
                </el-row>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div class="page-btn-box">
        <el-button size="mini" type="primary" round  @click="save('form')">保存</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" round  @click="confirm('fCon')">确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  prop:{

  },
  data(){
    return{
      lx:[
        {
          dm:'text',
          cm:'文本'
        },
        {
          dm:'radio',
          cm:'单选'
        },
        {
          dm:'select',
          cm:'下拉选'
        },
        {
          dm:'checkbox',
          cm:'复选'
        },
      ],
      dialogData:{
        type:'text',
        title:'',
        content:[
          {
            id:1,
            textAdd:''
          }
        ],
      },
      modelText:{
        id:1,
        textAdd:'',
      },
      count:1,
      allData:[],
      data:[
        {
          type:'text',
          content:[ 
            {
              id:1,
              textAdd:'备注'
            },
            {
              id:1,
              textAdd:'翻译'
            },
          ],
        },
        {
          type:'radio',
          content:[
            {
              title:'性别',
              value:['男','女','未知']
            },
          ],
        },
        {
          type:'radio',
          content:[
            {
              title:'类型',
              value:['出境','入境','出入境']
            }
          ],
        },
        {
          type:'select',
          content:[
            {
              title:'性别',
              value:['男','女','未知']
            },
            {
              title:'类型',
              value:['出境','入境','出入境']
            }
          ],
        },
        {
          type:'checkbox',
          content:[],
        }
      ],
    }
  },
  methods:{
    lxChange(type){
      this.count=1;
      this.dialogData={
        type:type,
        title:'',
        content:[
          {
            id:1,
            textAdd:''
          }
        ],
      }
      this.$refs['form'].resetFields();
    },
    Add(type){
      this.count++;
      this.dialogData.type=type;
      this.modelText={id:this.count,textAdd:'',}
      this.dialogData.content.push(this.modelText)
    },
    AddEdit(item,cont){
      console.log('item==',item)
      let count = cont.id++;
      this.modedlText={id:count,textAdd:''}
      item.content.push(this.modedlText)
    },
    deleteEdit(item,ind){
      item.content.splice(ind,1);
    },
    deleteModel(ind){
      this.dialogData.content.splice(ind, 1);
    },
    deleteItem(ind){
      this.allData.splice(ind,1);
    },
    save(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => { 
        if(valid){
          let realObj ={}
          Object.assign(realObj,this.dialogData)
          realObj = JSON.parse(JSON.stringify(realObj))
          this.allData.push(realObj)
          this.dialogData= {
              type:'text',
              title:'',
              content:[
                {
                  id:1,
                  textAdd:''
                }
              ]
          }
        }
      });
    },
    confirm(formName){
      // console.log(this.$refs[formName+'0'][0])
      // console.log(this.$refs[formName+'0'][0].validate)
      // console.log(this.$refs[formName+'1'])
      for(var i=0;i<this.allData.length;i++){
        this.$refs[formName+i][0].validate(valid => { 
          if(valid){
            console.log('this.allData',this.allData)
          }
        });
      }
    },
    cancel(){
      this.$emit("dialogCancel")
    }
  },
}
</script>
<style>
.custom .el-button+.el-button{
  margin-left: 5px;
}
</style>