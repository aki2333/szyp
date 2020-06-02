<template>
  <div class="page-box page">
    <el-form
      :model="dialogData"
      status-icon
      :rules="rules"
      size="small"
      ref="form"
      label-width="125px"
      label-position="left"
      class="tc-form"
    >
      <el-row :gutter="30">
        <el-col :span="16" class="no-padding">
          <el-col :span="cx.col?cx.col:12" v-for="(cx,i) in cxData.a" :key="i">
            <el-form-item :label="cx.cm" :prop="cx.dm">
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
                  type="date"
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
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
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
            <el-carousel :autoplay="false" arrow="always" @change="imgChange">
              <el-carousel-item
                v-for="(item,index) in dialogImgData"
                :key="index"
                style="text-align:center"
              >
                <el-image style="width:100%" :src="'data:image/jpg;base64,'+item.zp"></el-image>
                <!-- :preview-src-list="['data:image/jpg;base64,'+item.zp]" -->
              </el-carousel-item>
            </el-carousel>
            <el-image
              class="dt"
              :src="require('@/assets/images/main/wmask.png')"
              :preview-src-list="imgList"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="24" class="no-padding">
          <el-col :span="cx.col?cx.col:8" v-for="(cx,i) in cxData.b" :key="i">
            <el-form-item
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
                  type="date"
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
                    ></el-date-picker>
                  </div>
                  <div>-</div>
                  <div class="double">
                    <el-date-picker
                      v-model="dialogData[cx.children[1].dm]"
                      :type="cx.children[1].type"
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
      </el-row>
    </el-form>

    <div class="page-btn-box">
      <el-button
        size="mini"
        type="primary"
        round
        @click="save('form',1)"
        v-if="dialogType=='bj'"
      >核查通过</el-button>
      <el-button
        size="mini"
        type="primary"
        round
        @click="save('form',0)"
        v-if="dialogType=='bj'"
      >核查未通过</el-button>

      <el-button size="mini" type="info" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
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
      default: () => {}
    }
  },
  data() {
    return {
      // form: {},
      rules: {
        nationality: [{ required: true, message: "此项必填", trigger: "blur" }],
        passportType: [
          { required: true, message: "此项必填", trigger: "blur" }
        ],
        passportno: [{ required: true, message: "此项必填", trigger: "blur" }],
        givenname: [{ required: true, message: "此项必填", trigger: "blur" }],
        gender: [{ required: true, message: "此项必填", trigger: "blur" }],
        birthday: [{ required: true, message: "此项必填", trigger: "blur" }],
        visaType: [{ required: true, message: "此项必填", trigger: "blur" }],
        visaNo: [{ required: true, message: "此项必填", trigger: "blur" }],
        tlyxqz: [{ required: true, message: "此项必填", trigger: "blur" }],
        rjsy: [{ required: true, message: "此项必填", trigger: "blur" }],
        sjhm: [{ required: true, message: "此项必填", trigger: "blur" }],
        jjlxrdh: [{ required: true, message: "此项必填", trigger: "blur" }],
        suboffice: [{ required: true, message: "此项必填", trigger: "blur" }],
        policestation: [
          { required: true, message: "此项必填", trigger: "blur" }
        ]
      },
      isXJ: false,
      newForm: {},
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
  methods: {
    save(formName, type) {
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
    },
    getSrcList(url) {
      return ["data:image/jpg;base64," + url];
    },
    imgChange(data) {
      // console.log("imgChange", data);
      this.imgList = ["data:image/jpg;base64," + this.dialogImgData[data].zp];
    },
    linkChange(key, val, dialogData) {
      this.$emit("formLcFnc", { key: key, data: val, obj: dialogData });
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