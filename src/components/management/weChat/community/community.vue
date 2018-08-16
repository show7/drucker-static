<template>
    <div class="community-container">
      <h3>群管理</h3>
      <el-tabs type="border-card">
        <el-tab-pane label="社群组管理">
          <communityList></communityList>
        </el-tab-pane>
        <el-tab-pane label="微信群管理">微信群管理</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import communityList from './components/communityList/communityList'
    export default {
        name: "community",
        components: { communityList },
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped lang='less'>
    @import "community.less";
</style>
