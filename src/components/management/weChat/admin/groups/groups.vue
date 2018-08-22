<template>
    <div class="community-container">
      <h3>群管理</h3>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="社群管理" name="first">
          <communityList ref="community" @groupDetail="handleGetId"></communityList>
        </el-tab-pane>
        <el-tab-pane label="微信群管理" name="second">
          <groupList ref="group" @groupDetail="handleGetId" :groupNameS="groupNameSearch" :communityId="communityId"></groupList>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import communityList from './components/communityList/communityList'
  import groupList from './components/groupList/groupList'
    export default {
        name: "community",
        components: { communityList,groupList },
        data() {
            return {
              communityId:null,
              activeName: 'first',
              groupNameSearch:'',
            }
        },
        methods: {
          handleGetId(id,groupNameSearch){
            this.communityId = id;
            this.activeName = 'second';
            this.groupNameSearch = groupNameSearch || '';
          },
          handleTabChange(){
            if (this.activeName === 'first') {
              this.$refs.community.getCommunityList()
            }else {
              this.$refs.group.getGroupList();
              this.$refs.group.getInfoList();
            }
          }
        },
        created() {

        }
    }
</script>

<style scoped lang='less'>
    @import "groups.less";
</style>
