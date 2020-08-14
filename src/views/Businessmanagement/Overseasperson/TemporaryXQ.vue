<template>
  <div class="page-box page">
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="mini"
      ref="form"
      label-width="137px"
      label-position="right"
      class="tc-form"
      :disabled="dialogType=='ck'"
    >
      <el-row :gutter="30">
        <el-col :span="16" class="no-padding">
          <el-col :span="cx.col?cx.col:12" v-for="(cx,i) in cxData.a" :key="i">
            <el-popover
              :ref="'popover'+i"
              placement="top-end"
              trigger="hover"
              v-if="dialogData.xgMap&&dialogData.xgMap[cx.dm]"
              :content="dialogData.xgMap[cx.dm]"
            ></el-popover>
            <el-form-item
              :class="{'yxg-form-item':dialogData.xgMap&&dialogData.xgMap[cx.dm],'font-blod':cx.weight}"
              v-popover="'popover'+i"
              :label="cx.cm"
              :prop="cx.dm"
            >
              <template v-if="cx.type=='input'">
                <el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-else-if="cx.type=='password'">
                <el-input type="password" v-model="dialogData[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.dm"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-else
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)"
                >
                  <el-option
                    v-for="(item,index) in $store.state[cx.dm]"
                    :key="index"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  :type="cx.toS?'datetime':'date'"
                  :value-format="cx.toS?'yyyy-MM-dd HH:mm:ss':'yyyy-MM-dd'"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      placeholder="选择开始日期"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      value-format="yyyy-MM-dd"
                      placeholder="选择结束日期"
                    ></el-date-picker>
                  </div>
                </div>
              </template>
              <template v-else-if="cx.type=='radio'">
                <el-radio-group v-model="dialogData[cx.dm]">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="8">
          <div class="imgbox">
            <el-carousel height="280px" :autoplay="false" arrow="always" @change="imgChange">
              <el-carousel-item
                v-for="(item,index) in dialogImgData"
                :key="index"
                style="text-align:center"
              >
                <el-image style="width:100%" :src="'data:image/jpg;base64,'+item.zp"></el-image>
                <!-- :preview-src-list="['data:image/jpg;base64,'+item.zp]" -->
              </el-carousel-item>
            </el-carousel>
            <!-- <el-image
              @click="imgclick(isimgclick)"
              :style="{'z-index':isimgclick?10:9}"
              class="dt"
              :src="require('@/assets/images/main/wmask.png')"
              :preview-src-list="imgList"
            ></el-image>-->
            <img
              @click="imgclick(isimgclick)"
              class="dt"
              :src="require('@/assets/images/main/wmask.png')"
            />
            <div id="big-img-box" v-drag v-if="isimgclick">
              <el-image-viewer :on-close="()=>{isimgclick=false}" :url-list="imgList" />
            </div>
          </div>
        </el-col>
        <el-col :span="24" class="no-padding">
          <el-col :span="cx.col?cx.col:8" v-for="(cx,i) in cxData.b" :key="i">
            <el-popover
              :ref="'popover2'+i"
              placement="top-end"
              trigger="hover"
              v-if="dialogData.xgMap&&dialogData.xgMap[cx.dm]"
              :content="dialogData.xgMap[cx.dm]"
            ></el-popover>
             <el-popover
              :ref="'popover2'+i"
              placement="top-end"
              trigger="hover"
              v-else-if="(cx.poup&&dialogData[cx.dm])"
              :content="dialogData[cx.poupDm]"
            ></el-popover>
            <el-form-item
              :class="{'yxg-form-item':dialogData.xgMap&&dialogData.xgMap[cx.dm]}"
              v-popover="'popover2'+i"
              :label="cx.cm"
              :prop="cx.dm"
              v-if="!cx.cshow||(cx.cshow&&dialogData[cx.dm])"
            >
              <template v-if="cx.type=='input'">
                <el-input v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-else-if="cx.type=='textarea'">
                <el-input type="textarea" v-model="dialogData[cx.dm]" :disabled="cx.dis"></el-input>
              </template>
              <template v-else-if="cx.type=='password'">
                <el-input type="password" v-model="dialogData[cx.dm]"></el-input>
              </template>
              <template v-else-if="cx.type=='select'">
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-if="cx.optype"
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in $cdata.options[cx.dm]"
                    :key="item.dm"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="dialogData[cx.dm]"
                  filterable
                  v-else
                  clearable
                  :disabled="cx.dis"
                  placeholder="请选择"
                  @change="linkChange(cx,dialogData[cx.dm],dialogData)"
                >
                  <el-option
                    v-for="(item,index) in $store.state[cx.dm]"
                    :key="index"
                    :label="item.dm+' - '+item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="cx.type=='datePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  :type="cx.toS?'datetime':'date'"
                  :value-format="cx.toS?'yyyy-MM-dd HH:mm:ss':'yyyy-MM-dd'"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='datetimePicker'">
                <el-date-picker
                  v-model="dialogData[cx.dm]"
                  :disabled="cx.dis"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </template>
              <template v-else-if="cx.type=='double'">
                <div class="double-box">
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[0].dm]"
                      :type="cx.children[0].type"
                      value-format="yyyy-MM-dd"
                      placeholder="选择开始日期"
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
                      placeholder="选择结束日期"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
              </template>
              <template v-else-if="cx.type=='radio'">
                <el-radio-group v-model="dialogData[cx.dm]">
                  <el-radio
                    :label="item.dm"
                    v-for="(item,ind) in $store.state[cx.dm]"
                    :key="ind"
                  >{{item.mc}}</el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="cx.type=='checkbox'">
                <el-checkbox-group v-model="dialogData[cx.dm]">
                  <el-checkbox 
                   v-for="(item,ind) in $cdata.options[cx.dm]"
                   :key="ind"
                   :name="cx.dm"
                   :label="item.dm">{{item.mc}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-btn-box">
      <el-button size="mini" type="primary" @click="save('form',1)" v-if="dialogType=='bj'">初审通过</el-button>
      <el-button size="mini" type="primary" @click="save('form',0)" v-if="dialogType=='bj'">初审不通过</el-button>
      <el-button size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
  },
  props: {
    cxData: {
      type: Object,
      default: () => {}
    },
    dialogImgData: {
      type: Array,
      default: () => []
    },
    dialogType: {
      type: String,
      default: ""
    },
    dialogData: {
      type: Object,
      default: () => {
        return{
          checklist:[]
        }
      }
    }
  },
  data() {
    var validatesurname = (rule, value, callback) => {
      if (this.dialogData.nationality != "CHN" && value == "") {
        callback(new Error("此项必填"));
      } else {
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (this.dialogData.nationality == "CHN" && value == "") {
        callback(new Error("此项必填"));
      } else {
        callback();
      }
    };
    var validqz = (rule, value, callback) => {
      if ((this.dialogData.nationality != "MAC" && this.dialogData.nationality != "HKG" && this.dialogData.nationality != "TWN")&&value == "") {
        callback(new Error("此项必填"));
      } else {
        callback();
      }
    };
    var validqzhm = (rule, value, callback) => {
      if(((this.dialogData.nationality != "MAC" && this.dialogData.nationality != "HKG" && this.dialogData.nationality != "TWN")&&
      (this.dialogData.visaType != 'M' && this.dialogData.visaType != 'V'))&&value == ""){
        callback(new Error("此项必填"));
      }else{
        callback();
      }
    }
    return {
      rules: {
        nationality: [{ required: true, message: "此项必填", trigger: "blur" }],
        passportType: [
          { required: true, message: "此项必填", trigger: "blur" }
        ],
        passportno: [{ required: true, message: "此项必填", trigger: "blur" }],
        surname: [{ validator: validatesurname, trigger: "blur" }],
        firstname: [{ validator: validatesurname, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }],
        gender: [{ required: true, message: "此项必填", trigger: "blur" }],
        birthday: [{ required: true, message: "此项必填", trigger: "blur" }],
        visaType: [{ validator:validqz, trigger: "blur" }],
        visaNo: [{ validator:validqzhm, trigger: "blur" }],
        tlyxqz: [{ validator:validqz, trigger: "blur" }],
        rjsy: [{ required: true, message: "此项必填", trigger: "blur" }],
        sjhm: [
          { required: true, message: "此项必填", trigger: "blur" },
          { max: 11, message: "长度不可超过11位", trigger: "blur" },
          {
            required: true,
            pattern: /^-?[1-9]\d*$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        jjlxrdh: [
          { required: true, message: "此项必填", trigger: "blur" },
          { max: 11, message: "长度不可超过11位", trigger: "blur" },
          {
            required: true,
            pattern: /^-?[1-9]\d*$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        suboffice: [{ required: true, message: "此项必填", trigger: "blur" }],
        policestation: [
          { required: true, message: "此项必填", trigger: "blur" }
        ]
      },
      isXJ: false,
      newForm: {},
      isimgclick: false,
      imgList:
        this.dialogImgData.length > 0
          ? ["data:image/jpg;base64," + this.dialogImgData[0].zp]
          : []
    };
  },
  watch: {
    dialogImgData(val) {
      this.imgList = ["data:image/jpg;base64," + val[0].zp];
    }
  },
  mounted() {
    // this.form = this.dialogData;
    // console.log(this.form);
  },
  directives: {
    drag: {
      // 指令的定义
      bind: (el) => {
        let odiv = el; //获取当前元素
        let left = "";
        let top = "";
        el.onmousedown = e => {
          //算出鼠标相对元素的位置
          console.log("el===", el, el.getElementsByTagName("img")[0]);
          let oImg = el.getElementsByTagName("img")[0];
          console.log("oImg==", oImg);
          if (e.target.tagName == "IMG") {
            let leftImg = "";
            let topImg = "";
            // oImg.style.position = "relative";
            console.log("onmousedown", e);
            //算出鼠标相对元素的位置
            let disX = e.clientX - oImg.offsetLeft;
            let disY = e.clientY - oImg.offsetTop;
            // console.log("img=", document);
            e.preventDefault();
            document.onmousemove = e => {
              console.log("移动", e);
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              console.log("e.clientX", e.clientX);
              console.log("disX", disX);
              console.log("oImg.offsetLeft", oImg.offsetLeft,oImg.offsetParent.offsetLeft);
              leftImg = e.clientX - disX - 40;
              topImg = e.clientY - disY - 40;
              //绑定元素位置到positionX和positionY上面
              //移动当前元素
              oImg.style.left = leftImg + "px";
              oImg.style.top = topImg + "px";
              oImg.style.right = "auto";
              oImg.style.bottom = "auto";
            };
            document.onmouseup = () => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          } else {
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = e => {
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              left = e.clientX - disX;
              top = e.clientY - disY;
              //绑定元素位置到positionX和positionY上面
              //移动当前元素
              odiv.style.left = left + "px";
              odiv.style.top = top + "px";
              odiv.style.right = "auto";
              odiv.style.bottom = "auto";
            };
            document.onmouseup = () => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          }
        };
      }
    }
  },
  methods: {
    save(formName, type) {
      if (type == 0) {
        this.$emit("dialogSave", {
          type: this.dialogType,
          data: this.dialogData,
          btnType: type
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$emit("dialogSave", {
              type: this.dialogType,
              data: this.dialogData,
              btnType: type
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    getSrcList(url) {
      return ["data:image/jpg;base64," + url];
    },
    imgclick(data) {
      console.log(data);
      this.isimgclick = true;
    },
    imgChange(data) {
      // console.log("imgChange", data);
      this.imgList = ["data:image/jpg;base64," + this.dialogImgData[data].zp];
    },
    linkChange(key, val, dialogData) {
      this.$emit("formLcFnc", { key: key, data: val, obj: dialogData });
    },
    //移除表单校验
    clearValid() {
      this.$refs['form'].clearValidate();
    },
    cancel() {
      if (this.isXJ) {
        this.isXJ = false;
      } else {
        this.$emit("dialogCancel");
      }
    }
  }
};
</script>
<style scoped>
.form {
  padding: 15px 15px 50x;
  border-bottom: 1px solid #295287;
  margin-bottom: 20px;
  color: #e1e8ee;
}
.cx-btn {
  margin-bottom: 18px;
}
.double-box {
  display: flex;
  justify-content: space-between;
}
.double {
  width: 48%;
}
.imgbox {
  position: relative;
}
.dt {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 9;
  /* visibility: hidden; */
  /* opacity: 0; */
}
</style>