<template>
  <el-select v-model="serviceId" placeholder="请选择公众号" @change="handleChange">
    <el-option
      v-for="item in serviceList"
      :key="item.serviceId"
      :label="item.name"
      :value="item.serviceId">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "weChat",
    data(){
      return{
        serviceList: [{ serviceId: 1, name: '圈外同学' }, { serviceId: 6, name: '圈外职场学园' }, { serviceId: 10, name: '又更新了' }, { serviceId: 13, name: '圈外职场研究所' }],
        serviceId:1,
      }
    },
    methods:{
      handleChange(){
        this.$emit('getServiceId',this.serviceId)
      }
    },
    created(){
      this.handleChange();
    }
  }
</script>

<style scoped lang='less'>
    @import "weChat.less";
</style>
