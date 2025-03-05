import { onMounted } from "vue";
export const useClickOutside = (domRef, callback) => {
  onMounted(() => {
    document.addEventListener("click", ({ target }) => {
      if (!domRef.value?.contains(target)) {
        callback();
      }
    });
  });
};
