<template>
  <div class="hello">
    <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>

    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>

    <example :msg="msg" @getData="get"></example>
    <p >父组件：{{msg}}</p>
  </div>
</template>

<script>
import example from '@/components/common/example/example';
export default {
  name: 'helloWorld',
  components: { example },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      outerVisible: false,
      innerVisible: false
    }
  },
  methods: {
    get (string) {
      this.msg = string;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "HelloWorld.less";
</style>
