<template>
    <!-- 内置组件slot 作用是对传递的子标签的引用 -->
    <div class="fixed z-40 bottom-0 top-0 left-0 right-0 w-screen h-screen" v-show="visible"></div>
    <div class=" inline-block relative">
        <span class=" inline-block" @click.stop="show">
            <slot />
        </span>
    </div>
    <!-- 下拉菜单 -->
    <div v-show="visible" ref="dropDownContainerRef"
        class="absolute z-50 w-[150px] text-left text-sm border-[1px] border-[#454545] rounded-sm bg-[#252526]">
        <div v-for="(item, index) in attrs.data" @click="triggerEvent(item)" v-bind:key="item" :class="['pl-2  text-[#cccfd4] cursor-pointer', {
            'text-[#686868]': !item.disable,
            'hover:bg-[#323842]': item.disable,
            'cursor-not-allowed': !item.disable,
        }]">{{ item.name }}</div>
    </div>
</template>
<script setup>
//script setup属性的作用：可以直接使用组合式API
import { ref, useAttrs,defineEmits } from 'vue';
import { useclickOutside } from '../hooks';
const visible = ref(false);
// const dropdownList = ['打开的编辑器', '文件夹', '大纲', '时间线'];
const attrs = useAttrs();

const show = ()=>{
    visible.value = true;
}
const hide = ()=>{
    visible.value = false;
}

const emit = defineEmits(['checked'])
const triggerEvent = (item) => {
    emit("checked",item)
    if (!item.disable) {
        hide();
    }
    
}


const dropDownContainerRef = ref(null)
useclickOutside(dropDownContainerRef, hide);


</script>