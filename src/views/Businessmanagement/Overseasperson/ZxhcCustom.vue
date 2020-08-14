<template>
  <div class="custom">
    <el-row type="flex">
      <el-col :span="11">
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
                  <!-- <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="Add(dialogData.type)" v-if="dialogData.content.length-1==inds"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteModel(inds)" v-if="inds!=0"></el-button>
                  </el-col> -->
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
      <el-col :span="2" style="display:flex;justify-content: center;align-items: center;">
        <el-button size="mini" type="success" icon="el-icon-d-arrow-right" circle @click="save('form')"></el-button>
      </el-col>
      <el-col :span="11">
        <div v-for="(item,ind) in allData" :key="ind">
          <el-form
            :model="item"
            status-icon
            size="mini"
            :ref="'fCon'+ind"
            label-width="100px"
            class="form-ruleForm cusArr-form mb-12"
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
                  <!-- <el-col :span="5" class="ml-5">
                    <el-button type="primary" icon="el-icon-plus" circle @click="AddEdit(item,con)" v-if="item.content.length-1==cons"></el-button>
                    <el-button type="danger" icon="el-icon-minus" circle @click="deleteEdit(item,cons)" v-if="cons!=0"></el-button>
                  </el-col> -->
                </el-row>
              </el-form-item>

              <el-form-item label="内容" v-else>
                <el-row>
                  <el-col :span="10">
                    <el-form-item prop="title" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">  
                      <el-input placeholder="标题" v-model="item.title"></el-input>
                    </el-form-item>
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
        <el-form
            :model="time"
            status-icon
            size="mini"
            ref="time"
            label-width="100px"
            class="form-ruleForm"
          >
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="22">
                <el-col :span="19">
                  <el-form-item label="走访时间" prop="issueTime">
                     <el-input-number v-model="time.issueTime" :min="0"></el-input-number><span class="pl-5">小时</span>
                  </el-form-item>
                  <el-form-item label="所属分局" prop="suboffice" :rules="{
                      required: true, message: '此项必填', trigger: 'blur'}">
                     <el-select v-model="time.suboffice" placeholder="请选择">
                        <el-option 
                        v-for="item in $store.state.suboffice"
                        :key='item.dm'
                        :label="item.mc"
                        :value="item.dm"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <div class="page-btn-box">
        <!-- <el-button size="mini" type="primary" round  @click="save('form')">保存</el-button> -->
        <el-button size="mini" type="primary" round  @click="confirm('fCon')">确认</el-button>
        <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  prop:{
    dialogType: {
      type: String,
      default: ""
    },
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
      time:{issueTime:'',suboffice:''},
      data:[
        {
          type:'text',
          content:[ 
            {
              id:1,
              textAdd:'备注'
            }
          ],
        },
        {
          type:'radio',
          title:'性别',
          content:[
            {
              id:1,
              textAdd:'男'
            },
            {
              id:2,
              textAdd:'女'
            },
            {
              id:3,
              textAdd:'未知'
            },
          ],
        },
        {
          type:'radio',
          title:'性别',
          content:[
            {
              id:1,
              textAdd:'男'
            },
            {
              id:2,
              textAdd:'女'
            },
            {
              id:3,
              textAdd:'未知'
            },
          ],
        },
        {
          type:'select',
          title:'性别',
          content:[
            {
              id:1,
              textAdd:'男'
            },
            {
              id:2,
              textAdd:'女'
            },
            {
              id:3,
              textAdd:'未知'
            },
          ],
        },
        {
          type:'checkbox',
          title:'性别',
          content:[
            {
              id:1,
              textAdd:'男'
            },
            {
              id:2,
              textAdd:'女'
            },
            {
              id:3,
              textAdd:'未知'
            },
          ],
        }
      ],
    }
  },
  mounted(){
    this.dialogData={
      type:'text',
        title:'',
        content:[
          {
            id:1,
            textAdd:''
          }
        ],
    }
    this.count = 1
    this.allData=[];
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
          if(realObj.type=='text'){
            realObj.title=realObj.content[0].textAdd
          }
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
      if(this.allData.length == 0){
        this.$refs['time'].validate(valid => {
          if(valid){
            this.$emit('dialogSave',{
              type: 'xf',
              data: this.allData,
              time: this.time.issueTime,
              suboffice:this.time.suboffice
            })
          }
        })
      }else{
        for(var i=0;i<this.allData.length;i++){
          this.$refs[formName+i][0].validate(valid => { 
            if(valid){
              this.$refs['time'].validate(valid => {
                if(valid){
                  if(i == this.allData.length-1){
                    this.$emit('dialogSave',{
                      type: 'xf',
                      data: this.allData,
                      time: this.time.issueTime,
                      suboffice:this.time.suboffice
                    })
                  }
                }
              })  
            }
          });
        }
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