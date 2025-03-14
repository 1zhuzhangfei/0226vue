<template>
  <div v-if="props.visible" class="modal">
    <h4 class="modal-hd">提示</h4>
    <div class="modal-bd">{{ props.content }}</div>
    <div class="modal-ft">
      <div class="modal-ft__cancel" @click="onCancel">取消</div>
      <div class="modal-ft__confirm" @click="onConfirm">确定</div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
// props数据是单向的 【单向数据流】
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
</script>
<style scoped lang="scss">
.modal {
  width: 300px;
  height: 120px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;
  @at-root &-ft {
    display: flex;
    @at-root &__cancel {
      margin-left: auto;
    }
    @at-root &__confirm {
      margin-left: 12px;
    }
    @at-root &__cancel,
      &__confirm {
      width: 80px;
      text-align: center;
      background-color: orange;
      color: white;
      line-height: 30px;
      border-radius: 4px;
    }
  }
}
</style>
