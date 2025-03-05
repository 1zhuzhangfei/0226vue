import { ref, reactive, h, defineComponent } from "vue";
import Main from "./ContextMenu.vue";
export const useContextMenu = () => {
  const visible = ref(false);
  const position = reactive({ x: 0, y: 0 });
  const menu = ref([]);
  // 屏蔽鼠标右键默认行为
  document.addEventListener("contextmenu", (event) => {
    visible.value = true;
    event.preventDefault();
    position.x = event.x;
    position.y = event.y;
    return false;
  });
  // 操作ContextMenu组件的方法集合
  const api = {
    setMenuList(data) {
      menu.value = data;
    },
  };
  const onClickOutside = () => {
    visible.value = false;
  };
  // <ContextMenu v-show="visible" :position="position" /> JSX语法
  // h函数 => 渲染函数它的作用就是渲染组件的
  const ContextMenu = defineComponent({
    setup() {
      return () =>
        visible.value
          ? h(Main, { position, menu: menu.value, onClickOutside })
          : null;
    },
  });
  return { ContextMenu, api };
};

// 渲染函数h
