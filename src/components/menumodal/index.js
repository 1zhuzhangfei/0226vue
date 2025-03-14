import { defineComponent, h, ref } from "vue";
import deleteModal from "./deleteModal.vue";

export const useModal = (option) => {
  const visible = ref(false);
  const modalApi = {
    open() {
      visible.value = true;
    },
    hide() {
      visible.value = false;
    },
  };
  const Modal = defineComponent({
    setup() {
      return () =>
        h(deleteModal, {
          visible: visible.value,
          content: option.content,
          onCancel: option.cancel,
          onConfirm: option.confirm,
         
          onClose() {
            modalApi.hide();
          },
        });
    },
  });

  return [Modal, modalApi];
};
