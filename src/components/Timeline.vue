<template>
    <div class="block timeLine">
        <el-timeline>
            <el-timeline-item v-for="(val, key, i) in cxData" :key="i" :timestamp="key" placement="top">
            <el-card v-for="(ic,ick) in val" :key="ick" :style="{'backgroundColor':ic.SSYS}">
                <h4 v-if="ic.XM">姓名：{{ic.XM}}</h4>
                <h4 v-if="ic.XTYHBMMC">所属单位：{{ic.XTYHBMMC}}</h4>
                <p v-if="ic.CZZT">操作状态：{{ic.CZZT}}</p>
                <p v-if="ic.CZSJ">操作时间：{{ic.CZSJ}}</p>
            </el-card>
            </el-timeline-item>
            <el-timeline-item style="top:-9px"></el-timeline-item>
        </el-timeline>
        </div>
</template>
<script>
export default {
    props:{
        cxData:{
            type:Object,
            default:() => {}
        }
    }
}
</script>
<style scoped>
.timeLine{
    max-height: 900px;
    overflow-y: auto;
}
</style>