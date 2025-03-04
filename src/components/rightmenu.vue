<template>
    <div ref="rightmenuContainerRef">
        <span @contextmenu.prevent  @click.right="show">
            <slot />
        </span>

        <!-- 右键菜单 -->
        <div v-show="visible"
            class="absolute z-50 w-[150px] text-left text-sm border-[1px] border-[#454545] rounded-sm bg-[#252526]">
            <div v-for="(item, index) in attrs.data" v-bind:key="item"
                :class="`pl-2  cursor-pointer ${!item.disable ? 'text-[#686868]' : 'text-[#cccfd4]'} ${item.disable ? 'hover:bg-[#323842]' : 'cursor-not-allowed'}`">
                {{ item.name }}</div>
        </div>
    </div>


</template>
<script setup>
import { ref, useAttrs, defineEmits } from 'vue';
import { useclickOutside } from '../hooks';
const attrs = useAttrs();
const visible = ref(false);
const show = () => {
    visible.value = true;
}
const hide = () => {
    visible.value = false;
}

const rightmenuContainerRef = ref(null)

useclickOutside(rightmenuContainerRef, hide);


</script>