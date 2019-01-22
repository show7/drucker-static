<template>
  <div class="step__wrapper">
    <div class="step__left">
      <div class="step__circle" :aria-active="active">
        <span :aria-active="active">{{ index }}</span>
      </div>
      <div class="step__line" :aria-active="active"></div>
    </div>
    <div class="step__right">
      <div class="step__current-slot">
        <!-- 当前值的插槽 -->
        <slot name="current"></slot>
      </div>
      <div class="step__interval-slot">
        <!-- 区间的插槽 -->
        <slot name="interval"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否为激活状态
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      // 当前的step的索引
      index: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./step.less');
</style>
