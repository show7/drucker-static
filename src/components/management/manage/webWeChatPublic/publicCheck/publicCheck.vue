<template>
  <div class="public-check">
    test
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter';

  export default {
    name: 'publicCheck',
    data: function () {
      return {};
    },
    created () {
      this.loadData();
    },
    methods: {
      loadData: function () {
        console.log('load');
        // ApiDataFilter.request({
        //   apiPath: 'manage.survey.surveyConfig',
        //   method: 'post',
        //   data: param,
        //   successCallback: res => {
        //     this.$message.success('提交成功');
        //   }
        // });
      }
    }
  };
</script>
