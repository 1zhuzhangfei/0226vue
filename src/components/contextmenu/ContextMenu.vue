<template>
  
  <div
    ref="wrapperRef"
    class="contextmenu absolute z-50 w-[150px] text-left text-sm border-[1px] border-[#454545] rounded-sm bg-[#252526]"
    :style="{ top: `${props.position.y}px`, left: `${props.position.x}px` }"
  >
    <div v-for="item in props.menu" :key="item.name" class="pl-2 hover:bg-[#323842] cursor-pointer text-[#cccfd4]">{{ item.name }}</div>
  </div>
</template>
<script setup>
import { defineProps, shallowRef, defineEmits } from "vue";
import { useClickOutside } from "./useClickOutside";
defineOptions({ name: "ContextMenu" });
const wrapperRef = shallowRef(null);
const props = defineProps({
  position: {
    required: true,
    type: Object,
  },
  menu: {
    required: true,
    type: Array,
  },
});
const emit = defineEmits(["click-outside"]);
useClickOutside(wrapperRef, () => emit("click-outside"));
</script>
<!-- <style scoped lang="scss">
.contextmenu {
  position: absolute;
  width: 200px;
  height: 300px;
  background-color: black;
}
</style> -->
