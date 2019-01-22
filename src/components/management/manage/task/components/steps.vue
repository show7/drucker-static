<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Step from './step'

export default {
  props: {
    active: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./steps.less');
</style>
