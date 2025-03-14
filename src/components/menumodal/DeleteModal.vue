<template>
  <div v-show="visible" class=" fixed t-0 l-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
    <div class="flex flex-col text-[#cccfd4] border-[1px] border-[#454545] rounded-sm bg-[#252526] w-[300px] justify-around">

        <div class="p-2 text-2xl">删除操作</div>
        <div class="p-4">{{ props.content }}</div>
        <div class="flex p-2">
          <div class="m-2 ml-auto p-1 cursor-pointer border-solid border-[#454545] border-[2px] rounded" @click="onCancel">取消</div>
          <div class="m-2 ml-3 p-1 cursor-pointer border-solid border-[#454545] border-[2px] rounded" @click="onConfirm">确定</div>
        </div>
        
    </div>
  </div>
</template>
<script setup>
import { defineProps,computed } from 'vue';
// export default {
// name: 'DeleteModal',
const props = defineProps({
  visible: {
    required: true,
    type: Boolean,
  },
  content: {
    required: true,
    type: String,
  },
});
// }

const emit = defineEmits(["close", "confirm", "cancel"]);
const hide = () => emit("close");
const onConfirm = () => {
  hide();
  emit("confirm");
};
const onCancel = () => {
  hide();
  emit("cancel");
};
// const styleTransform = computed(() => {
//   return {
//     top: `${props.triggerPoint.y}px`,
//     left: `${props.triggerPoint.x}px`
//   }
// })
</script>
