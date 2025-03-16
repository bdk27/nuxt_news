<script setup lang="ts">
const { onClick } = defineProps({
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: () => {},
  },
});
</script>

<template>
  <button
    class="text-gray mt-3 text-center text-lg hover:text-white cursor-pointer"
    @click="onClick"
  >
    <slot>查看更多文章</slot>
    <slot name="icon">
      <font-awesome-icon icon="fa-solid fa-caret-right" />
    </slot>
  </button>
</template>

<style scoped></style>
