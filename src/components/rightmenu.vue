<template>
    <div ref="rightmenuContainerRef">
        <div @contextmenu.prevent @click.right="show">
            <slot />
        </div>
        <!-- 右键菜单 -->
        <div v-show="visible" :style="{ top: `${position.y}px`, left: `${position.x}px` }"
            class="absolute z-50 w-[150px] text-left text-sm border-[1px] border-[#454545] rounded-sm bg-[#252526]">
            <div v-for="(item, index) in attrs.data"
            @click="triggerEvent(item)"
            v-bind:key="item"
                :class="`pl-2  cursor-pointer ${!item.disable ? 'text-[#686868]' : 'text-[#cccfd4]'} ${item.disable ? 'hover:bg-[#323842]' : 'cursor-not-allowed'}`">
                {{ item.name }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, useAttrs } from 'vue';
import { useclickOutside } from '../hooks';
const attrs = useAttrs();
const visible = ref(false);
const position = reactive({ x: 0, y: 0 });
const show = (event) => {
    visible.value = true;
    position.x = event.x;
    position.y = event.y;
}
const hide = () => {
    visible.value = false;
}

const emit = defineEmits(['checked'])
const triggerEvent = (item) => {
    emit("checked", item)
    if (!item.disable) {
        hide();
    }

}

const rightmenuContainerRef = ref(null);
useclickOutside(rightmenuContainerRef, hide);
</script>