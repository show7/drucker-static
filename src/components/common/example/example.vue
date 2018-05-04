<template>
    <div class="example">
      <p>{{exampleMsg}}</p>
      <input v-model="exampleMsg" @input="emitData(exampleMsg)" placeholder="edit me">
    </div>
</template>

<script>
export default {
  name: 'example',
  props: ['msg'],
  data () {
    return {
      exampleMsg: this.msg
    }
  },
  computed: {

  },
  methods: {
    emitData (value) {
      this.$emit('getData', value)
    }
  }
}
</script>

<style lang="less">
  @import "example.less";
</style>
