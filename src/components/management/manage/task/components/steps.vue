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
  },

  mounted () {
    this.$nextTick(() => {
      this.initSlot()
    })
  },

  methods: {
    initSlot () {
      const len = this.$children.length
      this.$children.forEach((slot, index) => {
        slot.index = index + 1
        if (index + 1 === len) {
          slot.last = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./steps.less');
</style>
